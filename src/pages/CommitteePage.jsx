import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Import member images from assets/members
import adityaImg from '../assets/members/aditya.svg';
import ayushiImg from '../assets/members/ayushi.svg';
import jeetImg from '../assets/members/jeet.svg';
import ishaniImg from '../assets/members/ishani.svg';
import monishImg from '../assets/members/monish.svg';
import vedantImg from '../assets/members/vedant.svg';
import sanskrutiImg from '../assets/members/sanskruti.svg';
import pranitaImg from '../assets/members/pranita.svg';
import shrimantImg from '../assets/members/shrimant.svg';
import omcImg from '../assets/members/omc.jpeg';
import piyushImg from '../assets/members/piyush.svg';
import rajanImg from '../assets/members/rajan.svg';
import dishaImg from '../assets/members/disha.svg';
import madhuraImg from '../assets/members/madhura.svg';
import zaweriyaImg from '../assets/members/zewariya.svg';
import atharvaImg from '../assets/members/atharva.svg';
import omImg from '../assets/members/om.svg';
import kshitijaImg from '../assets/members/kshitija.svg';
import nehaImg from '../assets/members/neha.svg';
import parthImg from '../assets/members/parth.svg';
import sahilImg from '../assets/members/sahil.svg';
import riyaImg from '../assets/members/riya.svg';
import swaradaImg from '../assets/members/swarada.svg';
import shravaniImg from '../assets/members/shravani.svg';
import prashantImg from '../assets/members/prashant.svg';
import siddharthImg from '../assets/members/siddharth.svg';

