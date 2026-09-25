'use client';

import HeroGrid from './HeroGrid';
import ParticleField from './ParticleField';
import HeroContent from './HeroContent';

export default function Hero() {
  const handleScrollDown = () => {
    const nextSection =
      document.getElementById('events') ||
      document.querySelector('section:nth-of-type(2)') ||
      document.querySelector('main > section:nth-of-type(2)');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.9, behavior: 'smooth' });
    }
  };

  return (
    <section
      className="relative w-full min-h-[100svh] max-w-full bg-black text-white flex flex-col justify-between items-center overflow-hidden pt-16 sm:pt-20 md:pt-24 pb-3 sm:pb-5 px-3 sm:px-6 select-none font-geist"
    >
      {/* Top-Left Institutional Signature: College Logo (clg_logo.svg) - Hidden completely on mobile, brought closer to navbar and significantly enlarged */}
      <div className="hidden sm:flex absolute top-3 sm:top-4 md:top-4.5 inset-x-0 max-w-5xl mx-auto px-4 sm:px-6 z-30 pointer-events-none items-center justify-start">
        <a
          href="https://kkwagh.edu.in"
          target="_blank"
          rel="noopener noreferrer"
          title="K.K. Wagh Institute of Engineering Education & Research"
          className="pointer-events-auto block group"
        >
          <img
            src="/clg_logo.svg"
            alt="College Logo"
            className="h-[52px] sm:h-[62px] md:h-[74px] lg:h-[86px] w-auto object-contain opacity-85 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-[0_2px_16px_rgba(0,0,0,0.9)] select-none"
          />
        </a>
      </div>

      {/* Layer 1: Dotted Architectural Structural Grid */}
      <HeroGrid />

      {/* Layer 2: Dense Inertial Visual Field (Stationary Dots + Dynamic Opacity & Radius) */}
      <ParticleField />

      {/* Layer 3: Central Editorial Hero Content (Geist Sans + Restrained Geist Pixel) */}
      <HeroContent onScrollDown={handleScrollDown} />

      {/* Layer 4: Minimalist Bottom Scroll Cue */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex items-center justify-center pt-1 pb-1 pointer-events-auto">
        <button
          type="button"
          onClick={handleScrollDown}
          className="flex items-center gap-2 text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-zinc-500 hover:text-zinc-300 font-geist-mono transition-colors duration-200 cursor-pointer select-none py-1"
          aria-label="Scroll to content"
        >
          <span className="h-px w-5 sm:w-8 bg-zinc-800" />
          <span>SCROLL</span>
          <span className="text-[#c084fc] transition-transform duration-200 hover:translate-y-0.5">↓</span>
          <span className="h-px w-5 sm:w-8 bg-zinc-800" />
        </button>
      </div>
    </section>
  );
}
