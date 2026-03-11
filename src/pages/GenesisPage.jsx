import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const events = [
  {
    icon: '💻',
    name: 'Hackathon',
    slug: 'hackathon',
    category: 'Team Build Challenge',
    description: '24-hour intensive build challenge. Form a team, pick a problem statement, and ship a working prototype.',
    tag: 'Team · 2–4 Members',
    posterGradient: 'linear-gradient(135deg, #3a0000 0%, #1a0010 50%, #0a0020 100%)',
    accentColor: '#ff4444',
  },
  {
    icon: '📄',
    name: 'Paper Presentation',
    slug: 'paper-presentation',
    category: 'Research & Innovation',
    description: 'Present your research or innovative ideas to a panel of judges. Showcase your technical writing and oration skills.',
    tag: 'Individual / Duo',
    posterGradient: 'linear-gradient(135deg, #1a0040 0%, #0a0030 50%, #000a20 100%)',
    accentColor: '#aa66ff',
  },
  {
    icon: '🎨',
    name: 'UI/UX Challenge',
    slug: 'uiux-challenge',
    category: 'Design Sprint',
    description: 'Design intuitive and visually compelling user interfaces within a fixed time limit using provided briefs.',
    tag: 'Individual',
    posterGradient: 'linear-gradient(135deg, #001a30 0%, #000a20 50%, #001010 100%)',
    accentColor: '#44aaff',
  },
  {
    icon: '❓',
    name: 'Technical Quiz',
    slug: 'technical-quiz',
    category: 'Knowledge Battle',
    description: 'Test your knowledge across CS fundamentals, algorithms, networking, and emerging tech domains.',
    tag: 'Team · 2 Members',
    posterGradient: 'linear-gradient(135deg, #2a1a00 0%, #1a0a00 50%, #0a0800 100%)',
    accentColor: '#ffaa22',
  },
  {
    icon: '⌨️',
    name: 'Coding Contest',
    slug: 'coding-contest',
    category: 'Competitive Programming',
    description: 'Timed problem-solving contest on algorithmic and data structure challenges, from beginner to advanced.',
    tag: 'Individual',
    posterGradient: 'linear-gradient(135deg, #001a10 0%, #000a08 50%, #001a00 100%)',
    accentColor: '#44ff88',
  },
];

const highlights = [
  { icon: '🏆', text: 'Cash prizes & merit certificates for top performers across all events' },
  { icon: '🤝', text: 'Network with students and innovators from colleges across the region' },
  { icon: '💡', text: 'Hands-on exposure to real-world problem solving and design thinking' },
  { icon: '🎓', text: 'Participation certificates issued to every registered student' },
  { icon: '🚀', text: 'Competitions aligned with cutting-edge industry domains and trends' },
  { icon: '📢', text: 'Platform to showcase your work to faculty and industry professionals' },
];

