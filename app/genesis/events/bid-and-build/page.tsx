import Link from 'next/link';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import { resolveSrc } from '@/lib/imageUtils';
import bidAndBuildImg from '@/src/assets/genesis/bidnbuild.jpeg';

export const metadata = {
  title: 'Bid & Build — Genesis 2026 | DESOC',
  description: 'A strategy-driven creative arena where teams manage coins, compete in auctions, and convert constrained assets into standout design outcomes.',
};

const eventInfo = [
  { label: 'Theme', value: 'Strategy + Design + Auction' },
  { label: 'Team Size', value: '2-4 members' },
  { label: 'Registration Fee', value: 'Rs.100 per team' },
];

const coreConcept = [
  'Each team gets 1000 coins at the start of the event.',
  'Coins are used to bid, trade, and buy design assets throughout the challenge.',
  'Remaining coins at the end are converted into bonus points.',
];

const eventFlow = [
  {
    stage: 'Stage 1 - Introduction',
    text: 'Introduction to the event format, coin economy, and complete rules walkthrough.',
  },
  {
    stage: 'Stage 2 - Problem Reveal',
    text: 'A design challenge statement is revealed for all teams to solve.',
  },
  {
    stage: 'Round 1 - Auction Round',
    text: 'Teams bid for UI components, fonts, assets, and power-ups with bidding starting at 50 coins.',
    meta: ['Starting Bid: 50 coins', 'Market crash twist may occur'],
  },
  {
    stage: 'Stage 3 - Black Market',
    text: 'Teams can trade, buy, or sell assets to optimize their final design strategy.',
    meta: ['Maximum 8 assets per team'],
  },
  {
    stage: 'Round 2 - Design Round',
    text: 'Teams build their final solution using auctioned assets in tools such as Figma, Canva, or Photoshop.',
    meta: ['Duration: ~1.5 hours', 'Tools: Figma, Canva, Photoshop, etc.'],
  },
];

const judgingCriteria = [
  'Creativity',
  'Design Quality',
  'Use of Assets',
  'Relevance to Problem',
];

const sectionClass =
  'rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 sm:p-7 md:p-8 shadow-[0_16px_40px_rgba(0,0,0,0.45),0_0_16px_rgba(220,38,38,0.1)]';

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-white text-xl sm:text-2xl font-bold tracking-wide mb-4 flex items-center gap-3">
    <span className="w-1.5 h-7 rounded-full bg-linear-to-b from-red-500 to-red-800" />
    {children}
  </h2>
);

