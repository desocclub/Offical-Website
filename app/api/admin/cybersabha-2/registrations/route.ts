import { NextRequest, NextResponse } from 'next/server';
import { requireCyberSabhaAdmin } from '@/lib/cybersabha/adminAuth';
import { getSupabaseAdmin } from '@/lib/cybersabha/supabase';

export async function GET(request: NextRequest) {
  const auth = await requireCyberSabhaAdmin(request);
  if ('error' in auth) return NextResponse.json({ error: auth.error }, { status: auth.status });

  try {
    const supabase = getSupabaseAdmin();
    const { data: event, error: eventError } = await supabase.from('events').select('id,team_capacity').eq('slug', 'cybersabha-2').single();
    if (eventError || !event) throw eventError || new Error('Event is not configured.');

    const [{ data: registrations, error }, { count, error: countError }, { count: pendingCount, error: pendingCountError }, { count: verifiedCount, error: verifiedCountError }] = await Promise.all([
      supabase.from('registrations').select('*').eq('event_id', event.id).order('created_at', { ascending: false }),
      supabase.from('registrations').select('id', { count: 'exact', head: true }).eq('event_id', event.id).in('status', ['pending_payment_verification', 'payment_verified']),
      supabase.from('registrations').select('id', { count: 'exact', head: true }).eq('event_id', event.id).eq('status', 'pending_payment_verification'),
      supabase.from('registrations').select('id', { count: 'exact', head: true }).eq('event_id', event.id).eq('status', 'payment_verified'),
    ]);
    if (error || countError || pendingCountError || verifiedCountError) throw error || countError || pendingCountError || verifiedCountError;

    const ids = (registrations || []).map((row) => row.id);
    const [{ data: members, error: membersError }, { data: payments, error: paymentsError }] = ids.length
      ? await Promise.all([
          supabase.from('registration_members').select('*').in('registration_id', ids).order('member_index'),
          supabase.from('payments').select('*').in('registration_id', ids),
        ])
      : [{ data: [], error: null }, { data: [], error: null }];
    if (membersError || paymentsError) throw membersError || paymentsError;

    type MemberRow = { registration_id: string; member_index: number; full_name: string; email: string; phone: string; college: string; department: string; academic_year: string };
    const memberMap = new Map<string, MemberRow[]>();
    for (const member of (members || []) as MemberRow[]) memberMap.set(member.registration_id, [...(memberMap.get(member.registration_id) || []), member]);
    const paymentMap = new Map((payments || []).map((payment) => [payment.registration_id, payment]));
    const rows = await Promise.all((registrations || []).map(async (registration) => {
      const payment = paymentMap.get(registration.id);
      const signed = payment?.screenshot_path
        ? await supabase.storage.from('cybersabha-payment-proofs').createSignedUrl(payment.screenshot_path, 600)
        : { data: null, error: null };
      return {
        ...registration,
        members: memberMap.get(registration.id) || [],
        payment: payment ? { ...payment, screenshot_url: signed.data?.signedUrl || null } : null,
      };
    }));

    const query = (request.nextUrl.searchParams.get('q') || '').trim().toLowerCase();
    const status = request.nextUrl.searchParams.get('status') || 'all';
    const filtered = rows.filter((row) => {
      const statusMatch = status === 'all' || row.status === status;
      const searchable = [row.registration_number, row.team_name, ...row.members.map((member: MemberRow) => `${member.full_name} ${member.email} ${member.phone}`)].join(' ').toLowerCase();
      return statusMatch && (!query || searchable.includes(query));
    });

    return NextResponse.json({ total: count || 0, pendingCount: pendingCount || 0, verifiedCount: verifiedCount || 0, capacity: event.team_capacity, registrations: filtered });
  } catch (error) {
    console.error('CyberSabha admin list failed:', error);
    return NextResponse.json({ error: 'Could not load registrations.' }, { status: 500 });
  }
}