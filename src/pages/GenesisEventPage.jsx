import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const EVENTS = {
  hackathon: {
    name: 'Hackathon',
    category: 'Team Build Challenge',
    registrationKey: 'Hackathon',
    tag: 'Team · 2–4 Members',
    icon: '💻',
    posterGradient: 'linear-gradient(135deg, #3a0000 0%, #1a0010 50%, #0a0020 100%)',
    accentColor: '#ff4444',
    features: [
      { icon: '🧠', label: 'Problem Statement', sub: 'Real-World Scenarios' },
      { icon: '⚡', label: '24-Hour Sprint', sub: 'Time-Boxed Build' },
      { icon: '🤝', label: 'Team Based', sub: '2–4 Members' },
      { icon: '🏆', label: 'Live Judging', sub: 'Expert Panel' },
    ],
    details: {
      date: 'TBD',
      time: 'TBD',
      teamSize: '2–4 Members (Compulsory)',
      fee: '₹ TBD per team',
      prizes: 'Cash Prizes + Certificates',
    },
    description:
      'A 24-hour intensive build challenge where teams pick a real-world problem statement and ship a fully working prototype. Evaluated on innovation, technical execution, design quality, and the final live demo. The Hackathon is the centrepiece event of Genesis — designed to push your engineering and design skills to their limits.',
    highlights: [
      { label: 'Team Event', sub: '2–4 Members' },
      { label: '24 Hours', sub: 'Time-Boxed Sprint' },
      { label: 'Live Demo', sub: 'Expert Judging' },
    ],
  },
  'paper-presentation': {
    name: 'Paper Presentation',
    category: 'Research & Innovation',
    registrationKey: 'Paper Presentation',
    tag: 'Individual / Duo',
    icon: '📄',
    posterGradient: 'linear-gradient(135deg, #1a0040 0%, #0a0030 50%, #000a20 100%)',
    accentColor: '#aa66ff',
    features: [
      { icon: '📝', label: 'Written Paper', sub: 'Submitted in Advance' },
      { icon: '🎤', label: 'Live Presentation', sub: 'Panel Q&A' },
      { icon: '💡', label: 'Any CS Domain', sub: 'Original Research' },
      { icon: '📊', label: 'Expert Review', sub: 'Faculty & Judges' },
    ],
    details: {
      date: 'TBD',
      time: 'TBD',
      teamSize: 'Individual or Duo',
      fee: '₹ TBD per entry',
      prizes: 'Cash Prizes + Certificates',
    },
    description:
      'Present original research or innovative ideas to a panel of subject-matter judges. Participants submit a research paper and give a live presentation covering their problem, methodology, and findings. Judged on originality, research depth, writing quality, and communication — both written and spoken.',
    highlights: [
      { label: 'Original Research', sub: 'Any CS Domain' },
      { label: 'Panel Q&A', sub: 'Live Interaction' },
      { label: 'Solo / Duo', sub: 'Flexible Format' },
    ],
  },
  'uiux-challenge': {
    name: 'UI/UX Challenge',
    category: 'Design Sprint',
    registrationKey: 'UI/UX Challenge',
    tag: 'Individual',
    icon: '🎨',
    posterGradient: 'linear-gradient(135deg, #001a30 0%, #000a20 50%, #001010 100%)',
    accentColor: '#44aaff',
    features: [
      { icon: '🖌️', label: 'Design Brief', sub: 'Revealed on Day' },
      { icon: '⏱️', label: 'Timed Sprint', sub: 'Fixed Duration' },
      { icon: '📱', label: 'Any Tool', sub: 'Figma, XD, etc.' },
      { icon: '👁️', label: 'UX Review', sub: 'Usability Judging' },
    ],
    details: {
      date: 'TBD',
      time: 'TBD',
      teamSize: 'Individual',
      fee: '₹ TBD per person',
      prizes: 'Cash Prizes + Certificates',
    },
    description:
      'Design intuitive and visually compelling user interfaces within a fixed time limit using a brief revealed on the day of the event. Participants are judged on usability, visual design quality, creativity, and how well the solution addresses the given brief. Any design tool — Figma, Adobe XD, Sketch — is permitted.',
    highlights: [
      { label: 'Solo Event', sub: 'Individual' },
      { label: 'Any Design Tool', sub: 'Figma, XD, etc.' },
      { label: 'UX-First Judging', sub: 'Usability Focus' },
    ],
  },
  'technical-quiz': {
    name: 'Technical Quiz',
    category: 'Knowledge Battle',
    registrationKey: 'Technical Quiz',
    tag: 'Team · 2 Members',
    icon: '❓',
    posterGradient: 'linear-gradient(135deg, #2a1a00 0%, #1a0a00 50%, #0a0800 100%)',
    accentColor: '#ffaa22',
    features: [
      { icon: '💾', label: 'CS Fundamentals', sub: 'DSA · OS · Networks' },
      { icon: '🔢', label: 'Aptitude', sub: 'Logical Reasoning' },
      { icon: '🚀', label: 'Emerging Tech', sub: 'AI · Cloud · DevOps' },
      { icon: '⚡', label: 'Rapid Fire', sub: 'Buzzer Rounds' },
    ],
    details: {
      date: 'TBD',
      time: 'TBD',
      teamSize: '2 Members (Compulsory)',
      fee: '₹ TBD per team',
      prizes: 'Cash Prizes',
    },
    description:
      'A team-based knowledge battle covering CS fundamentals, algorithms, networking, operating systems, and emerging technology domains. Multiple rounds progress from MCQs to rapid-fire buzzer rounds. Teams need speed, accuracy, and a broad knowledge base to advance through elimination stages.',
    highlights: [
      { label: 'Multi-Round', sub: 'Elimination Format' },
      { label: 'Broad Domains', sub: 'CS + Emerging Tech' },
      { label: 'Team of 2', sub: 'Compulsory Pairs' },
    ],
  },
  'coding-contest': {
    name: 'Coding Contest',
    category: 'Competitive Programming',
    registrationKey: 'Coding Contest',
    tag: 'Individual',
    icon: '⌨️',
    posterGradient: 'linear-gradient(135deg, #001a10 0%, #000a08 50%, #001a00 100%)',
    accentColor: '#44ff88',
    features: [
      { icon: '🧩', label: 'Algorithm Problems', sub: 'Beginner to Advanced' },
      { icon: '⏰', label: 'Timed Contest', sub: 'Fixed Duration' },
      { icon: '🖥️', label: 'Any Language', sub: 'C · C++ · Java · Python' },
      { icon: '📈', label: 'Ranked Scoring', sub: 'Time + Accuracy' },
    ],
    details: {
      date: 'TBD',
      time: 'TBD',
      teamSize: 'Individual',
      fee: '₹ TBD per person',
      prizes: 'Cash Prizes + Certificates',
    },
    description:
      'A timed competitive programming contest featuring algorithmic and data structure problems rated from beginner to advanced. Submit solutions in any supported language. Scoring is based on the number of problems solved, solution accuracy, and submission time. Partial scoring may apply for multi-part problems.',
    highlights: [
      { label: 'Individual', sub: 'Solo Contest' },
      { label: 'Any Language', sub: 'C, C++, Java, Python' },
      { label: 'Ranked Scoring', sub: 'Time + Accuracy' },
    ],
  },
};

