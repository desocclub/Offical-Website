import { useState } from 'react';
import { Link } from 'react-router-dom';
import adityaImg from '../assets/aditya.svg';
import ayushiImg from '../assets/ayushi.svg';
import jeetImg from '../assets/jeet.svg';
import vedantImg from '../assets/vedant.svg';
import monishImg from '../assets/monish.svg';
import ishaniImg from '../assets/ishani.svg';

const CommitteePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const menuItems = [
    { name: 'Home', path: '/', type: 'route' },
    { name: 'Events', path: '#events', type: 'hash' },
    { name: 'Alumni', path: '#alumni', type: 'hash' },
    { name: 'Committee', path: '/committee', type: 'route' },
    { name: 'Gallery', path: '#gallery', type: 'hash' },
    { name: 'Contact Us', path: '#contact', type: 'hash' }
  ];
  // Core Committee Data
  const coreCommittee = {
    president: {
      name: "Aditya Ahirrao",
      role: "President",
      image: adityaImg
    },
    vicePresident: {
      name: "Ayushi Deore",
      role: "Vice President",
      image: ayushiImg
    },
    positions: [
      { name: "Jeet Patil", role: "Treasurer", image: jeetImg },
      { name: "Vedant Sonawane", role: "Co-Treasurer", image: vedantImg },
      { name: "Ishani Mukewar", role: "Secretary", image: ishaniImg },
      { name: "Jeet Patil", role: "Technical Head", image: jeetImg },
      { name: "Vedant Sonawane", role: "Event Head", image: vedantImg },
      { name: "Monish Patil", role: "Design Head", image: monishImg }
    ]
  };

  // Teams Data
  const teams = [
    {
      name: "Technical Team",
      members: [
        { name: "Jeet Patil", image: jeetImg },
        { name: "Vedant Sonawane", image: vedantImg },
        { name: "Monish Patil", image: monishImg },
        { name: "Ishani Mukewar", image: ishaniImg },
        { name: "Aditya Ahirrao", image: adityaImg }
      ]
    },
    {
      name: "Editorial Team",
      members: [
        { name: "Ayushi Deore", image: ayushiImg },
        { name: "Ishani Mukewar", image: ishaniImg },
        { name: "Monish Patil", image: monishImg }
      ]
    },
    {
      name: "Event Operations Team",
      members: [
        { name: "Vedant Sonawane", image: vedantImg },
        { name: "Jeet Patil", image: jeetImg },
        { name: "Aditya Ahirrao", image: adityaImg },
        { name: "Ayushi Deore", image: ayushiImg },
        { name: "Monish Patil", image: monishImg },
        { name: "Ishani Mukewar", image: ishaniImg }
      ]
    }
  ];

  return (
    <div className="relative min-h-screen bg-black">
      {/* Background Red Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-red-900/20 to-transparent"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-red-800/10 rounded-full blur-3xl"></div>
      </div>
      
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
      
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold text-red-600 mb-1 tracking-wider">
            DESOC
          </h1>
          <p className="text-2xl md:text-3xl text-white">
            <span className="italic font-light">Committee</span> <span className="font-semibold">2025-26</span>
          </p>
        </div>

        {/* President & Vice President - Staggered Layout */}
        <div className="max-w-5xl mx-auto mb-20 space-y-6">
          {/* President Row */}
          <div className="flex items-center gap-6 md:gap-10">
            {/* President Image Card */}
            <div className="flex-shrink-0">
              <div className="w-40 h-52 md:w-48 md:h-60 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 shadow-xl">
                <img src={coreCommittee.president.image} alt={coreCommittee.president.name} className="w-full h-full object-cover object-top" />
              </div>
            </div>
            {/* President Info */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{coreCommittee.president.role}</h2>
              <p className="text-xl md:text-2xl text-white/90 flex items-center">
                <span className="text-red-500 mr-2">|</span>{coreCommittee.president.name}
              </p>
            </div>
          </div>

          {/* Vice President Row - Right Aligned */}
          <div className="flex items-center gap-6 md:gap-10 justify-end">
            {/* VP Info */}
            <div className="text-right">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{coreCommittee.vicePresident.role}</h2>
              <p className="text-xl md:text-2xl text-white/90 flex items-center justify-end">
                <span className="text-red-500 mr-2">|</span>{coreCommittee.vicePresident.name}
              </p>
            </div>
            {/* VP Image Card */}
            <div className="flex-shrink-0">
              <div className="w-40 h-52 md:w-48 md:h-60 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 shadow-xl">
                <img src={coreCommittee.vicePresident.image} alt={coreCommittee.vicePresident.name} className="w-full h-full object-cover object-top" />
              </div>
            </div>
          </div>
        </div>

        {/* Core Positions */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {coreCommittee.positions.map((member, index) => (
              <div key={index} className="group bg-[#1a1a1a] rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-red-900/10">
                <div className="relative h-48 md:h-56 overflow-hidden">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover object-top" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
                </div>
                <div className="p-4 text-center">
                  <p className="text-red-500 text-xs font-medium uppercase tracking-wide mb-1">{member.role}</p>
                  <h3 className="text-white font-semibold text-base">{member.name}</h3>
                  <button className="mt-3 bg-gray-800 hover:bg-gray-700 rounded-lg px-4 py-2 transition-all duration-300 inline-flex items-center justify-center">
                    <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Teams Sections */}
        {teams.map((team, teamIndex) => (
          <div key={teamIndex} className="max-w-6xl mx-auto mb-12">
            <div className="bg-[#1a1a1a] rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 tracking-wide">
                {team.name}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {team.members.map((member, memberIndex) => (
                  <div key={memberIndex} className="group">
                    <div className="relative h-40 md:h-48 rounded-xl overflow-hidden mb-3">
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover object-top" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="text-white font-semibold text-sm">{member.name}</h3>
                      </div>
                    </div>
                    <button className="w-full bg-gray-800 hover:bg-gray-700 rounded-lg py-2.5 transition-all duration-300 flex items-center justify-center">
                      <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommitteePage;
