import React from 'react';

/**
 * EventStatus Component
 * Displays LIVE NOW / UPCOMING / PAST EVENT states with strictly square geometry
 * and no gradients. State is mathematically derived from event facts.
 * 
 * @param {{
 *   state?: 'live' | 'upcoming' | 'past' | 'tba',
 *   status?: { state: string, label?: string, isLive?: boolean },
 *   className?: string
 * }} props
 */
const EventStatus = ({ state, status, className = '' }) => {
  // Normalize derived state
  const resolvedState = (state || status?.state || 'tba').toLowerCase();

  if (resolvedState === 'live') {
    return (
      <span
        className={`inline-flex items-center gap-2 px-2.5 py-1 text-[11px] font-mono font-medium tracking-wider uppercase text-[#ff3366] bg-black border border-[#ff3366]/50 rounded-none select-none ${className}`}
      >
        <span 
          className="w-1.5 h-1.5 bg-[#ff3366] rounded-none animate-pulse" 
          aria-hidden="true" 
        />
        <span>LIVE NOW</span>
      </span>
    );
  }

  if (resolvedState === 'past') {
    return (
      <span
        className={`inline-flex items-center gap-2 px-2.5 py-1 text-[11px] font-mono font-medium tracking-wider uppercase text-neutral-500 bg-black border border-neutral-800 rounded-none select-none ${className}`}
      >
        <span 
          className="w-1.5 h-1.5 bg-neutral-700 rounded-none" 
          aria-hidden="true" 
        />
        <span>PAST EVENT</span>
      </span>
    );
  }

  // Both 'upcoming' (confirmed date in future) and 'tba' (announced event awaiting date) display UPCOMING
  return (
    <span
      className={`inline-flex items-center gap-2 px-2.5 py-1 text-[11px] font-mono font-medium tracking-wider uppercase text-neutral-200 bg-black border border-white/20 rounded-none select-none ${className}`}
    >
      <span 
        className="w-1.5 h-1.5 bg-white/80 rounded-none" 
        aria-hidden="true" 
      />
      <span>UPCOMING</span>
    </span>
  );
};

export default EventStatus;
