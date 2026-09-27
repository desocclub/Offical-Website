'use client';

import { Suspense, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import { resolveSrc } from '@/lib/imageUtils';
import upiqrImg from '@/src/assets/upiqr.jpeg';
import { API_ROUTES } from '@/lib/api';

const EVENT_CONFIG: Record<string, { date: string; teamSize: string; fee: string }> = {
  Sharkverse: { date: '28th March 2026', teamSize: '1-4 members', fee: 'Rs.150 per team' },
  'Bid & Build': { date: '28th March 2026', teamSize: '2-4 members', fee: 'Rs.100 per team' },
  'Escape The Matrix': { date: '27th March 2026', teamSize: '2-4 members', fee: 'Rs. 50 per person' },
};

const EVENT_OPTIONS = Object.keys(EVENT_CONFIG);
const CLOSED_EVENTS = ['Sharkverse', 'Bid & Build', 'Escape The Matrix'];

const getTeamSizeLimits = (eventName: string) =>
  eventName === 'Escape The Matrix' || eventName === 'Bid & Build'
    ? { min: 2, max: 4 }
    : { min: 1, max: 4 };

const getTeamSizeOptions = (eventName: string) => {
  const { min, max } = getTeamSizeLimits(eventName);
  return Array.from({ length: max - min + 1 }, (_, index) => String(min + index));
};

interface AdditionalMember {
  name: string;
  contact: string;
}

interface RegistrationFormData {
  teamName: string;
  teamLeaderName: string;
  email: string;
  phone: string;
  college: string;
  department: string;
  year: string;
  teamSize: string;
  event: string;
  additionalMembers: AdditionalMember[];
  paymentScreenshot: File | null;
  transactionId: string;
}

function RegistrationFormContent() {
  const searchParams = useSearchParams();
  const preSelectedEvent = searchParams.get('event') || 'Sharkverse';

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  const [formData, setFormData] = useState<RegistrationFormData>({
    teamName: '',
    teamLeaderName: '',
    email: '',
    phone: '',
    college: '',
    department: '',
    year: '',
    teamSize: '',
    event: preSelectedEvent,
    additionalMembers: [
      { name: '', contact: '' },
      { name: '', contact: '' },
      { name: '', contact: '' },
    ],
    paymentScreenshot: null,
    transactionId: '',
  });

  const selectedEventMeta = useMemo(
    () => EVENT_CONFIG[formData.event] || { date: 'TBD', teamSize: '1-4 members', fee: 'Rs.150 per team' },
    [formData.event]
  );
  const isEventClosed = CLOSED_EVENTS.includes(formData.event);

  const update = <K extends keyof RegistrationFormData>(field: K, value: RegistrationFormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const updateMember = (index: number, field: keyof AdditionalMember, value: string) => {
    const updated = formData.additionalMembers.map((member, i) =>
      i === index ? { ...member, [field]: value } : member
    );
    setFormData((prev) => ({ ...prev, additionalMembers: updated }));
    const key = `member_${index + 2}_${field}`;
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleTeamSizeChange = (value: string) => {
    update('teamSize', value);
    const size = Number(value || 0);
    const activeMembers = Math.max(size - 1, 0);
    if (activeMembers < formData.additionalMembers.length) {
      const resetMembers = formData.additionalMembers.map((member, i) =>
        i < activeMembers ? member : { name: '', contact: '' }
      );
      setFormData((prev) => ({ ...prev, additionalMembers: resetMembers }));
    }
  };

  const handleEventChange = (value: string) => {
    update('event', value);
    const { min, max } = getTeamSizeLimits(value);
    const currentSize = Number(formData.teamSize || 0);
    if (currentSize && (currentSize < min || currentSize > max)) {
      handleTeamSizeChange('');
    }
  };

  const validate = () => {
    const e: Record<string, string> = {};

    if (!formData.teamName.trim()) e.teamName = 'Team name is required';
    if (!formData.teamLeaderName.trim()) e.teamLeaderName = 'Team leader name is required';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      e.email = 'Valid email address is required';
    }
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone.replace(/\s/g, ''))) {
      e.phone = 'Valid 10-digit phone number is required';
    }
    if (!formData.college.trim()) e.college = 'College is required';
    if (!formData.department.trim()) e.department = 'Department is required';
    if (!formData.year.trim()) e.year = 'Year is required';
    if (!formData.teamSize) e.teamSize = 'Team size is required';
    if (!formData.event) e.event = 'Event name is required';

    const selectedTeamSize = Number(formData.teamSize || 0);
    if (formData.teamSize) {
      const { min, max } = getTeamSizeLimits(formData.event);
      if (selectedTeamSize < min || selectedTeamSize > max) {
        e.teamSize =
          formData.event === 'Escape The Matrix' || formData.event === 'Bid & Build'
            ? `${formData.event} allows only 2 to 4 members`
            : 'Selected team size is not valid for this event';
      }
    }

    const additionalCount = Math.max(selectedTeamSize - 1, 0);
    for (let i = 0; i < additionalCount; i += 1) {
      const member = formData.additionalMembers[i];
      if (!member.name.trim()) e[`member_${i + 2}_name`] = `Member ${i + 2} name is required`;
      if (!member.contact.trim() || !/^\d{10}$/.test(member.contact.replace(/\s/g, ''))) {
        e[`member_${i + 2}_contact`] = `Valid Member ${i + 2} contact number is required`;
      }
    }

    if (!formData.paymentScreenshot) e.paymentScreenshot = 'Payment screenshot is required';
    if (!formData.transactionId.trim()) e.transactionId = 'UPI Transaction ID is required';

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEventClosed) {
      setErrors({ general: 'Registrations for this event are now closed.' });
      return;
    }
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const payload = new FormData();

      payload.append('email', formData.email.trim());
      payload.append('phone', formData.phone.trim());
      payload.append('year', formData.year.trim());
      payload.append('department', formData.department.trim());
      payload.append('leaderName', formData.teamLeaderName.trim());
      payload.append('leaderCollege', formData.college.trim());
      const additionalCount = Math.max(Number(formData.teamSize || 0) - 1, 0);
      const membersPayload = formData.additionalMembers
        .slice(0, additionalCount)
        .map((member) => ({
          name: member.name.trim(),
          contact: member.contact.trim(),
        }));
      payload.append('members', JSON.stringify(membersPayload));
      payload.append('event', formData.event);
      payload.append('transactionId', formData.transactionId.trim());
      if (formData.paymentScreenshot) {
        payload.append('paymentScreenshot', formData.paymentScreenshot);
      }
      payload.append('teamName', formData.teamName.trim());

      const res = await fetch(API_ROUTES.genesisRegister, {
        method: 'POST',
        body: payload,
      });
      const data = await res.json();
      if (!res.ok) {
        setErrors(data.errors || { general: data.error || 'Registration failed. Please try again.' });
        setIsSubmitting(false);
        return;
      }
    } catch {
      setErrors({ general: 'Network error. Please check your connection and try again.' });
      setIsSubmitting(false);
      return;
    }
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const inputClass = (field: string) =>
    `w-full bg-black/35 border ${
      errors[field] ? 'border-red-500' : 'border-white/15'
    } rounded-xl px-4 py-3.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-red-500 transition-colors duration-200`;

  const labelClass = 'block text-gray-200 text-sm sm:text-base font-semibold mb-2';
  const additionalMembersCount = Math.max(Number(formData.teamSize || 0) - 1, 0);

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
        <div className="w-24 h-24 rounded-full bg-green-500/10 border-2 border-green-500/40 flex items-center justify-center mb-8">
          <svg className="w-12 h-12 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="heading-h2 text-primary uppercase tracking-wider mb-4">Registration Complete</h2>
        <p className="text-tertiary text-sm mb-2">
          Thank you, <span className="text-primary font-semibold">{formData.teamLeaderName}</span>
        </p>
        <p className="text-tertiary text-sm mb-2">
          Event: <span className="text-primary font-semibold">{formData.event || 'DESOC Event'}</span>
        </p>
        <p className="text-muted text-xs mt-4 mb-10">
          A confirmation email will be sent to <span className="text-secondary">{formData.email}</span> within 24 hours.
        </p>
        <Link
          href="/genesis"
          style={{ fontWeight: 'var(--font-weight-medium)', boxShadow: '0 0 30px rgba(220,38,38,0.3)' }}
          className="px-8 py-3 bg-linear-to-r from-red-700 to-red-600 text-primary uppercase tracking-wider rounded-full hover:from-red-600 hover:to-red-500 transition-all duration-300"
        >
          Back to Genesis
        </Link>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="flex items-center justify-between mb-8">
        <Link
          href="/genesis"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-red-400 text-sm transition-colors duration-200"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Event
        </Link>
        <span className="text-gray-600 text-xs uppercase tracking-widest">GENESIS Registration</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
        <section className="lg:col-span-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8 md:p-10 shadow-[0_18px_40px_rgba(0,0,0,0.45),0_0_24px_rgba(220,38,38,0.12)]">
          <h1 className="text-white text-3xl sm:text-[32px] font-bold tracking-wide mb-2">Event Registration</h1>
          <p className="text-red-400 text-sm sm:text-base font-semibold mb-2 uppercase tracking-wide">
            Event: <span className="text-white">{formData.event || 'Select an event'}</span>
          </p>
          <p className="text-gray-400 text-sm sm:text-base mb-6">
            Complete the form below to register your team for the event.
          </p>

          {isEventClosed && (
            <div className="border border-red-500/45 bg-red-500/10 rounded-xl p-3.5 mb-5">
              <p className="text-red-300 text-sm font-semibold">
                Registrations for this event are now closed.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={labelClass}>Select Event</label>
              <select
                value={formData.event}
                onChange={(e) => handleEventChange(e.target.value)}
                className={`${inputClass('event')} appearance-none`}
              >
                {EVENT_OPTIONS.map((event) => (
                  <option key={event} value={event}>{CLOSED_EVENTS.includes(event) ? `${event} (Closed)` : event}</option>
                ))}
              </select>
              {errors.event && <p className="text-red-500 text-xs mt-1">{errors.event}</p>}
            </div>

            <div>
              <label className={labelClass}>Team Name</label>
              <input
                type="text"
                value={formData.teamName}
                onChange={(e) => update('teamName', e.target.value)}
                placeholder="Enter your team name"
                className={inputClass('teamName')}
                disabled={isEventClosed}
              />
              {errors.teamName && <p className="text-red-500 text-xs mt-1">{errors.teamName}</p>}
            </div>

            <div>
              <label className={labelClass}>Team Leader Name</label>
              <input
                type="text"
                value={formData.teamLeaderName}
                onChange={(e) => update('teamLeaderName', e.target.value)}
                placeholder="Enter team leader name"
                className={inputClass('teamLeaderName')}
                disabled={isEventClosed}
              />
              {errors.teamLeaderName && <p className="text-red-500 text-xs mt-1">{errors.teamLeaderName}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => update('email', e.target.value)}
                  placeholder="you@example.com"
                  className={inputClass('email')}
                  disabled={isEventClosed}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className={labelClass}>Phone Number</label>
                <input
                  type="tel"
                  maxLength={10}
                  value={formData.phone}
                  onChange={(e) => update('phone', e.target.value)}
                  placeholder="9876543210"
                  className={inputClass('phone')}
                  disabled={isEventClosed}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>College</label>
                <input
                  type="text"
                  value={formData.college}
                  onChange={(e) => update('college', e.target.value)}
                  placeholder="Enter college name"
                  className={inputClass('college')}
                  disabled={isEventClosed}
                />
                {errors.college && <p className="text-red-500 text-xs mt-1">{errors.college}</p>}
              </div>
              <div>
                <label className={labelClass}>Department</label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => update('department', e.target.value)}
                  placeholder="Enter department"
                  className={inputClass('department')}
                  disabled={isEventClosed}
                />
                {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department}</p>}
              </div>
            </div>

            <div className="w-full sm:max-w-[220px]">
              <label className={labelClass}>Year</label>
              <input
                type="text"
                value={formData.year}
                onChange={(e) => update('year', e.target.value)}
                placeholder="e.g. FY, SY, TY"
                className={inputClass('year')}
                disabled={isEventClosed}
              />
              {errors.year && <p className="text-red-500 text-xs mt-1">{errors.year}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Team Size</label>
                <select
                  value={formData.teamSize}
                  onChange={(e) => handleTeamSizeChange(e.target.value)}
                  className={`${inputClass('teamSize')} appearance-none`}
                  disabled={isEventClosed}
                >
                  <option value="">Select team size</option>
                  {getTeamSizeOptions(formData.event).map((size) => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
                {errors.teamSize && <p className="text-red-500 text-xs mt-1">{errors.teamSize}</p>}
              </div>
              <div className="hidden sm:block" />
            </div>

            {additionalMembersCount > 0 && (
              <div className="space-y-4 pt-1">
                {formData.additionalMembers
                  .slice(0, additionalMembersCount)
                  .map((member, idx) => {
                    const memberNo = idx + 2;
                    return (
                      <div key={memberNo} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className={labelClass}>Member {memberNo} Name</label>
                          <input
                            type="text"
                            value={member.name}
                            onChange={(e) => updateMember(idx, 'name', e.target.value)}
                            placeholder={`Enter member ${memberNo} name`}
                            className={inputClass(`member_${memberNo}_name`)}
                            disabled={isEventClosed}
                          />
                          {errors[`member_${memberNo}_name`] && (
                            <p className="text-red-500 text-xs mt-1">{errors[`member_${memberNo}_name`]}</p>
                          )}
                        </div>
                        <div>
                          <label className={labelClass}>Member {memberNo} Contact Number</label>
                          <input
                            type="tel"
                            maxLength={10}
                            value={member.contact}
                            onChange={(e) => updateMember(idx, 'contact', e.target.value)}
                            placeholder={`Enter member ${memberNo} contact`}
                            className={inputClass(`member_${memberNo}_contact`)}
                            disabled={isEventClosed}
                          />
                          {errors[`member_${memberNo}_contact`] && (
                            <p className="text-red-500 text-xs mt-1">{errors[`member_${memberNo}_contact`]}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}

            <div>
              <label className={labelClass}>Upload Payment Screenshot</label>
              <label
                className={`flex items-center justify-center w-full rounded-xl border-2 border-dashed ${
                  errors.paymentScreenshot ? 'border-red-500' : 'border-white/20'
                } bg-black/20 cursor-pointer hover:border-red-500/60 transition-colors duration-200 py-8 px-4`}
              >
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/gif"
                  className="hidden"
                  onChange={(e) => update('paymentScreenshot', e.target.files?.[0] || null)}
                  disabled={isEventClosed}
                />
                <span className="text-gray-300 text-sm text-center">
                  {formData.paymentScreenshot
                    ? `Selected: ${formData.paymentScreenshot.name}`
                    : 'Click to upload payment screenshot'}
                </span>
              </label>
              {errors.paymentScreenshot && <p className="text-red-500 text-xs mt-1">{errors.paymentScreenshot}</p>}
            </div>

            <div>
              <label className={labelClass}>UPI Transaction ID</label>
              <input
                type="text"
                value={formData.transactionId}
                onChange={(e) => update('transactionId', e.target.value)}
                placeholder="Enter UPI transaction ID"
                className={`${inputClass('transactionId')} font-mono`}
                disabled={isEventClosed}
              />
              {errors.transactionId && <p className="text-red-500 text-xs mt-1">{errors.transactionId}</p>}
            </div>

            {errors.general && (
              <div className="border border-red-500/30 bg-red-500/5 rounded-xl p-3.5">
                <p className="text-red-400 text-sm">{errors.general}</p>
              </div>
            )}

            {!isEventClosed && (
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3.5 bg-linear-to-r from-red-700 to-red-600 text-white font-bold uppercase tracking-wider rounded-full hover:from-red-600 hover:to-red-500 hover:shadow-[0_0_28px_rgba(220,38,38,0.35)] hover:scale-[1.02] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Complete Registration'}
                </button>
              </div>
            )}
          </form>
        </section>

        <aside className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-[0_18px_40px_rgba(0,0,0,0.45),0_0_20px_rgba(220,38,38,0.1)]">
            <h2 className="text-white text-xl font-bold mb-4">Event Details</h2>
            <div className="space-y-3 text-sm sm:text-base">
              <p className="text-gray-300">
                <span className="text-red-400 font-medium">Event:</span> {formData.event || 'Select from form'}
              </p>
              <p className="text-gray-300">
                <span className="text-red-400 font-medium">Event Date:</span> {selectedEventMeta.date}
              </p>
              <p className="text-gray-300">
                <span className="text-red-400 font-medium">Team Size:</span> {selectedEventMeta.teamSize}
              </p>
              <p className="text-gray-300">
                <span className="text-red-400 font-medium">Registration Fee:</span> {selectedEventMeta.fee}
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 text-center shadow-[0_18px_40px_rgba(0,0,0,0.45),0_0_20px_rgba(220,38,38,0.1)]">
            <img
              src={resolveSrc(upiqrImg)}
              alt="UPI QR Code"
              className="w-full max-w-65 mx-auto rounded-xl shadow-[0_8px_20px_rgba(0,0,0,0.35)]"
            />
            <p className="text-gray-300 text-sm mt-4">
              Scan the QR code to complete the registration payment.
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Please keep a screenshot of the payment confirmation.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}

export default function RegistrationPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="relative">
        <div className="fixed inset-0 -z-10" style={{ background: 'linear-gradient(135deg, black, rgba(127,29,29,0.3) 50%, black)' }} />
        <div className="fixed inset-0 -z-10" style={{ background: 'radial-gradient(ellipse at top right, rgba(127,29,29,0.15), transparent 50%)' }} />
        <div className="fixed inset-0 -z-10" style={{ background: 'radial-gradient(ellipse at bottom left, rgba(153,27,27,0.1), transparent 50%)' }} />

        <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-32 text-center text-white font-mono text-sm">LOADING REGISTRATION...</div>}>
          <RegistrationFormContent />
        </Suspense>
      </div>

      <Footer />
    </div>
  );
}
