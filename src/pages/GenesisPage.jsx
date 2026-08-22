import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import sharkverseFlyer from '../assets/genesis/sharkverse.jpeg';
import bidAndBuildFlyer from '../assets/genesis/bidnbuild.jpeg';
import escapeFlyer from '../assets/genesis/escape.jpeg';

const highlights = [
  { icon: '🏆', title: 'Cash Prizes', text: 'Cash prizes & merit certificates for top performers across all events' },
  { icon: '🤝', title: 'Networking', text: 'Network with students and innovators from colleges across the region' },
  { icon: '💡', title: 'Real-World Exposure', text: 'Hands-on exposure to real-world problem solving and design thinking' },
  { icon: '🎓', title: 'Certificates', text: 'Participation certificates issued to every registered student' },
  { icon: '🚀', title: 'Industry Aligned', text: 'Competitions aligned with cutting-edge industry domains and trends' },
  { icon: '📢', title: 'Showcase Platform', text: 'Platform to showcase your work to faculty and industry professionals' },
];

const schedule = [
  {
    day: 'Day 1',
    date: 'TBD',
    slots: [
      { time: 'TBD', event: 'To Be Announced' },
      { time: 'TBD', event: 'To Be Announced' },
      { time: 'TBD', event: 'To Be Announced' },
      { time: 'TBD', event: 'To Be Announced' },
      { time: 'TBD', event: 'To Be Announced' },
    ],
  },
  {
    day: 'Day 2',
    date: 'TBD',
    slots: [
      { time: 'TBD', event: 'To Be Announced' },
      { time: 'TBD', event: 'To Be Announced' },
      { time: 'TBD', event: 'To Be Announced' },
      { time: 'TBD', event: 'To Be Announced' },
      { time: 'TBD', event: 'To Be Announced' },
    ],
  },
];

const faqs = [
  {
    q: 'Who is eligible to participate?',
    a: 'Any undergraduate student from any college can participate in Genesis. A valid student ID is required during registration.',
  },
  {
    q: 'What is the team size?',
    a: "Team sizes vary per event. The Hackathon allows teams of 2–4. Individual events are solo. Technical Quiz allows pairs. Check each event's rules for specifics.",
  },
  {
    q: 'Is there a registration fee?',
    a: 'Yes, a nominal registration fee applies. The exact amount will be confirmed shortly. Payment is accepted via UPI.',
  },
  {
    q: 'Can I participate in multiple events?',
    a: 'Yes! You can register for more than one event as long as the schedules do not conflict.',
  },
  {
    q: 'Will certificates be provided?',
    a: 'Participation certificates will be issued to all registered participants. Winners will receive merit certificates along with prizes.',
  },
  {
    q: 'When will I receive confirmation after registering?',
    a: 'A confirmation email will be sent within 24 hours of a successful payment verification.',
  },
];

const majorEvents = [
  {
    key: 'sharkverse',
    title: 'Sharkverse',
    tagline: 'Pitch. Persuade. Prosper.',
    image: sharkverseFlyer,
    imageAlt: 'Sharkverse Flyer',
    description:
      'Enter Sharkverse and pitch your startup vision to a panel of evaluators. Present your idea, defend your business model, and compete to prove why your concept deserves the spotlight.',
    registerEvent: 'Sharkverse',
    urgencyBadge: 'Registrations Closed',
    floatingLabel: '❌ Closed',
    registrationsClosed: true,
    learnMoreTo: '/genesis/events/sharkverse',
  },
  {
    key: 'bid-and-build',
    title: 'Bid & Build',
    tagline: 'Bid Smart. Design Bold.',
    image: bidAndBuildFlyer,
    imageAlt: 'Bid & Build Flyer',
    description:
      'A strategy-first design showdown where teams bid with virtual coins for assets and then craft a high-impact solution under time pressure.',
    registerEvent: 'Bid & Build',
    urgencyBadge: 'Registrations Closed',
    floatingLabel: '❌ Closed',
    registrationsClosed: true,
    learnMoreTo: '/genesis/events/bid-and-build',
  },
  {
    key: 'escape-the-matrix',
    title: 'Escape The Matrix',
    tagline: 'Crack the code. Break free.',
    image: escapeFlyer,
    imageAlt: 'Escape The Matrix Flyer',
    description:
      'A fast-paced treasure hunt + escape room hybrid where your team solves connected challenges, unlocks hidden locations, and races to break out of the Matrix simulation.',
    registerEvent: 'Escape The Matrix',
    urgencyBadge: 'Registrations Closed',
    floatingLabel: '❌ Closed',
    registrationsClosed: true,
    learnMoreTo: '/genesis/events/escape-the-matrix',
  },
];

