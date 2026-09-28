create extension if not exists pgcrypto;

create sequence if not exists public.cybersabha_registration_number_seq;

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  event_date date not null,
  starts_at time not null,
  ends_at time not null,
  venue text not null,
  registration_deadline timestamptz not null,
  team_capacity integer not null check (team_capacity > 0),
  min_team_size integer not null check (min_team_size > 0),
  max_team_size integer not null check (max_team_size >= min_team_size),
  fee_per_member integer not null check (fee_per_member >= 0),
  created_at timestamptz not null default now()
);

insert into public.events (
  slug, title, event_date, starts_at, ends_at, venue, registration_deadline,
  team_capacity, min_team_size, max_team_size, fee_per_member
) values (
  'cybersabha-2', 'CyberSabha 2.0 - The Grand Tech Assembly', '2026-10-07',
  '09:00', '17:00', 'JVN Hall, 4th Floor, CSD Department',
  '2026-10-05 23:59:59+05:30', 21, 2, 4, 70
) on conflict (slug) do update set
  title = excluded.title,
  event_date = excluded.event_date,
  starts_at = excluded.starts_at,
  ends_at = excluded.ends_at,
  venue = excluded.venue,
  registration_deadline = excluded.registration_deadline,
  team_capacity = excluded.team_capacity,
  min_team_size = excluded.min_team_size,
  max_team_size = excluded.max_team_size,
  fee_per_member = excluded.fee_per_member;

create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id),
  registration_number text not null unique,
  team_name text not null,
  team_size integer not null check (team_size between 2 and 4),
  leader_member_index integer not null check (leader_member_index between 0 and 3),
  total_amount integer not null check (total_amount >= 0),
  status text not null default 'pending_payment_verification'
    check (status in ('pending_payment_verification', 'payment_verified', 'payment_rejected', 'cancelled')),
  created_at timestamptz not null default now(),
  constraint registrations_leader_index_fits check (leader_member_index < team_size)
);

create table if not exists public.registration_members (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id),
  registration_id uuid not null references public.registrations(id) on delete cascade,
  member_index integer not null check (member_index between 0 and 3),
  full_name text not null,
  email text not null,
  phone text not null,
  college text not null,
  department text not null,
  academic_year text not null,
  created_at timestamptz not null default now(),
  unique (registration_id, member_index)
);

create unique index if not exists registration_members_event_email_unique
  on public.registration_members (event_id, lower(email));
create unique index if not exists registration_members_event_phone_unique
  on public.registration_members (event_id, phone);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  registration_id uuid not null unique references public.registrations(id) on delete cascade,
  utr text not null,
  amount integer not null check (amount >= 0),
  screenshot_path text not null,
  status text not null default 'pending_payment_verification'
    check (status in ('pending_payment_verification', 'payment_verified', 'payment_rejected')),
  rejection_reason text,
  verified_by text,
  verified_at timestamptz,
  created_at timestamptz not null default now()
);

create unique index if not exists payments_utr_unique on public.payments (lower(utr));
create index if not exists registrations_event_created_idx on public.registrations (event_id, created_at desc);
create index if not exists registrations_status_idx on public.registrations (status);

alter table public.events enable row level security;
alter table public.registrations enable row level security;
alter table public.registration_members enable row level security;
alter table public.payments enable row level security;
alter table storage.objects enable row level security;

