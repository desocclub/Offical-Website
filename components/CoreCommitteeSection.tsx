'use client';

import React, { useRef } from 'react';
import { committee2026_27 } from '@/lib/data/committee/2026-27';
import { resolveSrc } from '@/lib/imageUtils';
import TimelineAnimation from '@/components/ui/timeline-animation';
import ScrollText from '@/components/ui/scroll-text';
import AnimatedShinyButton from '@/components/ui/animated-shiny-button';

export default function CoreCommitteeSection() {
  const introRef = useRef<HTMLDivElement | null>(null);

  // Get 2026-27 Core Committee members (exactly 9 members)
  const coreMembers = committee2026_27.teams?.find((t) => t.id === 'core')?.members || [];

  return (
    <section
      id="core-committee"
      className="relative py-24 sm:py-32 bg-black text-white overflow-hidden border-t border-b border-white/10 select-none"
    >
      {/* Editorial Background: Subtle Dotted Canvas Pattern */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:24px_24px] opacity-70" />

      {/* Ambient Red Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_35%,rgba(188,0,52,0.12),transparent_70%)]" />

      {/* Main Editorial Canvas Wrapper */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Subtle Horizontal Dotted Guideline Top */}
        <div className="absolute -top-6 left-4 right-4 border-t border-dotted border-white/15 pointer-events-none hidden sm:block" />

        {/* Section Intro Container */}
        <div ref={introRef} className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
          {/* Eyebrow */}
          <TimelineAnimation
            timelineRef={introRef}
            animationNum={0}
            className="flex items-center justify-center gap-2"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#ef3b67] shadow-[0_0_8px_#ef3b67]" />
            <span className="text-xs font-mono text-[#ef3b67] uppercase tracking-[0.25em] font-semibold">
              2026–27
            </span>
          </TimelineAnimation>

          {/* Heading with ScrollText reveal animation */}
          <TimelineAnimation timelineRef={introRef} animationNum={1}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-white leading-tight">
              <ScrollText
                as="span"
                text="Meet the Core Committee"
                direction="down"
                className="text-white"
              />
            </h2>
          </TimelineAnimation>

          {/* Description with ScrollText reveal animation */}
          <TimelineAnimation timelineRef={introRef} animationNum={2}>
            <p className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto font-normal leading-relaxed">
              <ScrollText
                as="span"
                text="The people shaping the ideas, experiences, and community behind DESOC."
                direction="down"
                className="text-neutral-400"
              />
            </p>
          </TimelineAnimation>
        </div>

        {/* Editorial Canvas Frame with Dotted Boundaries and Corner Marks */}
        <div className="relative p-3 sm:p-6 md:p-8 rounded-2xl border border-dashed border-white/15 bg-black/50 backdrop-blur-xs">
          {/* Decorative Editorial Plus Marks at Corners */}
          <span className="absolute -top-2.5 -left-2.5 text-white/30 text-xs font-mono select-none pointer-events-none">+</span>
          <span className="absolute -top-2.5 -right-2.5 text-white/30 text-xs font-mono select-none pointer-events-none">+</span>
          <span className="absolute -bottom-2.5 -left-2.5 text-white/30 text-xs font-mono select-none pointer-events-none">+</span>
          <span className="absolute -bottom-2.5 -right-2.5 text-white/30 text-xs font-mono select-none pointer-events-none">+</span>

          {/* 3x3 Grid on Desktop, 2-column on mobile. Each card monitors its own viewport entrance so photo rows trigger row by row */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {coreMembers.map((member, index) => {
              const imageSrc = resolveSrc(member.image);
              // Stagger within each row (0, 1, 2)
              const colStaggerIndex = index % 3;

              return (
                <TimelineAnimation
                  key={member.id}
                  animationNum={colStaggerIndex}
                  margin="0px 0px -12% 0px"
                  amount={0.1}
                  className="group flex flex-col"
                >
                  {/* Square Image Box (1:1 Aspect Ratio) */}
                  <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gradient-to-b from-[#1a1a1a] via-[#121212] to-[#090909] border border-white/10 group-hover:border-[#bc0034]/50 transition-all duration-300 shadow-md">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.04),transparent_65%)] pointer-events-none" />
                    
                    {imageSrc ? (
                      <img
                        src={imageSrc}
                        alt={member.name}
                        loading="lazy"
                        className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-neutral-600 font-mono text-sm">
                        {member.name}
                      </div>
                    )}
                  </div>

                  {/* Member Name and Position */}
                  <div className="mt-3 sm:mt-3.5 space-y-0.5">
                    <h3 className="text-base sm:text-lg font-semibold text-white tracking-tight leading-snug group-hover:text-[#ef3b67] transition-colors duration-200">
                      {member.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-400 font-normal">
                      {member.role}
                    </p>
                  </div>
                </TimelineAnimation>
              );
            })}
          </div>
        </div>

        {/* Subtle Horizontal Dotted Guideline Bottom */}
        <div className="absolute -bottom-6 left-4 right-4 border-b border-dotted border-white/15 pointer-events-none hidden sm:block" />

        {/* Prominent Eldora UI Animated Shiny Button CTA */}
        <TimelineAnimation
          margin="0px 0px -10% 0px"
          amount={0.1}
          className="mt-14 sm:mt-18 flex justify-center"
        >
          <AnimatedShinyButton url="/committee">
            Meet the Full Committee
          </AnimatedShinyButton>
        </TimelineAnimation>
      </div>
    </section>
  );
}