export default function BidAndBuildEventPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="relative">
        <div className="fixed inset-0 -z-10" style={{ background: 'linear-gradient(135deg, black, rgba(127,29,29,0.3) 50%, black)' }} />
        <div className="fixed inset-0 -z-10" style={{ background: 'radial-gradient(ellipse at top right, rgba(127,29,29,0.15), transparent 50%)' }} />
        <div className="fixed inset-0 -z-10" style={{ background: 'radial-gradient(ellipse at bottom left, rgba(153,27,27,0.1), transparent 50%)' }} />

        <main className="relative px-4 sm:px-6 lg:px-8 pt-24 pb-16 max-w-5xl mx-auto">
          <div className="mb-8">
            <Link
              href="/genesis"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-red-400 text-sm transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Genesis
            </Link>
          </div>

          <header className="text-center mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 border border-red-500/30 bg-red-500/10 rounded-full px-4 py-1.5 mb-5">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span className="text-red-400 text-xs uppercase tracking-[0.2em]" style={{ fontWeight: 'var(--font-weight-medium)' }}>Genesis Event</span>
            </div>
            <h1 className="heading-title-6 text-primary uppercase mb-3">
              Bid & Build
            </h1>
            <p className="text-red-300 text-base sm:text-lg mb-3" style={{ fontWeight: 'var(--font-weight-medium)' }}>Bid Smart. Design Bold.</p>
            <p className="text-tertiary text-sm sm:text-base max-w-3xl mx-auto">
              A strategy-driven creative arena where teams manage coins, compete in auctions, and convert constrained assets into standout design outcomes.
            </p>
          </header>

          <div className="space-y-6 sm:space-y-8">
            <section className={sectionClass}>
              <img
                src={resolveSrc(bidAndBuildImg)}
                alt="Bid & Build event flyer"
                className="w-full h-auto rounded-xl border border-white/10"
                loading="lazy"
              />
            </section>

            <section className={sectionClass}>
              <SectionTitle>Event Overview</SectionTitle>
              <div className="max-w-3xl text-secondary text-sm sm:text-base leading-relaxed space-y-4">
                <p>
                  Bid & Build is a strategy-based creative event where teams bid for design assets using virtual coins and then use those assets to create a design solution.
                </p>
                <p>
                  Teams must optimize decisions under pressure: spend coins wisely in auctions, negotiate smart trades in the Black Market, and execute a coherent design within fixed time.
                </p>
              </div>
            </section>

            <section className={sectionClass}>
              <SectionTitle>Team Details</SectionTitle>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {eventInfo.map((item) => (
                  <div key={item.label} className="rounded-xl border border-white/10 bg-black/30 p-4">
                    <p className="text-red-400 text-xs uppercase tracking-wider mb-1">{item.label}</p>
                    <p className="text-gray-200 text-sm sm:text-base">{item.value}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className={sectionClass}>
              <SectionTitle>Core Concept</SectionTitle>
              <ul className="space-y-2.5 max-w-3xl">
                {coreConcept.map((item) => (
                  <li key={item} className="text-gray-300 text-sm sm:text-base leading-relaxed flex items-start gap-3">
                    <span className="mt-2 w-2 h-2 rounded-full bg-red-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className={sectionClass}>
              <SectionTitle>Event Flow</SectionTitle>
              <div className="relative pl-5 sm:pl-7 border-l border-red-700/50 space-y-6">
                {eventFlow.map((step, index) => (
                  <div key={step.stage} className="relative">
                    <span className="absolute -left-[1.73rem] sm:-left-[2.22rem] top-1 w-3 h-3 rounded-full bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.7)]" />
                    <h3 className="text-white font-semibold text-base sm:text-lg mb-2">{step.stage}</h3>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{step.text}</p>
                    {step.meta && (
                      <div className="mt-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                        {step.meta.map((m) => (
                          <span key={m} className="inline-block text-xs sm:text-sm text-red-300 border border-red-500/25 bg-red-500/10 rounded-full px-3 py-1">
                            {m}
                          </span>
                        ))}
                      </div>
                    )}
                    {index < eventFlow.length - 1 && <div className="mt-6 border-b border-white/10" />}
                  </div>
                ))}
              </div>
            </section>

            <section className={sectionClass}>
              <SectionTitle>Judging Criteria</SectionTitle>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {judgingCriteria.map((criteria) => (
                  <div key={criteria} className="rounded-xl border border-white/10 bg-black/30 p-3.5 text-gray-200 text-sm leading-relaxed">
                    {criteria}
                  </div>
                ))}
              </div>
            </section>

            <section className={sectionClass}>
              <SectionTitle>Bonus</SectionTitle>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                Remaining coins are converted into bonus points, rewarding both efficient bidding and smart resource management.
              </p>
            </section>

            <section className="pt-2">
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                <button
                  type="button"
                  disabled
                  className="text-center px-6 py-3 bg-gray-700/60 text-gray-200 font-bold uppercase tracking-wider rounded-full cursor-not-allowed border border-gray-500/50"
                >
                  Registrations Closed
                </button>
                <Link
                  href="/bid-and-build"
                  className="text-center px-6 py-3 border border-amber-400/55 text-amber-200 font-semibold uppercase tracking-wider rounded-full hover:bg-amber-500/10 hover:text-amber-100 transition-all duration-300"
                >
                  Enter Event
                </Link>
                <Link
                  href="/genesis"
                  className="text-center px-6 py-3 border border-red-500/40 text-red-300 font-semibold uppercase tracking-wider rounded-full hover:bg-red-500/10 hover:text-red-200 transition-all duration-300"
                >
                  Back to Event
                </Link>
              </div>
            </section>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
