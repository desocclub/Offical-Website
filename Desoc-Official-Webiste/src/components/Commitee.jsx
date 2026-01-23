import { useState } from 'react';
import CommitteeCard from './CommiteeCard';
import adityaImg from '../assets/aditya.svg';
import ayushiImg from '../assets/ayushi.svg';
import vedantImg from '../assets/vedant.svg';
import jeetImg from '../assets/jeet.svg';
import monishImg from '../assets/monish.svg';
import ishaniImg from '../assets/ishani.svg';

const Committee = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const committeeMembers = [
    {
      id: 1,
      name: "Aditya Ahirrao",
      role: "President",
      image: adityaImg
    },
    {
      id: 2,
      name: "Ayushi Deore",
      role: "Vice President",
      image: ayushiImg
    },
    {
      id: 3,
      name: "Vedant Sonawane",
      role: "Event Operation Head",
      image: vedantImg
    },
    {
      id: 4,
      name: "Jeet Patil",
      role: "Tech Head",
      image: jeetImg
    },
    {
      id: 5,
      name: "Monish Patil",
      role: "Design Team Head",
      image: monishImg
    },
    {
      id: 6,
      name: "Ishani Mukewar",
      role: "Secretary",
      image: ishaniImg
    }
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? committeeMembers.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === committeeMembers.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="committee" className="relative py-16 bg-black overflow-hidden">
      {/* Section Title */}
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-black bg-white py-4">
          COMMITTEE 2025-26
        </h2>
      </div>

      {/* Cards Container with Dark Background */}
      <div className="relative bg-[#1a1a1a] py-8">
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:text-red-500 transition-colors duration-300"
        >
          <svg className="w-10 h-10" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>

        {/* Cards Row */}
        <div className="flex gap-4 px-16 justify-center items-center">
          {committeeMembers.map((member, index) => (
            <CommitteeCard
              key={member.id}
              name={member.name}
              role={member.role}
              image={member.image}
              isActive={index === 1}
              instagram={member.instagram}
              linkedin={member.linkedin}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:text-red-500 transition-colors duration-300"
        >
          <svg className="w-10 h-10" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M9 5l7 7-7 7"></path>
          </svg>
        </button>

        {/* View All Button */}
        <div className="absolute bottom-8 right-16">
          <button className="group inline-flex items-center justify-center px-6 py-2 text-white font-medium bg-red-700 hover:bg-red-600 rounded transition-all duration-300">
            View All
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
    </section>
  );
};

export default Committee;