'use client';

import React from 'react';
import type { StaticImageData } from 'next/image';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import { resolveSrc } from '@/lib/imageUtils';

// College Lab Banner
import csdBanner from '@/src/assets/img/csd-department-banner.jpg';

// Faculty Photographs from src/assets/dept/faculty
import photoBhise from '@/src/assets/dept/faculty/dr-y-d-bhise.jpg';
import photoSeethanathan from '@/src/assets/dept/faculty/ms-indu-seethanathan.jpg';
import photoChanne from '@/src/assets/dept/faculty/vrushali-channe.webp';
import photoDhurjad from '@/src/assets/dept/faculty/ms-r-k-dhurjad.jpg';
import photoPawar from '@/src/assets/dept/faculty/mrunali-pawar.png';
import photoGaidhani from '@/src/assets/dept/faculty/n-h-gaidhani.webp';
import photoShete from '@/src/assets/dept/faculty/ruchika-shete.webp';
import photoSalve from '@/src/assets/dept/faculty/purnankita-salve.webp';

interface FacultyRecord {
  name: string;
  position: string;
  imageTitle: string;
  image: StaticImageData | string;
  linkedin: string;
}

const FACULTY_MEMBERS: FacultyRecord[] = [
  {
    name: 'Dr. Y. D. Bhise',
    position: 'Department Coordinator',
    imageTitle: 'dr-y-d-bhise',
    image: photoBhise,
    linkedin: 'https://www.linkedin.com/in/dr-yogita-pagar-bhise-198428224/',
  },
  {
    name: 'Ms. Indu Seethanathan',
    position: 'Assistant Professor',
    imageTitle: 'ms-indu-seethanathan',
    image: photoSeethanathan,
    linkedin: 'https://www.linkedin.com/in/indu-s-37b3b2174/',
  },
  {
    name: 'Ms. V. P. Channe',
    position: 'Assistant Professor',
    imageTitle: 'vrushali-channe',
    image: photoChanne,
    linkedin: 'https://www.linkedin.com/in/vrushali-channe-99b421346/',
  },
  {
    name: 'Ms. R. K. Dhurjad',
    position: 'Assistant Professor',
    imageTitle: 'ms-r-k-dhurjad',
    image: photoDhurjad,
    linkedin: 'https://www.linkedin.com/in/reshma-dhurjad-0b029a209/',
  },
  {
    name: 'Ms. M. C. Pawar',
    position: 'Assistant Professor',
    imageTitle: 'mrunali-pawar',
    image: photoPawar,
    linkedin: 'https://www.linkedin.com/in/mrunali-pawar-b4b5232ab/',
  },
  {
    name: 'Ms. N. H. Gaidhani',
    position: 'Assistant Professor',
    imageTitle: 'n-h-gaidhani',
    image: photoGaidhani,
    linkedin: 'https://www.linkedin.com/in/nileema-gaidhani-76415b3b3/',
  },
  {
    name: 'Ms. R. S. Shete',
    position: 'Assistant Professor',
    imageTitle: 'ruchika-shete',
    image: photoShete,
    linkedin: 'https://www.linkedin.com/in/ruchika-shete-shendre-6522603b3/',
  },
  {
    name: 'Ms. P. R. Salve',
    position: 'Assistant Professor',
    imageTitle: 'purnankita-salve',
    image: photoSalve,
    linkedin: 'https://linkedin.com/in/purnankita-salve-479353227',
  },
];

