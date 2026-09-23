'use client';

import Link from 'next/link';
import ParticleHeroBackground from './ParticleHeroBackground';

const Hero = () => {
  const handleScrollDown = () => {
    const nextSection = document.getElementById('events') || document.querySelector('section:nth-of-type(2)');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' });
    }
  };

  return (
    <section
      className="relative w-full min-h-screen max-w-full bg-black text-white flex flex-col justify-between items-center overflow-hidden pt-20 sm:pt-24 pb-5 sm:pb-8 px-3 sm:px-6 select-none font-editorial-sans"
    >
      {/* Interactive Dotted Particle Shader Canvas */}
      <ParticleHeroBackground />

      {/* Main Editorial Headline & Content Area */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center max-w-5xl mx-auto w-full px-2 sm:px-4 pt-3 pb-2">

        {/* Editorial Headline */}
        <h1 className="text-[26px] min-[360px]:text-[29px] min-[390px]:text-[32px] min-[430px]:text-[35px] sm:text-[50px] md:text-[66px] lg:text-[78px] xl:text-[84px] font-semibold tracking-[-0.035em] leading-[1.15] sm:leading-[1.08] text-white flex flex-col items-center w-full max-w-full">

          {/* LINE 1: "We design" */}
          <div className="relative inline-flex items-center justify-center flex-wrap max-w-full">
            <span className="mr-1.5 sm:mr-3.5">We</span>

            {/* "design" Figma-style Bounded Box */}
            <div className="relative inline-flex items-center border border-[#ff3366] px-2 sm:px-3.5 py-0 rounded-xs group cursor-default transition-shadow duration-300 hover:shadow-[0_0_15px_rgba(255,51,102,0.4)]">
              {/* Corner Handles */}
              <span className="figma-handle -top-[2.5px] sm:-top-[3px] -left-[2.5px] sm:-left-[3px]" />
              <span className="figma-handle -top-[2.5px] sm:-top-[3px] -right-[2.5px] sm:-right-[3px]" />
              <span className="figma-handle -bottom-[2.5px] sm:-bottom-[3px] -left-[2.5px] sm:-left-[3px]" />
              <span className="figma-handle -bottom-[2.5px] sm:-bottom-[3px] -right-[2.5px] sm:-right-[3px]" />

              {/* Dimension measurement ticks above box */}
              <div className="absolute -top-5 sm:-top-6.5 left-0 right-0 flex justify-between px-0.5 text-[8px] sm:text-[10px] text-[#ff3366] font-editorial-mono pointer-events-none">
                <span className="flex flex-col items-center leading-none tracking-normal">
                  <span className="h-1.5 sm:h-2 w-[1px] bg-[#ff3366] mb-1" />
                  28px
                </span>
                <span className="flex flex-col items-center leading-none tracking-normal">
                  <span className="h-1.5 sm:h-2 w-[1px] bg-[#ff3366] mb-1" />
                  28px
                </span>
              </div>

              <span>design</span>
            </div>
          </div>

          {/* LINE 2: "ideas, build" */}
          <div className="relative inline-flex items-center justify-center flex-wrap max-w-full mt-0.5">
            {/* Outlined text "ideas," */}
            <span className="hero-stroke-text mr-1.5 sm:mr-3.5 tracking-tight cursor-default">
              ideas,
            </span>

            {/* Solid text "build" */}
            <span>build</span>
          </div>

          {/* LINE 3: "with code," */}
          <div className="relative inline-flex items-center justify-center flex-wrap max-w-full mt-0.5">
            <span className="mr-1.5 sm:mr-3.5">with</span>
            <span>code,</span>
          </div>

          {/* LINE 4: "and create together." */}
          <div className="relative inline-flex items-center justify-center flex-wrap max-w-full mt-0.5">
            <span className="mr-1.5 sm:mr-3">and</span>

            {/* Italic Serif "create" */}
            <span className="font-editorial-serif italic font-normal text-white text-[1.12em] tracking-wide mx-1">
              create
            </span>

            <span className="ml-1 sm:ml-1.5">together</span>
            <span className="text-[#ff3366] font-bold">.</span>
          </div>
        </h1>

        {/* Short Editorial Supporting Copy */}
        <p className="text-neutral-400 font-light text-[12.5px] min-[360px]:text-xs sm:text-sm md:text-base max-w-[280px] min-[360px]:max-w-[320px] sm:max-w-md mx-auto mt-4 sm:mt-7 leading-relaxed tracking-wide">
          DESOC is a student community exploring<br className="hidden sm:inline" />
          {' '}design, technology and everything in between.
        </p>

        {/* CTA Stack */}
        <div className="flex flex-col items-center gap-2.5 sm:gap-3 mt-5 sm:mt-8 w-full max-w-xs">
          {/* Primary CTA Button */}
          <Link
            href="/about"
            className="cta-editorial inline-flex items-center justify-center gap-2 sm:gap-2.5 px-6 sm:px-7 py-2.5 rounded-full bg-black/60 hover:bg-[#ff3366]/10 border border-[#ff3366]/40 hover:border-[#ff3366] text-white text-xs sm:text-sm font-medium tracking-wide shadow-[0_0_20px_rgba(255,51,102,0.15)] cursor-pointer backdrop-blur-md transition-all duration-300 min-h-[42px] group"
          >
            <span>Explore DESOC</span>
            <span className="text-[#ff3366] transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>

          {/* Secondary Action */}
          <button
            type="button"
            onClick={handleScrollDown}
            className="text-neutral-400 hover:text-white text-xs font-light tracking-wide transition-colors flex items-center gap-1 cursor-pointer py-1.5 min-h-[36px]"
          >
            <span>Learn more</span>
            <span className="text-[#ff3366]">↓</span>
          </button>
        </div>
      </div>

      {/* Bottom Row: Left Grid Annotation & Centered Scroll Indicator */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex items-end justify-between px-2 sm:px-4 mt-4 sm:mt-0">
        {/* Bottom Left Grid Annotation (Tablet/Desktop only) */}
        <div className="hidden sm:flex items-center gap-2 text-[10px] text-white/40 font-editorial-mono pointer-events-none">
          <div className="grid grid-cols-3 gap-0.5 w-3.5">
            <span className="w-0.5 h-0.5 bg-white/40 rounded-full" />
            <span className="w-0.5 h-0.5 bg-white/40 rounded-full" />
            <span className="w-0.5 h-0.5 bg-white/40 rounded-full" />
            <span className="w-0.5 h-0.5 bg-white/40 rounded-full" />
            <span className="w-0.5 h-0.5 bg-white/40 rounded-full" />
            <span className="w-0.5 h-0.5 bg-white/40 rounded-full" />
          </div>
          <div className="flex flex-col leading-none">
            <span>grid</span>
            <span className="text-white/60">8px</span>
          </div>
        </div>

        {/* Centered Scroll Indicator */}
        <div
          onClick={handleScrollDown}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') handleScrollDown();
          }}
          className="mx-auto flex items-center gap-2 sm:gap-3 text-[8.5px] sm:text-[10px] tracking-[0.16em] sm:tracking-[0.22em] text-neutral-500 hover:text-neutral-300 font-editorial-mono uppercase cursor-pointer transition-colors duration-200 py-1"
        >
          <span className="h-px w-3 sm:w-10 bg-neutral-800" />
          <span>SCROLL</span>
          <div className="w-3 h-4.5 sm:w-3.5 sm:h-5.5 rounded-full border border-neutral-600 flex items-start justify-center p-0.5">
            <span className="w-0.5 h-1 sm:w-1 sm:h-1.5 rounded-full bg-[#ff3366] animate-scroll-wheel" />
          </div>
          <span>DISCOVER</span>
          <span className="h-px w-3 sm:w-10 bg-neutral-800" />
        </div>

        {/* Right Balance Placeholder for alignment on large screens */}
        <div className="hidden sm:block w-16 pointer-events-none" />
      </div>
    </section>
  );
};

export default Hero;
