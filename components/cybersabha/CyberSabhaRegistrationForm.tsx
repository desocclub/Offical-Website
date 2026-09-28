'use client';

import { useState } from 'react';
import Image from 'next/image';
import DeSoc_QR from '@/src/assets/DeSoc_QR.jpeg';

interface MemberForm {
  fullName: string;
  email: string;
  phone: string;
  college: string;
  department: string;
  academicYear: string;
}

interface RegistrationResult {
  registrationNumber: string;
  teamName: string;
  members: { fullName: string; email: string; isLeader: boolean }[];
  totalAmount: number;
  status: string;
}

const emptyMember = (): MemberForm => ({ fullName: '', email: '', phone: '', college: '', department: '', academicYear: '' });
const details = [
  ['Date', '7 October 2026'],
  ['Time', '9:00 AM – 5:00 PM'],
  ['Venue', 'JVN Hall, 4th Floor, CSD Department'],
  ['Registration deadline', '5 October 2026'],
  ['Team size', '2–4 members'],
];
const themes = ['Technological Advancement', 'Data Sovereignty', 'Inclusive Growth', 'Responsible AI in the Digital Age'];
const fieldClass = 'w-full border border-[#17120f]/20 bg-[#f5f1e9] px-3.5 py-3 text-sm text-[#17120f] outline-none transition focus:border-red-800 focus:ring-2 focus:ring-red-800/15 placeholder:text-stone-500';

