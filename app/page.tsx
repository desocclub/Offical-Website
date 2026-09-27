import Navbar from '@/components/navigation/Navbar';
import Hero from '@/components/hero/Hero';
import Events from '@/components/events/EventsSection';
import CommitteeReveal from '@/components/CommitteeReveal';
import Gallery from '@/components/gallery/Gallery';
import Footer from '@/components/navigation/Footer';

export const metadata = {
  title: 'DESOC — Design Society | KKWIEER',
  description:
    'DESOC (Design Society) is the official design and innovation club of the Computer Science and Design Department at K. K. Wagh Institute of Engineering Education and Research. We bring together students passionate about design, technology, and innovation through workshops, competitions, events, and collaborative projects.',
};

export default function HomePage() {
  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <Hero />
      <Events />
      <CommitteeReveal />
      <Gallery />
      <Footer />
    </div>
  );
}
