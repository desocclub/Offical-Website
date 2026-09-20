import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SectionCard = ({ title, subtitle, children }) => (
  <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] p-5 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] backdrop-blur-2xl sm:rounded-3xl sm:p-8 md:p-10">
    <div className="pointer-events-none absolute -right-40 -top-40 h-80 w-80 rounded-full bg-[#bc0034]/10 blur-3xl" />
    <div className="relative z-10">
      <div className="mb-8 flex items-center sm:mb-10">
        <div className="mr-4 h-10 w-1 shrink-0 rounded-full bg-gradient-to-b from-[#bc0034] to-[#7a001f] shadow-[0_0_10px_rgba(188,0,52,0.5)]" />
        <div>
          <h2 className="text-2xl font-bold tracking-wide text-white sm:text-3xl md:text-4xl">{title}</h2>
          {subtitle && <p className="mt-1 text-xs uppercase tracking-wider text-[#e32b5c] sm:text-sm">{subtitle}</p>}
        </div>
      </div>
      {children}
    </div>
  </section>
);

const AlumniPage = () => (
  <div className="min-h-screen bg-black text-white">
    <Navbar />
    <main className="relative isolate px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(127,29,29,0.15),transparent_45%),radial-gradient(ellipse_at_bottom_left,rgba(153,27,27,0.1),transparent_45%),#000]" />

      <header className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">DESOC Alumni</h1>
        <div className="my-5 flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#bc0034]" />
          <span className="text-lg font-light tracking-widest text-[#e32b5c] sm:text-xl">Our Legacy, Our Community</span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#bc0034]" />
        </div>
        <p className="text-base leading-relaxed text-gray-400 sm:text-lg">Celebrating the people who shaped DESOC and continue to carry its spirit beyond campus.</p>
      </header>

      <div className="mx-auto max-w-7xl space-y-10 sm:space-y-14">
        <SectionCard title="Alumni Overview" subtitle="Staying connected, giving back">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-10">
            <div className="space-y-5 lg:col-span-3">
              <p className="leading-relaxed text-gray-300">DESOC alumni remain an important part of our community. Their leadership, creativity, and technical work set the foundation for every new committee that follows.</p>
              <p className="leading-relaxed text-gray-300">This space connects former members with current students for mentorship, collaboration, career guidance, and future DESOC initiatives.</p>
            </div>
            <div className="flex items-center justify-center lg:col-span-2">
              <div className="flex h-44 w-44 flex-col items-center justify-center rounded-full border border-[#bc0034]/30 bg-[#bc0034]/10 text-center shadow-[0_0_45px_rgba(188,0,52,0.16)] sm:h-52 sm:w-52">
                <span className="text-4xl font-extrabold text-white">DESOC</span>
                <span className="mt-1 text-xs uppercase tracking-widest text-[#ef3b67]">Alumni Network</span>
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Stay Connected" subtitle="Connect, collaborate, grow">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10">
            <div className="space-y-5">
              <p className="leading-relaxed text-gray-300">The DESOC alumni network is a place to reconnect with batchmates, share opportunities, support new members, and build meaningful collaborations beyond college.</p>
              <p className="leading-relaxed text-gray-300">Alumni who would like to mentor students, share an opportunity, or take part in a DESOC event can reach the team through our official channels.</p>
            </div>
            <div className="space-y-4">
              {[
                { label: 'LinkedIn', description: 'Professional updates, community news, and opportunities.', href: 'https://www.linkedin.com/in/desoc-club-of-csd-kkwieer-94232b2ba/' },
                { label: 'Instagram', description: 'Alumni highlights, memories, and DESOC event updates.', href: 'https://www.instagram.com/desoc.kkwieer/' },
                { label: 'GitHub', description: 'Explore DESOC projects and continue collaborating.', href: 'https://github.com/DESOC-CSD' },
              ].map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="group block rounded-xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-[#bc0034]/40 hover:bg-white/10">
                  <h3 className="font-semibold text-white transition-colors group-hover:text-[#ef3b67]">{link.label}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-gray-400">{link.description}</p>
                </a>
              ))}
            </div>
          </div>
        </SectionCard>
      </div>
    </main>
    <Footer />
  </div>
);

export default AlumniPage;
