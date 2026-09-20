import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { pastEvents } from '../data/pastEventsData';
import { events } from '../data/events';
import { groupEventsByState, formatEventDate } from '../lib/events';

const PastEventsPage = () => {
  const groups = groupEventsByState(events);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden border-b border-white/10">
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="heading-title-6 uppercase mb-4">
              Events Archive
            </h1>
            <p className="text-tertiary mt-4 text-sm sm:text-base font-mono uppercase tracking-widest">
              Live, Upcoming, and Concluded DESOC Sessions
            </p>
          </div>

          {/* Section: LIVE (Rendered ONLY if live events exist) */}
          {groups.live.length > 0 && (
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6 pb-3 border-b border-dashed border-[#ff3366]/40">
                <span className="w-2 h-2 bg-[#ff3366] animate-pulse" />
                <h2 className="text-lg font-mono uppercase tracking-wider text-[#ff3366]" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                  Live Now
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {groups.live.map((event) => (
                  <div key={event.id} className="p-6 bg-[#0a0a0a] border border-[#ff3366]/40">
                    <h3 className="text-xl text-primary" style={{ fontWeight: 'var(--font-weight-medium)', letterSpacing: '-0.015em' }}>{event.title}</h3>
                    <p className="mt-2 text-sm text-tertiary">{event.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: UPCOMING (Rendered ONLY if confirmed upcoming events exist) */}
          {groups.upcoming.length > 0 && (
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6 pb-3 border-b border-dashed border-white/20">
                <span className="w-2 h-2 bg-white" />
                <h2 className="text-lg font-mono uppercase tracking-wider text-primary" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                  Confirmed Upcoming Events
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {groups.upcoming.map((event) => {
                  const schedule = formatEventDate(event);
                  return (
                    <div key={event.id} className="p-6 bg-[#0a0a0a] border border-white/20">
                      <h3 className="text-xl text-primary" style={{ fontWeight: 'var(--font-weight-medium)', letterSpacing: '-0.015em' }}>{event.title}</h3>
                      <p className="mt-1 text-xs font-mono text-tertiary">{schedule.fullSchedule}</p>
                      <p className="mt-3 text-sm text-secondary">{event.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Section: DATE TBA (Rendered ONLY if unannounced/TBA events exist) */}
          {groups.tba.length > 0 && (
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6 pb-3 border-b border-dashed border-white/20">
                <span className="w-2 h-2 bg-neutral-500" />
                <h2 className="text-lg font-mono uppercase tracking-wider text-secondary" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                  Announced Sessions · Date TBA
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {groups.tba.map((event) => (
                  <div key={event.id} className="p-6 bg-[#0a0a0a] border border-dashed border-white/20">
                    <div className="flex items-center justify-between gap-4">
                      <span className="px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider bg-black border border-neutral-700 text-secondary">
                        DATE TBA
                      </span>
                      <span className="text-xs font-mono text-muted uppercase">
                        {event.category}
                      </span>
                    </div>
                    <h3 className="text-xl text-primary mt-4" style={{ fontWeight: 'var(--font-weight-medium)', letterSpacing: '-0.015em' }}>{event.title}</h3>
                    <p className="mt-2 text-sm text-tertiary leading-relaxed">{event.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: PAST EVENTS */}
          <div>
            <div className="flex items-center gap-3 mb-8 pb-3 border-b border-dashed border-white/20">
              <span className="w-2 h-2 bg-neutral-600" />
              <h2 className="text-lg font-mono uppercase tracking-wider text-tertiary" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                Past Events Archive
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {pastEvents.map((event, index) => (
                <div
                  key={event.id}
                  className="group bg-[#0a0a0a] border border-white/15 hover:border-white/40 transition-all duration-300"
                >
                  <div className="aspect-video w-full overflow-hidden border-b border-white/10">
                    <img
                      src={event.coverImage}
                      alt={event.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-102"
                    />
                  </div>

                  <div className="p-5 sm:p-6">
                    <h3 className="text-primary text-lg leading-snug min-h-12" style={{ fontWeight: 'var(--font-weight-medium)', letterSpacing: '-0.015em' }}>{event.title}</h3>
                    <p className="mt-1 text-xs font-mono text-muted">{event.date || 'Concluded'}</p>
                    <p className="mt-3 text-sm text-tertiary leading-relaxed min-h-16 line-clamp-3">
                      {event.shortDescription}
                    </p>

                    <Link
                      to={`/events/${event.id}`}
                      style={{ fontWeight: 'var(--font-weight-medium)' }}
                      className="mt-4 inline-flex items-center justify-center border border-white/20 hover:border-white px-4 py-2 text-xs font-mono uppercase tracking-wider text-secondary hover:text-primary transition-colors"
                    >
                      View Details ↗
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PastEventsPage;
