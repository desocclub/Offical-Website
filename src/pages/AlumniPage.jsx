import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import adityaImg from '../assets/members/aditya1.png';
import ayushiImg from '../assets/members/ayushi.svg';
import vedantImg from '../assets/members/vedant.svg';
import ishaniImg from '../assets/members/ishani.svg';
import jeetImg from '../assets/members/jeet.svg';
import monishImg from '../assets/members/monish.svg';
import sanskrutiImg from '../assets/members/sanskruti.svg';
import pranitaImg from '../assets/members/pranita.svg';
import shrimantImg from '../assets/members/shrimant.svg';
import omcImg from '../assets/members/omc.jpeg';
import piyushImg from '../assets/members/piyush.svg';
import rajanImg from '../assets/members/rajan.svg';
import dishaImg from '../assets/members/disha.svg';
import madhuraImg from '../assets/members/madhura.svg';
import zaweriyaImg from '../assets/members/zewariya.svg';
import atharvaImg from '../assets/members/atharva.svg';
import omImg from '../assets/members/om.svg';
import kshitijaImg from '../assets/members/kshitija.svg';
import nehaImg from '../assets/members/neha.svg';
import parthImg from '../assets/members/parth.svg';
import sahilImg from '../assets/members/sahil.svg';
import riyaImg from '../assets/members/riya.svg';
import swaradaImg from '../assets/members/swarada.svg';
import shravaniImg from '../assets/members/shravani.svg';
import prashantImg from '../assets/members/prashant.svg';
import siddharthImg from '../assets/members/siddharth.svg';

const committeeTeams = [
  {
    title: 'Core Committee',
    members: [
      { name: 'Aditya Ahirrao', role: 'President', image: adityaImg },
      { name: 'Ayushi Deore', role: 'Vice President', image: ayushiImg },
      { name: 'Vedant Sonawane', role: 'Event Operations Head', image: vedantImg },
      { name: 'Ishani Murkewar', role: 'Secretary', image: ishaniImg },
      { name: 'Jeet Patil', role: 'Technical Head', image: jeetImg },
      { name: 'Monish Patil', role: 'Creative Head', image: monishImg },
      { name: 'Sanskruti Gite', role: 'Treasurer', image: sanskrutiImg },
      { name: 'Pranita Patil', role: 'Co-Treasurer', image: pranitaImg },
    ],
  },
  {
    title: 'Technical Team',
    members: [
      { name: 'Shrimant Marathe', role: 'Technical Team', image: shrimantImg },
      { name: 'Om Chaudhari', role: 'Technical Team', image: omcImg },
      { name: 'Piyush Shendge', role: 'Technical Team' },
      { name: 'Rajan Udapure', role: 'Technical Team', image: rajanImg },
    ],
  },
  {
    title: 'Editorial Team',
    members: [
      { name: 'Disha Kapse', role: 'Editorial Team', image: dishaImg },
      { name: 'Madhura Katti', role: 'Editorial Team', image: madhuraImg },
      { name: 'Zaweriya Khan', role: 'Editorial Team', image: zaweriyaImg },
    ],
  },
  {
    title: 'Event Operations Team',
    members: [
      { name: 'Atharva Kulkarni', role: 'Event Operations', image: atharvaImg },
      { name: 'Om Patil', role: 'Event Operations', image: omImg },
      { name: 'Kshitija Daware', role: 'Event Operations', image: kshitijaImg },
      { name: 'Neha Bhamare', role: 'Event Operations', image: nehaImg },
      { name: 'Parth Waje', role: 'Event Operations', image: parthImg },
      { name: 'Sahil Batheja', role: 'Event Operations', image: sahilImg },
    ],
  },
  {
    title: 'Creative Team',
    members: [
      { name: 'Riya Sequeira', role: 'Creative Team', image: riyaImg },
      { name: 'Swarada Joshi', role: 'Creative Team', image: swaradaImg },
      { name: 'Shravani Bhagwat', role: 'Creative Team', image: shravaniImg },
      { name: 'Prashant Deokar', role: 'Creative Team', image: prashantImg },
      { name: 'Siddharth Wade', role: 'Creative Team', image: siddharthImg },
    ],
  },
];

const GlassCard = ({ children, delay = 0, isLoaded }) => (
  <section
    className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] p-5 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] backdrop-blur-2xl transition-all duration-700 sm:rounded-3xl sm:p-8 md:p-10 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
    style={{ transitionDelay: `${delay}ms` }}
  >
    <div className="pointer-events-none absolute -right-40 -top-40 h-80 w-80 rounded-full bg-[#bc0034]/10 blur-3xl" />
    <div className="pointer-events-none absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-[#7a001f]/10 blur-3xl" />
    <div className="relative z-10">{children}</div>
  </section>
);

const SectionTitle = ({ children, sub }) => (
  <div className="mb-8 flex items-center sm:mb-10">
    <div className="mr-4 h-10 w-1 shrink-0 rounded-full bg-gradient-to-b from-[#bc0034] to-[#7a001f] shadow-[0_0_10px_rgba(188,0,52,0.5)]" />
    <div>
      <h2 className="text-2xl font-bold tracking-wide text-white sm:text-3xl md:text-4xl">{children}</h2>
      {sub && <p className="mt-1 text-xs uppercase tracking-wider text-[#e32b5c] sm:text-sm">{sub}</p>}
    </div>
  </div>
);

