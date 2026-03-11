import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

/* ── Reusable glass card (defined outside to keep stable identity across re-renders) ── */
const GlassCard = ({ children, className = '', delay = 0, isLoaded = true }) => (
  <div
    className={`
      relative overflow-hidden rounded-2xl sm:rounded-3xl backdrop-blur-2xl border border-white/10
      p-4 sm:p-6 md:p-10
      transition-all duration-700 ease-out
      ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
      ${className}
    `}
    style={{
      transitionDelay: `${delay}ms`,
      background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
      boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
    }}
  >
    <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl" style={{ background: 'rgba(220,38,38,0.08)' }} />
    <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl" style={{ background: 'rgba(127,29,29,0.08)' }} />
    <div className="relative z-10">{children}</div>
  </div>
);

/* ── Section title with red accent bar ── */
const SectionTitle = ({ children, sub }) => (
  <div className="flex items-center mb-8 sm:mb-10">
    <div
      className="w-1 h-10 rounded-full mr-4 shrink-0"
      style={{ background: 'linear-gradient(to bottom, #ef4444, #b91c1c)', boxShadow: '0 0 10px rgba(220,38,38,0.5)' }}
    />
    <div>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-wide">{children}</h2>
      {sub && <p className="text-red-400 text-xs sm:text-sm mt-1 uppercase tracking-wider">{sub}</p>}
    </div>
  </div>
);

const ContactPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire up to backend / email service
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 4000);
  };

  const socials = [
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/desoc_kkwieer/',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/company/desoc-kkwieer/',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      name: 'GitHub',
      href: 'https://github.com/DESOC-CSD',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      ),
    },
    {
      name: 'Twitter / X',
      href: 'https://x.com/desoc_kkwieer',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* ===== Fixed background layers ===== */}
      <div className="relative">
        <div className="fixed inset-0 -z-10" style={{ background: 'linear-gradient(135deg, black, rgba(127,29,29,0.3) 50%, black)' }} />
        <div className="fixed inset-0 -z-10" style={{ background: 'radial-gradient(ellipse at top right, rgba(127,29,29,0.15), transparent 50%)' }} />
        <div className="fixed inset-0 -z-10" style={{ background: 'radial-gradient(ellipse at bottom left, rgba(153,27,27,0.1), transparent 50%)' }} />
        <div className="fixed inset-0 opacity-5 -z-10" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

        {/* ===== Main Content ===== */}
        <main className="relative px-4 sm:px-6 lg:px-8 pt-24 pb-16 max-w-7xl mx-auto">

          {/* ===== Page Header ===== */}
          <header className={`text-center mb-12 sm:mb-16 md:mb-20 transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
            <div className="relative inline-block">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-1 rounded-full" style={{ background: 'linear-gradient(to right, transparent, #ef4444, transparent)', boxShadow: '0 0 20px rgba(220,38,38,0.5)' }} />

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-4">
                Contact Us
              </h1>

              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="h-px w-12" style={{ background: 'linear-gradient(to right, transparent, #ef4444)' }} />
                <span className="text-red-400 text-lg sm:text-xl md:text-2xl font-light tracking-widest">Get in Touch</span>
                <div className="h-px w-12" style={{ background: 'linear-gradient(to left, transparent, #ef4444)' }} />
              </div>

              <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                Have a question, idea, or just want to say hello? Reach out to us through any of the channels below or fill out the contact form.
              </p>

              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-40 h-1 rounded-full" style={{ background: 'linear-gradient(to right, transparent, rgba(220,38,38,0.5), transparent)' }} />
            </div>
          </header>

          <div className="space-y-10 sm:space-y-14">

            {/* ==============================
                CONTACT INFO + FORM (2-col)
            ============================== */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10">

              {/* ── Left column: Info cards ── */}
              <div className="lg:col-span-2 space-y-6">

                {/* Department Address */}
                <GlassCard delay={100} isLoaded={isLoaded}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-red-600/15 border border-red-600/20 flex items-center justify-center shrink-0">
                      <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg mb-2">Department Address</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        Department of Computer Science &amp; Design,<br />
                        K. K. Wagh Institute of Engineering<br />
                        Education &amp; Research,<br />
                        Hirabai Haridas Vidyanagari,<br />
                        Amrutdham, Panchavati,<br />
                        Nashik — 422003, Maharashtra, India
                      </p>
                    </div>
                  </div>
                </GlassCard>

                {/* Official Email */}
                <GlassCard delay={200} isLoaded={isLoaded}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-red-600/15 border border-red-600/20 flex items-center justify-center shrink-0">
                      <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg mb-2">Official Email</h3>
                      <a
                        href="mailto:desoc@kkwagh.edu.in"
                        className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors duration-200 underline underline-offset-4 decoration-red-400/30 hover:decoration-red-300"
                      >
                        desoc@kkwagh.edu.in
                      </a>
                      <p className="text-gray-500 text-xs mt-2">We typically respond within 24–48 hours.</p>
                    </div>
                  </div>
                </GlassCard>

                {/* Phone */}
                <GlassCard delay={300} isLoaded={isLoaded}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-red-600/15 border border-red-600/20 flex items-center justify-center shrink-0">
                      <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg mb-2">Phone</h3>
                      <a
                        href="tel:+912532382084"
                        className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors duration-200"
                      >
                        +91 253 238 2084
                      </a>
                      <p className="text-gray-500 text-xs mt-2">Mon – Sat, 9:00 AM – 5:00 PM IST</p>
                    </div>
                  </div>
                </GlassCard>

                {/* Social Media */}
                <GlassCard delay={400} isLoaded={isLoaded}>
                  <h3 className="text-white font-bold text-lg mb-4">Follow Us</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {socials.map((s) => (
                      <a
                        key={s.name}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-white/5 hover:border-red-500/30 hover:bg-white/10 transition-all duration-300"
                      >
                        <span className="text-gray-400 group-hover:text-red-400 transition-colors duration-300">
                          {s.icon}
                        </span>
                        <span className="text-gray-300 text-sm font-medium group-hover:text-white transition-colors duration-300">
                          {s.name}
                        </span>
                      </a>
                    ))}
                  </div>
                </GlassCard>
              </div>

              {/* ── Right column: Contact Form ── */}
              <div className="lg:col-span-3">
                <GlassCard delay={200} isLoaded={isLoaded}>
                  <SectionTitle sub="We'd love to hear from you">Send a Message</SectionTitle>

                  {submitted && (
                    <div className="mb-6 p-4 rounded-xl border border-green-500/30 bg-green-500/10 text-green-400 text-sm flex items-center gap-3">
                      <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Thank you! Your message has been sent successfully.
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name & Email row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className="block text-gray-400 text-xs uppercase tracking-wider mb-2 font-medium">
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/30 transition-all duration-300"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-gray-400 text-xs uppercase tracking-wider mb-2 font-medium">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/30 transition-all duration-300"
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label htmlFor="subject" className="block text-gray-400 text-xs uppercase tracking-wider mb-2 font-medium">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="How can we help?"
                        className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/30 transition-all duration-300"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-gray-400 text-xs uppercase tracking-wider mb-2 font-medium">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Write your message here..."
                        className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/30 transition-all duration-300 resize-none"
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-8 py-3.5 bg-linear-to-r from-red-700 to-red-600 text-white font-bold uppercase tracking-wider rounded-full hover:from-red-600 hover:to-red-500 transition-all duration-300 hover:scale-105"
                      style={{ boxShadow: '0 0 30px rgba(220,38,38,0.25)' }}
                    >
                      Send Message
                    </button>
                  </form>
                </GlassCard>
              </div>
            </div>

            {/* ==============================
                MAP EMBED (optional visual)
            ============================== */}
            <GlassCard delay={500} isLoaded={isLoaded}>
              <SectionTitle sub="K. K. Wagh Institute, Nashik">Find Us</SectionTitle>
              <div className="rounded-2xl overflow-hidden border border-white/10 aspect-video sm:aspect-21/9">
                <iframe
                  title="Department Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3748.5!2d73.7867!3d20.0063!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddeba056c1e643%3A0x46d5a4e4b9e6f0b!2sK.%20K.%20Wagh%20Institute%20of%20Engineering%20Education%20and%20Research!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin"
                  className="w-full h-full border-0 grayscale invert opacity-80"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </GlassCard>

          </div>

          {/* Bottom decoration */}
          <div className={`mt-16 sm:mt-20 flex justify-center transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '1000ms' }}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-600" style={{ boxShadow: '0 0 10px rgba(220,38,38,0.8)' }} />
              <div className="w-16 h-px" style={{ background: 'linear-gradient(to right, #dc2626, transparent)' }} />
              <span className="text-gray-500 text-sm uppercase tracking-widest">DESOC — KKWIEER</span>
              <div className="w-16 h-px" style={{ background: 'linear-gradient(to left, #dc2626, transparent)' }} />
              <div className="w-2 h-2 rounded-full bg-red-600" style={{ boxShadow: '0 0 10px rgba(220,38,38,0.8)' }} />
            </div>
          </div>

        </main>
      </div>

      <Footer />
    </div>
  );
};

export default ContactPage;
