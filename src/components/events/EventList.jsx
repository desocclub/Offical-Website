import React from 'react';
import { useNavigate } from 'react-router-dom';
import EventCard from './EventCard';
import { selectHomepageEvents } from '../../lib/events';

/**
 * EventList Component
 * Renders maximum of 2 preview events for the homepage derived from truth facts,
 * followed by a subtle solid continuation treatment indicating the complete archive.
 * 
 * @param {{
 *   events: import('../../data/events').Event[]
 * }} props
 */
const EventList = ({ events = [] }) => {
  const navigate = useNavigate();

  // Enforce runtime derivation and homepage limit: maximum 2 events (excluding past events)
  const previewEvents = selectHomepageEvents(events, new Date(), 2);
  const totalCount = events.length;

  const handleViewAll = () => {
    navigate('/events');
  };

  // Case 10: All events are past or no upcoming/TBA events scheduled
  if (previewEvents.length === 0) {
    return (
      <div className="border border-dashed border-white/20 p-10 sm:p-12 text-center bg-[#0a0a0a] rounded-none space-y-4">
        <p className="text-neutral-400 font-mono text-xs sm:text-sm uppercase tracking-wider">
          [ NO LIVE OR UPCOMING SESSIONS CURRENTLY ANNOUNCED ]
        </p>
        <p className="text-neutral-500 text-xs max-w-md mx-auto">
          Explore previous hackathons, departmental summits, and design challenges in the DESOC archive.
        </p>
        <button
          onClick={handleViewAll}
          className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 text-xs font-mono font-semibold uppercase tracking-wider bg-white text-black border border-white hover:bg-neutral-200 transition-colors rounded-none cursor-pointer"
        >
          <span>VIEW EVENT ARCHIVE</span>
          <span>↗</span>
        </button>
      </div>
    );
  }

  return (
    <div className="relative space-y-6 sm:space-y-8">
      {/* Event Previews (Max 2) */}
      {previewEvents.map((event, idx) => (
        <EventCard key={event.id || event.slug || idx} event={event} index={idx} />
      ))}

      {/* Subtle Solid Overlay / Continuation Treatment
          - Strictly flat solid surface matching section (#000000)
          - NO gradient mask
          - Conveys that content extends into /events
          - Does not obscure critical card information
      */}
      <div className="relative pt-2">
        <div 
          onClick={handleViewAll}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleViewAll();
            }
          }}
          className="group relative w-full bg-black border border-dashed border-white/25 hover:border-white/50 transition-all duration-300 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-none cursor-pointer select-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#ff3366]"
        >
          {/* L-shaped corner accents */}
          <span 
            className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t-2 border-l-2 border-white/50 group-hover:border-white group-hover:w-3 group-hover:h-3 transition-all duration-300 pointer-events-none" 
            aria-hidden="true" 
          />
          <span 
            className="absolute -top-[1px] -right-[1px] w-2 h-2 border-t-2 border-r-2 border-white/50 group-hover:border-white group-hover:w-3 group-hover:h-3 transition-all duration-300 pointer-events-none" 
            aria-hidden="true" 
          />
          <span 
            className="absolute -bottom-[1px] -left-[1px] w-2 h-2 border-b-2 border-l-2 border-white/50 group-hover:border-white group-hover:w-3 group-hover:h-3 transition-all duration-300 pointer-events-none" 
            aria-hidden="true" 
          />
          <span 
            className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b-2 border-r-2 border-white/50 group-hover:border-white group-hover:w-3 group-hover:h-3 transition-all duration-300 pointer-events-none" 
            aria-hidden="true" 
          />

          {/* Left: Truthful telemetry */}
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 bg-[#ff3366] rounded-none animate-pulse" aria-hidden="true" />
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 font-mono text-xs">
              <span className="text-white font-medium uppercase tracking-wider">
                COMPLETE EVENT ARCHIVE
              </span>
              <span className="text-neutral-500 hidden sm:inline">|</span>
              <span className="text-neutral-400 text-[11px]">
                Showing 0{previewEvents.length} of {totalCount < 10 ? `0${totalCount}` : totalCount} catalog entries
              </span>
            </div>
          </div>

          {/* Right: View All Action */}
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-white group-hover:text-white transition-colors">
            <span className="border-b border-white/40 group-hover:border-white pb-0.5">
              VIEW ALL EVENTS
            </span>
            <span 
              className="inline-block transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5"
              aria-hidden="true"
            >
              ↗
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventList;
