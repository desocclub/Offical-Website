import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import sharkverseImg from '../assets/genesis/sharkverse.jpeg';
import sharkversePptTemplate from '../assets/genesis/Shark_Verse_20260318_202659_0000.pptx?url';

const sharkversePptSubmissionLink = 'https://forms.gle/mc8DgJFryGUhnaRH6';

const participationDetails = [
  { label: 'Event Date', value: '28th March 2026' },
  { label: 'Team Size', value: '1-4 members per team' },
  { label: 'Registration Fee', value: 'Rs.150 per team' },
  { label: 'Target Audience', value: 'Aspiring entrepreneurs, innovators, and problem-solvers' },
];

const eventFlow = [
  {
    stage: 'Stage 1 - PPT Submission',
    text: 'Teams submit their pitch decks (PPT).',
    meta: ['Submission Deadline: 28th March, 09:00 AM'],
  },
  {
    stage: 'Stage 2 - Main Pitch',
    text: 'Each team presents their startup idea including problem, solution, market opportunity, revenue model, and investment ask.',
    meta: ['Pitch Duration: 5 minutes', 'Q&A Duration: 2 minutes'],
  },
  {
    stage: 'Stage 3 - Investment Negotiation',
    text: 'Judges (Sharks) may offer virtual investment to promising startups. Judges may negotiate deals, collaborate, or compete to invest in the best ideas.',
  },
];

const judgingCriteria = [
  'Idea Originality - Innovation and uniqueness of the startup idea',
  'Problem-Solution Fit - How effectively the solution addresses the problem',
  'Business Model - Feasibility and scalability of the revenue model',
  'Market Potential - Size and opportunity of the target market',
  'Pitch Delivery - Clarity and persuasiveness of the presentation',
  'Q&A Performance - Ability to defend the idea under questioning',
];

const judges = [
  'Startup founders or entrepreneurs',
  'Industry professionals',
  'Faculty members',
  'Experienced senior students involved in startup ecosystems',
];

const sectionClass =
  'rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 sm:p-7 md:p-8 shadow-[0_16px_40px_rgba(0,0,0,0.45),0_0_16px_rgba(220,38,38,0.1)]';

const SectionTitle = ({ children }) => (
  <h2 className="text-white text-xl sm:text-2xl font-bold tracking-wide mb-4 flex items-center gap-3">
    <span className="w-1.5 h-7 rounded-full bg-linear-to-b from-red-500 to-red-800" />
    {children}
  </h2>
);

const SharkverseEventPage = () => {
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
              to="/genesis"
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
              Sharkverse
            </h1>
            
            <p className="text-tertiary text-sm sm:text-base max-w-3xl mx-auto">
              Simulated startup pitch arena where innovation meets strategy and investor-style decision making.
            </p>
          </header>

          <div className="space-y-6 sm:space-y-8">
            <section className={sectionClass}>
              <img
                src={sharkverseImg}
                alt="Sharkverse event flyer"
                className="w-full h-auto rounded-xl border border-white/10"
                loading="lazy"
              />
            </section>


            <section className={sectionClass}>
              <SectionTitle>Event Overview</SectionTitle>
              <div className="max-w-3xl text-secondary text-sm sm:text-base leading-relaxed space-y-4">
                <p>
                  Sharkverse is a simulated startup pitch competition where participants present innovative business ideas to a panel of judges acting as "Sharks".
                </p>
                <p>
                  Each team pitches their startup concept and attempts to secure virtual investment by convincing the judges about the viability, scalability, and impact of their idea.
                </p>
                <p>
                  The event simulates real-world startup pitching, negotiation, and investor decision-making while encouraging entrepreneurship, innovation, and persuasive communication skills.
                </p>
              </div>
            </section>

            <section className={sectionClass}>
              <SectionTitle>Participation Details</SectionTitle>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {participationDetails.map((item) => (
                  <div key={item.label} className="rounded-xl border border-white/10 bg-black/30 p-4">
                    <p className="text-red-400 text-xs uppercase tracking-wider mb-1">{item.label}</p>
                    <p className="text-gray-200 text-sm sm:text-base">{item.value}</p>
                  </div>
                ))}
              </div>
            </section>
            
            <section className={sectionClass}>
              <SectionTitle>PPT Template</SectionTitle>
              <div className="relative overflow-hidden rounded-xl border border-red-500/20 bg-linear-to-br from-red-950/20 via-black/80 to-black/90 p-4 sm:p-6">
                <div className="absolute -top-14 -right-10 w-44 h-44 rounded-full bg-red-600/15 blur-3xl" />
                <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                  <div className="space-y-3 max-w-2xl">
                    <p className="text-white text-base sm:text-lg font-semibold leading-snug">
                      Official Sharkverse Pitch Deck Template
                    </p>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      Use this PPT template for Stage 1 submission to keep your deck format consistent with judging expectations.
                    </p>
                    <p className="text-red-200/90 text-xs sm:text-sm leading-relaxed">
                      Submit your final pitch deck here before the deadline.
                    </p>
                    <div className="flex flex-wrap items-center gap-2.5 text-xs sm:text-sm">
                      <span className="rounded-full border border-red-500/30 bg-red-500/10 text-red-200 px-3 py-1">
                        .PPTX Format
                      </span>
                    </div>
                  </div>

                  <div className="flex w-full md:w-auto flex-col sm:flex-row md:flex-col gap-3">
                    <a
                      href={sharkversePptTemplate}
                      download="Sharkverse_Pitch_Template.pptx"
                      className="group/button inline-flex w-full md:w-auto items-center justify-center gap-2 whitespace-nowrap px-6 py-3 bg-linear-to-r from-red-700 to-red-600 text-white text-sm font-bold uppercase tracking-wider rounded-full hover:from-red-600 hover:to-red-500 transition-all duration-300 hover:shadow-[0_0_28px_rgba(220,38,38,0.35)]"
                    >
                      Download PPT
                      <svg
                        className="w-4 h-4 transition-transform duration-300 group-hover/button:translate-y-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v10m0 0l-4-4m4 4l4-4M5 20h14" />
                      </svg>
                    </a>

                    <a
                      href={sharkversePptSubmissionLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full md:w-auto items-center justify-center gap-2 whitespace-nowrap px-6 py-3 border border-red-400/50 text-red-200 text-sm font-bold uppercase tracking-wider rounded-full hover:bg-red-500/10 hover:text-white transition-all duration-300"
                    >
                      Submit PPT
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 3h7m0 0v7m0-7L10 14" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
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
              <SectionTitle>Judges</SectionTitle>
              <ul className="space-y-2.5 max-w-3xl">
                {judges.map((judge) => (
                  <li key={judge} className="text-gray-300 text-sm sm:text-base leading-relaxed flex items-start gap-3">
                    <span className="mt-2 w-2 h-2 rounded-full bg-red-500 shrink-0" />
                    <span>{judge}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="pt-2">
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                <Link
                  to="/genesis/register?event=Sharkverse"
                  className="text-center px-6 py-3 bg-linear-to-r from-red-700 to-red-600 text-white font-bold uppercase tracking-wider rounded-full hover:from-red-600 hover:to-red-500 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_28px_rgba(220,38,38,0.35)]"
                >
                  Register Now
                </Link>
                <Link
                  to="/genesis"
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
};

export default SharkverseEventPage;