const CommitteeAlumniCard = ({ member }) => (
  <article className="group relative overflow-hidden rounded-xl border border-white/10 bg-black/30 transition-all duration-300 hover:-translate-y-1 hover:border-[#bc0034]/60 hover:shadow-[0_12px_30px_rgba(188,0,52,0.18)]">
    <div className="aspect-[3/4] overflow-hidden bg-[#19050b]">
      <img src={member.image} alt={member.name} loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
    </div>
    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/90 to-transparent px-4 pb-4 pt-12">
      <h3 className="text-base font-bold leading-tight text-white">{member.name}</h3>
      <p className="mt-1 text-xs font-medium uppercase tracking-wider text-[#ef3b67]">{member.role}</p>
    </div>
  </article>
);

const AlumniPage = () => {
  const isLoaded = true;

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="relative">
        <div className="fixed inset-0 -z-10 bg-[linear-gradient(135deg,#000,rgba(127,29,29,0.3)_50%,#000)]" />
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(127,29,29,0.15),transparent_50%)]" />
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_left,rgba(153,27,27,0.1),transparent_50%)]" />

        <main className="relative mx-auto max-w-7xl px-4 pb-16 pt-24 sm:px-6 lg:px-8">
          <header className={`mb-12 text-center transition-all duration-1000 sm:mb-16 md:mb-20 ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">DESOC Alumni</h1>
            <div className="mb-6 flex items-center justify-center gap-3">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#bc0034]" />
              <span className="text-lg font-light tracking-widest text-[#e32b5c] sm:text-xl md:text-2xl">Our Legacy, Our Community</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#bc0034]" />
            </div>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg">
              Celebrating the people who shaped DESOC and continue to carry its spirit beyond campus.
            </p>

          </header>

          <div className="space-y-10 sm:space-y-14">
            <GlassCard delay={100} isLoaded={isLoaded}>
              <SectionTitle sub="Staying connected, giving back">Alumni Overview</SectionTitle>
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-10">
                <div className="space-y-5 lg:col-span-3">
                  <p className="leading-relaxed text-gray-300">DESOC alumni remain an important part of our community. Their leadership, creativity, and technical work set the foundation for every new committee that follows.</p>
                  <p className="leading-relaxed text-gray-300">This space preserves the journey of former teams and helps current students stay connected for mentorship, collaboration, career guidance, and future DESOC initiatives.</p>
                </div>
                <div className="flex items-center justify-center lg:col-span-2">
                  <div className="flex h-44 w-44 flex-col items-center justify-center rounded-full border border-[#bc0034]/30 bg-[#bc0034]/10 text-center shadow-[0_0_45px_rgba(188,0,52,0.16)] sm:h-52 sm:w-52">
                    <span className="text-4xl font-extrabold text-white">DESOC</span>
                    <span className="mt-1 text-xs uppercase tracking-widest text-[#ef3b67]">Alumni Network</span>
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard delay={200} isLoaded={isLoaded}>
              <SectionTitle sub="Honouring the team that built the foundation">Committee 2025–26</SectionTitle>
              <p className="mb-10 max-w-3xl leading-relaxed text-gray-300">The Committee of 2025–26 now joins the DESOC alumni community. We are grateful for their contribution, commitment, and the lasting impact they made across every part of the society.</p>
              <div className="space-y-10">
                {committeeTeams.map((team) => (
                  <section key={team.title}>
                    <h3 className="mb-5 border-l-2 border-[#bc0034] pl-3 text-lg font-semibold text-white sm:text-xl">{team.title}</h3>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                      {team.members.map((member) => <CommitteeAlumniCard key={member.name} member={member} />)}
                    </div>
                  </section>
                ))}
              </div>
            </GlassCard>

            <GlassCard delay={300} isLoaded={isLoaded}>
              <SectionTitle sub="Connect, collaborate, grow">Stay Connected</SectionTitle>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10">
                <div className="space-y-5">
                  <p className="leading-relaxed text-gray-300">The DESOC alumni network is a place to reconnect with batchmates, share opportunities, support new members, and build meaningful collaborations beyond college.</p>
                  <p className="leading-relaxed text-gray-300">Alumni who would like to mentor students, share an opportunity, or take part in a DESOC event can reach the team through our official channels.</p>
                </div>
                <div className="space-y-4">
                  {[
                    { label: 'LinkedIn', description: 'Professional updates, community news, and opportunities.', href: 'https://www.linkedin.com/in/desoc-club-of-csd-kkwieer-94232b2ba/' },
                    { label: 'Instagram', description: 'Alumni highlights, memories, and DESOC event updates.', href: 'https://www.instagram.com/desoc.kkwieer/' },
                    ].map((link) => (
                    <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="group block rounded-xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-[#bc0034]/40 hover:bg-white/10">
                      <h3 className="font-semibold text-white transition-colors group-hover:text-[#ef3b67]">{link.label}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-gray-400">{link.description}</p>
                    </a>
                  ))}
                </div>
              </div>
            </GlassCard>
          </div>

          <div className={`mt-16 flex justify-center transition-all duration-1000 sm:mt-20 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '900ms' }}>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-[#bc0034] shadow-[0_0_10px_rgba(220,38,38,0.8)]" />
              <div className="h-px w-10 bg-gradient-to-r from-[#bc0034] to-transparent sm:w-16" />
              <span className="text-xs uppercase tracking-widest text-gray-500 sm:text-sm">DESOC Alumni — KKWIEER</span>
              <div className="h-px w-10 bg-gradient-to-l from-[#bc0034] to-transparent sm:w-16" />
              <div className="h-2 w-2 rounded-full bg-[#bc0034] shadow-[0_0_10px_rgba(220,38,38,0.8)]" />
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AlumniPage;
