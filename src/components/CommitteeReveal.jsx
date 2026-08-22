import { useEffect, useState } from "react";

const highlights = [
  ["Vision", "Fresh ideas. Clear purpose."],
  ["Energy", "Built to create and collaborate."],
  ["Impact", "One team. A bigger tomorrow."],
];

const CommitteeReveal = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative isolate flex min-h-screen items-center justify-center px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_50%_20%,rgba(146,0,41,0.34),transparent_38%),linear-gradient(135deg,#000_10%,#120006_55%,#000_100%)]" />

      <div className="pointer-events-none absolute inset-0 -z-10 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:52px_52px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]" />

      {/* Decorative circles */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#bc0034]/15 shadow-[0_0_100px_rgba(188,0,52,0.22)] sm:h-[40rem] sm:w-[40rem]" />

      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#ef3b67]/30 [animation:spin_28s_linear_infinite] sm:h-[31rem] sm:w-[31rem]" />

      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[17rem] w-[17rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#bc0034]/30 [animation:spin_18s_linear_infinite_reverse] sm:h-[22rem] sm:w-[22rem]" />

      {/* Main content */}
      <section
        className={`relative w-full max-w-5xl text-center transition-all duration-1000 ${
          isLoaded
            ? "translate-y-0 opacity-100"
            : "translate-y-8 opacity-0"
        }`}
      >
        {/* Status badge */}
        <div className="mx-auto mb-7 inline-flex items-center gap-3 rounded-full border border-[#ef3b67]/35 bg-[#bc0034]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#ff6b8f] shadow-[0_0_28px_rgba(188,0,52,0.2)] sm:text-sm">
          <span className="h-2 w-2 rounded-full bg-[#ef3b67] shadow-[0_0_12px_#ef3b67]" />
          The next chapter is loading
        </div>

        {/* Society */}
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-gray-500 sm:text-sm">
          Design Society · KKWIEER
        </p>

        {/* Heading */}
        <h1 className="text-5xl font-black uppercase leading-[0.9] tracking-tight sm:text-7xl md:text-8xl lg:text-9xl">
          <span className="block text-white">Committee</span>

          <span className="mt-2 block bg-gradient-to-r from-[#ff4d77] via-[#bc0034] to-[#ff7b3d] bg-clip-text text-transparent">
            2026–27
          </span>
        </h1>

        {/* Reveal text */}
        <div className="mx-auto mt-7 flex max-w-xl items-center justify-center gap-3">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#bc0034]" />

          <span className="text-sm font-light uppercase tracking-[0.28em] text-[#f26183] sm:text-base">
            Revealing soon
          </span>

          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#bc0034]" />
        </div>

        {/* Description */}
        <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg">
          A new group of creators, builders, and leaders is preparing to take
          the stage. Meet the team that will shape the next year of DESOC—very
          soon.
        </p>

        {/* Highlights */}
        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-4 text-left sm:grid-cols-3">
          {highlights.map(([title, description], index) => (
            <div
              key={title}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 hover:border-[#bc0034]/50"
            >
              <span className="absolute right-4 top-3 text-4xl font-black text-[#bc0034]/20">
                0{index + 1}
              </span>

              <h2 className="relative text-lg font-bold text-white">
                {title}
              </h2>

              <p className="relative mt-2 text-sm leading-relaxed text-gray-400">
                {description}
              </p>
            </div>
          ))}
        </div>

        {/* Instagram button */}
        <a
          href="https://www.instagram.com/desoc.kkwieer/"
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-10 inline-flex items-center gap-3 rounded-full border border-[#bc0034]/50 bg-[#bc0034]/15 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-[#ef3b67] hover:bg-[#bc0034]/30 hover:shadow-[0_0_28px_rgba(188,0,52,0.35)]"
        >
          Follow the reveal

          <svg
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </a>
      </section>

      {/* Bottom text */}
      <p className="pointer-events-none absolute bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] uppercase tracking-[0.3em] text-gray-600 sm:text-xs">
        Watch this space
      </p>
    </main>
  );
};

export default CommitteeReveal;