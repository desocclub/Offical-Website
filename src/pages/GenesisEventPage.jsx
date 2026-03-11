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
      <div className="bg-[#0a0a0a] min-h-screen font-roboto-condensed">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
          <h2 className="text-white text-3xl font-black mb-4">Event Not Found</h2>
          <p className="text-gray-500 text-sm mb-8">The event you are looking for does not exist.</p>
          <Link
            to="/genesis"
            className="px-6 py-3 border border-white/15 text-gray-300 text-sm font-bold uppercase tracking-wider rounded-sm hover:border-red-500/30 hover:text-red-400 transition-all duration-200"
          >
            Back to Genesis
          </Link>
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
    <div className="bg-[#0a0a0a] min-h-screen font-roboto-condensed">
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

      {/* Content column */}
      <div className="max-w-2xl mx-auto px-6 py-10">

        {/* Badge */}
        <div className="flex justify-center mb-6">
          <div
            className="inline-flex items-center gap-2 border rounded-full px-4 py-1.5"
            style={{ borderColor: `${event.accentColor}40`, background: `${event.accentColor}12` }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: event.accentColor }} />
            <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: event.accentColor }}>
              GENESIS
            </span>
          </div>
        </div>

        {/* Title */}
        <h1
          className="text-white font-black text-center leading-tight mb-2"
          style={{ fontSize: 'clamp(2.2rem, 8vw, 3.5rem)' }}
        >
          {event.name}
        </h1>
        <p className="text-center font-bold text-lg mb-8 tracking-wide" style={{ color: event.accentColor }}>
          {event.category}
        </p>

        {/* Banner */}
        <div className="rounded-xl overflow-hidden mb-5 border border-white/5">
          {/* Poster area */}
          <div
            className="relative flex items-center justify-center"
            style={{ background: event.posterGradient, minHeight: '220px' }}
          >
            {/* Grid texture */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
                backgroundSize: '28px 28px',
              }}
            />
            {/* Big icon */}
            <span className="relative text-[96px] leading-none">{event.icon}</span>
          </div>

          {/* Feature tiles strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-white/8">
            {event.features.map((f, i) => (
              <div
                key={f.label}
                className={`flex flex-col items-center gap-1.5 py-4 px-3 bg-[#0d0010]/50
                  ${i < 3 ? 'border-r border-white/8' : ''}
                  ${i < 2 ? 'border-b sm:border-b-0 border-white/8' : ''}`}
              >
                <span className="text-xl">{f.icon}</span>
                <span
                  className="text-xs font-bold uppercase tracking-wide text-center leading-tight"
                  style={{ color: event.accentColor }}
                >
                  {f.label}
                </span>
                <span className="text-gray-500 text-[11px] text-center leading-tight">{f.sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Event Details card */}
        <div className="border border-white/10 rounded-xl p-6 bg-[#0f0f0f] mb-4">
          <h3 className="text-white font-bold text-lg mb-5">Event Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {detailItems.map((item) => (
              <div key={item.label} className="flex items-start gap-3">
                <span className="text-xl flex-shrink-0">{item.icon}</span>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider mb-0.5">{item.label}</p>
                  <p className="text-white text-sm font-medium">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* About the Event card */}
        <div className="border border-white/10 rounded-xl p-6 bg-[#0f0f0f] mb-8">
          <h3 className="text-white font-bold text-lg mb-3">About the Event</h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">{event.description}</p>
          <div className="grid grid-cols-3 gap-4 border-t border-white/8 pt-5">
            {event.highlights.map((h) => (
              <div key={h.label}>
                <p className="font-bold text-sm mb-1" style={{ color: event.accentColor }}>
                  {h.label}
                </p>
                <p className="text-gray-500 text-xs">{h.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to={`/genesis/register?event=${encodeURIComponent(event.registrationKey)}`}
            className="flex-1 text-center px-6 py-3.5 bg-gradient-to-r from-[#7a0000] to-[#b00000] text-white font-bold uppercase tracking-wider rounded-sm hover:from-[#9a0000] hover:to-[#cc0000] transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-red-900/30"
          >
            Register Now
          </Link>
          <Link
            to="/genesis"
            className="flex-1 text-center px-6 py-3.5 border border-white/15 text-gray-300 font-bold uppercase tracking-wider rounded-sm hover:border-red-500/30 hover:text-red-400 transition-all duration-300"
          >
            Back to Genesis
          </Link>
        </div>

      </div>

      <Footer />
    </div>
  );
};

export default GenesisEventPage;
