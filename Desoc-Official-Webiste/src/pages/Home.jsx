import Hero from '../components/Hero';
import Events from '../components/Events';
import Committee from '../components/Commitee';
import Gallery from '../components/Gallery';

const Home = () => {
  return (
    <div className="bg-black min-h-screen">
      <Hero />
      <Events />
      <Committee />
      <Gallery />
    </div>
  );
};

export default Home;