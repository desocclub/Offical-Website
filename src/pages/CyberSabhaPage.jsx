import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import cyberSabhaFlyer from '../assets/cybersabha.jpeg';

const pillars = [
  { number: '01', title: 'Ethics', tagline: 'Responsible Tech Use', description: 'Explore responsible development and use of technology, AI, and digital systems while considering their impact on individuals and society.' },
  { number: '02', title: 'Data', tagline: 'Privacy & Fairness', description: 'Discuss data privacy, responsible data usage, algorithmic fairness, security, and protection of personal information.' },
  { number: '03', title: 'Growth', tagline: 'Inclusive & Equitable', description: 'Explore how technological innovation can be made accessible, inclusive, and beneficial to different sections of society.' },
  { number: '04', title: 'Future', tagline: 'Sustainable & Resilient', description: 'Discuss sustainable, secure, and resilient digital systems capable of addressing future technological and societal challenges.' },
];

const technologyDelegations = ['Amazon', 'PhonePe', 'Infosys', 'Meta', 'NVIDIA', 'Google', 'Apple', 'Microsoft', 'OpenAI', 'Zomato', 'Oracle', 'TCS', 'BrowserStack'];
const policyDelegations = ['Ministry of Electronics & Information Technology', 'Ministry of Housing & Urban Affairs', 'World Intellectual Property Organization (WIPO)', 'Reserve Bank of India (RBI)', 'Ministry of Education', 'IIT Bombay', 'Ministry of Law & Justice'];
const assemblySteps = ['Research', 'Represent', 'Debate', 'Negotiate', 'Collaborate', 'Resolve'];
const skills = ['Public speaking', 'Critical thinking', 'Research & analysis', 'Policy thinking', 'Negotiation', 'Diplomacy', 'Teamwork', 'Leadership', 'Problem-solving', 'Technology & governance'];
const experiences = ['Research and preparation', 'Opening statements and short speeches', 'Structured discussions and policy debates', 'Cross-questioning and negotiations', 'Collaboration between delegations', 'Development of solutions and resolutions', 'Final presentation or conclusion'];

const EditorialHeading = ({ eyebrow, title, description, align = 'left' }) => (
  <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
    <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-red-700">{eyebrow}</p>
    <h2 className="font-serif text-4xl font-black uppercase leading-[0.93] tracking-tight text-[#17120f] sm:text-5xl md:text-6xl">{title}</h2>
    {description && <p className="mt-5 text-base leading-relaxed text-stone-600 sm:text-lg">{description}</p>}
  </div>
);

