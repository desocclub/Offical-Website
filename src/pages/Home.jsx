import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Events from '../components/Events';
import Committee from '../components/Commitee';
import Gallery from '../components/Gallery';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <Hero />
      <Events />
      <Committee />
      <Gallery />
      {/* <Footer /> */}
    </div>
  );
};

export default Home;