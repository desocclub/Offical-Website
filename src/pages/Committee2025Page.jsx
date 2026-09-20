import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import committee2025Teams from '../data/committee2025Data';

const MemberCard = ({ member }) => (
  <article className="group relative overflow-hidden rounded-xl border border-white/10 bg-black/30 transition-all duration-300 hover:-translate-y-1 hover:border-[#bc0034]/60 hover:shadow-[0_12px_30px_rgba(188,0,52,0.18)]">
    <div className="aspect-[3/4] overflow-hidden bg-[#19050b]">
      <img src={member.image} alt={member.name} loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
    </div>
    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/90 to-transparent px-4 pb-4 pt-12">
      <h2 className="text-base font-bold leading-tight text-white">{member.name}</h2>
      <p className="mt-1 text-xs font-medium uppercase tracking-wider text-[#ef3b67]">{member.role}</p>
    </div>
  </article>
);

const Committee2025Page = () => (
  <div className="min-h-screen bg-black text-white">
    <Navbar />
    <main className="relative isolate overflow-hidden px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(127,29,29,0.2),transparent_45%),linear-gradient(135deg,#000,rgba(127,29,29,0.24),#000)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-10 [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:52px_52px]" />

      <header className="mx-auto mb-12 max-w-4xl text-center sm:mb-16">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.32em] text-[#ef3b67] sm:text-sm">DESOC Archive</p>
        <h1 className="text-4xl font-black uppercase tracking-tight text-white sm:text-6xl md:text-7xl">Committee <span className="text-[#e32b5c]">2025–26</span></h1>
        <div className="mx-auto mt-6 flex max-w-md items-center justify-center gap-3">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#bc0034]" />
          <span className="text-xs uppercase tracking-[0.24em] text-gray-400">The team behind the year</span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#bc0034]" />
        </div>
        <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-gray-400">Honouring the team whose commitment, creativity, and technical work helped shape DESOC's journey.</p>
      </header>

      <div className="mx-auto max-w-7xl space-y-12">
        {committee2025Teams.map((team) => (
          <section key={team.title} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl sm:p-8">
            <h2 className="mb-6 border-l-2 border-[#bc0034] pl-3 text-xl font-bold text-white sm:text-2xl">{team.title}</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {team.members.map((member) => <MemberCard key={member.name} member={member} />)}
            </div>
          </section>
        ))}
      </div>
    </main>
    <Footer />
  </div>
);

export default Committee2025Page;