export default function CSDDepartmentPage() {
  return (
    <div className="min-h-screen bg-[#080808] text-neutral-200 font-geist antialiased selection:bg-neutral-800 selection:text-white">
      {/* 3. Existing Navbar Preserved Exactly */}
      <Navbar />

      <main className="relative z-10 pt-28 sm:pt-36 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================= */}
        {/* HERO SECTION                                              */}
        {/* ========================================================= */}
        <section className="relative">
          {/* Top metadata ticker */}
          <div className="flex items-center justify-between text-[11px] sm:text-xs font-geist-mono text-neutral-400 uppercase tracking-widest pb-4 sm:pb-6 border-b border-neutral-800">
            <span className="flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 bg-neutral-400" aria-hidden="true" />
              <span>Academic Department</span>
            </span>
            <span className="font-geist-pixel text-neutral-400">
              KKWIEER // EST. 2021
            </span>
          </div>

          {/* Hero Main Heading: On a single line on desktop */}
          <div className="pt-8 sm:pt-12 pb-4 overflow-visible">
            <h1 className="font-geist-pixel text-white font-normal tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-[clamp(2.15rem,4.15vw,4.4rem)] xl:text-[clamp(2.65rem,4.35vw,4.85rem)] lg:whitespace-nowrap leading-[1.08] select-none">
              Computer Science and Design
            </h1>
          </div>

          {/* Hero Description & Call to Action */}
          <div className="mt-6 pt-6 sm:pt-8 border-t border-neutral-800 grid grid-cols-1 lg:grid-cols-12 gap-6 items-baseline">
            <div className="lg:col-span-8">
              <p className="text-neutral-400 text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-3xl">
                Shaping the future at the intersection of Computer Science and Design — nurturing innovators, creators, and technology leaders since inception.
              </p>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <a
                href="#overview"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-geist-mono uppercase tracking-wider text-neutral-400 hover:text-white transition-colors duration-200 group py-1.5 border-b border-neutral-700 hover:border-white"
              >
                <span>Explore the department</span>
                <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true">
                  ↗
                </span>
              </a>
            </div>
          </div>

          {/* Hero Image: Wide rectangular crop, original colours, tactile film grain */}
          <div className="mt-10 sm:mt-14">
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/7] lg:aspect-[21/9] border border-neutral-800 bg-neutral-950 overflow-hidden">
              <img
                src={resolveSrc(csdBanner)}
                alt="Computer Science and Design department laboratory facility"
                className="w-full h-full object-cover object-center"
              />
              {/* Subtle tactile film grain overlay */}
              <div
                className="pointer-events-none absolute inset-0 z-10 opacity-[0.06] mix-blend-overlay"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'repeat',
                }}
                aria-hidden="true"
              />
            </div>
            <div className="mt-3 flex items-center justify-between text-[11px] font-geist-mono text-neutral-400 uppercase tracking-wider">
              <span>FIG. 01 — COMPUTING & DESIGN LABORATORY FACILITY</span>
              <span className="hidden sm:inline">CAMPUS ARCHIVE // K. K. WAGH</span>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 01. DEPARTMENT OVERVIEW                                    */}
        {/* ========================================================= */}
        <section id="overview" className="mt-24 sm:mt-32 pt-12 sm:pt-16 border-t border-neutral-800 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-10 sm:mb-12">
            <div className="flex items-center gap-3">
              <span className="font-geist-pixel text-neutral-400 text-sm sm:text-base">
                [ 01 ]
              </span>
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-white">
                Department Overview
              </h2>
            </div>
            <span className="font-geist-mono text-xs text-neutral-400 uppercase tracking-widest">
              PROGRAM DIRECTORY // 2021–PRESENT
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
            {/* Left column: Architectural highlight statement + metrics */}
            <div className="lg:col-span-5 space-y-8">
              <p className="text-xl sm:text-2xl font-light text-white leading-snug tracking-tight">
                An interdisciplinary curriculum uniting computational rigor with human-centered product craft.
              </p>

              {/* Minimal metrics matrix */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-4 sm:p-5 border border-neutral-800 bg-neutral-900/20">
                  <div className="font-geist-pixel text-2xl sm:text-3xl text-white">240+</div>
                  <div className="text-[11px] font-geist-mono text-neutral-400 uppercase tracking-wider mt-2">
                    Students Enrolled
                  </div>
                </div>
                <div className="p-4 sm:p-5 border border-neutral-800 bg-neutral-900/20">
                  <div className="font-geist-pixel text-2xl sm:text-3xl text-white">08+</div>
                  <div className="text-[11px] font-geist-mono text-neutral-400 uppercase tracking-wider mt-2">
                    Faculty Staff
                  </div>
                </div>
                <div className="p-4 sm:p-5 border border-neutral-800 bg-neutral-900/20">
                  <div className="font-geist-pixel text-2xl sm:text-3xl text-white">06</div>
                  <div className="text-[11px] font-geist-mono text-neutral-400 uppercase tracking-wider mt-2">
                    Specialized Labs
                  </div>
                </div>
                <div className="p-4 sm:p-5 border border-neutral-800 bg-neutral-900/20">
                  <div className="font-geist-pixel text-2xl sm:text-3xl text-white">2021</div>
                  <div className="text-[11px] font-geist-mono text-neutral-400 uppercase tracking-wider mt-2">
                    Established Year
                  </div>
                </div>
              </div>
            </div>

            {/* Right column: Exact factual description */}
            <div className="lg:col-span-7 space-y-6 text-neutral-300 text-base sm:text-lg leading-relaxed font-normal">
              <p>
                The Department of Computer Science &amp; Design (CSD) at K K Wagh Institute of Engineering Education &amp; Research, Nashik, is a pioneering program that blends core computer science principles with creative design methodologies. Established to address the growing demand for professionals who can bridge technology and user experience, the department offers a unique curriculum that prepares students for roles in software engineering, product design, UI/UX, and beyond.
              </p>
              <p className="text-neutral-400">
                With a strong emphasis on hands-on learning, industry collaboration, and interdisciplinary thinking, CSD equips students with both analytical rigor and creative problem-solving abilities. The department is home to state-of-the-art laboratories, experienced faculty, and a vibrant student community driven by the Design Society (DESOC).
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 02. VISION & MISSION                                      */}
        {/* ========================================================= */}
        <section id="vision-mission" className="mt-24 sm:mt-32 pt-12 sm:pt-16 border-t border-neutral-800 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-10 sm:mb-12">
            <div className="flex items-center gap-3">
              <span className="font-geist-pixel text-neutral-400 text-sm sm:text-base">
                [ 02 ]
              </span>
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-white">
                Vision &amp; Mission
              </h2>
            </div>
            <span className="font-geist-mono text-xs text-neutral-400 uppercase tracking-widest">
              FOUNDATIONAL CHARTER
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Vision */}
            <div className="space-y-6 border-b lg:border-b-0 lg:border-r border-neutral-800 pb-10 lg:pb-0 lg:pr-12">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                <h3 className="text-base sm:text-lg font-medium text-white tracking-wide uppercase font-geist-mono">
                  Our Vision
                </h3>
                <span className="text-[11px] font-geist-pixel text-neutral-400 uppercase tracking-widest">
                  [ STATEMENT ]
                </span>
              </div>
              <p className="text-neutral-300 text-base sm:text-lg leading-relaxed font-light">
                To be a nationally recognized center of excellence that produces innovative professionals capable of creating technology solutions that are both functionally robust and aesthetically impactful — transforming the way humans interact with technology.
              </p>
            </div>

            {/* Mission */}
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                <h3 className="text-base sm:text-lg font-medium text-white tracking-wide uppercase font-geist-mono">
                  Our Mission
                </h3>
                <span className="text-[11px] font-geist-pixel text-neutral-400 uppercase tracking-widest">
                  [ 04 PILLARS ]
                </span>
              </div>
              <ul className="space-y-4">
                {[
                  'Provide a curriculum that integrates computer science fundamentals with design principles and creative thinking.',
                  'Foster industry-academia partnerships through internships, workshops, and collaborative projects.',
                  'Cultivate an environment of research, innovation, and entrepreneurial spirit among students and faculty.',
                  'Develop socially responsible graduates who contribute meaningfully to the technology and design ecosystem.',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-4 pt-3 border-t border-neutral-800/60 first:border-0 first:pt-0">
                    <span className="font-geist-pixel text-xs text-neutral-400 mt-1 flex-shrink-0">
                      0{index + 1}
                    </span>
                    <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 03. FACULTY DIRECTORY                                     */}
        {/* ========================================================= */}
        <section id="faculty" className="mt-24 sm:mt-32 pt-12 sm:pt-16 border-t border-neutral-800 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-8 sm:mb-12">
            <div className="flex items-center gap-3">
              <span className="font-geist-pixel text-neutral-400 text-sm sm:text-base">
                [ 03 ]
              </span>
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-white">
                Faculty Directory
              </h2>
            </div>
            <span className="font-geist-mono text-xs text-neutral-400 uppercase tracking-widest">
              ACADEMIC &amp; RESEARCH STAFF
            </span>
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block">
            {/* Table Header */}
            <div className="grid grid-cols-12 items-center py-3 px-4 border-b border-neutral-800 text-[11px] font-geist-mono uppercase tracking-wider text-neutral-400">
              <div className="col-span-2">Portrait</div>
              <div className="col-span-5">Faculty Member</div>
              <div className="col-span-3">Designation</div>
              <div className="col-span-2 text-right">Connect</div>
            </div>

            {/* Table Rows (8 faculty members in exact order) */}
            <div className="divide-y divide-neutral-800/70">
              {FACULTY_MEMBERS.map((faculty) => (
                <div
                  key={faculty.imageTitle}
                  className="grid grid-cols-12 items-center py-3.5 px-4 hover:bg-neutral-900/30 transition-colors duration-150 group"
                >
                  {/* Rectangular Photograph (Original natural colours preserved) */}
                  <div className="col-span-2">
                    <div className="w-14 h-16 sm:w-16 sm:h-20 border border-neutral-800 bg-neutral-950 overflow-hidden">
                      <img
                        src={resolveSrc(faculty.image)}
                        alt={`Photograph of ${faculty.name}`}
                        className="w-full h-full object-cover object-top"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Faculty Name */}
                  <div className="col-span-5 pr-4">
                    <div className="text-white font-medium text-base sm:text-lg group-hover:text-white transition-colors">
                      {faculty.name}
                    </div>
                  </div>

                  {/* Official Position */}
                  <div className="col-span-3 pr-4">
                    <div className="text-neutral-400 text-sm font-normal">
                      {faculty.position}
                    </div>
                  </div>

                  {/* LinkedIn Destination */}
                  <div className="col-span-2 text-right">
                    <a
                      href={faculty.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-geist-mono text-neutral-400 hover:text-white px-2.5 py-1.5 border border-neutral-800 hover:border-neutral-600 transition-colors duration-150"
                      aria-label={`LinkedIn profile of ${faculty.name}`}
                    >
                      <span>LinkedIn</span>
                      <span className="text-[10px]" aria-hidden="true">↗</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Directory View (Stacked compact rows) */}
          <div className="md:hidden divide-y divide-neutral-800/80">
            {FACULTY_MEMBERS.map((faculty) => (
              <div key={faculty.imageTitle} className="py-4 flex items-center gap-4">
                {/* Rectangular photo */}
                <div className="w-14 h-16 flex-shrink-0 border border-neutral-800 bg-neutral-950 overflow-hidden">
                  <img
                    src={resolveSrc(faculty.image)}
                    alt={`Photograph of ${faculty.name}`}
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-medium text-sm sm:text-base truncate mb-0.5">
                    {faculty.name}
                  </h3>
                  <p className="text-neutral-400 text-xs truncate">
                    {faculty.position}
                  </p>
                </div>

                {/* LinkedIn link button */}
                <a
                  href={faculty.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 p-2.5 border border-neutral-800 hover:border-neutral-600 text-neutral-400 hover:text-white transition-colors"
                  aria-label={`LinkedIn profile of ${faculty.name}`}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* 04. LABORATORIES & 05. ALUMNI (Understated Editorial)     */}
        {/* ========================================================= */}
        <section className="mt-24 sm:mt-32 pt-12 sm:pt-16 border-t border-neutral-800">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* 04. Laboratories */}
            <div className="border border-neutral-800 p-6 sm:p-8 bg-neutral-900/10">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-6">
                <div className="flex items-center gap-3">
                  <span className="font-geist-pixel text-neutral-400 text-xs">[ 04 ]</span>
                  <h3 className="text-lg font-medium text-white font-geist">Laboratories</h3>
                </div>
                <span className="font-geist-mono text-[10px] uppercase tracking-wider text-neutral-400 px-2 py-0.5 border border-neutral-800 bg-neutral-950">
                  Coming Soon
                </span>
              </div>
              <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
                The Laboratories section is currently being updated and will be available soon.
              </p>
            </div>

            {/* 05. Alumni */}
            <div className="border border-neutral-800 p-6 sm:p-8 bg-neutral-900/10">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-6">
                <div className="flex items-center gap-3">
                  <span className="font-geist-pixel text-neutral-400 text-xs">[ 05 ]</span>
                  <h3 className="text-lg font-medium text-white font-geist">Alumni</h3>
                </div>
                <span className="font-geist-mono text-[10px] uppercase tracking-wider text-neutral-400 px-2 py-0.5 border border-neutral-800 bg-neutral-950">
                  Coming Soon
                </span>
              </div>
              <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
                The Alumni section is under maintenance and will be published soon.
              </p>
            </div>

          </div>
        </section>

      </main>

      {/* 9. Existing Footer Preserved */}
      <Footer showBlaze={false} />
    </div>
  );
}
