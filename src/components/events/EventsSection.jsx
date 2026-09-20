import React from 'react';
import { useNavigate } from 'react-router-dom';
import EventList from './EventList';
import { events } from '../../data/events';

/**
 * EventsSection Component
 * Homepage section for Events, rebuilt with a restrained, technical, editorial aesthetic.
 * Flat dark surfaces, strictly square geometry, no gradients, and clean technical typography.
 */
const EventsSection = () => {
  const navigate = useNavigate();

  return (
    <section 
      id="events" 
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-black text-white overflow-hidden border-t border-b border-white/10"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 pb-6 border-b border-dashed border-white/15">
          <div className="space-y-2.5">
            {/* Eyebrow index indicator */}
            <div className="flex items-center gap-2 text-xs font-mono text-tertiary uppercase tracking-widest">
              <span className="text-[#ff3366] font-semibold">// 02</span>
              <span>·</span>
              <span>CALENDAR & SESSIONS</span>
            </div>

            {/* Editorial Title */}
            <h2 className="heading-title-6 uppercase">
              Events
            </h2>

            {/* Secondary subtitle */}
            <p className="text-tertiary text-sm sm:text-base max-w-xl font-normal leading-relaxed">
              Curated hackathons, design sprints, technical summits, and venture arenas organized by DESOC.
            </p>
          </div>

          {/* Header Action: View All Events ↗ */}
          <div className="flex-shrink-0">
            <button
              onClick={() => navigate('/events')}
              style={{ fontWeight: 'var(--font-weight-medium)' }}
              className="group/link inline-flex items-center gap-2 px-4 py-2 bg-transparent hover:bg-white text-primary hover:text-black border border-white/20 hover:border-white text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer rounded-none"
            >
              <span>VIEW ALL EVENTS</span>
              <span 
                className="inline-block transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                aria-hidden="true"
              >
                ↗
              </span>
            </button>
          </div>
        </div>

        {/* Homepage Event List (Strictly capped at 2 preview events) */}
        <EventList events={events} />
      </div>
    </section>
  );
};

export default EventsSection;