const schedule = [
  {
    day: 'Day 1',
    date: 'TBD',
    slots: [
      { time: '09:00 AM', event: 'Inauguration & Opening Ceremony' },
      { time: '10:00 AM', event: 'Technical Quiz Begins' },
      { time: '11:00 AM', event: 'Hackathon Kickoff + Problem Statement Release' },
      { time: '02:00 PM', event: 'Paper Presentations' },
      { time: '04:00 PM', event: 'UI/UX Challenge' },
    ],
  },
  {
    day: 'Day 2',
    date: 'TBD',
    slots: [
      { time: '09:00 AM', event: 'Coding Contest' },
      { time: '11:00 AM', event: 'Hackathon Final Submissions' },
      { time: '12:00 PM', event: 'Project Demonstrations' },
      { time: '03:00 PM', event: 'Results & Award Ceremony' },
      { time: '04:30 PM', event: 'Closing Ceremony' },
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

const GenesisPage = () => {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="bg-[#0a0a0a] min-h-screen font-roboto-condensed">
      <Navbar />

      {/* ── Top bar ── */}
      <div className="border-b border-white/5 px-6 py-3 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors duration-200"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>
        <span className="text-gray-600 text-xs uppercase tracking-wider">Design Society</span>
      </div>

      {/* ── Hero ── */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-1.5 mb-8">
          <span className="w-2 h-2 rounded-full bg-red-500"></span>
          <span className="text-red-400 text-xs font-semibold uppercase tracking-widest">Flagship Technical Event</span>
        </div>

        {/* Title */}
        <h1 className="text-white font-black uppercase leading-none mb-4" style={{ fontSize: 'clamp(3.5rem, 14vw, 10rem)' }}>
          GENESIS
        </h1>

        {/* Subtitle */}
        <p className="text-gray-300 text-lg md:text-xl mb-3 tracking-wide">
          Design &amp; Innovation Showcase
        </p>

        {/* Organizer */}
        <p className="text-gray-500 text-sm mb-10">
          Organized by{' '}
          <span className="text-red-400 font-semibold">Design Society</span>
          {' '}·{' '}
          Department of Computer Science &amp; Design
        </p>

        {/* Description box */}
        <div className="border border-white/10 rounded-xl p-6 md:p-8 text-left bg-white/[0.02] mb-10">
          <p className="text-gray-300 text-sm md:text-base leading-relaxed">
            Genesis is the flagship technical event of the Design Society, Department of Computer Science &amp; Design.
            It is designed to be a high-energy platform that blends innovation, coding excellence, design thinking, and
            collaborative problem-solving. Genesis brings together competitive technical events and creative challenges
            to ensure both intellectual depth and wide campus participation. The event structure is scalable, professionally
            managed, and aligned with current industry trends.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/genesis/register"
            className="px-10 py-3.5 bg-gradient-to-r from-[#7a0000] to-[#b00000] text-white font-bold uppercase tracking-wider rounded-sm hover:from-[#9a0000] hover:to-[#cc0000] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-900/40"
          >
            Register Now
          </Link>
          <a
            href="#events"
            className="px-10 py-3.5 border border-white/15 text-gray-300 font-bold uppercase tracking-wider rounded-sm hover:border-red-500/40 hover:text-red-400 transition-all duration-300"
          >
            View Events
          </a>
        </div>
      </section>

      {/* ── Major Events ── */}
      <section id="events" className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="mb-2">
            <h2 className="text-white text-3xl md:text-4xl font-black uppercase tracking-tight">Major Events</h2>
            <p className="text-red-400 text-sm mt-1 uppercase tracking-wider">Under Genesis</p>
          </div>
          <div className="mt-4 h-px w-full bg-white/5 mb-10" />

          {/* Event cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((ev) => (
              <div
                key={ev.name}
                className="group flex flex-col rounded-xl overflow-hidden border border-white/8 hover:border-red-500/30 transition-all duration-400 hover:shadow-xl hover:shadow-red-900/10"
              >
                {/* Poster area */}
                <div
                  className="relative overflow-hidden"
                  style={{
                    background: ev.posterGradient,
                    aspectRatio: '4 / 3',
                  }}
                >
                  {/* Grid texture overlay */}
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage:
                        'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                      backgroundSize: '32px 32px',
                    }}
                  />
                  {/* Top label */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em]">GENESIS</span>
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border"
                      style={{ color: ev.accentColor, borderColor: `${ev.accentColor}40` }}
                    >
                      {ev.tag}
                    </span>
                  </div>
                  {/* Center icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-7xl opacity-60 group-hover:opacity-90 group-hover:scale-110 transition-all duration-400">{ev.icon}</span>
                  </div>
                  {/* Bottom overlay with name */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                    <h3
                      className="text-white font-black text-xl uppercase tracking-wide leading-tight"
                      style={{ textShadow: `0 0 20px ${ev.accentColor}60` }}
                    >
                      {ev.name}
                    </h3>
                    <p className="text-xs font-semibold uppercase tracking-wider mt-0.5" style={{ color: ev.accentColor }}>
                      {ev.category}
                    </p>
                  </div>
                </div>

                {/* Card body */}
                <div className="flex-1 flex flex-col p-5 bg-[#0f0f0f] border-t border-white/5">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-2xl flex-shrink-0 mt-0.5">{ev.icon}</span>
                    <div>
                      <p className="text-white font-bold text-sm uppercase tracking-wide">{ev.name}</p>
                      <p className="text-xs uppercase tracking-wider mt-0.5" style={{ color: ev.accentColor }}>
                        {ev.category}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-4">{ev.description}</p>
                  <Link
                    to={`/genesis/events/${ev.slug}`}
                    className="inline-flex items-center gap-1.5 text-red-400 hover:text-red-300 text-sm font-medium transition-colors duration-200 group/link"
                  >
                    Learn More
                    <svg
                      className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Attend ── */}
      <section className="py-16 px-6 bg-gradient-to-b from-[#0a0a0a] via-[#0d0005] to-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-2">
            <h2 className="text-white text-3xl md:text-4xl font-black uppercase tracking-tight">Why Attend Genesis?</h2>
            <p className="text-gray-500 text-sm mt-1">Reasons to be part of the experience</p>
          </div>
          <div className="mt-4 h-px w-full bg-white/5 mb-10" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {highlights.map((h, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-5 rounded-xl border border-white/5 bg-white/[0.02] hover:border-red-500/20 hover:bg-white/[0.04] transition-all duration-300"
              >
                <span className="text-2xl flex-shrink-0">{h.icon}</span>
                <p className="text-gray-300 text-sm leading-relaxed">{h.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Schedule ── */}
      <section id="schedule" className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-2">
            <h2 className="text-white text-3xl md:text-4xl font-black uppercase tracking-tight">Schedule</h2>
            <p className="text-gray-500 text-sm mt-1">Two days of back-to-back tech</p>
          </div>
          <div className="mt-4 h-px w-full bg-white/5 mb-10" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {schedule.map((day) => (
              <div key={day.day}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="px-4 py-1.5 bg-gradient-to-r from-[#7a0000] to-[#b00000] text-white text-sm font-bold uppercase tracking-wider rounded-sm">
                    {day.day}
                  </div>
                  <span className="text-gray-600 text-sm uppercase tracking-wider">{day.date}</span>
                </div>
                <div className="relative pl-6 border-l border-red-900/30">
                  {day.slots.map((slot, i) => (
                    <div key={i} className="relative mb-6 last:mb-0">
                      <div className="absolute -left-[1.35rem] top-1 w-3 h-3 rounded-full bg-red-700 border-2 border-[#0a0a0a]" />
                      <p className="text-red-400 text-xs font-semibold uppercase tracking-wider mb-1">{slot.time}</p>
                      <p className="text-gray-200 text-sm">{slot.event}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section id="faqs" className="py-16 px-6 bg-gradient-to-b from-[#0a0a0a] via-[#0d0005] to-[#0a0a0a]">
        <div className="max-w-3xl mx-auto">
          <div className="mb-2">
            <h2 className="text-white text-3xl md:text-4xl font-black uppercase tracking-tight">FAQs</h2>
            <p className="text-gray-500 text-sm mt-1">Got questions? We&apos;ve got answers.</p>
          </div>
          <div className="mt-4 h-px w-full bg-white/5 mb-10" />

          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="border border-white/8 rounded-xl overflow-hidden hover:border-red-500/20 transition-colors duration-300"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left bg-[#0f0f0f] hover:bg-white/[0.03] transition-all duration-200"
                >
                  <span className="text-gray-200 text-sm pr-4">{faq.q}</span>
                  <span
                    className={`text-red-400 text-lg transition-transform duration-300 flex-shrink-0 ${
                      openFaq === i ? 'rotate-45' : ''
                    }`}
                  >
                    +
                  </span>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-40' : 'max-h-0'}`}>
                  <p className="px-6 py-4 text-gray-400 text-sm leading-relaxed border-t border-white/5">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing CTA ── */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="border border-white/8 rounded-xl p-8 md:p-10 bg-white/[0.02] text-center">
            <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-8">
              Genesis is designed not just as a college fest, but as a structured innovation platform that
              encourages creativity, technical excellence, and real-world problem-solving. With diverse
              competitions and strong student participation, Genesis offers every participant a chance to
              grow, collaborate, and showcase their skills to a wider audience.
            </p>
            <Link
              to="/genesis/register"
              className="inline-block px-10 py-3.5 bg-gradient-to-r from-[#7a0000] to-[#b00000] text-white font-bold uppercase tracking-wider rounded-sm hover:from-[#9a0000] hover:to-[#cc0000] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-900/40"
            >
              Register for Genesis
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GenesisPage;
