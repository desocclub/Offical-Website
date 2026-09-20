import React from 'react';
import { useNavigate } from 'react-router-dom';
import EventStatus from './EventStatus';
import { getEventState, formatEventDate } from '../../lib/events';

/**
 * EventCard Component
 * Strictly square geometry, subtle dashed border with technical L-shaped corner accents,
 * flat surfaces, and no gradients. State is mathematically derived from event facts.
 * 
 * @param {{
 *   event: import('../../data/events').Event,
 *   index?: number
 * }} props
 */
const EventCard = ({ event, index = 0 }) => {
  const navigate = useNavigate();

  if (!event) return null;

  // Runtime derivation of lifecycle state and date formatting
  const state = getEventState(event);
  const schedule = formatEventDate(event);

  const handleNavigate = () => {
    const destination = event.registrationUrl || `/events/${event.slug}`;
    if (destination.startsWith('http://') || destination.startsWith('https://')) {
      window.open(destination, '_blank', 'noopener,noreferrer');
    } else {
      navigate(destination);
    }
  };

  const isLive = state === 'live';
  const ctaLabel = isLive ? 'JOIN NOW' : 'LEARN MORE';
  const coverImg = event.image || event.coverImage;

  return (
    <div
      onClick={handleNavigate}
      role="article"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleNavigate();
        }
      }}
      className={`group relative bg-[#0a0a0a] hover:bg-[#0e0e0e] border border-dashed transition-all duration-300 rounded-none cursor-pointer select-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#ff3366] ${
        isLive
          ? 'border-[#ff3366]/50 hover:border-[#ff3366]'
          : 'border-white/20 hover:border-white/45'
      }`}
    >
      {/* Technical L-shaped corner accents */}
      <span
        className={`absolute -top-[1px] -left-[1px] w-2.5 h-2.5 border-t-2 border-l-2 pointer-events-none transition-all duration-300 group-hover:w-3.5 group-hover:h-3.5 ${
          isLive ? 'border-[#ff3366]' : 'border-white/60 group-hover:border-white'
        }`}
        aria-hidden="true"
      />
      <span
        className={`absolute -top-[1px] -right-[1px] w-2.5 h-2.5 border-t-2 border-r-2 pointer-events-none transition-all duration-300 group-hover:w-3.5 group-hover:h-3.5 ${
          isLive ? 'border-[#ff3366]' : 'border-white/60 group-hover:border-white'
        }`}
        aria-hidden="true"
      />
      <span
        className={`absolute -bottom-[1px] -left-[1px] w-2.5 h-2.5 border-b-2 border-l-2 pointer-events-none transition-all duration-300 group-hover:w-3.5 group-hover:h-3.5 ${
          isLive ? 'border-[#ff3366]' : 'border-white/60 group-hover:border-white'
        }`}
        aria-hidden="true"
      />
      <span
        className={`absolute -bottom-[1px] -right-[1px] w-2.5 h-2.5 border-b-2 border-r-2 pointer-events-none transition-all duration-300 group-hover:w-3.5 group-hover:h-3.5 ${
          isLive ? 'border-[#ff3366]' : 'border-white/60 group-hover:border-white'
        }`}
        aria-hidden="true"
      />

      <div className="flex flex-col md:flex-row items-stretch">
        {/* Visual Asset Container - strictly square, crisp flat presentation */}
        <div className="md:w-80 lg:w-96 flex-shrink-0 relative overflow-hidden bg-black border-b md:border-b-0 md:border-r border-dashed border-white/15">
          <div className="w-full h-52 sm:h-64 md:h-full relative overflow-hidden">
            {coverImg ? (
              <img
                src={coverImg}
                alt={event.title}
                loading="lazy"
                className="w-full h-full object-cover rounded-none transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              />
            ) : (
              <div className="w-full h-full bg-[#111111] flex items-center justify-center p-6 text-neutral-600 font-mono text-xs">
                <span>[ NO IMAGE PREVIEW ]</span>
              </div>
            )}
            {/* Top-left card index indicator */}
            <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/90 border border-white/10 text-[10px] font-mono text-tertiary uppercase tracking-widest pointer-events-none">
              EVT_0{index + 1}
            </div>
          </div>
        </div>

        {/* Content Hierarchy */}
        <div className="flex-1 p-5 sm:p-7 md:p-8 flex flex-col justify-between gap-6">
          <div className="space-y-3.5">
            {/* Row: Derived Status indicator + Category */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <EventStatus state={state} />
              {event.category && (
                <span className="text-[11px] font-mono tracking-wider uppercase text-tertiary font-medium truncate max-w-[260px] sm:max-w-none">
                  / {event.category}
                </span>
              )}
            </div>

            {/* Event Title */}
            <h3 className="heading-h3 text-primary group-hover:text-primary transition-colors">
              {event.title}
            </h3>

            {/* Concise Description */}
            <p className="text-sm sm:text-base text-tertiary font-normal leading-relaxed line-clamp-2">
              {event.description}
            </p>
          </div>

          {/* Schedule & Venue Meta + Action Row */}
          <div className="space-y-4 pt-4 border-t border-dashed border-white/15">
            {/* Metadata Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
              <div className="flex flex-col">
                <span className="text-[10px] text-muted uppercase tracking-wider">Date</span>
                <span className="text-secondary font-medium truncate">{schedule.date}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-muted uppercase tracking-wider">Time</span>
                <span className="text-secondary font-medium truncate">{schedule.time || 'TBA'}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-muted uppercase tracking-wider">Venue</span>
                <span className="text-secondary font-medium truncate">{event.location || 'CAMPUS / TBA'}</span>
              </div>
            </div>

            {/* CTA Action */}
            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNavigate();
                }}
                style={{ fontWeight: 'var(--font-weight-medium)' }}
                className={`group/btn inline-flex items-center gap-2.5 px-5 py-2.5 border text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer rounded-none ${
                  isLive
                    ? 'bg-[#ff3366] hover:bg-white text-black border-[#ff3366] hover:border-white'
                    : 'bg-neutral-900 hover:bg-white text-primary hover:text-black border-white/20 hover:border-white'
                }`}
              >
                <span>{ctaLabel}</span>
                <span 
                  className="inline-block transition-transform duration-200 group-hover/btn:translate-x-0.5"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </button>

              <span className="text-[11px] font-mono text-muted uppercase tracking-wider hidden sm:inline-block">
                SYS.EVT // 0{index + 1}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
