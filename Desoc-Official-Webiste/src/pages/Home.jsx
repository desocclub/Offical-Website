import Hero from '../components/Hero';
import Events from '../components/Events';
import Committee from '../components/Commitee';

const Home = () => {
  return (
    <div className="bg-black min-h-screen">
      <Hero />
      <Events />
      <Committee />
    </div>
  );
};

export default Home;