const CommitteePage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Committee data organized by teams
  const committeeData = {
    core: {
      title: "Core Committee",
      members: [
        { name: "Aditya Ahirrao", role: "President", image: adityaImg },
        { name: "Ayushi Deore", role: "Vice President", image: ayushiImg },
        { name: "Vedant Sonawane", role: "Event Operations Head", image: vedantImg },
        { name: "Ishani Murkewar", role: "Secretary", image: ishaniImg },
        { name: "Jeet Patil", role: "Technical Head", image: jeetImg },
        { name: "Monish Patil", role: "Creative Head", image: monishImg },
        { name: "Sanskruti Gite", role: "Treasurer", image: sanskrutiImg },
        { name: "Pranita Patil", role: "Co-Treasurer", image: pranitaImg },
      ]
    },
    technical: {
      title: "Technical Team",
      members: [
        { name: "Shrimant Marathe", role: "Technical Team", image: shrimantImg },
        { name: "Om Chaudhari", role: "Technical Team", image: omcImg },
        { name: "Piyush Shendge", role: "Technical Team", image: piyushImg },
        { name: "Rajan Udapure", role: "Technical Team", image: rajanImg },
      ]
    },
    editorial: {
      title: "Editorial Team",
      members: [
        { name: "Disha Kapse", role: "Editorial Team", image: dishaImg },
        { name: "Madhura Katti", role: "Editorial Team", image: madhuraImg },
        { name: "Zaweriya Khan", role: "Editorial Team", image: zaweriyaImg },
      ]
    },
    eventOps: {
      title: "Event Operations Team",
      members: [
        { name: "Atharva Kulkarni", role: "Event Operations", image: atharvaImg },
        { name: "Om Patil", role: "Event Operations", image: omImg },
        { name: "Kshitija Daware", role: "Event Operations", image: kshitijaImg },
        { name: "Neha Bhamare", role: "Event Operations", image: nehaImg },
        { name: "Parth Waje", role: "Event Operations", image: parthImg },
        { name: "Sahil Batheja", role: "Event Operations", image: sahilImg },
      ]
    },
    creative: {
      title: "Creative Team",
      members: [
        { name: "Riya Sequeira", role: "Creative Team", image: riyaImg },
        { name: "Swarada Joshi", role: "Creative Team", image: swaradaImg },
        { name: "Shravani Bhagwat", role: "Creative Team", image: shravaniImg },
        { name: "Prashant Deokar", role: "Creative Team", image: prashantImg },
        { name: "Siddharth Wade", role: "Creative Team", image: siddharthImg },
      ]
    }
  };

  // Member Card Component
  const MemberCard = ({ member, index }) => (
    <div
      className={`
        group relative overflow-hidden rounded-2xl
        backdrop-blur-xl border border-white/10
        transition-all duration-500 ease-out
        hover:scale-105 hover:border-red-500/50
        ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
      `}
      style={{ 
        transitionDelay: `${index * 100}ms`,
        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 0 40px rgba(220,38,38,0.3), 0 8px 32px rgba(0,0,0,0.4)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.3)';
      }}
    >
      {/* Glow effect on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: 'linear-gradient(to top, rgba(220,38,38,0.2), transparent)' }}
      />

      {/* Image Container */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
        />
        {/* Gradient Overlay */}
        <div 
          className="absolute inset-0 opacity-80"
          style={{ background: 'linear-gradient(to top, black, rgba(0,0,0,0.5) 50%, transparent)' }}
        />
        
        {/* Neon border glow effect */}
        <div className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: 'linear-gradient(to right, transparent, #ef4444, transparent)' }}
        />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5">
        <h3 className="text-white font-bold text-base sm:text-lg tracking-wide mb-1 group-hover:text-red-100 transition-colors duration-300">
          {member.name}
        </h3>
        <p className="text-red-400 text-sm font-medium uppercase tracking-wider group-hover:text-red-300 transition-colors duration-300">
          {member.role}
        </p>
      </div>

      {/* Corner accent */}
      <div 
        className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: 'linear-gradient(to bottom left, rgba(220,38,38,0.3), transparent)' }}
      />
    </div>
  );

  // Team Section Component
  const TeamSection = ({ teamKey, team, sectionIndex }) => (
    <section
      className={`
        mb-16 transition-all duration-700 ease-out
        ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
      `}
      style={{ transitionDelay: `${sectionIndex * 200}ms` }}
    >
      {/* Glass Container */}
      <div 
        className="relative overflow-hidden rounded-2xl sm:rounded-3xl backdrop-blur-2xl border border-white/10 p-4 sm:p-6 md:p-10"
        style={{ 
          background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
        }}
      >
        {/* Background glow */}
        <div 
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl"
          style={{ background: 'rgba(220,38,38,0.1)' }}
        />
        <div 
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl"
          style={{ background: 'rgba(127,29,29,0.1)' }}
        />

        {/* Team Title with Red Accent */}
        <div className="relative flex items-center mb-10">
          <div 
            className="w-1 h-10 rounded-full mr-4"
            style={{ 
              background: 'linear-gradient(to bottom, #ef4444, #b91c1c)',
              boxShadow: '0 0 10px rgba(220,38,38,0.5)'
            }}
          />
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
            {team.title}
          </h2>
        </div>

        {/* Members Grid */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {team.members.map((member, index) => (
            <MemberCard 
              key={`${teamKey}-${index}`} 
              member={member} 
              index={index + sectionIndex * 3}
            />
          ))}
        </div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      {/* Background with gradient */}
      <div className="relative">
        {/* Dark red & black gradient background */}
        <div 
          className="fixed inset-0 -z-10"
          style={{ background: 'linear-gradient(135deg, black, rgba(127,29,29,0.3) 50%, black)' }}
        />
        <div 
          className="fixed inset-0 -z-10"
          style={{ background: 'radial-gradient(ellipse at top right, rgba(127,29,29,0.15), transparent 50%)' }}
        />
        <div 
          className="fixed inset-0 -z-10"
          style={{ background: 'radial-gradient(ellipse at bottom left, rgba(153,27,27,0.1), transparent 50%)' }}
        />
        
        {/* Subtle grid pattern */}
        <div 
          className="fixed inset-0 opacity-5 -z-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />

        {/* Main Content */}
        <main className="relative px-4 sm:px-6 lg:px-8 pt-24 pb-16 max-w-7xl mx-auto">
          {/* Page Header */}
          <header 
            className={`
              text-center mb-10 sm:mb-16 md:mb-20 transition-all duration-1000 ease-out
              ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}
            `}
          >
            {/* Decorative elements */}
            <div className="relative inline-block">
              <div 
                className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-1 rounded-full"
                style={{ 
                  background: 'linear-gradient(to right, transparent, #ef4444, transparent)',
                  boxShadow: '0 0 20px rgba(220,38,38,0.5)'
                }}
              />
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-4">
                DESOC Committee
              </h1>
              
              <div className="flex items-center justify-center gap-3 mb-6">
                <div 
                  className="h-px w-12"
                  style={{ background: 'linear-gradient(to right, transparent, #ef4444)' }}
                />
                <span className="text-red-400 text-xl md:text-2xl font-light tracking-widest">
                  2025–26
                </span>
                <div 
                  className="h-px w-12"
                  style={{ background: 'linear-gradient(to left, transparent, #ef4444)' }}
                />
              </div>
              
              <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                Meet the dedicated team driving innovation and excellence at the Design Society
              </p>
              
              <div 
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-40 h-1 rounded-full"
                style={{ background: 'linear-gradient(to right, transparent, rgba(220,38,38,0.5), transparent)' }}
              />
            </div>
          </header>

          {/* Team Sections */}
          <div className="space-y-8">
            {Object.entries(committeeData).map(([key, team], index) => (
              <TeamSection 
                key={key} 
                teamKey={key} 
                team={team} 
                sectionIndex={index}
              />
            ))}
          </div>

          {/* Bottom decoration */}
          <div 
            className={`
              mt-20 flex justify-center transition-all duration-1000
              ${isLoaded ? 'opacity-100' : 'opacity-0'}
            `}
            style={{ transitionDelay: '1000ms' }}
          >
            <div className="flex items-center gap-2">
              <div 
                className="w-2 h-2 rounded-full bg-red-600"
                style={{ boxShadow: '0 0 10px rgba(220,38,38,0.8)' }}
              />
              <div 
                className="w-16 h-px"
                style={{ background: 'linear-gradient(to right, #dc2626, transparent)' }}
              />
              <span className="text-gray-500 text-sm uppercase tracking-widest">Design Society</span>
              <div 
                className="w-16 h-px"
                style={{ background: 'linear-gradient(to left, #dc2626, transparent)' }}
              />
              <div 
                className="w-2 h-2 rounded-full bg-red-600"
                style={{ boxShadow: '0 0 10px rgba(220,38,38,0.8)' }}
              />
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default CommitteePage;
