'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Liquid, DESOC_LIQUID_COLORS } from '@/components/ui/liquid-gradient';

interface HeroContentProps {
  onScrollDown?: () => void;
}

export default function HeroContent() {
  const [isCtaHovered, setIsCtaHovered] = useState(false);

  return (
    <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-5xl mx-auto w-full px-3 sm:px-6 my-auto pt-2 sm:pt-4 pb-2 font-geist">
      
      {/* Subtle Local Field Attenuation for Text Readability */}
      <div 
        className="absolute inset-0 -inset-x-8 sm:-inset-x-16 bg-radial from-black/60 via-black/25 to-transparent blur-2xl -z-10 pointer-events-none" 
        aria-hidden="true"
      />

      {/* Micro Editorial Badge (Restrained Geist Pixel Usage) */}
      <div className="inline-flex items-center gap-2 px-2.5 py-0.5 sm:py-1 rounded-full border border-purple-500/25 bg-purple-950/30 backdrop-blur-sm text-[9.5px] sm:text-[10.5px] text-purple-200/90 font-geist-pixel tracking-wider select-none mb-2.5 sm:mb-3.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#a855f7] shadow-[0_0_6px_#a855f7]" />
        <span>DESOC // EST. 2024</span>
      </div>

      {/* 1. Official DESOC Logo (Enlarged Single Cohesive Brand Asset) */}
      <div className="relative mx-auto mb-3 sm:mb-4 md:mb-5 flex items-center justify-center select-none group">
        {/* Soft Ambient Violet Aura behind Logo */}
        <div className="absolute inset-0 bg-purple-500/20 blur-2xl rounded-full scale-110 pointer-events-none" />
        
        <img
          src="/desoc_logo.png"
          alt="DESOC - Design and Software Development Club"
          className="w-[250px] min-[390px]:w-[290px] sm:w-[400px] md:w-[490px] lg:w-[570px] xl:w-[620px] h-auto object-contain relative z-10 transition-transform duration-500 group-hover:scale-[1.015] drop-shadow-[0_4px_28px_rgba(168,85,247,0.3)]"
        />
      </div>

      {/* 2. Main Editorial Headline (Geist Sans, Reduced Scale for Breathing Room, Italic 'Creativity.') */}
      <h1 className="text-[21px] min-[375px]:text-[23px] min-[410px]:text-[25px] sm:text-3xl md:text-4xl lg:text-[46px] xl:text-[50px] font-bold tracking-[-0.03em] leading-[1.16] sm:leading-[1.12] text-[#F5F5F5] flex flex-col items-center max-w-4xl mx-auto font-geist">
        <span className="block text-[#F5F5F5]">
          Driven by Design.
        </span>
        <span className="block mt-0.5 sm:mt-1 text-[#F5F5F5]">
          United by{' '}
          <span className="italic font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#d8b4fe] via-[#c084fc] to-[#a855f7]">
            Creativity.
          </span>
        </span>
      </h1>

      {/* 3. Supporting Description (Refined Editorial Hierarchy: #A8A8AD, High Contrast, Constrained Width) */}
      <p className="text-[#A8A8AD] font-normal text-[13.5px] min-[390px]:text-[14px] sm:text-[15.5px] md:text-[16.5px] max-w-[580px] mx-auto mt-4 sm:mt-5 md:mt-6 leading-[1.58] tracking-normal font-geist">
        A community where design meets technology, ideas become experiences, and creativity turns into impact. Build, experiment, and create alongside curious minds shaping what’s next.
      </p>

      {/* 4. Primary CTA Button with UI-Layouts Liquid Gradient */}
      <div className="mt-6 sm:mt-7 md:mt-8">
        <Link
          href="/about"
          onMouseEnter={() => setIsCtaHovered(true)}
          onMouseLeave={() => setIsCtaHovered(false)}
          className="relative inline-flex items-center justify-center group cursor-pointer select-none"
        >
          {/* Core Liquid Capsule Container - Clean, crisp boundaries without excessive outer glow */}
          <div className="relative overflow-hidden rounded-full px-7 sm:px-9 py-2.5 sm:py-3.5 border border-purple-400/40 group-hover:border-purple-300/80 transition-colors duration-300 flex items-center justify-center shadow-none hover:shadow-[0_0_12px_rgba(168,85,247,0.15)]">
            
            {/* Dark glass backdrop base */}
            <span className="absolute inset-0 rounded-full bg-black/85 backdrop-blur-md" />

            {/* Dynamic Liquid Gradient Layer (contained strictly inside button) */}
            <div className="absolute inset-0 overflow-hidden rounded-full opacity-70 group-hover:opacity-95 transition-opacity duration-300">
              <Liquid isHovered={isCtaHovered} colors={DESOC_LIQUID_COLORS} />
            </div>

            {/* Specular Edge Highlights */}
            {[1, 2].map((i) => (
              <span
                key={`spark-${i}`}
                className="absolute inset-0 rounded-full border-solid border-[1px] border-gradient-to-b from-white/25 to-transparent mix-blend-overlay filter blur-[1px] pointer-events-none"
              />
            ))}

            {/* Subtle Inner Dark Vignette for Text Readability */}
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[82%] rounded-full filter blur-[6px] bg-black/50 pointer-events-none" />

            {/* Button Content */}
            <span className="relative z-10 flex items-center justify-center gap-2 text-[#F5F5F5] text-xs sm:text-sm font-semibold tracking-wide font-geist select-none">
              <span>Explore DESOC</span>
              <span className="text-[#c084fc] transition-transform duration-300 group-hover:translate-x-1.5">
                →
              </span>
            </span>
          </div>
        </Link>
      </div>

    </div>
  );
}
