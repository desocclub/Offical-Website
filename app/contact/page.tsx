'use client';

import { useState } from 'react';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import { sendContactMessage } from '@/lib/api';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    if (!formData.subject) {
      setSubmitError('Please select an enquiry type.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await sendContactMessage(formData);
      if (!res.success) {
        throw new Error(res.error || res.message || 'Unable to send message. Please try again.');
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unable to send message. Please try again.';
      setSubmitError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-neutral-800 selection:text-white">
      {/* Existing Navbar preserved unchanged */}
      <Navbar />

      <main className="max-w-7xl mx-auto px-5 min-[360px]:px-6 sm:px-6 lg:px-8 pt-28 sm:pt-36 lg:pt-40 pb-16 sm:pb-24">
        {/* Large Lightweight Page Title */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-light tracking-tight text-white mb-14 sm:mb-20">
          Contact
        </h1>

        {/* Primary 3-Column / Editorial Contact Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Left Column: Let's Talk & Social Links */}
          <div className="lg:col-span-3 space-y-12">
            {/* LET'S TALK */}
            <div>
              <div className="flex items-center gap-2.5 text-xs uppercase tracking-[0.2em] text-neutral-400 font-medium mb-3">
                <span className="w-5 h-px bg-neutral-600 inline-block shrink-0" aria-hidden="true" />
                <span>LET'S TALK</span>
              </div>
              <div>
                <a
                  href="mailto:desoc.club@gmail.com"
                  className="inline-block text-white text-sm sm:text-base border-b border-neutral-700 hover:border-white pb-0.5 transition-colors duration-200"
                >
                  desoc.club@gmail.com
                </a>
              </div>
            </div>

            {/* FOLLOW */}
            <div>
              <div className="flex items-center gap-2.5 text-xs uppercase tracking-[0.2em] text-neutral-400 font-medium mb-4">
                <span className="w-5 h-px bg-neutral-600 inline-block shrink-0" aria-hidden="true" />
                <span>FOLLOW</span>
              </div>
              <div className="flex items-center gap-4">
                {/* Instagram */}
                <a
                  href="https://www.instagram.com/desoc.kkwieer/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-white transition-colors duration-200"
                  aria-label="DESOC Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/company/desoc-kkwieer/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-white transition-colors duration-200"
                  aria-label="DESOC LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Middle Column: Based In & Contact Team */}
          <div className="lg:col-span-4 space-y-10 sm:space-y-12">
            <div>
              <div className="flex items-center gap-2.5 text-xs uppercase tracking-[0.2em] text-neutral-400 font-medium mb-3">
                <span className="w-5 h-px bg-neutral-600 inline-block shrink-0" aria-hidden="true" />
                <span>BASED IN</span>
              </div>
              <address className="not-italic text-sm sm:text-[15px] text-neutral-300 leading-relaxed space-y-1">
                <p className="font-normal text-white">Department of Computer Science &amp; Design,</p>
                <p className="text-white">K. K. Wagh Institute of Engineering</p>
                <p className="text-white">Education &amp; Research,</p>
                <p className="text-neutral-400">Hirabai Haridas Vidyanagari,</p>
                <p className="text-neutral-400">Amrutdham, Panchavati,</p>
                <p className="text-neutral-400">Nashik — 422003, Maharashtra, India</p>
              </address>
            </div>

            {/* CONTACT TEAM */}
            <div>
              <div className="flex items-center gap-2.5 text-xs uppercase tracking-[0.2em] text-neutral-400 font-medium mb-4">
                <span className="w-5 h-px bg-neutral-600 inline-block shrink-0" aria-hidden="true" />
                <span>CONTACT TEAM</span>
              </div>

              <div className="space-y-4">
                {/* Shubham Chaudhari */}
                <div>
                  <h3 className="text-white font-medium text-sm sm:text-base">Shubham Chaudhari</h3>
                  <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">Technical Co-head</p>
                  <a
                    href="tel:+919146761423"
                    className="inline-block text-xs sm:text-sm text-neutral-300 hover:text-white transition-colors duration-200 mt-1"
                  >
                    +91 91467 61423
                  </a>
                </div>

                {/* Thin, subtle horizontal divider between the two contacts */}
                <div className="w-full h-px bg-neutral-900" aria-hidden="true" />

                {/* Yash Kedari */}
                <div>
                  <h3 className="text-white font-medium text-sm sm:text-base">Yash Kedari</h3>
                  <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">Vice President</p>
                  <a
                    href="tel:+919307430574"
                    className="inline-block text-xs sm:text-sm text-neutral-300 hover:text-white transition-colors duration-200 mt-1"
                  >
                    +91 93074 30574
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form with Underlined Fields */}
          <div className="lg:col-span-5 lg:border-l lg:border-neutral-900 lg:pl-10 xl:pl-14">
            {/* Header: SEND A MESSAGE */}
            <div className="mb-2">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-6 h-px bg-neutral-600 inline-block shrink-0" aria-hidden="true" />
                <span className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-medium shrink-0">
                  SEND A MESSAGE
                </span>
                <span className="flex-1 max-w-[96px] sm:max-w-36 h-px bg-neutral-800 inline-block" aria-hidden="true" />
              </div>
              <p className="text-xs sm:text-sm text-neutral-400">
                Fill out the form and we'll get back to you at the earliest.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-8 space-y-7">
              {/* Your Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs uppercase tracking-wider text-neutral-300 mb-1"
                >
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full bg-transparent border-0 border-b border-neutral-800 focus:border-white px-0 py-2.5 text-sm sm:text-base text-white placeholder:text-neutral-600 focus:outline-none transition-colors duration-200 rounded-none"
                />
              </div>

              {/* Email Address */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs uppercase tracking-wider text-neutral-300 mb-1"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className="w-full bg-transparent border-0 border-b border-neutral-800 focus:border-white px-0 py-2.5 text-sm sm:text-base text-white placeholder:text-neutral-600 focus:outline-none transition-colors duration-200 rounded-none"
                />
              </div>

              {/* Enquiry Type */}
              <div className="relative">
                <label
                  htmlFor="subject"
                  className="block text-xs uppercase tracking-wider text-neutral-300 mb-1"
                >
                  Enquiry Type *
                </label>
                <div className="relative">
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full bg-transparent border-0 border-b border-neutral-800 focus:border-white px-0 py-2.5 text-sm sm:text-base focus:outline-none transition-colors duration-200 appearance-none rounded-none cursor-pointer pr-8 ${
                      !formData.subject ? 'text-neutral-500' : 'text-white'
                    }`}
                  >
                    <option value="" disabled className="bg-neutral-950 text-neutral-500">
                      Select a topic
                    </option>
                    <option value="General Enquiry" className="bg-neutral-950 text-white">
                      General Enquiry
                    </option>
                    <option value="Event Collaboration" className="bg-neutral-950 text-white">
                      Event Collaboration
                    </option>
                    <option value="Sponsorship & Partnerships" className="bg-neutral-950 text-white">
                      Sponsorship &amp; Partnerships
                    </option>
                    <option value="Technical / Workshops" className="bg-neutral-950 text-white">
                      Technical / Workshops
                    </option>
                    <option value="Feedback & Suggestions" className="bg-neutral-950 text-white">
                      Feedback &amp; Suggestions
                    </option>
                  </select>
                  <svg
                    className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-xs uppercase tracking-wider text-neutral-300 mb-1"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  className="w-full bg-transparent border-0 border-b border-neutral-800 focus:border-white px-0 py-2.5 text-sm sm:text-base text-white placeholder:text-neutral-600 focus:outline-none transition-colors duration-200 rounded-none resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group inline-flex items-center gap-2 text-white hover:text-neutral-300 text-sm font-normal tracking-wide transition-colors duration-200 cursor-pointer disabled:opacity-50"
                >
                  <span className="text-base leading-none transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true">
                    ↳
                  </span>
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                </button>
              </div>

              {/* Status Notifications */}
              {submitted && (
                <div className="text-xs sm:text-sm text-neutral-300 flex items-center gap-2 pt-1">
                  <span className="text-emerald-400" aria-hidden="true">✓</span>
                  <span>Thank you! Your message has been sent successfully.</span>
                </div>
              )}

              {submitError && (
                <div className="text-xs sm:text-sm text-red-400 flex items-center gap-2 pt-1">
                  <span aria-hidden="true">✕</span>
                  <span>{submitError}</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Section: FIND US */}
        <div className="border-t border-neutral-900 mt-20 sm:mt-28 pt-8 sm:pt-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-4 sm:gap-8">
            <div className="flex items-center gap-2.5 text-xs uppercase tracking-[0.2em] text-neutral-400 font-medium shrink-0">
              <span className="w-5 h-px bg-neutral-600 inline-block shrink-0" aria-hidden="true" />
              <span>FIND US</span>
            </div>
            <div className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              <span className="text-white font-medium">K. K. Wagh Institute of Engineering Education &amp; Research</span>
              <span className="block text-neutral-400 mt-0.5">
                Hirabai Haridas Vidyanagari, Amrutdham, Panchavati, Nashik — 422003, Maharashtra, India
              </span>
            </div>
          </div>

          <a
            href="https://maps.app.goo.gl/r7BKRWWyDjJ2Emo97"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm text-white hover:text-neutral-300 font-medium transition-colors duration-200 shrink-0"
          >
            <span className="border-b border-transparent group-hover:border-neutral-400 pb-0.5 transition-colors">
              Get directions
            </span>
            <span
              className="text-sm transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            >
              ↗
            </span>
          </a>
        </div>

        {/* Responsive Google Maps */}
        <div className="relative w-full h-[300px] sm:h-[380px] md:h-auto md:aspect-[16/9] md:max-h-[520px] overflow-hidden mt-8 sm:mt-10 bg-black">
          {/* Google Maps Iframe */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3748.8790261307313!2d73.81968647500271!3d20.01359138139366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddebab15555555%3A0xdb01367e9d5cf969!2sK.K%20Wagh%20Institute%20Of%20Engineering%20Education%20and%20Research!5e0!3m2!1sen!2sin!4v1792436387966!5m2!1sen!2sin"
            title="Map showing K. K. Wagh Institute of Engineering Education & Research"
            className="w-full h-full border-0 [filter:grayscale(1)_invert(0.92)_contrast(0.85)]"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </main>

      {/* Existing Footer preserved, rendered in clean minimal mode without WebGL noise shaders */}
      <Footer showBlaze={false} />
    </div>
  );
}
