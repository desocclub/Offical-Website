import Navbar from '@/components/navigation/Navbar';
import Hero from '@/components/hero/Hero';
import Events from '@/components/events/EventsSection';
import CommitteeReveal from '@/components/CommitteeReveal';
import Gallery from '@/components/gallery/Gallery';
import Footer from '@/components/navigation/Footer';

export const metadata = {
  title: 'DESOC — Design & Software Development Club',
  description: 'DESOC is a student community exploring design, technology and everything in between.',
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
