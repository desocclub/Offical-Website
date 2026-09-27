'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import type { StaticImageData } from 'next/image';
import { resolveSrc } from '@/lib/imageUtils';

// Import faculty photos
import bhiseMam from '@/src/assets/dept/bhise_mam.jpg';
import induMam from '@/src/assets/dept/indu_mam.jpg';
import vrushaliMam from '@/src/assets/dept/vrushali_mam.webp';
import mrunaliMam from '@/src/assets/dept/mrunali_mam.webp';
import reshmaMam from '@/src/assets/dept/reshma_dhurjad.jpeg';
import nilimaMam from '@/src/assets/dept/nilima_gaidhani.jpeg';

interface FacultyMember {
  name: string;
  designation: string;
  specialization: string;
  image: string | StaticImageData;
}

export default function CSDDepartmentPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    window.scrollTo(0, 0);
  }, []);

  const facultyMembers: FacultyMember[] = [
    { name: 'Dr. Y D Bhise', designation: 'Department Coordinator', specialization: 'Computer Science & Design', image: bhiseMam },
    { name: 'Indu Seethanathan', designation: 'Assistant Professor', specialization: 'Computer Science & Design', image: induMam },
    { name: 'Vrushali Chane', designation: 'Assistant Professor', specialization: 'Computer Science & Design', image: vrushaliMam },
    { name: 'Mrunali Pawar', designation: 'Assistant Professor', specialization: 'Computer Science & Design', image: mrunaliMam },
    { name: 'Reshma Dhurjad', designation: 'Assistant Professor', specialization: 'Computer Science & Design', image: reshmaMam },
    { name: 'Nilima Gaidhani', designation: 'Assistant Professor', specialization: 'Computer Science & Design', image: nilimaMam },
  ];

  // Glass card wrapper used throughout
  const GlassCard = ({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
    <div
      className={`
        relative overflow-hidden rounded-2xl sm:rounded-3xl backdrop-blur-2xl border border-white/10
        p-4 sm:p-6 md:p-10
        transition-all duration-700 ease-out
        ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
        ${className}
      `}
      style={{
        transitionDelay: `${delay}ms`,
        background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
      }}
    >
      {/* Background glow */}
      <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl" style={{ background: 'rgba(220,38,38,0.08)' }} />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl" style={{ background: 'rgba(127,29,29,0.08)' }} />
      <div className="relative z-10">{children}</div>
    </div>
  );

  // Section title with red accent bar
  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <div className="flex items-center mb-8 sm:mb-10">
      <div
        className="w-1 h-10 rounded-full mr-4 flex-shrink-0"
        style={{
          background: 'linear-gradient(to bottom, #ef4444, #b91c1c)',
          boxShadow: '0 0 10px rgba(220,38,38,0.5)'
        }}
      />
      <h2 className="heading-h2 text-primary">{children}</h2>
    </div>
  );

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* ===== Background gradients ===== */}
      <div className="relative">
        <div className="fixed inset-0 -z-10" style={{ background: 'linear-gradient(135deg, black, rgba(127,29,29,0.3) 50%, black)' }} />
        <div className="fixed inset-0 -z-10" style={{ background: 'radial-gradient(ellipse at top right, rgba(127,29,29,0.15), transparent 50%)' }} />
        <div className="fixed inset-0 -z-10" style={{ background: 'radial-gradient(ellipse at bottom left, rgba(153,27,27,0.1), transparent 50%)' }} />
        <div className="fixed inset-0 opacity-5 -z-10" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

        {/* ===== Main Content ===== */}
        <main className="relative px-4 sm:px-6 lg:px-8 pt-24 pb-16 max-w-7xl mx-auto">

          {/* ===== Page Header ===== */}
          <header className={`text-center mb-12 sm:mb-16 md:mb-20 transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
            <div className="relative inline-block">
              <h1 className="heading-title-6 text-primary mb-4">
                Department of Computer Science & Design
              </h1>
              <p className="text-secondary text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
                Shaping the future at the intersection of Computer Science and Design — nurturing innovators, creators, and technology leaders since inception.
              </p>
            </div>
          </header>

          <div className="space-y-10 sm:space-y-14">

            {/* 1. DEPARTMENT OVERVIEW */}
            <GlassCard delay={100}>
              <SectionTitle>Department Overview</SectionTitle>
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-10">
                <div className="lg:col-span-3 space-y-5">
                  <p className="text-gray-300 leading-relaxed">
                    The Department of Computer Science & Design (CSD) at K K Wagh Institute of Engineering Education & Research, Nashik, is a pioneering program that blends core computer science principles with creative design methodologies. Established to address the growing demand for professionals who can bridge technology and user experience, the department offers a unique curriculum that prepares students for roles in software engineering, product design, UI/UX, and beyond.
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    With a strong emphasis on hands-on learning, industry collaboration, and interdisciplinary thinking, CSD equips students with both analytical rigor and creative problem-solving abilities. The department is home to state-of-the-art laboratories, experienced faculty, and a vibrant student community driven by the Design Society (DESOC).
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
                    {[
                      { label: 'Students', value: '240+' },
                      { label: 'Faculty', value: '8+' },
                      { label: 'Labs', value: '6' },
                    ].map((stat) => (
                      <div key={stat.label} className="text-center p-3 rounded-xl border border-white/10 bg-white/5">
                        <p className="text-2xl sm:text-3xl font-bold text-red-400">{stat.value}</p>
                        <p className="text-gray-400 text-xs sm:text-sm mt-1 uppercase tracking-wider">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="lg:col-span-2 flex items-center justify-center">
                  <div className="relative w-full aspect-square max-w-xs">
                    {/* Decorative concentric rings */}
                    <div className="absolute inset-0 rounded-full border border-red-500/20 animate-pulse" />
                    <div className="absolute inset-4 rounded-full border border-red-500/15" />
                    <div className="absolute inset-8 rounded-full border border-red-500/10" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-5xl sm:text-6xl font-extrabold text-white">CSD</p>
                        <p className="text-red-400 text-sm sm:text-base uppercase tracking-widest mt-2">Est. 2021</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* 2. VISION & MISSION */}
            <GlassCard delay={200}>
              <SectionTitle>Vision & Mission</SectionTitle>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                {/* Vision */}
                <div className="relative p-5 sm:p-8 rounded-2xl border border-white/10 bg-white/5 group hover:border-red-500/30 transition-all duration-500">
                  <div className="absolute top-0 left-0 w-full h-1 rounded-t-2xl" style={{ background: 'linear-gradient(to right, #ef4444, #b91c1c)' }} />
                  <div className="flex items-center gap-3 mb-4">
                    <svg className="w-8 h-8 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">Our Vision</h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    To be a nationally recognized center of excellence that produces innovative professionals capable of creating technology solutions that are both functionally robust and aesthetically impactful — transforming the way humans interact with technology.
                  </p>
                </div>

                {/* Mission */}
                <div className="relative p-5 sm:p-8 rounded-2xl border border-white/10 bg-white/5 group hover:border-red-500/30 transition-all duration-500">
                  <div className="absolute top-0 left-0 w-full h-1 rounded-t-2xl" style={{ background: 'linear-gradient(to right, #b91c1c, #ef4444)' }} />
                  <div className="flex items-center gap-3 mb-4">
                    <svg className="w-8 h-8 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.58-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                    </svg>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">Our Mission</h3>
                  </div>
                  <ul className="space-y-3 text-gray-300 leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
                      Provide a curriculum that integrates computer science fundamentals with design principles and creative thinking.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
                      Foster industry-academia partnerships through internships, workshops, and collaborative projects.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
                      Cultivate an environment of research, innovation, and entrepreneurial spirit among students and faculty.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
                      Develop socially responsible graduates who contribute meaningfully to the technology and design ecosystem.
                    </li>
                  </ul>
                </div>
              </div>
            </GlassCard>

            {/* 3. FACULTY MEMBERS */}
            <GlassCard delay={300}>
              <SectionTitle>Faculty Members</SectionTitle>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {facultyMembers.map((faculty, index) => (
                  <div
                    key={index}
                    className="group relative p-4 sm:p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-red-500/40 hover:bg-white/10 transition-all duration-500"
                  >
                    {/* Faculty photo */}
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden mx-auto mb-4 border-2 border-red-600/40 group-hover:border-red-500 group-hover:scale-110 transition-all duration-500" style={{ boxShadow: '0 0 20px rgba(220,38,38,0.2)' }}>
                      <img
                        src={resolveSrc(faculty.image)}
                        alt={faculty.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div className="text-center">
                      <h3 className="text-white font-bold text-base sm:text-lg mb-1">{faculty.name}</h3>
                      <p className="text-red-400 text-xs sm:text-sm font-medium uppercase tracking-wider mb-2">{faculty.designation}</p>
                      <p className="text-gray-400 text-xs leading-relaxed">{faculty.specialization}</p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* 4. LABORATORIES */}
            <GlassCard delay={400}>
              <SectionTitle>Laboratories</SectionTitle>
              <div className="rounded-2xl border border-dashed border-red-500/30 bg-red-500/5 px-6 py-10 text-center">
                <p className="text-white text-xl sm:text-2xl font-semibold mb-2">Coming Soon</p>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  The Laboratories section is currently being updated and will be available soon.
                </p>
              </div>
            </GlassCard>

            {/* 5. ALUMNI */}
            <GlassCard delay={500}>
              <SectionTitle>Alumni</SectionTitle>
              <div className="rounded-2xl border border-dashed border-red-500/30 bg-red-500/5 px-6 py-10 text-center">
                <p className="text-white text-xl sm:text-2xl font-semibold mb-2">Coming Soon</p>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  The Alumni section is under maintenance and will be published soon.
                </p>
              </div>
            </GlassCard>

          </div>

        </main>
      </div>

      <Footer />
    </div>
  );
}
