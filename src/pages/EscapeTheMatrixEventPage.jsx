import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import escapeImg from '../assets/genesis/escape.jpeg';

const participationDetails = [
  { label: 'Theme', value: 'Matrix - escape the simulation' },
  { label: 'Format', value: 'Treasure Hunt + Escape Room hybrid' },
  { label: 'Team Size', value: '2-4 members' },
  { label: 'Duration', value: '~80 minutes gameplay (2.5 hrs total)' },
  { label: 'Venue', value: 'Classroom 1, Classroom 2, Lab 1, Lab 2' },
];

const rounds = [
  {
    title: 'Room 1 - Dark Room',
    // text: 'Audio-based puzzle sequence followed by a red pill / blue pill decision that determines the next clue path.',
  },
  {
    title: 'Room 2 - Lab',
    // text: 'Wordle challenge combined with a Wikipedia navigation mission to extract the required hint and unlock the next location.',
  },
  {
    title: 'Room 3 - Final Lab',
    // text: 'Cipher decryption and a 4-digit sequence puzzle that act as the final gate to the extraction route.',
  },
  {
    title: 'Final - Treasure Chest',
    // text: 'Successful teams locate the treasure chest and claim the prize after completing all matrix checkpoints.',
  },
];

const sectionClass =
  'rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 sm:p-7 md:p-8 shadow-[0_16px_40px_rgba(0,0,0,0.45),0_0_16px_rgba(220,38,38,0.1)]';

const SectionTitle = ({ children }) => (
  <h2 className="text-white text-xl sm:text-2xl font-bold tracking-wide mb-4 flex items-center gap-3">
    <span className="w-1.5 h-7 rounded-full bg-linear-to-b from-red-500 to-red-800" />
    {children}
  </h2>
);

const EscapeTheMatrixEventPage = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="relative">
        <div className="fixed inset-0 -z-10" style={{ background: 'linear-gradient(135deg, black, rgba(127,29,29,0.3) 50%, black)' }} />
        <div className="fixed inset-0 -z-10" style={{ background: 'radial-gradient(ellipse at top right, rgba(127,29,29,0.15), transparent 50%)' }} />
        <div className="fixed inset-0 -z-10" style={{ background: 'radial-gradient(ellipse at bottom left, rgba(153,27,27,0.1), transparent 50%)' }} />

        <main className="relative px-4 sm:px-6 lg:px-8 pt-24 pb-16 max-w-5xl mx-auto">
          <div className="mb-6 rounded-xl border border-red-500/40 bg-red-500/12 px-4 py-3 sm:px-5 sm:py-4">
            <p className="text-red-200 text-sm sm:text-base font-semibold text-center">
              Registrations for Escape The Matrix are now closed. Thank you for the overwhelming response!
            </p>
          </div>

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
              Escape The Matrix
            </h1>
            <p className="text-red-300 text-base sm:text-lg mb-3" style={{ fontWeight: 'var(--font-weight-medium)' }}>Crack the code. Break free.</p>
            <p className="text-tertiary text-sm sm:text-base max-w-3xl mx-auto">
              A simulation-style mission where participants play as trapped programs and complete linked challenges to escape the Matrix.
            </p>
          </header>

          <div className="space-y-6 sm:space-y-8">
            <section className={sectionClass}>
              <img
                src={escapeImg}
                alt="Escape The Matrix event flyer"
                className="w-full h-auto rounded-xl border border-white/10"
                loading="lazy"
              />
            </section>

            <section className={sectionClass}>
              <SectionTitle>Event Description</SectionTitle>
              <div className="max-w-3xl text-secondary text-sm sm:text-base leading-relaxed space-y-4">
                <p>
                  Participants are programs trapped inside the Matrix and must solve 4 challenges to escape the simulation.
                </p>
                <p>
                  Each round reveals the next location through riddles, requiring teams to decode clues quickly and coordinate their moves.
                </p>
                <p>
                  The event concludes when a team returns with proof of completion after clearing every checkpoint and unlocking the final prize.
                </p>
              </div>
            </section>

            <section className={sectionClass}>
              <SectionTitle>Event Information</SectionTitle>
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
              <SectionTitle>Rounds</SectionTitle>
              <div className="relative pl-5 sm:pl-7 border-l border-red-700/50 space-y-6">
                {rounds.map((round, index) => (
                  <div key={round.title} className="relative">
                    <span className="absolute -left-[1.73rem] sm:-left-[2.22rem] top-1 w-3 h-3 rounded-full bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.7)]" />
                    <h3 className="text-white font-semibold text-base sm:text-lg mb-2">{round.title}</h3>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{round.text}</p>
                    {index < rounds.length - 1 && <div className="mt-6 border-b border-white/10" />}
                  </div>
                ))}
              </div>
            </section>

            <section className="pt-2">
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                <div className="flex flex-col items-center gap-2">
                  <button
                    type="button"
                    disabled
                    className="text-center px-6 py-3 bg-gray-600/60 text-gray-200 font-bold uppercase tracking-wider rounded-full cursor-not-allowed border border-gray-500/50"
                  >
                    Registrations Closed
                  </button>
                  <p className="text-xs text-gray-400 tracking-wide">Stay tuned for more events!</p>
                </div>
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

export default EscapeTheMatrixEventPage;
