import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import desocLogo from '../assets/desoc-logo.png';

// Import department images
import deptImg1 from '../assets/dept/csd_dept.jpg';
import deptImg2 from '../assets/dept/csd_dept2.jpg';
import labImg1 from '../assets/dept/csd_lab.jpg';
import labImg2 from '../assets/dept/csd_lab2.jpg';
import classroomImg from '../assets/dept/csd_classroom.jpg';

// Import alumni photos
import tanujaImg from '../assets/dept/alumni/tanuja_pagar.jpg';
import satyamImg from '../assets/dept/alumni/satyam_kale.jpg';
import pranavImg from '../assets/dept/alumni/pranav_shimpi.jpg';
import omImg from '../assets/dept/alumni/om_malpure.jpg';
import nayanImg from '../assets/dept/alumni/nayan_deshmuk.jpg';
import mohanImg from '../assets/dept/alumni/mohan_mondhe.jpg';

// Import faculty photos
import bhiseMam from '../assets/dept/bhise_mam.jpg';
import induMam from '../assets/dept/indu_mam.jpg';
import vrushaliMam from '../assets/dept/vrushali_mam.webp';
import mrunaliMam from '../assets/dept/mrunali_mam.webp';
import reshmaMam from '../assets/dept/reshma_mam.jpg';

const CSDDepartmentPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeLab, setActiveLab] = useState(0);

  useEffect(() => {
    setIsLoaded(true);
    window.scrollTo(0, 0);
  }, []);

  const facultyMembers = [
    { name: 'Dr. Y D Bhise', designation: 'Head of Department', specialization: 'Computer Science & Design', image: bhiseMam },
    { name: 'Indu Seethanathan', designation: 'Assistant Professor', specialization: 'Computer Science & Design', image: induMam },
    { name: 'Vrushali Chane', designation: 'Assistant Professor', specialization: 'Computer Science & Design', image: vrushaliMam },
    { name: 'Mrunali Pawar', designation: 'Assistant Professor', specialization: 'Computer Science & Design', image: mrunaliMam },
    { name: 'Reshma Dhurjad', designation: 'Assistant Professor', specialization: 'Computer Science & Design', image: reshmaMam },
  ];

  const laboratories = [
    { name: 'Design Studio Lab', description: 'Equipped with high-end workstations, Wacom tablets, and professional design software for UI/UX prototyping and digital art creation.', image: labImg1 },
    { name: 'Computer Programming Lab', description: 'State-of-the-art computing lab with modern hardware for programming, data structures, and algorithm development.', image: labImg2 },
    { name: 'Multimedia & Graphics Lab', description: 'Dedicated space for 3D modeling, animation, video editing, and multimedia content creation with industry-standard tools.', image: classroomImg },
    { name: 'Networking & IoT Lab', description: 'Hands-on lab for networking fundamentals, IoT prototyping, and embedded systems development.', image: deptImg1 },
    { name: 'Project Development Lab', description: 'Collaborative workspace for final year projects, hackathons, and team-based software development.', image: deptImg2 },
    { name: 'Research & Innovation Lab', description: 'Research-focused environment supporting faculty and student research in HCI, AI, and design innovation.', image: labImg1 },
  ];

  const alumniData = [
    { name: 'Tanuja Pagar', batch: '2020', role: 'UX Designer at Google', testimonial: 'CSD gave me the perfect blend of technical skills and design thinking that set me apart in the industry.', image: tanujaImg },
    { name: 'Satyam Kale', batch: '2019', role: 'Product Designer at Microsoft', testimonial: 'The department\'s focus on both CS fundamentals and design prepared me for a career I truly love.', image: satyamImg },
    { name: 'Pranav Shimpi', batch: '2021', role: 'Frontend Engineer at Flipkart', testimonial: 'The hands-on lab experience and industry exposure were invaluable for my career growth.', image: pranavImg },
    { name: 'Om Malpure', batch: '2020', role: 'Design Lead at Zomato', testimonial: 'CSD taught me to think at the intersection of technology and human experience.', image: omImg },
    { name: 'Nayan Deshmukh', batch: '2018', role: 'Co-founder, DesignTech Startup', testimonial: 'The entrepreneurial spirit and technical depth from CSD helped me build my own company.', image: nayanImg },
    { name: 'Mohan Mondhe', batch: '2021', role: 'UI Engineer at Adobe', testimonial: 'From design principles to clean code — CSD covered it all. Forever grateful!', image: mohanImg },
  ];

  // Glass card wrapper used throughout
  const GlassCard = ({ children, className = '', delay = 0 }) => (
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
  const SectionTitle = ({ children }) => (
    <div className="flex items-center mb-8 sm:mb-10">
      <div
        className="w-1 h-10 rounded-full mr-4 flex-shrink-0"
        style={{
          background: 'linear-gradient(to bottom, #ef4444, #b91c1c)',
          boxShadow: '0 0 10px rgba(220,38,38,0.5)'
        }}
      />
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-wide">{children}</h2>
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
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-1 rounded-full" style={{ background: 'linear-gradient(to right, transparent, #ef4444, transparent)', boxShadow: '0 0 20px rgba(220,38,38,0.5)' }} />

              <div className="flex justify-center mb-6">
                <img src={desocLogo} alt="CSD Logo" className="w-20 h-20 sm:w-24 sm:h-24" />
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-4">
                Department of Computer Science & Design
              </h1>

              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="h-px w-12" style={{ background: 'linear-gradient(to right, transparent, #ef4444)' }} />
                <span className="text-red-400 text-lg sm:text-xl md:text-2xl font-light tracking-widest">K K Wagh Institute</span>
                <div className="h-px w-12" style={{ background: 'linear-gradient(to left, transparent, #ef4444)' }} />
              </div>

              <p className="text-gray-400 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
                Shaping the future at the intersection of Computer Science and Design — nurturing innovators, creators, and technology leaders since inception.
              </p>

              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-40 h-1 rounded-full" style={{ background: 'linear-gradient(to right, transparent, rgba(220,38,38,0.5), transparent)' }} />
            </div>
          </header>

          <div className="space-y-10 sm:space-y-14">

            {/* ==============================
                1. DEPARTMENT OVERVIEW
            ============================== */}
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
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                    {[
                      { label: 'Students', value: '240+' },
                      { label: 'Faculty', value: '8+' },
                      { label: 'Labs', value: '6' },
                      { label: 'Placements', value: '95%' },
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
                        <p className="text-red-400 text-sm sm:text-base uppercase tracking-widest mt-2">Est. 2019</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* ==============================
                2. VISION & MISSION
            ============================== */}
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

            {/* ==============================
                3. FACULTY MEMBERS
            ============================== */}
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
                        src={faculty.image}
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

            {/* ==============================
                4. LABORATORIES
            ============================== */}
            <GlassCard delay={400}>
              <SectionTitle>Laboratories</SectionTitle>

              {/* Lab navigation tabs — horizontal scroll on mobile */}
              <div className="mb-6 sm:mb-8 overflow-x-auto scrollbar-hide">
                <div className="inline-flex flex-nowrap sm:flex-wrap gap-2 bg-black/30 p-2 rounded-2xl sm:rounded-full min-w-max sm:min-w-0">
                  {laboratories.map((lab, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveLab(index)}
                      className={`px-3 sm:px-5 py-2 text-xs sm:text-sm font-medium rounded-full transition-all duration-300 whitespace-nowrap ${
                        activeLab === index
                          ? 'bg-red-700 text-white shadow-lg shadow-red-700/30'
                          : 'text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      {lab.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Active lab showcase */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10">
                  <img
                    src={laboratories[activeLab].image}
                    alt={laboratories[activeLab].name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-red-600/90 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Lab {activeLab + 1} of {laboratories.length}
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">{laboratories[activeLab].name}</h3>
                  <p className="text-gray-300 leading-relaxed mb-4">{laboratories[activeLab].description}</p>

                  {/* Small thumbnail grid */}
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {laboratories.map((lab, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveLab(index)}
                        className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                          activeLab === index ? 'border-red-500 scale-105' : 'border-transparent opacity-50 hover:opacity-80'
                        }`}
                      >
                        <img src={lab.image} alt={lab.name} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* ==============================
                5. ALUMNI
            ============================== */}
            <GlassCard delay={500}>
              <SectionTitle>Alumni</SectionTitle>
              <p className="text-gray-400 mb-8 max-w-2xl leading-relaxed">
                Our alumni are shaping the future of technology and design at leading organizations around the world. Here's what some of them have to say.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {alumniData.map((alum, index) => (
                  <div
                    key={index}
                    className="group relative p-4 sm:p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-red-500/30 transition-all duration-500"
                  >
                    {/* Quote icon */}
                    <svg className="w-8 h-8 text-red-500/30 mb-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    <p className="text-gray-300 text-sm leading-relaxed italic mb-4">"{alum.testimonial}"</p>
                    <div className="flex items-center gap-3">
                      {/* Avatar */}
                      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-red-600/40 flex-shrink-0">
                        <img src={alum.image} alt={alum.name} className="w-full h-full object-cover object-top" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-sm">{alum.name}</h4>
                        <p className="text-red-400 text-xs">{alum.role}</p>
                        <p className="text-gray-500 text-xs">Batch of {alum.batch}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

          </div>

          {/* Bottom decoration */}
          <div className={`mt-16 sm:mt-20 flex justify-center transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '1000ms' }}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-600" style={{ boxShadow: '0 0 10px rgba(220,38,38,0.8)' }} />
              <div className="w-16 h-px" style={{ background: 'linear-gradient(to right, #dc2626, transparent)' }} />
              <span className="text-gray-500 text-sm uppercase tracking-widest">CSD — KKWIEER</span>
              <div className="w-16 h-px" style={{ background: 'linear-gradient(to left, #dc2626, transparent)' }} />
              <div className="w-2 h-2 rounded-full bg-red-600" style={{ boxShadow: '0 0 10px rgba(220,38,38,0.8)' }} />
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default CSDDepartmentPage;