const CyberSabhaPage = () => (
  <div className="min-h-screen bg-[#e9e5dc] text-[#17120f]" style={{ fontFamily: "'Roboto Condensed', system-ui, sans-serif" }}>
    <Navbar hideOnHeroScroll />

    <main>
      <section className="relative isolate min-h-[48rem] overflow-hidden bg-[#11100e] px-4 pb-20 pt-28 text-[#f5f0e7] sm:px-6 lg:px-8">
        <img src={cyberSabhaFlyer} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 -z-30 h-full w-full object-cover object-center opacity-35 grayscale contrast-125 brightness-75 mix-blend-screen" />
        <div className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(10,9,7,0.99)_0%,rgba(10,9,7,0.94)_38%,rgba(10,9,7,0.52)_100%)]" />
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="pointer-events-none absolute -right-36 top-28 -z-10 h-96 w-96 rounded-full border border-red-500/25 shadow-[0_0_120px_rgba(185,28,28,0.34)]" />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-[#e9e5dc] to-transparent" />

        <div className="mx-auto grid min-h-[37rem] max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="max-w-4xl">
            <div className="mb-7 inline-flex items-center gap-3 border-y border-[#d7cec0]/50 py-2 text-[11px] font-bold uppercase tracking-[0.25em] text-[#f2e8d7] sm:text-xs">
              <span className="h-2 w-2 rounded-full bg-red-600 shadow-[0_0_16px_rgba(220,38,38,0.9)]" />
              DESOC KKWIEER
            </div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.32em] text-red-400 sm:text-sm">The Grand Tech Assembly</p>
            <h1 className="font-serif text-6xl font-black uppercase leading-[0.8] tracking-[-0.06em] text-[#f6f0e6] sm:text-8xl md:text-9xl lg:text-[10rem]">Cyber<span className="block">Sabha</span></h1>
            <div className="mt-8 flex items-center gap-3">
              <div className="h-px w-10 bg-red-500 sm:w-20" />
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-200 sm:text-base">Governing the Digital Frontier</p>
            </div>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-stone-300 sm:text-xl">A technology and policy simulation where students represent leading organizations, debate real digital challenges, negotiate ideas, and shape practical solutions.</p>
            <div className="mt-10 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 sm:text-xs"><span className="h-9 w-px bg-red-600" />Scroll to enter the assembly</div>
          </div>

          <aside className="relative mx-auto hidden w-full max-w-sm lg:block">
            <div className="absolute -inset-4 border border-[#f2e8d7]/15" />
            <div className="relative overflow-hidden border border-[#f2e8d7]/50 bg-[#e9e5dc] p-2 text-[#17120f] shadow-[0_25px_70px_rgba(0,0,0,0.45)]">
              <div className="relative h-72 overflow-hidden border border-[#17120f] bg-[#17120f]">
                <img src={cyberSabhaFlyer} alt="" aria-hidden="true" className="h-full w-full object-cover object-center grayscale contrast-125" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.1),rgba(0,0,0,0.62))]" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-[#f5f1e9]"><span className="text-[10px] font-bold uppercase tracking-[0.3em] text-red-300">Assembly dossier</span><p className="mt-2 font-serif text-3xl font-black uppercase leading-none">Digital<br />Frontier</p></div>
              </div>
              <div className="grid grid-cols-2 gap-px bg-[#17120f] p-px">
                <div className="bg-[#e9e5dc] p-4"><span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-red-700">Focus</span><span className="mt-2 block font-serif text-xl font-bold uppercase leading-none">Technology<br />& Policy</span></div>
                <div className="bg-[#e9e5dc] p-4"><span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-red-700">Method</span><span className="mt-2 block font-serif text-xl font-bold uppercase leading-none">Debate<br />& Resolve</span></div>
              </div>
            </div>
          </aside>
        </div>

        <div className="absolute bottom-6 left-0 right-0 overflow-hidden border-y border-[#f2e8d7]/20 bg-black/30 py-2.5 backdrop-blur-sm">
          <div className="flex min-w-max justify-center gap-8 px-4 text-[10px] font-bold uppercase tracking-[0.24em] text-[#e8dfd0] sm:gap-14 sm:text-xs">
            {['Ethics', 'Data', 'Growth', 'Future', 'Ethics', 'Data', 'Growth', 'Future'].map((item, index) => <span key={`${item}-${index}`} className="flex items-center gap-3"><span className="h-1.5 w-1.5 rounded-full bg-red-500" />{item}</span>)}
          </div>
        </div>
      </section>

      <section id="about" className="border-y border-stone-300 bg-[#e9e5dc] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <EditorialHeading eyebrow="The Brief" title="A forum for the digital age." description="CyberSabha gives students the opportunity to step into the roles of major technology companies and policy institutions. Delegations present an organization's perspective, engage in structured debate, negotiate with peers, and work toward solutions for contemporary digital challenges." />
          <div className="border-l-4 border-red-700 bg-[#d9d2c5]/60 p-7 sm:p-9">
            <p className="font-serif text-2xl font-bold leading-snug text-[#2a211c] sm:text-3xl">Technology. Policy. Ethics. Governance.</p>
            <p className="mt-4 leading-relaxed text-stone-600">The assembly brings together communication, critical thinking, negotiation, and collaborative problem-solving in a competitive, team-based setting.</p>
          </div>
        </div>
      </section>

      <section className="bg-[#f5f1e9] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <EditorialHeading eyebrow="The Digital Frontier" title="Four pillars. One shared responsibility." description="The conversations at CyberSabha begin with the questions that shape how technology serves society." />
          <div className="mt-12 grid grid-cols-1 border-l border-t border-stone-300 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar) => (
              <article key={pillar.title} className="group min-h-72 border-b border-r border-stone-300 p-6 transition-colors hover:bg-[#17120f] sm:p-7">
                <span className="text-xs font-bold tracking-[0.25em] text-red-700 group-hover:text-red-400">{pillar.number}</span>
                <h3 className="mt-8 font-serif text-4xl font-black uppercase text-[#17120f] group-hover:text-[#f5f1e9]">{pillar.title}</h3>
                <p className="mt-2 text-sm font-bold uppercase tracking-wider text-red-700 group-hover:text-red-300">{pillar.tagline}</p>
                <p className="mt-5 text-sm leading-relaxed text-stone-600 group-hover:text-stone-300">{pillar.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#17120f] px-4 py-20 text-[#f5f1e9] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-red-400">Assembly Protocol</p>
              <h2 className="font-serif text-5xl font-black uppercase leading-[0.9] sm:text-6xl">How CyberSabha works.</h2>
              <p className="mt-6 max-w-md leading-relaxed text-stone-400">Participants work in teams and represent an assigned organization or institution throughout the assembly.</p>
            </div>
            <ol className="grid grid-cols-2 gap-px overflow-hidden border border-[#f5f1e9]/20 bg-[#f5f1e9]/20 sm:grid-cols-3">
              {assemblySteps.map((step, index) => <li key={step} className="min-h-32 bg-[#17120f] p-5 sm:p-6"><span className="block text-xs font-bold tracking-wider text-red-400">0{index + 1}</span><span className="mt-6 block font-serif text-2xl font-bold uppercase">{step}</span></li>)}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-[#e9e5dc] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <EditorialHeading eyebrow="The Delegations" title="Technology meets public purpose." description="Every delegation brings a distinct perspective to the floor: from innovation and platforms to regulation, institutions, and public interest." />
          <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <div className="mb-6 flex items-end justify-between border-b-2 border-[#17120f] pb-3"><h3 className="font-serif text-3xl font-black uppercase">Technology</h3><span className="text-xs font-bold uppercase tracking-wider text-red-700">Company delegations</span></div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">{technologyDelegations.map((name) => <div key={name} className="flex min-h-24 items-end border border-stone-300 bg-[#f5f1e9] p-4 font-serif text-xl font-bold leading-tight text-[#17120f] transition hover:-translate-y-1 hover:border-red-700 hover:bg-[#17120f] hover:text-[#f5f1e9]">{name}</div>)}</div>
            </div>
            <div>
              <div className="mb-6 flex items-end justify-between border-b-2 border-[#17120f] pb-3"><h3 className="font-serif text-3xl font-black uppercase">Policy</h3><span className="text-xs font-bold uppercase tracking-wider text-red-700">Institutions</span></div>
              <div className="space-y-2">{policyDelegations.map((name, index) => <div key={name} className="group flex items-center gap-4 border border-stone-300 bg-[#f5f1e9] p-4 transition hover:border-red-700 hover:bg-[#17120f]"><span className="font-serif text-2xl font-black text-red-700 group-hover:text-red-400">0{index + 1}</span><span className="font-semibold text-[#17120f] group-hover:text-[#f5f1e9]">{name}</span></div>)}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-stone-300 bg-[#f5f1e9] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 lg:grid-cols-2">
          <div>
            <EditorialHeading eyebrow="Inside the Assembly" title="What participants experience." />
            <div className="mt-8 space-y-3">{experiences.map((experience) => <div key={experience} className="flex items-center gap-4 border-b border-stone-300 py-3"><span className="text-red-700">◆</span><p className="font-medium text-stone-700">{experience}</p></div>)}</div>
          </div>
          <div className="border border-[#17120f] bg-[#17120f] p-7 text-[#f5f1e9] sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-red-400">Skills & Learning</p>
            <h2 className="mt-4 font-serif text-4xl font-black uppercase leading-[0.92] sm:text-5xl">Build a sharper point of view.</h2>
            <div className="mt-8 flex flex-wrap gap-2">{skills.map((skill) => <span key={skill} className="border border-[#f5f1e9]/25 px-3 py-2 text-sm text-stone-200">{skill}</span>)}</div>
          </div>
        </div>
      </section>

      <section className="bg-[#e9e5dc] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <EditorialHeading eyebrow="Why CyberSabha" title="Competitive by design. Collaborative by nature." align="center" />
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {['Technology-focused MUN-style simulation', 'Real-world technology and governance challenges', 'Detailed study resources for participants', 'Cash prizes and rewards for winning teams'].map((highlight, index) => <article key={highlight} className="border-t-4 border-red-700 bg-[#f5f1e9] p-6 shadow-sm"><span className="font-serif text-4xl font-black text-stone-300">0{index + 1}</span><p className="mt-9 font-serif text-2xl font-bold leading-tight">{highlight}</p></article>)}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#17120f] px-4 py-24 text-center text-[#f5f1e9] sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-600/25 shadow-[0_0_120px_rgba(185,28,28,0.25)]" />
        <div className="relative mx-auto max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-red-400">CYBERSABHA — The Grand Tech Assembly</p>
          <h2 className="mt-6 font-serif text-5xl font-black uppercase leading-[0.86] sm:text-7xl">Shape technology that is responsible, inclusive, and resilient.</h2>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-stone-400">The digital frontier belongs to those ready to question, collaborate, and lead with purpose.</p>
          <Link to="/" className="mt-9 inline-flex border border-[#f5f1e9]/50 px-6 py-3 text-sm font-bold uppercase tracking-wider transition hover:bg-[#17131f] hover:text-[#17120f]">Back to DESOC</Link>
        </div>
      </section>
    </main>

    <Footer />
  </div>
);

export default CyberSabhaPage;
