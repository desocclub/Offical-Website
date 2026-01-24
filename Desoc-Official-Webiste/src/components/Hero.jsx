import { useState } from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/bg.png';

const Hero = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const menuItems = [
    { name: 'Home', path: '/', type: 'route' },
    { name: 'Events', path: '#events', type: 'hash' },
    { name: 'Alumni', path: '#alumni', type: 'hash' },
    { name: 'Committee', path: '/committee', type: 'route' },
    { name: 'Gallery', path: '#gallery', type: 'hash' },
    { name: 'Contact Us', path: '#contact', type: 'hash' }
  ];

  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      {/* Floating Navbar - Pill Shape */}
      <nav className="absolute top-6 right-6 lg:right-12 z-50">
        {/* Desktop Menu - Pill Container */}
        <div className="hidden md:flex items-center bg-gradient-to-r from-[#7a0000] to-[#b00000] rounded-full px-2 py-1 shadow-lg">
          {menuItems.map((item) => (
            item.type === 'route' ? (
              <Link
                key={item.name}
                to={item.path}
                className="text-white hover:bg-white/10 transition-all duration-300 px-4 py-2 text-sm font-medium rounded-full"
              >
                {item.name}
              </Link>
            ) : (
              <a
                key={item.name}
                href={item.path}
                className="text-white hover:bg-white/10 transition-all duration-300 px-4 py-2 text-sm font-medium rounded-full"
              >
                {item.name}
              </a>
            )
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white bg-gradient-to-r from-[#7a0000] to-[#b00000] p-3 rounded-full"
        >
          <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            {isMenuOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>

        {/* Mobile Menu Dropdown */}
        <div className={`md:hidden absolute right-0 top-14 overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="bg-gradient-to-b from-[#7a0000] to-[#b00000] rounded-2xl py-2 min-w-48 shadow-xl">
            {menuItems.map((item) => (
              item.type === 'route' ? (
                <Link
                  key={item.name}
                  to={item.path}
                  className="block text-white hover:bg-white/10 px-6 py-3 text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ) : (
                <a
                  key={item.name}
                  href={item.path}
                  className="block text-white hover:bg-white/10 px-6 py-3 text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              )
            ))}
          </div>
        </div>
      </nav>

      {/* Logo Text - Top Left */}
      <div className="absolute top-6 left-6 lg:left-12 z-50">
        <h1 className="text-white font-bold text-lg">Design Society</h1>
        <p className="text-gray-400 text-l m-2">Department of Computer Science & Design, KKWIEER</p>
      </div>

      {/* CSS Grid Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] min-h-screen">
        
        {/* Left Column - Background Image Only */}
        <div className="relative">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img 
              src={backgroundImage} 
              alt="DESOC Background" 
              className="w-full h-full object-cover"
            />
            {/* Dark Red Overlay Gradient - blends into right side */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-[#7a0000]/30 to-black"></div>
          </div>
        </div>

        {/* Right Column - Content */}
        <div className="flex items-center justify-start px-8 lg:px-16 py-16 lg:py-0">
          <div className="w-full">
            {/* Main Heading */}
            <h1 className="font-extrabold text-white mb-10 tracking-wider" style={{ fontSize: 'clamp(6rem, 15vw, 1rem)' }}>
              DESOC
            </h1>
            
            {/* Mission Statement Quote */}
            <p className="text-gray-300 text-lg lg:text-xl mb-8 leading-relaxed">
              "Inspiring a future where technology and design harmoniously advance society through innovation and creativity."
            </p>
            

            {/* CTA Button */}
            <button className="group inline-flex items-center justify-center px-6 py-3 text-white font-medium bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red-900/30">
              About Us
              <svg
                className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;