import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const EVENTS = [
  'Hackathon',
  'Paper Presentation',
  'UI/UX Challenge',
  'Technical Quiz',
  'Coding Contest',
];

const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

const STEP_LABELS = ['Personal Details', 'Team Details', 'Payment'];

const REGISTRATION_RULES = [
  { bold: 'One registration per email/phone number', rest: ' – Each person can only register once' },
  { bold: 'Unique UPI Transaction ID', rest: ' – Each payment must have a different transaction ID' },
  { bold: 'Team size: 2–4 members', rest: ' (1 group leader + remaining member(s))' },
  { bold: 'College name required', rest: ' for all team members' },
  { bold: 'Registration fee: ₹ TBD per team', rest: ' (Non-refundable)' },
];

const RegistrationPage = () => {
  const [searchParams] = useSearchParams();
  const preSelectedEvent = searchParams.get('event') || '';

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    year: '',
    leaderName: '',
    leaderCollege: '',
    members: [
      { name: '', college: '' },
      { name: '', college: '' },
      { name: '', college: '' },
    ],
    event: preSelectedEvent,
    paymentScreenshot: null,
    transactionId: '',
  });

  const update = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const updateMember = (index, subField, value) => {
    const members = formData.members.map((m, i) =>
      i === index ? { ...m, [subField]: value } : m
    );
    setFormData((prev) => ({ ...prev, members }));
    const key = `member_${index}_${subField}`;
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (step) => {
    const e = {};
    if (step === 1) {
      if (!formData.fullName.trim()) e.fullName = 'Full name is required';
      if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
        e.email = 'Valid email address is required';
      if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone.replace(/\s/g, '')))
        e.phone = 'Valid 10-digit phone number is required';
      if (!formData.year) e.year = 'Academic year is required';
    } else if (step === 2) {
      if (!formData.event) e.event = 'Please select an event';
      if (!formData.leaderName.trim()) e.leaderName = 'Group leader name is required';
      if (!formData.leaderCollege.trim()) e.leaderCollege = 'Group leader college is required';
      formData.members.forEach((m, i) => {
        if (!m.name.trim()) e[`member_${i}_name`] = 'Member name is required';
        if (!m.college.trim()) e[`member_${i}_college`] = 'Member college is required';
      });
    } else if (step === 3) {
      if (!formData.paymentScreenshot) e.paymentScreenshot = 'Payment screenshot is required';
      if (!formData.transactionId.trim()) e.transactionId = 'UPI Transaction ID is required';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const nextStep = () => { if (validate(currentStep)) setCurrentStep((s) => s + 1); };
  const prevStep = () => setCurrentStep((s) => s - 1);

  const handleSubmit = async () => {
    if (!validate(3)) return;
    setIsSubmitting(true);
    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([k, v]) => {
        if (k === 'paymentScreenshot' && v) payload.append(k, v);
        else if (k === 'members') payload.append(k, JSON.stringify(v));
        else if (v !== null && v !== undefined) payload.append(k, v);
      });
      const res = await fetch(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/genesis/register`,
        { method: 'POST', body: payload }
      );
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

  const inp = (field) =>
    `w-full bg-[#1a1a2e]/60 border ${
      errors[field] ? 'border-red-500' : 'border-white/10'
    } rounded-lg px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-red-500/60 transition-colors duration-200`;

  // ── Persistent right sidebar ──────────────────────────────────────────────
  const Sidebar = () => (
    <div className="space-y-5">
      <div className="bg-[#0d0d1a]/80 border border-white/10 rounded-xl p-5">
        <h4 className="text-white font-bold text-base mb-4">Payment Information</h4>

        {/* QR code placeholder */}
        <div className="bg-white rounded-xl p-3 mx-auto w-36 h-36 flex items-center justify-center mb-3">
          <div className="grid grid-cols-5 grid-rows-5 gap-0.5 w-full h-full">
            {[...Array(25)].map((_, i) => (
              <div
                key={i}
                className={`rounded-sm ${
                  [0,1,2,3,4,5,9,10,14,15,19,20,21,22,23,24].includes(i)
                    ? 'bg-gray-900'
                    : 'bg-white'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="text-center space-y-1 mb-4">
          <p className="text-red-400 font-bold text-sm">Scan QR Code to Pay</p>
          <p className="text-gray-300 text-xs">
            <span className="font-semibold">Registration Fee:</span> ₹ TBD per team
          </p>
          <p className="text-gray-400 text-xs">
            <span className="font-semibold">UPI ID:</span> desoc@upi
          </p>
          <p className="text-gray-400 text-xs">
            <span className="font-semibold">Account:</span> Design Society, KKWIEER
          </p>
        </div>

        {/* Event details */}
        <div className="border-t border-white/8 pt-4 mb-4">
          <p className="text-red-400 font-bold text-xs uppercase tracking-wider mb-3">Event Details</p>
          <div className="space-y-2">
            {[
              { icon: '📅', label: 'Date: TBD' },
              { icon: '🕐', label: 'Time: TBD' },
              { icon: '📍', label: 'Venue: TBD' },
              { icon: '👥', label: 'Team Size: 2–4 Members' },
            ].map((d) => (
              <div key={d.label} className="flex items-center gap-2">
                <span className="text-sm">{d.icon}</span>
                <span className="text-gray-300 text-xs">{d.label}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );

  // ── Success screen ──────────────────────────────────────────────────────────
  if (isSubmitted) {
    return (
      <div className="bg-[#0a0a14] min-h-screen font-roboto-condensed">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
          <div className="w-24 h-24 rounded-full bg-green-500/10 border-2 border-green-500/40 flex items-center justify-center mb-8">
            <svg className="w-12 h-12 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-white text-4xl font-black uppercase tracking-wider mb-4">Registration Complete!</h2>
          <p className="text-gray-400 text-sm mb-2">
            Thank you, <span className="text-white font-semibold">{formData.fullName}</span>
          </p>
          <p className="text-gray-400 text-sm mb-2">
            Event: <span className="text-white font-semibold">{formData.event || 'Genesis'}</span>
          </p>
          <p className="text-gray-500 text-xs mt-4 mb-10">
            A confirmation email will be sent to <span className="text-gray-300">{formData.email}</span> within 24 hours.
          </p>
          <Link
            to="/genesis"
            className="px-8 py-3 bg-gradient-to-r from-[#7a0000] to-[#b00000] text-white font-bold uppercase tracking-wider rounded-sm hover:from-[#9a0000] hover:to-[#cc0000] transition-all duration-300"
          >
            Back to Genesis
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // ── Main form ───────────────────────────────────────────────────────────────
  return (
    <div className="bg-[#0a0a14] min-h-screen font-roboto-condensed">
      <Navbar />

      {/* Top bar */}
      <div className="border-b border-white/5 px-6 py-3 flex items-center justify-between">
        <Link
          to="/genesis"
          className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors duration-200"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Genesis
        </Link>
        <span className="text-gray-600 text-xs uppercase tracking-wider">Design Society</span>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">

        {/* Page header */}
        <div className="text-center mb-8">
          <h1 className="text-white font-black text-4xl md:text-5xl mb-2">Genesis</h1>
          <p className="text-gray-400 text-base tracking-wide">Event Registration</p>
        </div>

        {/* Registration rules banner */}
        <div className="border border-blue-500/20 bg-blue-500/5 rounded-xl px-6 py-4 mb-8 max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-4 h-4 text-blue-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 110 20A10 10 0 0112 2z" />
            </svg>
            <span className="text-blue-400 font-bold text-sm uppercase tracking-wider">Registration Rules</span>
          </div>
          <div className="space-y-1">
            {REGISTRATION_RULES.map((rule, i) => (
              <p key={i} className="text-gray-300 text-xs">
                • <span className="font-semibold text-white">{rule.bold}</span>{rule.rest}
              </p>
            ))}
          </div>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center mb-10">
          {STEP_LABELS.map((label, i) => {
            const step = i + 1;
            const active = step === currentStep;
            const done = step < currentStep;
            return (
              <div key={step} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                      done
                        ? 'bg-red-600 text-white'
                        : active
                        ? 'bg-red-600 text-white ring-4 ring-red-600/30'
                        : 'bg-[#1a1a2e] border-2 border-white/15 text-gray-500'
                    }`}
                  >
                    {done ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      step
                    )}
                  </div>
                  <span className={`text-xs mt-1 hidden sm:block ${active ? 'text-white' : done ? 'text-red-400' : 'text-gray-600'}`}>
                    {label}
                  </span>
                </div>
                {i < STEP_LABELS.length - 1 && (
                  <div
                    className={`w-16 sm:w-28 h-0.5 mx-2 mb-4 transition-all duration-500 ${
                      done ? 'bg-red-600' : 'bg-white/10'
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">

          {/* LEFT: Form panel */}
          <div className="bg-[#0d0d1a]/80 border border-white/10 rounded-xl p-6 md:p-8">

            {/* Step 1: Personal Details */}
            {currentStep === 1 && (
              <div>
                <div className="flex items-center gap-3 mb-7 pb-4 border-b border-white/8">
                  <span className="text-red-400 text-xl">👤</span>
                  <h3 className="text-white font-bold text-xl">Personal Details</h3>
                </div>
                <div className="space-y-5">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Full Name *</label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => update('fullName', e.target.value)}
                      placeholder="Enter your full name"
                      className={inp('fullName')}
                    />
                    {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Email Address *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => update('email', e.target.value)}
                      placeholder="your.email@example.com"
                      className={inp('email')}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => update('phone', e.target.value)}
                      placeholder="9876543210"
                      maxLength={10}
                      className={inp('phone')}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Academic Year *</label>
                    <div className="relative">
                      <select
                        value={formData.year}
                        onChange={(e) => update('year', e.target.value)}
                        className={`${inp('year')} appearance-none ${formData.year ? 'text-white' : 'text-gray-500'}`}
                      >
                        <option value="" disabled className="bg-[#0d0d1a]">Select your year</option>
                        {YEARS.map((y) => (
                          <option key={y} value={y} className="bg-[#0d0d1a] text-white">{y}</option>
                        ))}
                      </select>
                      <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    {errors.year && <p className="text-red-500 text-xs mt-1">{errors.year}</p>}
                  </div>
                </div>

                <div className="flex justify-end mt-8">
                  <button
                    onClick={nextStep}
                    className="px-8 py-3 bg-gradient-to-r from-[#7a0000] to-[#b00000] text-white font-bold uppercase tracking-wider rounded-lg hover:from-[#9a0000] hover:to-[#cc0000] transition-all duration-300"
                  >
                    Next Step
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Team Details */}
            {currentStep === 2 && (
              <div>
                <div className="flex items-center gap-3 mb-7 pb-4 border-b border-white/8">
                  <span className="text-red-400 text-xl">👥</span>
                  <h3 className="text-white font-bold text-xl">Team Details</h3>
                </div>
                <div className="space-y-5">

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Event *</label>
                    <div className="relative">
                      <select
                        value={formData.event}
                        onChange={(e) => update('event', e.target.value)}
                        className={`${inp('event')} appearance-none ${formData.event ? 'text-white' : 'text-gray-500'}`}
                      >
                        <option value="" disabled className="bg-[#0d0d1a]">Select an event</option>
                        {EVENTS.map((ev) => (
                          <option key={ev} value={ev} className="bg-[#0d0d1a] text-white">{ev}</option>
                        ))}
                      </select>
                      <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    {errors.event && <p className="text-red-500 text-xs mt-1">{errors.event}</p>}
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Group Leader Name *</label>
                    <input
                      type="text"
                      value={formData.leaderName}
                      onChange={(e) => update('leaderName', e.target.value)}
                      placeholder="Enter group leader name"
                      className={inp('leaderName')}
                    />
                    {errors.leaderName && <p className="text-red-500 text-xs mt-1">{errors.leaderName}</p>}
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Group Leader College *</label>
                    <input
                      type="text"
                      value={formData.leaderCollege}
                      onChange={(e) => update('leaderCollege', e.target.value)}
                      placeholder="Enter group leader college name"
                      className={inp('leaderCollege')}
                    />
                    {errors.leaderCollege && <p className="text-red-500 text-xs mt-1">{errors.leaderCollege}</p>}
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-3">
                      Group Members * <span className="text-gray-500 font-normal text-xs">(up to 4 members including leader)</span>
                    </label>
                    <div className="space-y-3">
                      {formData.members.map((member, i) => (
                        <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <input
                              type="text"
                              value={member.name}
                              onChange={(e) => updateMember(i, 'name', e.target.value)}
                              placeholder={`Member ${i + 1} name`}
                              className={`w-full bg-[#1a1a2e]/60 border ${
                                errors[`member_${i}_name`] ? 'border-red-500' : 'border-white/10'
                              } rounded-lg px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-red-500/60 transition-colors duration-200`}
                            />
                            {errors[`member_${i}_name`] && (
                              <p className="text-red-500 text-xs mt-1">{errors[`member_${i}_name`]}</p>
                            )}
                          </div>
                          <div>
                            <input
                              type="text"
                              value={member.college}
                              onChange={(e) => updateMember(i, 'college', e.target.value)}
                              placeholder={`Member ${i + 1} college`}
                              className={`w-full bg-[#1a1a2e]/60 border ${
                                errors[`member_${i}_college`] ? 'border-red-500' : 'border-white/10'
                              } rounded-lg px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-red-500/60 transition-colors duration-200`}
                            />
                            {errors[`member_${i}_college`] && (
                              <p className="text-red-500 text-xs mt-1">{errors[`member_${i}_college`]}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-8">
                  <button
                    onClick={prevStep}
                    className="px-6 py-3 bg-[#1a1a2e] border border-white/15 text-gray-300 font-bold uppercase tracking-wider rounded-lg hover:border-white/30 hover:text-white transition-all duration-200"
                  >
                    Previous
                  </button>
                  <button
                    onClick={nextStep}
                    className="px-8 py-3 bg-gradient-to-r from-[#7a0000] to-[#b00000] text-white font-bold uppercase tracking-wider rounded-lg hover:from-[#9a0000] hover:to-[#cc0000] transition-all duration-300"
                  >
                    Next Step
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Payment Confirmation */}
            {currentStep === 3 && (
              <div>
                <div className="flex items-center gap-3 mb-7 pb-4 border-b border-white/8">
                  <span className="text-red-400 text-xl">💳</span>
                  <h3 className="text-white font-bold text-xl">Payment Confirmation</h3>
                </div>
                <div className="space-y-5">

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Upload Payment Screenshot *</label>
                    <label
                      className={`flex flex-col items-center justify-center w-full rounded-xl border-2 border-dashed ${
                        errors.paymentScreenshot ? 'border-red-500' : 'border-white/15'
                      } bg-[#1a1a2e]/40 cursor-pointer hover:border-red-500/40 transition-colors duration-200 py-10 px-4`}
                    >
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/gif"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          update('paymentScreenshot', file);
                        }}
                      />
                      {formData.paymentScreenshot ? (
                        <div className="text-center">
                          <svg className="w-8 h-8 text-green-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          <p className="text-green-400 text-sm font-medium">{formData.paymentScreenshot.name}</p>
                          <p className="text-gray-500 text-xs mt-1">Click to replace</p>
                        </div>
                      ) : (
                        <div className="text-center">
                          <svg className="w-8 h-8 text-gray-500 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5V19a1 1 0 001 1h16a1 1 0 001-1v-2.5M12 3v13m-4-4l4 4 4-4" />
                          </svg>
                          <p className="text-gray-300 text-sm font-medium">Click to upload payment screenshot</p>
                          <p className="text-gray-500 text-xs mt-1">Supported formats: JPG, PNG, GIF (Max 5MB)</p>
                        </div>
                      )}
                    </label>
                    {errors.paymentScreenshot && (
                      <p className="text-red-500 text-xs mt-1">{errors.paymentScreenshot}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">UPI Transaction ID *</label>
                    <input
                      type="text"
                      value={formData.transactionId}
                      onChange={(e) => update('transactionId', e.target.value)}
                      placeholder="Enter UPI transaction ID"
                      className={`${inp('transactionId')} font-mono`}
                    />
                    {errors.transactionId && (
                      <p className="text-red-500 text-xs mt-1">{errors.transactionId}</p>
                    )}
                  </div>

                  <div className="border border-blue-500/20 bg-blue-500/5 rounded-lg p-4">
                    <p className="text-blue-200/80 text-sm leading-relaxed">
                      <span className="font-semibold">Note:</span> Ensure you upload a clear screenshot of your payment.
                      The transaction ID must match the one in your screenshot.
                    </p>
                  </div>
                </div>

                {errors.general && (
                  <div className="mt-6 border border-red-500/30 bg-red-500/5 rounded-lg p-3">
                    <p className="text-red-400 text-sm">{errors.general}</p>
                  </div>
                )}

                <div className="flex items-center justify-between mt-6">
                  <button
                    onClick={prevStep}
                    className="px-6 py-3 bg-[#1a1a2e] border border-white/15 text-gray-300 font-bold uppercase tracking-wider rounded-lg hover:border-white/30 hover:text-white transition-all duration-200"
                  >
                    Previous
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-gradient-to-r from-[#7a0000] to-[#b00000] text-white font-bold uppercase tracking-wider rounded-lg hover:from-[#9a0000] hover:to-[#cc0000] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Registration'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Persistent sidebar */}
          <div className="lg:sticky lg:top-24">
            <Sidebar />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RegistrationPage;