const GenesisEventPage = () => {
  const { eventId } = useParams();
  const event = EVENTS[eventId];

  if (!event) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <div className="relative">
          <div className="fixed inset-0 -z-10" style={{ background: 'linear-gradient(135deg, black, rgba(127,29,29,0.3) 50%, black)' }} />
          <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
            <h2 className="text-white text-3xl font-bold mb-4">Event Not Found</h2>
            <p className="text-gray-500 text-sm mb-8">The event you are looking for does not exist.</p>
            <Link
              to="/genesis"
              className="px-6 py-3 border border-white/15 text-gray-300 text-sm font-bold uppercase tracking-wider rounded-full hover:border-red-500/30 hover:text-red-400 transition-all duration-200"
            >
              Back to Genesis
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const detailItems = [
    { label: 'Date', value: event.details.date, icon: '📅' },
    { label: 'Time', value: event.details.time, icon: '🕐' },
    { label: 'Team Size', value: event.details.teamSize, icon: '👥' },
    { label: 'Registration Fee', value: event.details.fee, icon: '💰' },
    { label: 'Prizes', value: event.details.prizes, icon: '🏆' },
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
        <main className="relative px-4 sm:px-6 lg:px-8 pt-24 pb-16 max-w-4xl mx-auto">

          {/* Breadcrumb */}
          <div className="mb-8">
            <Link
              to="/genesis"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-red-400 text-sm transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Genesis
            </Link>
          </div>

          {/* ── Hero Header ── */}
          <header className="text-center mb-10">
            {/* Badge */}
            <div className="flex justify-center mb-6">
              <div
                className="inline-flex items-center gap-2 border rounded-full px-4 py-1.5 backdrop-blur-sm"
                style={{ borderColor: `${event.accentColor}30`, background: `${event.accentColor}10` }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: event.accentColor }} />
                <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: event.accentColor }}>
                  GENESIS
                </span>
              </div>
            </div>

            {/* Title */}
            <h1
              className="text-white font-bold text-center leading-tight mb-2"
              style={{ fontSize: 'clamp(2.2rem, 8vw, 3.5rem)' }}
            >
              {event.name}
            </h1>
            <p className="text-center font-bold text-lg mb-6 tracking-wide" style={{ color: event.accentColor }}>
              {event.category}
            </p>
          </header>

          <div className="space-y-5">

            {/* ── Banner Card ── */}
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl backdrop-blur-2xl border border-white/10" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
              {/* Poster area */}
              <div
                className="relative flex items-center justify-center py-12 sm:py-16"
                style={{ background: `linear-gradient(135deg, rgba(220,38,38,0.08) 0%, rgba(0,0,0,0.4) 100%)` }}
              >
                <span className="relative text-[80px] sm:text-[96px] leading-none">{event.icon}</span>
              </div>

              {/* Feature tiles strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-white/10">
                {event.features.map((f, i) => (
                  <div
                    key={f.label}
                    className={`flex flex-col items-center gap-1.5 py-5 px-3 bg-white/3
                      ${i < event.features.length - 1 ? 'border-r border-white/10' : ''}
                      ${i < 2 ? 'border-b sm:border-b-0 border-white/10' : ''}`}
                  >
                    <span className="text-xl">{f.icon}</span>
                    <span className="text-xs font-bold uppercase tracking-wide text-center leading-tight" style={{ color: event.accentColor }}>
                      {f.label}
                    </span>
                    <span className="text-gray-500 text-[11px] text-center leading-tight">{f.sub}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Event Details Card ── */}
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl backdrop-blur-2xl border border-white/10 p-5 sm:p-8" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
              <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl" style={{ background: 'rgba(220,38,38,0.06)' }} />
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="w-1 h-8 rounded-full mr-3 shrink-0" style={{ background: 'linear-gradient(to bottom, #ef4444, #b91c1c)', boxShadow: '0 0 10px rgba(220,38,38,0.5)' }} />
                  <h3 className="text-white font-bold text-xl">Event Details</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {detailItems.map((item) => (
                    <div key={item.label} className="flex items-start gap-3 p-3 rounded-xl border border-white/5 bg-white/3 hover:border-red-500/20 transition-all duration-300">
                      <span className="text-xl shrink-0">{item.icon}</span>
                      <div>
                        <p className="text-gray-500 text-xs uppercase tracking-wider mb-0.5">{item.label}</p>
                        <p className="text-white text-sm font-medium">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── About the Event Card ── */}
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl backdrop-blur-2xl border border-white/10 p-5 sm:p-8" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
              <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl" style={{ background: 'rgba(127,29,29,0.06)' }} />
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="w-1 h-8 rounded-full mr-3 shrink-0" style={{ background: 'linear-gradient(to bottom, #ef4444, #b91c1c)', boxShadow: '0 0 10px rgba(220,38,38,0.5)' }} />
                  <h3 className="text-white font-bold text-xl">About the Event</h3>
                </div>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6">{event.description}</p>
                <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-5">
                  {event.highlights.map((h) => (
                    <div key={h.label} className="text-center sm:text-left">
                      <p className="font-bold text-sm mb-1" style={{ color: event.accentColor }}>{h.label}</p>
                      <p className="text-gray-500 text-xs">{h.sub}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── CTAs ── */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                to={`/genesis/register?event=${encodeURIComponent(event.registrationKey)}`}
                className="flex-1 text-center px-6 py-4 bg-linear-to-r from-red-700 to-red-600 text-white font-bold uppercase tracking-wider rounded-full hover:from-red-600 hover:to-red-500 transition-all duration-300 hover:scale-[1.02]"
                style={{ boxShadow: '0 0 30px rgba(220,38,38,0.3)' }}
              >
                Register Now
              </Link>
              <Link
                to="/genesis"
                className="flex-1 text-center px-6 py-4 border border-white/15 text-gray-300 font-bold uppercase tracking-wider rounded-full hover:border-red-500/40 hover:text-red-400 transition-all duration-300"
              >
                Back to Genesis
              </Link>
            </div>

          </div>

          {/* Bottom decoration */}
          <div className="mt-16 sm:mt-20 flex justify-center">
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

export default GenesisEventPage;
