'use client';

/**
 * HeroGrid component
 * Provides a clearly visible architectural dotted structural grid overlay behind the hero content.
 * Features:
 * - Viewport-aligned vertical and horizontal fine dotted guide lines
 * - Vertical opacity fade: strongest in central hero region (~30-70%), smoothly dissolving to black at top and bottom
 * - CAD/editorial style micro '+' crosshair markers at major line intersections
 * - High-contrast technical aesthetic framing the composition without boxing it in
 * - Pointer-events none
 */
export default function HeroGrid() {
  return (
    <div
      className="absolute inset-0 pointer-events-none select-none z-[1] overflow-hidden"
      style={{
        maskImage:
          'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.18) 6%, rgba(0,0,0,0.50) 12%, rgba(0,0,0,0.85) 20%, rgba(0,0,0,1) 32%, rgba(0,0,0,1) 68%, rgba(0,0,0,0.85) 80%, rgba(0,0,0,0.50) 88%, rgba(0,0,0,0.18) 94%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.18) 6%, rgba(0,0,0,0.50) 12%, rgba(0,0,0,0.85) 20%, rgba(0,0,0,1) 32%, rgba(0,0,0,1) 68%, rgba(0,0,0,0.85) 80%, rgba(0,0,0,0.50) 88%, rgba(0,0,0,0.18) 94%, transparent 100%)',
      }}
      aria-hidden="true"
    >
      {/* Horizontal Dotted Lines (Technical Architectural Framework) */}
      {/* Primary Upper Hero Frame Guide (moved up for generous breathing room above DESOC logo) */}
      <div className="absolute top-[13%] sm:top-[14%] md:top-[15%] left-0 right-0 w-full border-t border-dotted border-white/35" />

      {/* Mid Sub-Guide (framing upper content) */}
      <div className="hidden md:block absolute top-[36%] sm:top-[38%] left-0 right-0 w-full border-t border-dotted border-purple-300/20" />

      {/* Primary Lower Hero Frame Guide (directly below CTA button) */}
      <div className="absolute bottom-[21%] sm:bottom-[22%] left-0 right-0 w-full border-t border-dotted border-white/35" />

      {/* Bottom Scroll Cue Guide */}
      <div className="hidden sm:block absolute bottom-12 sm:bottom-14 left-0 right-0 w-full border-t border-dotted border-white/20" />

      {/* Vertical Dotted Lines (Framing Viewport Canvas) */}
      {/* Outer Left Column Guide */}
      <div className="absolute top-0 bottom-0 left-[6%] sm:left-[8%] md:left-[12%] lg:left-[15%] w-px border-l border-dotted border-white/35" />

      {/* Inner Left Sub-Guide */}
      <div className="hidden lg:block absolute top-0 bottom-0 left-[28%] w-px border-l border-dotted border-white/20" />

      {/* Center Symmetry Axis Guide */}
      <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px border-l border-dotted border-purple-400/25" />

      {/* Inner Right Sub-Guide */}
      <div className="hidden lg:block absolute top-0 bottom-0 right-[28%] w-px border-r border-dotted border-white/20" />

      {/* Outer Right Column Guide */}
      <div className="absolute top-0 bottom-0 right-[6%] sm:right-[8%] md:right-[12%] lg:right-[15%] w-px border-r border-dotted border-white/35" />

      {/* Architectural Intersection Markers (Crosshairs '+' in Geist Mono) */}
      {/* Top-Left Primary Intersection (aligned with moved-up top horizontal guide) */}
      <div className="absolute top-[13%] sm:top-[14%] md:top-[15%] left-[6%] sm:left-[8%] md:left-[12%] lg:left-[15%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
        <span className="text-[12px] font-geist-mono text-purple-300/80 leading-none select-none font-medium">+</span>
      </div>

      {/* Top-Right Primary Intersection (aligned with moved-up top horizontal guide) */}
      <div className="absolute top-[13%] sm:top-[14%] md:top-[15%] right-[6%] sm:right-[8%] md:right-[12%] lg:right-[15%] translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
        <span className="text-[12px] font-geist-mono text-purple-300/80 leading-none select-none font-medium">+</span>
      </div>

      {/* Bottom-Left Primary Intersection */}
      <div className="absolute bottom-[21%] sm:bottom-[22%] left-[6%] sm:left-[8%] md:left-[12%] lg:left-[15%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
        <span className="text-[12px] font-geist-mono text-purple-300/80 leading-none select-none font-medium">+</span>
      </div>

      {/* Bottom-Right Primary Intersection */}
      <div className="absolute bottom-[21%] sm:bottom-[22%] right-[6%] sm:right-[8%] md:right-[12%] lg:right-[15%] translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
        <span className="text-[12px] font-geist-mono text-purple-300/80 leading-none select-none font-medium">+</span>
      </div>

      {/* Subtle Central Violet Ambient Radial Softening */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(168,85,247,0.08)_0%,rgba(0,0,0,0)_68%)] pointer-events-none" />
    </div>
  );
}
