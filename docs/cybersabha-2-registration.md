# CyberSabha 2.0 registration setup

## Supabase

1. Create a Supabase project and apply all migrations in `supabase/migrations/` using the Supabase SQL editor or Supabase CLI.
2. Enable Supabase Auth email/password sign-in. Create accounts only for DESOC admins; put each administrator's email in `CYBERSABHA_ADMIN_EMAILS` as a comma-separated allowlist.
3. Keep the `cybersabha-payment-proofs` bucket private. The migration grants no `anon` or `authenticated` Storage policies; server routes upload through the service role, and admins receive signed links that expire after 10 minutes.
4. Set the environment variables listed in `.env.example` in local development and the deployment environment. Never expose `SUPABASE_SERVICE_ROLE_KEY` to browser code.

## Email

1. Create a Resend account and verify the sending domain used by `CYBERSABHA_EMAIL_FROM`.
2. Set `RESEND_API_KEY` and `CYBERSABHA_EMAIL_FROM` in the deployment environment. The sender domain must be verified with Resend; `desoc.club@gmail.com` is configured as reply-to and the registration notification inbox, not as an unverified sender address. Without a Resend key, registrations and payment decisions still persist but emails are skipped. Provider errors are logged and never roll back saved registrations or payment decisions.
3. Registration receipts go to the selected team leader and a separate new-registration notice goes to `CYBERSABHA_NOTIFICATION_EMAIL` (defaults to `desoc.club@gmail.com`). Admin status updates send the verified or rejected email to the team leader; the admin can resend the current reviewed-status email.

## Routes

- Public registration: `/cybersabha-2/register`
- Admin: `/admin/cybersabha-2`
- Public registration API: `POST /api/cybersabha-2/registrations` (multipart form)
- Protected admin API: `/api/admin/cybersabha-2/registrations`

## Verification checklist

Run `npm run build` after applying the migration and setting the public Supabase URL/anon key. To verify database-backed behavior, use a non-production Supabase project and a running Next.js app with its service-role key and admin allowlist configured.

1. Register valid 2-member and 4-member teams; confirm totals are ₹140 and ₹280 and IDs follow `CS2-0001` format.
2. Re-submit a member email or phone for this event; expect HTTP 409.
3. Upload a non-image renamed `.jpg`, an unsupported image type, and a file over 5 MB; expect HTTP 400 and no registration row.
4. Submit a registration without a UTR and confirm the screenshot is still required and available for admin payment review.
5. Submit 21 distinct teams concurrently; all should succeed, and a 22nd should receive HTTP 409. The database RPC serializes capacity checks per event.
6. Submit after 5 October 2026 11:59 PM IST (or temporarily lower the event deadline in the test project); expect HTTP 410.
7. Without a session, request the admin API; expect HTTP 401. Sign in with an allowlisted Supabase Auth user to review/verify/reject and resend email; verify an authenticated non-allowlisted user receives HTTP 403.
8. Confirm anon and authenticated clients cannot select registration/payment/member rows or read objects in `cybersabha-payment-proofs`; verify admin screenshot links expire after 10 minutes.

This workspace does not contain Supabase credentials or a configured Supabase project, so the live database, concurrent-capacity, Auth, Storage, and email checks must be run in the configured test project.