revoke all on public.events, public.registrations, public.registration_members, public.payments from anon, authenticated;
revoke all on sequence public.cybersabha_registration_number_seq from anon, authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('cybersabha-payment-proofs', 'cybersabha-payment-proofs', false, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update set
  public = false,
  file_size_limit = 5242880,
  allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp'];

drop policy if exists cybersabha_private_storage_deny_client_access on storage.objects;
create policy cybersabha_private_storage_deny_client_access
  on storage.objects as restrictive for all to anon, authenticated
  using (bucket_id <> 'cybersabha-payment-proofs')
  with check (bucket_id <> 'cybersabha-payment-proofs');

comment on table public.registrations is 'Private registration data; accessed only by trusted server routes using the service role.';
comment on table public.registration_members is 'Private participant data; RLS has no public policies.';
comment on table public.payments is 'Private payment data; screenshots are held in a private Storage bucket.';
comment on table storage.objects is 'CyberSabha payment proofs have no anon/authenticated access policies; server routes use service role and short-lived signed URLs.';

create or replace function public.create_cybersabha_registration(
  p_team_name text,
  p_leader_member_index integer,
  p_members jsonb,
  p_utr text,
  p_screenshot_path text
) returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  event_row public.events%rowtype;
  registration_row public.registrations%rowtype;
  member_count integer;
  next_number bigint;
  computed_amount integer;
begin
  select * into event_row from public.events where slug = 'cybersabha-2';
  if not found then raise exception using errcode = 'P0001', message = 'EVENT_NOT_CONFIGURED'; end if;

  perform pg_advisory_xact_lock(hashtextextended(event_row.id::text, 0));

  if clock_timestamp() > event_row.registration_deadline then
    raise exception using errcode = 'P0001', message = 'REGISTRATION_CLOSED';
  end if;

  member_count := jsonb_array_length(p_members);
  if member_count < event_row.min_team_size or member_count > event_row.max_team_size
     or p_leader_member_index < 0 or p_leader_member_index >= member_count then
    raise exception using errcode = 'P0001', message = 'INVALID_TEAM_SIZE';
  end if;

  if (select count(*) from public.registrations
      where event_id = event_row.id and status in ('pending_payment_verification', 'payment_verified')) >= event_row.team_capacity then
    raise exception using errcode = 'P0001', message = 'CAPACITY_REACHED';
  end if;

  computed_amount := member_count * event_row.fee_per_member;
  next_number := nextval('public.cybersabha_registration_number_seq');

  insert into public.registrations (
    event_id, registration_number, team_name, team_size, leader_member_index, total_amount
  ) values (
    event_row.id, 'CS2-' || lpad(next_number::text, 4, '0'), trim(p_team_name),
    member_count, p_leader_member_index, computed_amount
  ) returning * into registration_row;

  insert into public.registration_members (
    event_id, registration_id, member_index, full_name, email, phone, college, department, academic_year
  )
  select event_row.id, registration_row.id, member.member_index, trim(member.full_name),
         lower(trim(member.email)), trim(member.phone), trim(member.college),
         trim(member.department), trim(member.academic_year)
  from jsonb_to_recordset(p_members) as member(
    member_index integer, full_name text, email text, phone text,
    college text, department text, academic_year text
  );

  insert into public.payments (registration_id, utr, amount, screenshot_path)
  values (registration_row.id, upper(trim(p_utr)), computed_amount, p_screenshot_path);

  return jsonb_build_object(
    'id', registration_row.id,
    'registration_number', registration_row.registration_number,
    'team_name', registration_row.team_name,
    'team_size', registration_row.team_size,
    'total_amount', registration_row.total_amount,
    'status', registration_row.status
  );
end;
$$;

revoke all on function public.create_cybersabha_registration(text, integer, jsonb, text, text) from public, anon, authenticated;
grant execute on function public.create_cybersabha_registration(text, integer, jsonb, text, text) to service_role;

create or replace function public.set_cybersabha_payment_status(
  p_registration_id uuid,
  p_status text,
  p_reason text,
  p_admin_email text
) returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  registration_row public.registrations%rowtype;
  event_capacity integer;
begin
  if p_status not in ('payment_verified', 'payment_rejected') then
    raise exception using errcode = 'P0001', message = 'INVALID_PAYMENT_STATUS';
  end if;
  if p_status = 'payment_rejected' and nullif(trim(p_reason), '') is null then
    raise exception using errcode = 'P0001', message = 'REJECTION_REASON_REQUIRED';
  end if;

  select * into registration_row
    from public.registrations
    where id = p_registration_id and event_id = (select id from public.events where slug = 'cybersabha-2')
    for update;
  if not found then raise exception using errcode = 'P0001', message = 'REGISTRATION_NOT_FOUND'; end if;

  if p_status = 'payment_verified' and registration_row.status in ('payment_rejected', 'cancelled') then
    perform pg_advisory_xact_lock(hashtextextended(registration_row.event_id::text, 0));
    select team_capacity into event_capacity from public.events where id = registration_row.event_id;
    if (select count(*) from public.registrations
        where event_id = registration_row.event_id and status in ('pending_payment_verification', 'payment_verified')) >= event_capacity then
      raise exception using errcode = 'P0001', message = 'CAPACITY_REACHED';
    end if;
  end if;

  update public.registrations
    set status = p_status
    where id = p_registration_id
    returning * into registration_row;

  update public.payments
    set status = p_status,
        rejection_reason = case when p_status = 'payment_rejected' then trim(p_reason) else null end,
        verified_by = lower(trim(p_admin_email)),
        verified_at = now()
    where registration_id = registration_row.id;

  return jsonb_build_object(
    'registration_number', registration_row.registration_number,
    'team_name', registration_row.team_name,
    'status', registration_row.status
  );
end;
$$;

revoke all on function public.set_cybersabha_payment_status(uuid, text, text, text) from public, anon, authenticated;
grant execute on function public.set_cybersabha_payment_status(uuid, text, text, text) to service_role;