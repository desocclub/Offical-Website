import { Link } from 'react-router-dom';

const Committee = () => (
  <section id="committee" className="relative overflow-hidden bg-gradient-to-b from-black via-[#0a0a0a] to-[#1a050b] py-20 sm:py-28">
    <div className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#bc0034]/20 shadow-[0_0_90px_rgba(188,0,52,0.2)]" />
    <div className="pointer-events-none absolute left-1/2 top-1/2 h-[20rem] w-[20rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#ef3b67]/25 [animation:spin_28s_linear_infinite]" />

    <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.32em] text-[#ef3b67]">The next chapter</p>
      <h2 className="text-4xl font-black uppercase leading-none tracking-tight text-white sm:text-6xl md:text-7xl">
        Committee <span className="block mt-2 bg-gradient-to-r from-[#ff4d77] via-[#bc0034] to-[#ff7b3d] bg-clip-text text-transparent">2026–27</span>
      </h2>
      <div className="mx-auto mt-6 flex max-w-md items-center justify-center gap-3">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#bc0034]" />
        <span className="text-xs uppercase tracking-[0.24em] text-gray-400">Revealing soon</span>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#bc0034]" />
      </div>
      <p className="mx-auto mt-6 max-w-xl leading-relaxed text-gray-400">A new team of creators, builders, and leaders is preparing to take the stage.</p>
      <Link to="/committee" className="group mt-9 inline-flex items-center gap-3 rounded-full border border-[#bc0034]/50 bg-[#bc0034]/15 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-[#ef3b67] hover:bg-[#bc0034]/30 hover:shadow-[0_0_28px_rgba(188,0,52,0.35)]">
        Explore the committee
        <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </Link>
    </div>
  </section>
);

export default Committee;