const GenesisPage = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    window.scrollTo(0, 0);
  }, []);

  /* ── Reusable glass card ── */
  const GlassCard = ({ children, className = '', delay = 0 }) => (
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
        <main className="relative px-4 sm:px-6 lg:px-8 pt-36 pb-16 max-w-7xl mx-auto">

          {/* ==============================
              HERO
          ============================== */}
          <header className={`text-center mb-12 sm:mb-16 md:mb-20 transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
            <div className="relative inline-block">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-1.5 mb-6">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-red-400 text-xs font-semibold uppercase tracking-widest">Flagship Technical Event</span>
              </div>

              {/* Title */}
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white uppercase leading-none mb-4 tracking-tight" style={{ textShadow: '0 0 80px rgba(220,38,38,0.3)' }}>
                GENESIS
              </h1>

              {/* Subtitle */}
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px w-12" style={{ background: 'linear-gradient(to right, transparent, #ef4444)' }} />
                <span className="text-red-400 text-lg sm:text-xl md:text-2xl font-light tracking-widest">Design &amp; Innovation Showcase</span>
                <div className="h-px w-12" style={{ background: 'linear-gradient(to left, transparent, #ef4444)' }} />
              </div>

              {/* Organizer */}
              <p className="text-gray-500 text-sm mb-8">
                Organized by <span className="text-red-400 font-semibold">Design Society</span> · Department of Computer Science &amp; Design
              </p>

              {/* Description glass box */}
              <div className="max-w-3xl mx-auto backdrop-blur-xl border border-white/10 rounded-2xl p-5 sm:p-8 mb-10 text-left" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)' }}>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Genesis is the flagship technical event of the Design Society, Department of Computer Science &amp; Design.
                  It is designed to be a high-energy platform that blends innovation, coding excellence, design thinking, and
                  collaborative problem-solving. Genesis brings together competitive technical events and creative challenges
                  to ensure both intellectual depth and wide campus participation.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {/* <button
                  type="button"
                  disabled
                  className="px-8 sm:px-10 py-3.5 bg-gray-700/60 text-gray-200 font-bold uppercase tracking-wider rounded-full cursor-not-allowed border border-gray-500/50"
                >
                  Registrations Closed
                </button> */}
                <a
                  href="#events"
                  className="px-8 sm:px-10 py-3.5 border border-white/15 text-gray-300 font-bold uppercase tracking-wider rounded-full hover:border-red-500/40 hover:text-red-400 transition-all duration-300"
                >
                  View Events
                </a>
              </div>
            </div>
          </header>

          <div className="space-y-10 sm:space-y-14">

            {/* ==============================
                MAJOR EVENTS
            ============================== */}
            <GlassCard delay={100} id="events">
              <div id="events" />
              <SectionTitle sub="Under Genesis">Major Events</SectionTitle>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-10 sm:mt-12 mb-8 sm:mb-10">
                {majorEvents.map((event) => (
                  <article
                    key={event.key}
                    className="fomo-glow-card group relative p-6 sm:p-8 rounded-2xl border border-white/10 bg-white/4 backdrop-blur-xl shadow-[0_22px_55px_rgba(0,0,0,0.45),0_0_24px_rgba(220,38,38,0.12)] transition-all duration-300 hover:-translate-y-1 hover:border-red-500/30 hover:shadow-[0_26px_60px_rgba(0,0,0,0.55),0_0_28px_rgba(220,38,38,0.25)]"
                  >
                    {event.floatingLabel && (
                      <span
                        className={`absolute right-4 top-4 z-10 rounded-full px-3 py-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.13em] backdrop-blur-md border ${
                          event.registrationsClosed
                            ? 'border-gray-500/50 bg-gray-900/70 text-gray-200'
                            : 'border-red-300/45 bg-black/65 text-red-100'
                        }`}
                      >
                        {event.floatingLabel}
                      </span>
                    )}

                    <img
                      src={event.image}
                      alt={event.imageAlt}
                      className="w-full h-auto rounded-xl mb-5"
                      loading="lazy"
                    />

                    <h3 className="text-white text-xl sm:text-2xl font-bold text-center tracking-wide">{event.title}</h3>
                    {event.tagline && (
                      <p className="text-red-300 text-center text-sm sm:text-base font-medium mt-1 mb-4">{event.tagline}</p>
                    )}

                    <div className="flex justify-center mb-4">
                      <span
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[11px] sm:text-xs font-semibold uppercase tracking-[0.16em] ${
                          event.registrationsClosed
                            ? 'border-gray-500/50 bg-gray-800/60 text-gray-200'
                            : 'border-red-400/35 bg-red-500/12 text-red-300'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            event.registrationsClosed ? 'bg-gray-400' : 'bg-red-400 animate-pulse'
                          }`}
                        />
                        {event.urgencyBadge}
                      </span>
                    </div>

                    <p
                      className="mx-auto max-w-175 text-center text-gray-400 text-sm sm:text-base leading-relaxed mb-6"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {event.description}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      {event.registrationsClosed ? (
                        <div className="flex flex-col items-center gap-2">
                          <button
                            type="button"
                            disabled
                            className="px-6 py-2.5 bg-gray-600/60 text-gray-200 text-sm font-bold uppercase tracking-wider rounded-full cursor-not-allowed border border-gray-500/50"
                          >
                            Registrations Closed
                          </button>
                          <p className="text-xs text-gray-400 tracking-wide">Stay tuned for more events!</p>
                        </div>
                      ) : (
                        <Link
                          to={`/genesis/register?event=${encodeURIComponent(event.registerEvent)}`}
                          className="fomo-register-btn px-6 py-2.5 bg-linear-to-r from-red-700 to-red-600 text-white text-sm font-bold uppercase tracking-wider rounded-full hover:from-red-600 hover:to-red-500 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_28px_rgba(220,38,38,0.35)]"
                        >
                          Register Now
                        </Link>
                      )}
                      {event.key === 'bid-and-build' && !event.registrationsClosed ? (
                        <Link
                          to="/bid-and-build"
                          className="inline-flex items-center justify-center gap-1.5 px-6 py-2.5 border border-amber-400/55 text-amber-200 text-sm font-bold uppercase tracking-wider rounded-full hover:bg-amber-500/10 hover:text-amber-100 hover:scale-105 transition-all duration-300"
                        >
                          Enter Event
                        </Link>
                      ) : null}
                      <Link
                        to={event.learnMoreTo}
                        className="inline-flex items-center justify-center gap-1.5 px-6 py-2.5 border border-red-500/40 text-red-300 text-sm font-medium uppercase tracking-wider rounded-full hover:bg-red-500/10 hover:text-red-200 hover:border-red-400/55 hover:scale-105 transition-all duration-300"
                      >
                        Learn More
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>

            </GlassCard>

            {/* ==============================
                WHY ATTEND
            ============================== */}
            <GlassCard delay={200}>
              <div id="why-attend" />
              <SectionTitle sub="Reasons to be part of the experience">Why Attend Genesis?</SectionTitle>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {highlights.map((h, i) => (
                  <div
                    key={i}
                    className="group flex items-start gap-4 p-4 sm:p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-red-500/30 hover:bg-white/8 transition-all duration-500"
                  >
                    <span className="text-3xl shrink-0 group-hover:scale-110 transition-transform duration-300">{h.icon}</span>
                    <div>
                      <h4 className="text-white font-semibold text-sm mb-1">{h.title}</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">{h.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* ==============================
                SCHEDULE
            ============================== */}
            <GlassCard delay={300}>
              <SectionTitle sub="Two days of back-to-back tech">Schedule</SectionTitle>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                {schedule.map((day) => (
                  <div key={day.day} className="p-4 sm:p-6 rounded-2xl border border-white/10 bg-white/5">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="px-4 py-1.5 bg-linear-to-r from-red-700 to-red-600 text-white text-sm font-bold uppercase tracking-wider rounded-full" style={{ boxShadow: '0 0 15px rgba(220,38,38,0.3)' }}>
                        {day.day}
                      </div>
                      <span className="text-gray-500 text-sm uppercase tracking-wider">{day.date}</span>
                    </div>

                    <div className="relative pl-6 border-l-2 border-red-900/40">
                      {day.slots.map((slot, i) => (
                        <div key={i} className="relative mb-6 last:mb-0 group">
                          <div className="absolute -left-[1.55rem] top-1 w-3 h-3 rounded-full bg-red-600 border-2 border-black group-hover:scale-125 transition-transform duration-300" style={{ boxShadow: '0 0 8px rgba(220,38,38,0.5)' }} />
                          <p className="text-red-400 text-xs font-semibold uppercase tracking-wider mb-1">{slot.time}</p>
                          <p className="text-gray-200 text-sm">{slot.event}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* ==============================
                FAQs
            ============================== */}
            <GlassCard delay={400}>
              <SectionTitle sub="Got questions? We've got answers.">FAQs</SectionTitle>

              <div className="space-y-3 max-w-3xl">
                {faqs.map((faq, i) => (
                  <div
                    key={i}
                    className={`rounded-2xl border overflow-hidden transition-all duration-300 ${openFaq === i ? 'border-red-500/30 bg-white/6' : 'border-white/10 bg-white/3 hover:border-white/20'}`}
                  >
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenFaq(openFaq === i ? null : i);
                      }}
                      className="w-full flex items-center justify-between px-5 sm:px-6 py-4 text-left transition-all duration-200"
                    >
                      <span className="text-gray-200 text-sm sm:text-base pr-4 font-medium">{faq.q}</span>
                      <span
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                          openFaq === i ? 'bg-red-600 rotate-45' : 'bg-white/10'
                        }`}
                      >
                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                      </span>
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-40' : 'max-h-0'}`}>
                      <p className="px-5 sm:px-6 pb-5 text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* ==============================
                CLOSING CTA
            ============================== */}
            {/* <GlassCard delay={500}>
              <div className="text-center py-4 sm:py-8">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">Ready to Compete?</h2>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mb-8">
                  Genesis is designed not just as a college fest, but as a structured innovation platform that
                  encourages creativity, technical excellence, and real-world problem-solving. Every participant
                  gets a chance to grow, collaborate, and showcase their skills.
                </p>
                <button
                  type="button"
                  disabled
                  className="inline-block px-10 py-4 bg-gray-700/60 text-gray-200 font-bold uppercase tracking-wider rounded-full cursor-not-allowed border border-gray-500/50"
                >
                  Registrations Closed
                </button>
              </div>
            </GlassCard> */}

          </div>

          {/* Bottom decoration */}
          <div className={`mt-16 sm:mt-20 flex justify-center transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '1000ms' }}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-600" style={{ boxShadow: '0 0 10px rgba(220,38,38,0.8)' }} />
              <div className="w-16 h-px" style={{ background: 'linear-gradient(to right, #dc2626, transparent)' }} />
              <span className="text-gray-500 text-sm uppercase tracking-widest">Genesis — DESOC</span>
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

export default GenesisPage;