export default function CyberSabhaRegistrationForm() {
  const [teamName, setTeamName] = useState('');
  const [members, setMembers] = useState<MemberForm[]>([emptyMember(), emptyMember()]);
  const [leaderMemberIndex, setLeaderMemberIndex] = useState(0);
  const [utr, setUtr] = useState('');
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [declaration, setDeclaration] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<RegistrationResult | null>(null);
  const totalAmount = members.length * 70;

  const resizeTeam = (size: number) => {
    setMembers((current) => Array.from({ length: size }, (_, index) => current[index] || emptyMember()));
    setLeaderMemberIndex((current) => Math.min(current, size - 1));
  };

  const updateMember = (index: number, key: keyof MemberForm, value: string) => {
    setMembers((current) => current.map((member, memberIndex) => memberIndex === index ? { ...member, [key]: value } : member));
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    if (!screenshot) {
      setError('Upload the payment screenshot to continue.');
      return;
    }
    if (!declaration) {
      setError('Confirm the declaration before registering.');
      return;
    }

    setSubmitting(true);
    try {
      const form = new FormData();
      form.set('teamName', teamName);
      form.set('members', JSON.stringify(members));
      form.set('leaderMemberIndex', String(leaderMemberIndex));
      form.set('utr', utr);
      form.set('declaration', String(declaration));
      form.set('paymentScreenshot', screenshot);
      const response = await fetch('/api/cybersabha-2/registrations', { method: 'POST', body: form });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || 'Registration failed. Please try again.');
      setResult(payload as RegistrationResult);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (result) {
    return (
      <section className="mx-auto max-w-3xl border border-stone-300 bg-[#f5f1e9] p-6 shadow-xl sm:p-10">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-800">CyberSabha 2.0 · Registration received</p>
        <h1 className="mt-4 font-serif text-4xl font-black uppercase leading-tight sm:text-5xl">Registration successful</h1>
        <p className="mt-3 text-stone-600">Your details are saved. We will send confirmation after payment verification.</p>
        <div className="mt-8 grid gap-3 border-y border-stone-300 py-5 sm:grid-cols-2">
          <Summary label="Registration ID" value={result.registrationNumber} />
          <Summary label="Team name" value={result.teamName} />
          <Summary label="Total amount" value={`₹${result.totalAmount}`} />
          <Summary label="Payment status" value="Pending verification" />
          <Summary label="Event" value="7 October 2026 · 9:00 AM–5:00 PM" />
          <Summary label="Venue" value="JVN Hall, 4th Floor, CSD Department" />
        </div>
        <h2 className="mt-7 font-serif text-2xl font-bold uppercase">Team members</h2>
        <ul className="mt-3 divide-y divide-stone-200">
          {result.members.map((member) => <li key={member.email} className="flex flex-wrap justify-between gap-2 py-3 text-sm"><span>{member.fullName}{member.isLeader ? ' · Team leader' : ''}</span><span className="text-stone-600">{member.email}</span></li>)}
        </ul>
        <p className="mt-6 border-l-2 border-red-800 bg-red-900/5 p-4 text-sm leading-relaxed text-stone-700">A confirmation email will be sent to the team leader once the payment has been verified.</p>
      </section>
    );
  }

  return (
    <div className="mx-auto max-w-7xl">
      <header className="mb-10 border-b-2 border-[#17120f] pb-7">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-red-800">The Grand Tech Assembly · Team registration</p>
        <h1 className="mt-3 max-w-4xl font-serif text-5xl font-black uppercase leading-[0.9] sm:text-7xl">CyberSabha 2.0</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-stone-600">Register a delegation, submit your payment proof, and join the assembly shaping the digital frontier.</p>
      </header>

      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <form onSubmit={submit} className="space-y-8 border border-stone-300 bg-[#f5f1e9] p-5 sm:p-8" noValidate={false}>
          <section>
            <SectionHeading number="01" title="Delegation" />
            <label className="mt-5 block text-sm font-bold" htmlFor="teamName">Team name</label>
            <input id="teamName" required maxLength={100} value={teamName} onChange={(event) => setTeamName(event.target.value)} className={`${fieldClass} mt-2`} placeholder="Your delegation name" />
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <label className="text-sm font-bold" htmlFor="teamSize">Team size</label>
              <select id="teamSize" value={members.length} onChange={(event) => resizeTeam(Number(event.target.value))} className="border border-[#17120f]/20 bg-[#f5f1e9] px-3 py-2 text-sm font-semibold outline-none focus:border-red-800">
                {[2, 3, 4].map((size) => <option value={size} key={size}>{size} members · ₹{size * 70}</option>)}
              </select>
            </div>
          </section>

          <section>
            <SectionHeading number="02" title="Member details" />
            <p className="mt-2 text-sm text-stone-600">Select one team leader. Each member must provide a unique email and phone number.</p>
            <div className="mt-5 space-y-5">
              {members.map((member, index) => (
                <fieldset key={index} className="border border-stone-300 p-4 sm:p-5">
                  <legend className="px-2 font-serif text-xl font-bold uppercase">Member 0{index + 1}</legend>
                  <label className="mb-4 flex w-fit cursor-pointer items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-900">
                    <input type="radio" name="teamLeader" checked={leaderMemberIndex === index} onChange={() => setLeaderMemberIndex(index)} className="accent-red-800" />
                    Team leader
                  </label>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {([
                      ['fullName', 'Full name', 'e.g. Aditi Sharma', 'text'],
                      ['email', 'Email', 'name@example.com', 'email'],
                      ['phone', 'Phone', '10-digit mobile number', 'tel'],
                      ['college', 'College / Institute', 'Institute name', 'text'],
                      ['department', 'Department', 'Department / course', 'text'],
                      ['academicYear', 'Academic year', 'e.g. First year', 'text'],
                    ] as const).map(([key, label, placeholder, type]) => (
                      <label key={key} className="block text-sm font-semibold">
                        {label}
                        <input required type={type} autoComplete={key === 'email' ? 'email' : key === 'phone' ? 'tel' : 'off'} maxLength={key === 'phone' ? 10 : 120} inputMode={key === 'phone' ? 'numeric' : undefined} value={member[key]} onChange={(event) => updateMember(index, key, event.target.value)} className={`${fieldClass} mt-2`} placeholder={placeholder} />
                      </label>
                    ))}
                  </div>
                </fieldset>
              ))}
            </div>
          </section>

          <section>
            <SectionHeading number="03" title="Payment details" />
            <label className="mt-5 block text-sm font-bold" htmlFor="utr">UTR / transaction ID</label>
            <input id="utr" required minLength={6} maxLength={40} value={utr} onChange={(event) => setUtr(event.target.value.toUpperCase())} className={`${fieldClass} mt-2 font-mono uppercase`} placeholder="Payment reference number" />
            <label className="mt-5 block text-sm font-bold" htmlFor="proof">Payment screenshot <span className="font-normal text-stone-600">(JPG, PNG, WebP · max 5 MB)</span></label>
            <input id="proof" required type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => setScreenshot(event.target.files?.[0] || null)} className="mt-2 block w-full border border-dashed border-stone-400 bg-[#eee9df] p-3 text-sm file:mr-3 file:border-0 file:bg-[#17120f] file:px-3 file:py-2 file:text-xs file:font-bold file:uppercase file:text-white" />
            {screenshot && <p className="mt-2 text-xs text-stone-600">Selected: {screenshot.name}</p>}
          </section>

          <label className="flex cursor-pointer items-start gap-3 border-y border-stone-300 py-4 text-sm leading-relaxed text-stone-700">
            <input type="checkbox" checked={declaration} onChange={(event) => setDeclaration(event.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-red-800" />
            <span>I confirm that the details provided for all team members are accurate, and that this team agrees to participate in CyberSabha 2.0.</span>
          </label>

          {error && <p role="alert" className="border border-red-800/30 bg-red-900/5 p-3 text-sm text-red-900">{error}</p>}
          <button type="submit" disabled={submitting} className="w-full bg-[#17120f] px-6 py-4 text-sm font-bold uppercase tracking-[0.16em] text-[#f5f1e9] transition hover:bg-red-900 disabled:cursor-wait disabled:opacity-60 sm:w-auto">
            {submitting ? 'Submitting registration…' : 'Submit team registration'}
          </button>
        </form>

        <aside className="space-y-5 lg:sticky lg:top-28">
          <section className="border border-[#17120f] bg-[#17120f] p-5 text-[#f5f1e9] sm:p-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-red-400">Assembly brief</p>
            <h2 className="mt-3 font-serif text-2xl font-black uppercase">Event details</h2>
            <dl className="mt-5 divide-y divide-white/15">
              {details.map(([label, value]) => <div key={label} className="flex justify-between gap-4 py-3 text-sm"><dt className="text-stone-400">{label}</dt><dd className="max-w-[58%] text-right font-semibold">{value}</dd></div>)}
            </dl>
            <div className="mt-5 border-t border-white/15 pt-4">
              <p className="text-xs font-bold uppercase tracking-wider text-red-300">Themes</p>
              <ul className="mt-3 space-y-2 text-sm text-stone-200">{themes.map((theme) => <li key={theme} className="flex gap-2"><span className="text-red-400">/</span>{theme}</li>)}</ul>
            </div>
          </section>

          <section className="border border-stone-300 bg-[#f5f1e9] p-5 sm:p-6">
            <div className="flex items-end justify-between gap-3 border-b border-stone-300 pb-4">
              <div><p className="text-xs font-bold uppercase tracking-wider text-red-800">Payment summary</p><p className="mt-2 font-serif text-3xl font-black">₹{totalAmount}</p></div>
              <span className="pb-1 text-right text-xs text-stone-600">₹70 × {members.length} members</span>
            </div>
            <div className="mt-5 border border-stone-300 bg-white p-3">
              <Image src={DeSoc_QR} alt="Official DESOC payment QR code" className="mx-auto h-auto w-full max-w-64" priority />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-stone-600">Scan the official DESOC QR for the exact team amount. Upload a clear payment confirmation screenshot above.</p>
          </section>
        </aside>
      </div>
    </div>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return <div><p className="text-[10px] font-bold uppercase tracking-wider text-red-800">{label}</p><p className="mt-1 break-words text-sm font-semibold">{value}</p></div>;
}

function SectionHeading({ number, title }: { number: string; title: string }) {
  return <div className="flex items-center gap-3 border-b border-stone-300 pb-3"><span className="font-mono text-xs font-bold text-red-800">{number}</span><h2 className="font-serif text-2xl font-black uppercase">{title}</h2></div>;
}