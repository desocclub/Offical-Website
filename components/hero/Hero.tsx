'use client';

import HeroGrid from './HeroGrid';
import DitheringBackground from './DitheringBackground';
import HeroContent from './HeroContent';

export default function Hero() {
  return (
    <section
      className="relative w-full min-h-[100svh] max-w-full bg-black text-white flex flex-col justify-center items-center overflow-hidden pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-12 px-3 sm:px-6 select-none font-geist"
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

      {/* Layer 1: Dynamic Dithering Shader Background (Powered by Cult UI's underlying @paper-design/shaders-react engine) */}
      <DitheringBackground />

      {/* Layer 2: Subtle Central Readability Vignette (Seamless on desktop; mobile protected locally) */}
      <div 
        className="hidden sm:block absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0.15)_48%,transparent_80%)] pointer-events-none z-[2]" 
        aria-hidden="true"
      />

      {/* Layer 3: Sparse Architectural Structural Grid with Exact Crosshair Alignment */}
      <HeroGrid />

      {/* Layer 4: Central Editorial Hero Content (Geist Sans + Restrained Geist Pixel) */}
      <HeroContent />
    </section>
  );
}
