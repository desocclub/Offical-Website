import 'server-only';
import { NextRequest } from 'next/server';
import { getSupabaseAdmin } from './supabase';

export async function requireCyberSabhaAdmin(request: NextRequest) {
  const token = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
  if (!token) return { error: 'Sign in with an authorized admin account.', status: 401 as const };

  const { data, error } = await getSupabaseAdmin().auth.getUser(token);
  if (error || !data.user?.email) return { error: 'Your admin session is invalid or expired.', status: 401 as const };

  const allowedEmails = (process.env.CYBERSABHA_ADMIN_EMAILS || '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
  if (!allowedEmails.includes(data.user.email.toLowerCase())) {
    return { error: 'This account is not authorized to administer CyberSabha.', status: 403 as const };
  }

  return { user: data.user };
}