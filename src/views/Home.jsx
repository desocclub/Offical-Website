import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Events from '../components/Events';
import Committee from '../components/Commitee';
import Gallery from '../components/Gallery';
import Footer from '../components/Footer';
import CommitteeReveal from '../components/CommitteeReveal';

const Home = () => {
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
};

export default Home;