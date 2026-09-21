import backgroundImage from '../assets/bg.jpg';
import desocLogo from '../assets/logo_home1.png';
import clgLogo from '../assets/clg_logo.svg';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState(0);
  const [participation, setParticipation] = useState(0);
  const [alumni, setAlumni] = useState(0);
  const [prize, setPrize] = useState(0);

  useEffect(() => {
    // Events Conducted - count to 50
    const eventInterval = setInterval(() => {
      setEvents(prev => prev < 50 ? prev + 1 : 50);
    }, 100);

    // Participation Received - count to 5000
    const participationInterval = setInterval(() => {
      setParticipation(prev => prev < 5000 ? prev + 50 : 5000);
    }, 30);

    // Alumni Registered - count to 100
    const alumniInterval = setInterval(() => {
      setAlumni(prev => prev < 100 ? prev + 1 : 100);
    }, 100);

    // Prize Pool - count to 15000
    const prizeInterval = setInterval(() => {
      setPrize(prev => prev < 15000 ? prev + 150 : 15000);
    }, 30);

    return () => {
      clearInterval(eventInterval);
      clearInterval(participationInterval);
      clearInterval(alumniInterval);
      clearInterval(prizeInterval);
    };
  }, []);

  return (
    <section className="relative flex w-screen max-w-[100vw] min-h-[100dvh] flex-col overflow-hidden bg-black">
      
      {/* Gradient Line at Top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#970233] to-transparent z-50"></div>

      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={backgroundImage} 
          alt="DESOC Background" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* CLG Logo - Top Left */}
      <div className="absolute top-0 left-2 sm:left-3 lg:-top-6 lg:left-12 z-40">
        <img 
          src={clgLogo} 
          alt="CLG Logo"
          className="w-32 h-24 sm:w-50 sm:h-30 lg:w-60 lg:h-44 object-contain"
        />
      </div>

      {/* SECTION 1: Logo Container - Fixed Height */}
      <div className="relative flex justify-center items-center pt-20 sm:pt-36 lg:pt-64 pb-0 sm:pb-6 lg:pb-12 h-auto sm:h-56 lg:h-64 z-20">
        <img 
          src={desocLogo} 
          alt="DESOC Logo"
          className="w-80 h-50 sm:w-220 sm:h-150 object-contain"
        />
      </div>

      {/* SECTION 2: Description & Buttons Container - Combined Flex */}
      <div className="relative flex flex-col items-center justify-center px-4 sm:px-6 pt-0 sm:pt-6 lg:pt-12 pb-1 sm:pb-2 lg:pb-4 z-20">
        <p className="text-gray-300 text-sm sm:text-lg lg:text-xl max-w-2xl sm:max-w-3xl lg:max-w-4xl text-center leading-snug sm:leading-normal animate-fadeInUp mb-4 sm:mb-6" style={{animationDelay: '0.1s'}}>
          <span className="font-bold">Design Society</span> is a community where we empower students to innovate at the intersection of design and technology, through projects, workshops, competitions and collaborations, we transform ideas into impactful digital innovative experiences.
        </p>
        
        {/* ── CTA Stack ── */}
        <div className="flex flex-col items-center gap-5 sm:gap-6 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>

          {/* Secondary Buttons */}
          <div className="flex gap-3 sm:gap-4 flex-wrap justify-center">
            <button
              onClick={() => navigate('/about')}
              className="px-5 sm:px-7 py-2 sm:py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 text-white/90 hover:text-white font-semibold text-xs sm:text-sm rounded-lg transition-all duration-300 cursor-pointer"
            >
              About Us
            </button>
            <button
              onClick={() => navigate('/genesis')}
              className="px-5 sm:px-7 py-2 sm:py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 text-white/90 hover:text-white font-semibold text-xs sm:text-sm rounded-lg transition-all duration-300 cursor-pointer"
            >
              GENESIS
            </button>
          </div>

        </div>
      </div>

      {/* SECTION 3: Statistics Bar Container - Flex */}
      <div className="relative flex justify-center px-4 sm:px-6 py-6 sm:py-8 lg:py-10 animate-fadeInUp z-20" style={{animationDelay: '0.4s'}}>
        <div className="bg-gradient-to-r from-black/40 via-[#970233]/50 to-black/40 backdrop-blur-md py-3 sm:py-5 lg:py-6 px-4 sm:px-8 rounded-lg shadow-2xl w-full max-w-6xl border border-white/20">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 lg:gap-6 text-center items-center">
            {/* Events Conducted */}
            <div className="flex flex-col items-center justify-center py-2 sm:py-3 lg:py-4 border-b sm:border-b-0 sm:border-r border-white/30 last:border-b-0 sm:last:border-r-0">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">{events}+</h3>
              <p className="text-xs sm:text-sm lg:text-base text-white/90">Events Conducted</p>
            </div>
            
            {/* Participation Received */}
            <div className="flex flex-col items-center justify-center py-2 sm:py-3 lg:py-4 border-b sm:border-b-0 sm:border-r border-white/30 last:border-b-0 sm:last:border-r-0">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">{participation}+</h3>
              <p className="text-xs sm:text-sm lg:text-base text-white/90">Participation Received</p>
            </div>

            {/* Alumni Registered */}
            <div className="flex flex-col items-center justify-center py-2 sm:py-3 lg:py-4 border-b sm:border-b-0 sm:border-r border-white/30 last:border-b-0 sm:last:border-r-0 col-span-2 sm:col-span-1">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">{alumni}+</h3>
              <p className="text-xs sm:text-sm lg:text-base text-white/90">Alumni Registered</p>
            </div>

            {/* GENESIS Prize Pool */}
            <div className="flex flex-col items-center justify-center py-2 sm:py-3 lg:py-4 col-span-2 sm:col-span-1">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">₹{prize}+</h3>
              <p className="text-xs sm:text-sm lg:text-base text-white/90">GENESIS Prize Pool</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Gradient Line at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#970233] to-transparent z-50"></div>
    </section>
  );
};

export default Hero;
