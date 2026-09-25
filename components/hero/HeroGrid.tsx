'use client';

/**
 * HeroGrid Component
 *
 * Deterministic, Sparse Architectural Structural Grid:
 * - Shared CSS custom properties ensure horizontal and vertical guide lines pass
 *   directly through the dead center of every '+' intersection marker.
 * - Sparse, editorial CAD framing: an intentional outer frame with 4 corner crosshairs
 *   plus a subtle central symmetry axis.
 * - Zero floating or misaligned markers.
 * - Pointer-events none.
 */
export default function HeroGrid() {
  return (
    <div
      className="absolute inset-0 pointer-events-none select-none z-[3] overflow-hidden [--grid-x-left:6%] sm:[--grid-x-left:8%] md:[--grid-x-left:11%] lg:[--grid-x-left:13%] [--grid-x-right:6%] sm:[--grid-x-right:8%] md:[--grid-x-right:11%] lg:[--grid-x-right:13%] [--grid-y-top:14%] [--grid-y-bottom:86%]"
      style={{
        maskImage:
          'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.2) 8%, rgba(0,0,0,0.7) 20%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.7) 82%, rgba(0,0,0,0.2) 94%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.2) 8%, rgba(0,0,0,0.7) 20%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.7) 82%, rgba(0,0,0,0.2) 94%, transparent 100%)',
      }}
      aria-hidden="true"
    >
      {/* 1. Primary Top Horizontal Guide Line */}
      <div 
        className="absolute left-0 right-0 h-px -translate-y-1/2 border-t border-dotted border-white/25 pointer-events-none" 
        style={{ top: 'var(--grid-y-top)' }}
      />

      {/* 2. Primary Bottom Horizontal Guide Line */}
      <div 
        className="absolute left-0 right-0 h-px -translate-y-1/2 border-t border-dotted border-white/25 pointer-events-none" 
        style={{ top: 'var(--grid-y-bottom)' }}
      />

      {/* 3. Outer Left Vertical Guide Line */}
      <div 
        className="absolute top-0 bottom-0 w-px -translate-x-1/2 border-l border-dotted border-white/25 pointer-events-none" 
        style={{ left: 'var(--grid-x-left)' }}
      />

      {/* 4. Outer Right Vertical Guide Line */}
      <div 
        className="absolute top-0 bottom-0 w-px translate-x-1/2 border-r border-dotted border-white/25 pointer-events-none" 
        style={{ right: 'var(--grid-x-right)' }}
      />

      {/* 5. Minimal Center Symmetry Axis (Subtle editorial guide) */}
      <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px border-l border-dotted border-purple-400/15 pointer-events-none" />

      {/* 6. Deterministic '+' Crosshair Markers (Center of '+' sits precisely on line intersections) */}
      {/* Top-Left Intersection */}
      <div 
        className="absolute -translate-x-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center pointer-events-none"
        style={{ top: 'var(--grid-y-top)', left: 'var(--grid-x-left)' }}
      >
        <span className="text-[12px] font-geist-mono text-purple-300/80 leading-none select-none font-medium text-center">+</span>
      </div>

      {/* Top-Right Intersection */}
      <div 
        className="absolute translate-x-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center pointer-events-none"
        style={{ top: 'var(--grid-y-top)', right: 'var(--grid-x-right)' }}
      >
        <span className="text-[12px] font-geist-mono text-purple-300/80 leading-none select-none font-medium text-center">+</span>
      </div>

      {/* Bottom-Left Intersection */}
      <div 
        className="absolute -translate-x-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center pointer-events-none"
        style={{ top: 'var(--grid-y-bottom)', left: 'var(--grid-x-left)' }}
      >
        <span className="text-[12px] font-geist-mono text-purple-300/80 leading-none select-none font-medium text-center">+</span>
      </div>

      {/* Bottom-Right Intersection */}
      <div 
        className="absolute translate-x-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center pointer-events-none"
        style={{ top: 'var(--grid-y-bottom)', right: 'var(--grid-x-right)' }}
      >
        <span className="text-[12px] font-geist-mono text-purple-300/80 leading-none select-none font-medium text-center">+</span>
      </div>
    </div>
  );
}
