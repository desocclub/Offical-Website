'use client';

import { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import { getCyberSabhaAuthClient } from '@/lib/cybersabha/browser';

type RegistrationStatus = 'pending_payment_verification' | 'payment_verified' | 'payment_rejected' | 'cancelled';
interface AdminMember { member_index: number; full_name: string; email: string; phone: string; college: string; department: string; academic_year: string }
interface AdminRegistration {
  id: string; registration_number: string; team_name: string; team_size: number; leader_member_index: number;
  total_amount: number; status: RegistrationStatus; created_at: string; members: AdminMember[];
  payment: null | { utr: string | null; status: RegistrationStatus; rejection_reason: string | null; screenshot_url: string | null };
}

const statuses: { label: string; value: RegistrationStatus | 'all' }[] = [
  { label: 'All statuses', value: 'all' },
  { label: 'Pending verification', value: 'pending_payment_verification' },
  { label: 'Verified', value: 'payment_verified' },
  { label: 'Rejected', value: 'payment_rejected' },
  { label: 'Cancelled', value: 'cancelled' },
];

export default function CyberSabhaAdmin() {
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<RegistrationStatus | 'all'>('all');
  const [rows, setRows] = useState<AdminRegistration[]>([]);
  const [total, setTotal] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [verifiedCount, setVerifiedCount] = useState(0);
  const [capacity, setCapacity] = useState(21);
  const [loading, setLoading] = useState(false);
  const [busyId, setBusyId] = useState('');
  const [error, setError] = useState('');
  const [configurationError, setConfigurationError] = useState('');
  const [notice, setNotice] = useState('');
  const [rejectionReasons, setRejectionReasons] = useState<Record<string, string>>({});

  useEffect(() => {
    try {
      const client = getCyberSabhaAuthClient();
      void client.auth.getSession().then(({ data }) => setSession(data.session));
      const { data } = client.auth.onAuthStateChange((_event, nextSession) => setSession(nextSession));
      return () => data.subscription.unsubscribe();
    } catch (clientError) {
      setConfigurationError(clientError instanceof Error ? clientError.message : 'Supabase public configuration is missing.');
    }
  }, []);

  useEffect(() => {
    if (session) void loadRegistrations();
  // Search/filter updates intentionally reload this bounded 21-team dataset.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, query, status]);

  const apiFetch = async (url: string, init?: RequestInit) => {
    const activeSession = session || (await getCyberSabhaAuthClient().auth.getSession()).data.session;
    if (!activeSession) throw new Error('Your admin session has expired. Sign in again.');
    const response = await fetch(url, {
      ...init,
      headers: { ...init?.headers, Authorization: `Bearer ${activeSession.access_token}` },
    });
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.error || 'Admin request failed.');
    return payload;
  };

  const loadRegistrations = async () => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams({ q: query, status });
      const data = await apiFetch(`/api/admin/cybersabha-2/registrations?${params}`);
      setRows(data.registrations);
      setTotal(data.total);
      setPendingCount(data.pendingCount);
      setVerifiedCount(data.verifiedCount);
      setCapacity(data.capacity);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Could not load registrations.');
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { error: authError } = await getCyberSabhaAuthClient().auth.signInWithPassword({ email, password });
      if (authError) setError(authError.message);
      else setPassword('');
    } catch (authError) {
      setError(authError instanceof Error ? authError.message : 'Unable to initialize Supabase authentication.');
    } finally {
      setLoading(false);
    }
  };

  const updatePayment = async (registration: AdminRegistration, nextStatus: 'payment_verified' | 'payment_rejected') => {
    const reason = rejectionReasons[registration.id] || '';
    if (nextStatus === 'payment_rejected' && !reason.trim()) {
      setError('Add a rejection reason before rejecting payment.');
      return;
    }
    setBusyId(registration.id);
    setError('');
    setNotice('');
    try {
      await apiFetch(`/api/admin/cybersabha-2/registrations/${registration.id}`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus, reason }),
      });
      setNotice(`${registration.registration_number} marked ${nextStatus === 'payment_verified' ? 'verified' : 'rejected'}.`);
      await loadRegistrations();
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : 'Could not update payment status.');
    } finally {
      setBusyId('');
    }
  };

  const resendEmail = async (registration: AdminRegistration) => {
    setBusyId(registration.id);
    setError('');
    setNotice('');
    try {
      await apiFetch(`/api/admin/cybersabha-2/registrations/${registration.id}`, { method: 'POST' });
      setNotice(`Email resent to the team leader for ${registration.registration_number}.`);
    } catch (sendError) {
      setError(sendError instanceof Error ? sendError.message : 'Could not resend email.');
    } finally {
      setBusyId('');
    }
  };

  const exportCsv = async () => {
    setError('');
    try {
      const data = await apiFetch('/api/admin/cybersabha-2/registrations?status=all');
      const headers = ['Registration ID', 'Team', 'Status', 'Amount INR', 'UTR', 'Leader', 'Leader email', 'Leader phone', 'Members', 'Created'];
      const lines = data.registrations.map((registration: AdminRegistration) => {
        const leader = registration.members[registration.leader_member_index];
        return [registration.registration_number, registration.team_name, registration.status, registration.total_amount,
          registration.payment?.utr || '', leader?.full_name || '', leader?.email || '', leader?.phone || '',
          registration.members.map((member) => `${member.full_name} (${member.email}, ${member.phone})`).join(' | '), registration.created_at];
      });
      const csv = [headers, ...lines].map((line: unknown[]) => line.map((value: unknown) => `"${String(value ?? '').replace(/"/g, '""')}"`).join(',')).join('\r\n');
      const href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
      const anchor = document.createElement('a');
      anchor.href = href;
      anchor.download = 'cybersabha-2-registrations.csv';
      anchor.click();
      URL.revokeObjectURL(href);
    } catch (exportError) {
      setError(exportError instanceof Error ? exportError.message : 'Could not export registrations.');
    }
  };

  const inputClass = 'border border-stone-400 bg-[#f5f1e9] px-3 py-2.5 text-sm text-[#17120f] outline-none focus:border-red-800';

  return (
    <div className="min-h-screen bg-[#e9e5dc] text-[#17120f]">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:px-8">
        {configurationError ? (
          <section role="alert" className="mx-auto max-w-2xl border border-red-900/25 bg-[#f5f1e9] p-6 sm:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-800">Setup required</p>
            <h1 className="mt-3 font-serif text-3xl font-black uppercase">Admin sign-in unavailable</h1>
            <p className="mt-3 text-sm leading-relaxed text-stone-700">{configurationError} Add <code className="font-mono">NEXT_PUBLIC_SUPABASE_URL</code> and <code className="font-mono">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to your local environment, then restart the Next.js dev server.</p>
            <p className="mt-4 text-xs leading-relaxed text-stone-600">The service-role key belongs only in the server environment and must never use a <code className="font-mono">NEXT_PUBLIC_</code> variable.</p>
          </section>
        ) : !session ? (
          <section className="mx-auto max-w-md border border-stone-300 bg-[#f5f1e9] p-6 sm:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-800">Restricted access</p>
            <h1 className="mt-3 font-serif text-3xl font-black uppercase">CyberSabha admin</h1>
            <p className="mt-2 text-sm text-stone-600">Sign in with an authorized Supabase admin account.</p>
            <form onSubmit={signIn} className="mt-6 space-y-4">
              <label className="block text-sm font-semibold">Email<input type="email" required autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} className={`${inputClass} mt-2 w-full`} /></label>
              <label className="block text-sm font-semibold">Password<input type="password" required autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} className={`${inputClass} mt-2 w-full`} /></label>
              {error && <p role="alert" className="border border-red-800/30 bg-red-900/5 p-3 text-sm text-red-900">{error}</p>}
              <button disabled={loading} className="w-full bg-[#17120f] px-5 py-3 text-sm font-bold uppercase tracking-wider text-white disabled:opacity-60">{loading ? 'Signing in…' : 'Sign in'}</button>
            </form>
          </section>
        ) : (
          <>
            <header className="flex flex-wrap items-end justify-between gap-5 border-b-2 border-[#17120f] pb-6">
              <div><p className="text-xs font-bold uppercase tracking-[0.25em] text-red-800">Operations · CyberSabha 2.0</p><h1 className="mt-2 font-serif text-4xl font-black uppercase sm:text-5xl">Registrations</h1><p className="mt-2 text-sm text-stone-600">Signed in as {session.user.email}</p></div>
              <div className="flex gap-2">
                <button type="button" onClick={exportCsv} className="border border-[#17120f] px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition hover:bg-[#17120f] hover:text-white">Export CSV</button>
                <button type="button" onClick={() => void getCyberSabhaAuthClient().auth.signOut()} className="border border-stone-400 px-4 py-2.5 text-xs font-bold uppercase tracking-wider">Sign out</button>
              </div>
            </header>

            <section className="mt-6 grid gap-px border border-stone-300 bg-stone-300 sm:grid-cols-3">
              <div className="bg-[#f5f1e9] p-5"><p className="text-xs font-bold uppercase tracking-wider text-stone-500">Reserved places</p><p className="mt-2 font-serif text-4xl font-black">{total} <span className="text-xl text-stone-500">/ {capacity}</span></p></div>
              <div className="bg-[#f5f1e9] p-5"><p className="text-xs font-bold uppercase tracking-wider text-stone-500">Pending review</p><p className="mt-2 font-serif text-4xl font-black">{pendingCount}</p></div>
              <div className="bg-[#f5f1e9] p-5"><p className="text-xs font-bold uppercase tracking-wider text-stone-500">Verified payments</p><p className="mt-2 font-serif text-4xl font-black">{verifiedCount}</p></div>
            </section>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search registration, team, member, email, phone" className={`${inputClass} min-w-0 flex-1`} />
              <select value={status} onChange={(event) => setStatus(event.target.value as RegistrationStatus | 'all')} className={inputClass}>{statuses.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select>
              <button type="button" onClick={() => void loadRegistrations()} className="bg-[#17120f] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white">Refresh</button>
            </div>
            {error && <p role="alert" className="mt-4 border border-red-800/30 bg-red-900/5 p-3 text-sm text-red-900">{error}</p>}
            {notice && <p role="status" className="mt-4 border border-green-800/30 bg-green-900/5 p-3 text-sm text-green-900">{notice}</p>}

            <div className="mt-5 space-y-4">
              {loading && <p className="py-8 text-center text-sm text-stone-600">Loading registrations…</p>}
              {!loading && rows.length === 0 && <p className="border border-dashed border-stone-400 py-12 text-center text-sm text-stone-600">No registrations match this view.</p>}
              {!loading && rows.map((registration) => {
                const leader = registration.members[registration.leader_member_index];
                const isBusy = busyId === registration.id;
                return (
                  <article key={registration.id} className="border border-stone-300 bg-[#f5f1e9]">
                    <div className="flex flex-wrap items-start justify-between gap-4 border-b border-stone-300 p-4 sm:p-5">
                      <div><p className="font-mono text-xs font-bold text-red-800">{registration.registration_number}</p><h2 className="mt-1 font-serif text-2xl font-black uppercase">{registration.team_name}</h2><p className="mt-1 text-xs text-stone-600">{new Date(registration.created_at).toLocaleString()}</p></div>
                      <span className={`border px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider ${registration.status === 'payment_verified' ? 'border-green-800/40 bg-green-900/5 text-green-900' : registration.status === 'payment_rejected' ? 'border-red-800/40 bg-red-900/5 text-red-900' : 'border-amber-800/40 bg-amber-900/5 text-amber-900'}`}>{registration.status.replaceAll('_', ' ')}</span>
                    </div>
                    <div className="grid gap-5 p-4 sm:p-5 lg:grid-cols-[1.2fr_0.8fr]">
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">Team · {registration.team_size} members · ₹{registration.total_amount}</h3>
                        <div className="mt-3 divide-y divide-stone-200">
                          {registration.members.map((member) => <div key={member.member_index} className="py-3 text-sm"><p className="font-bold">{member.full_name}{member.member_index === registration.leader_member_index ? ' · Team leader' : ''}</p><p className="mt-1 break-all text-xs text-stone-600">{member.email} · {member.phone}</p><p className="mt-1 text-xs text-stone-600">{member.college} · {member.department} · {member.academic_year}</p></div>)}
                        </div>
                      </div>
                      <div className="border-t border-stone-300 pt-4 lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">Payment proof</h3>
                        <p className="mt-3 break-all font-mono text-sm font-bold">UTR: {registration.payment?.utr || 'Not recorded'}</p>
                        {registration.payment?.rejection_reason && <p className="mt-2 text-sm text-red-900">Reason: {registration.payment.rejection_reason}</p>}
                        {registration.payment?.screenshot_url && <a href={registration.payment.screenshot_url} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm font-bold text-red-900 underline underline-offset-4">View private screenshot ↗</a>}
                        <div className="mt-5 flex flex-wrap gap-2">
                          {registration.status !== 'payment_verified' && registration.status !== 'cancelled' && <button type="button" disabled={isBusy} onClick={() => void updatePayment(registration, 'payment_verified')} className="bg-green-900 px-3 py-2 text-xs font-bold uppercase text-white disabled:opacity-50">Verify</button>}
                          {registration.status !== 'payment_rejected' && registration.status !== 'cancelled' && <button type="button" disabled={isBusy} onClick={() => void updatePayment(registration, 'payment_rejected')} className="bg-red-900 px-3 py-2 text-xs font-bold uppercase text-white disabled:opacity-50">Reject</button>}
                          <button type="button" disabled={isBusy} onClick={() => void resendEmail(registration)} className="border border-[#17120f] px-3 py-2 text-xs font-bold uppercase disabled:opacity-50">Resend email</button>
                        </div>
                        {registration.status !== 'payment_verified' && registration.status !== 'cancelled' && <label className="mt-4 block text-xs font-bold uppercase tracking-wider text-stone-600">Rejection reason<input value={rejectionReasons[registration.id] || ''} onChange={(event) => setRejectionReasons((current) => ({ ...current, [registration.id]: event.target.value }))} className={`${inputClass} mt-2 w-full`} placeholder="Required when rejecting" /></label>}
                        {isBusy && <p className="mt-3 text-xs text-stone-600">Updating…</p>}
                        {leader && <p className="mt-4 break-all text-xs text-stone-500">Email recipient: {leader.email}</p>}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}