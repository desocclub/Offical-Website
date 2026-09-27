import Link from 'next/link';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import { pastEvents, getPastEventById } from '@/lib/data/pastEventsData';
import { resolveSrc } from '@/lib/imageUtils';

interface PageProps {
  params: Promise<{ eventId: string }>;
}

export function generateStaticParams() {
  return pastEvents.map((event) => ({
    eventId: event.id,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { eventId } = await params;
  const event = getPastEventById(eventId);
  return {
    title: event ? `${event.title} — DESOC` : 'Event Not Found — DESOC',
    description: event?.shortDescription || event?.description || 'Past event details',
  };
}

const InfoPill = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-full border border-red-500/25 bg-black/40 px-4 py-2 text-sm backdrop-blur-sm">
    <span className="text-gray-400">{label}: </span>
    <span className="text-white font-medium">{value}</span>
  </div>
);

export default async function PastEventDetailPage({ params }: PageProps) {
  const { eventId } = await params;
  const event = getPastEventById(eventId);

  if (!event) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <main className="px-4 pt-28 pb-20 text-center">
          <h1 className="text-3xl font-bold text-white">Event Not Found</h1>
          <p className="mt-3 text-gray-400">The past event you are looking for does not exist.</p>
          <Link
            href="/events"
            className="mt-8 inline-flex rounded-full border border-red-500/40 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-red-300 transition hover:bg-red-500/10"
          >
            Back to Past Events
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <main className="relative overflow-hidden px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-28 right-0 h-80 w-80 rounded-full bg-red-600/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-red-800/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl">
          <Link
            href="/events"
            style={{ fontWeight: 'var(--font-weight-medium)' }}
            className="mb-8 inline-flex items-center gap-2 text-sm text-red-300 transition hover:text-red-200"
          >
            <span>←</span>
            <span>Back to Past Events</span>
          </Link>

          <div className="overflow-hidden rounded-3xl border border-red-500/20 bg-black/40 backdrop-blur-xl shadow-[0_0_35px_rgba(185,28,28,0.18)]">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="h-full">
                <img
                  src={resolveSrc(event.coverImage)}
                  alt={event.title}
                  className="h-full w-full object-cover min-h-72"
                />
              </div>
              <div className="p-6 sm:p-8 lg:p-10">
                <p className="text-xs uppercase tracking-[0.2em] text-red-300" style={{ fontWeight: 'var(--font-weight-medium)' }}>DESOC Archive</p>
                <h1 className="mt-3 text-3xl sm:text-4xl text-primary leading-tight" style={{ fontWeight: 'var(--font-weight-medium)', letterSpacing: '-0.02em' }}>{event.title}</h1>
                <p className="mt-5 text-secondary leading-relaxed">{event.description}</p>

                <div className="mt-7 flex flex-wrap gap-3">
                  {event.date && <InfoPill label="Date" value={event.date} />}
                  {event.time && <InfoPill label="Time" value={event.time} />}
                  {event.venue && <InfoPill label="Venue" value={event.venue} />}
                  {event.participants && <InfoPill label="Participants" value={event.participants} />}
                  {event.platform && <InfoPill label="Platform" value={event.platform} />}
                </div>
              </div>
            </div>
          </div>

          <section className="mt-10">
            <h2 className="heading-h2 text-primary">Image Gallery</h2>
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {event.gallery.map((img, index) => (
                <div
                  key={`${event.id}-${index}`}
                  className="group overflow-hidden rounded-2xl border border-red-500/20 bg-black/40 transition duration-300 hover:scale-[1.02] hover:border-red-400/40"
                >
                  <img
                    src={resolveSrc(img)}
                    alt={`${event.title} ${index + 1}`}
                    className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
