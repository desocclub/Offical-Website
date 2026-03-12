import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Import alumni photos
import tanujaImg from '../assets/dept/alumni/tanuja_pagar.jpg';
import satyamImg from '../assets/dept/alumni/satyam_kale.jpg';
import pranavImg from '../assets/dept/alumni/pranav_shimpi.jpg';
import omImg from '../assets/dept/alumni/om_malpure.jpg';
import nayanImg from '../assets/dept/alumni/nayan_deshmuk.jpg';
import mohanImg from '../assets/dept/alumni/mohan_mondhe.jpg';
import adityaImg from '../assets/dept/alumni/aditya_bharat.jpg';
import aditiImg from '../assets/dept/alumni/aditi_avhad.jpg';

// Import gallery images (reuse from existing events for alumni gallery)
import inno1 from '../assets/img/inno1.jpeg';
import inno2 from '../assets/img/inno2.jpeg';
import inno3 from '../assets/img/inno3.jpeg';
import click1 from '../assets/img/click1.jpeg';
import click2 from '../assets/img/click2.jpeg';
import click3 from '../assets/img/click3.jpeg';
import unleash1 from '../assets/img/unleash1.jpeg';
import unleash2 from '../assets/img/unleash2.jpeg';
import unleash3 from '../assets/img/unleash3.jpeg';

/* ── GlassCard defined outside component for stable identity ── */
const GlassCard = ({ children, className = '', delay = 0, isLoaded = true }) => (
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
      boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
    }}
  >
    <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl" style={{ background: 'rgba(220,38,38,0.08)' }} />
    <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl" style={{ background: 'rgba(127,29,29,0.08)' }} />
    <div className="relative z-10">{children}</div>
  </div>
);

/* ── SectionTitle defined outside component for stable identity ── */
const SectionTitle = ({ children, sub }) => (
  <div className="flex items-center mb-8 sm:mb-10">
    <div
      className="w-1 h-10 rounded-full mr-4 shrink-0"
      style={{ background: 'linear-gradient(to bottom, #ef4444, #b91c1c)', boxShadow: '0 0 10px rgba(220,38,38,0.5)' }}
    />
    <div>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-wide">{children}</h2>
      {sub && <p className="text-red-400 text-xs sm:text-sm mt-1 uppercase tracking-wider">{sub}</p>}
    </div>
  </div>
);

const AlumniPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    batch: '',
    company: '',
    email: '',
    linkedin: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', batch: '', company: '', email: '', linkedin: '', message: '' });
    setTimeout(() => setSubmitted(false), 4000);
  };

  const notableAlumni = [
    { name: 'Tanuja Pagar', batch: '2020', role: 'UX Designer', company: 'Google', testimonial: 'CSD gave me the perfect blend of technical skills and design thinking that set me apart in the industry.', image: tanujaImg },
    { name: 'Satyam Kale', batch: '2019', role: 'Product Designer', company: 'Microsoft', testimonial: "The department's focus on both CS fundamentals and design prepared me for a career I truly love.", image: satyamImg },
    { name: 'Pranav Shimpi', batch: '2021', role: 'Frontend Engineer', company: 'Flipkart', testimonial: 'The hands-on lab experience and industry exposure were invaluable for my career growth.', image: pranavImg },
    { name: 'Om Malpure', batch: '2020', role: 'Design Lead', company: 'Zomato', testimonial: 'CSD taught me to think at the intersection of technology and human experience.', image: omImg },
    { name: 'Nayan Deshmukh', batch: '2018', role: 'Co-founder', company: 'DesignTech Startup', testimonial: 'The entrepreneurial spirit and technical depth from CSD helped me build my own company.', image: nayanImg },
    { name: 'Mohan Mondhe', batch: '2021', role: 'UI Engineer', company: 'Adobe', testimonial: 'From design principles to clean code — CSD covered it all. Forever grateful!', image: mohanImg },
    { name: 'Aditya Bharat', batch: '2022', role: 'Software Engineer', company: 'Amazon', testimonial: 'The rigorous curriculum and supportive faculty helped me land my dream role right after graduation.', image: adityaImg },
    { name: 'Aditi Avhad', batch: '2022', role: 'UX Researcher', company: 'Swiggy', testimonial: 'CSD nurtured my passion for understanding users. The design-centric approach was truly transformative.', image: aditiImg },
  ];

  const alumniEvents = [
    { title: 'Annual Alumni Meetup 2024', description: 'Over 50 alumni gathered at the campus for networking, talks, and reconnecting with faculty.', date: 'March 2024' },
    { title: 'Guest Lecture Series', description: 'Alumni from Google, Microsoft, and Adobe shared industry insights with current students.', date: 'January 2024' },
    { title: 'Career Guidance Workshop', description: 'Experienced alumni mentored final-year students on resume building, interviews, and career planning.', date: 'November 2023' },
    { title: 'Hackathon Mentorship Drive', description: 'Alumni served as mentors at Genesis Hackathon, guiding student teams through 24 hours of innovation.', date: 'September 2023' },
  ];

  const galleryImages = [inno1, inno2, inno3, click1, click2, click3, unleash1, unleash2, unleash3];

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* ===== Fixed background layers ===== */}
      <div className="relative">
        <div className="fixed inset-0 -z-10" style={{ background: 'linear-gradient(135deg, black, rgba(127,29,29,0.3) 50%, black)' }} />
        <div className="fixed inset-0 -z-10" style={{ background: 'radial-gradient(ellipse at top right, rgba(127,29,29,0.15), transparent 50%)' }} />
        <div className="fixed inset-0 -z-10" style={{ background: 'radial-gradient(ellipse at bottom left, rgba(153,27,27,0.1), transparent 50%)' }} />
        <div className="fixed inset-0 opacity-5 -z-10" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

        {/* ===== Main Content ===== */}
        <main className="relative px-4 sm:px-6 lg:px-8 pt-24 pb-16 max-w-7xl mx-auto">

          {/* ==============================
              HERO SECTION
          ============================== */}
          <header className={`text-center mb-12 sm:mb-16 md:mb-20 transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
            <div className="relative inline-block">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-1 rounded-full" style={{ background: 'linear-gradient(to right, transparent, #ef4444, transparent)', boxShadow: '0 0 20px rgba(220,38,38,0.5)' }} />

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-4">
                Our Alumni
              </h1>

              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="h-px w-12" style={{ background: 'linear-gradient(to right, transparent, #ef4444)' }} />
                <span className="text-red-400 text-lg sm:text-xl md:text-2xl font-light tracking-widest">Pride of CSD</span>
                <div className="h-px w-12" style={{ background: 'linear-gradient(to left, transparent, #ef4444)' }} />
              </div>

              <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                Our alumni are the backbone of the CSD community — innovators, leaders, and creators shaping the future of technology and design across the globe.
              </p>

              {/* Stats row */}
              <div className="flex flex-wrap justify-center gap-6 sm:gap-10 mt-8">
                {[
                  { label: 'Alumni', value: '500+' },
                  { label: 'Companies', value: '120+' },
                  { label: 'Countries', value: '8+' },
                  { label: 'Mentors', value: '50+' },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="text-2xl sm:text-3xl font-bold text-red-400">{s.value}</p>
                    <p className="text-gray-500 text-xs uppercase tracking-widest mt-1">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-40 h-1 rounded-full" style={{ background: 'linear-gradient(to right, transparent, rgba(220,38,38,0.5), transparent)' }} />
            </div>
          </header>

          <div className="space-y-10 sm:space-y-14">

            {/* ==============================
                1. ALUMNI OVERVIEW
            ============================== */}
            <GlassCard delay={100} isLoaded={isLoaded}>
              <SectionTitle sub="Staying connected, giving back">Alumni Overview</SectionTitle>
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-10">
                <div className="lg:col-span-3 space-y-5">
                  <p className="text-gray-300 leading-relaxed">
                    The CSD alumni community is a vibrant network of professionals who continue to contribute to the department long after graduation. From mentoring current students and participating in campus events to collaborating on research and offering internship opportunities, our alumni remain deeply connected to their roots.
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    Through annual meetups, online forums, and guest lecture series, alumni and students bridge the gap between academia and industry — creating a self-sustaining ecosystem of knowledge sharing, career growth, and innovation that defines the spirit of CSD.
                  </p>
                </div>
                <div className="lg:col-span-2 flex items-center justify-center">
                  <div className="relative w-full aspect-square max-w-xs">
                    <div className="absolute inset-0 rounded-full border border-red-500/20 animate-pulse" />
                    <div className="absolute inset-4 rounded-full border border-red-500/15" />
                    <div className="absolute inset-8 rounded-full border border-red-500/10" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <svg className="w-14 h-14 sm:w-16 sm:h-16 text-red-400 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                        </svg>
                        <p className="text-3xl sm:text-4xl font-extrabold text-white">CSD</p>
                        <p className="text-red-400 text-xs sm:text-sm uppercase tracking-widest mt-1">Alumni Network</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* ==============================
                2. NOTABLE ALUMNI
            ============================== */}
            <GlassCard delay={200} isLoaded={isLoaded}>
              <SectionTitle sub="Making an impact worldwide">Notable Alumni</SectionTitle>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {notableAlumni.map((alum, index) => (
                  <div
                    key={index}
                    className="group relative p-4 sm:p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-red-500/40 hover:bg-white/10 transition-all duration-500"
                  >
                    {/* Photo */}
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden mx-auto mb-4 border-2 border-red-600/40 group-hover:border-red-500 group-hover:scale-110 transition-all duration-500" style={{ boxShadow: '0 0 20px rgba(220,38,38,0.2)' }}>
                      <img src={alum.image} alt={alum.name} className="w-full h-full object-cover object-top" />
                    </div>
                    <div className="text-center">
                      <h3 className="text-white font-bold text-base sm:text-lg mb-1">{alum.name}</h3>
                      <p className="text-red-400 text-xs sm:text-sm font-medium">{alum.role}</p>
                      <p className="text-gray-400 text-xs mb-1">{alum.company}</p>
                      <p className="text-gray-500 text-xs uppercase tracking-wider">Batch of {alum.batch}</p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* ==============================
                3. ALUMNI NETWORK
            ============================== */}
            <GlassCard delay={300} isLoaded={isLoaded}>
              <SectionTitle sub="Connect, collaborate, grow">Alumni Network</SectionTitle>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                <div className="space-y-5">
                  <p className="text-gray-300 leading-relaxed">
                    The CSD Alumni Network is a thriving community where graduates stay connected with each other and with the department. Whether you're looking for career advice, collaboration opportunities, or simply want to reconnect with batchmates, the network provides the platform.
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    We maintain active groups on LinkedIn and other professional platforms where alumni share job openings, industry trends, and mentorship opportunities. Current students benefit immensely from this bridge between campus and the professional world.
                  </p>
                </div>
                <div className="space-y-4">
                  {[
                    { label: 'LinkedIn Group', description: 'Join our official alumni group for networking and opportunities.', href: 'https://www.linkedin.com/company/desoc-kkwieer/', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
                    { label: 'Instagram Community', description: 'Follow us for alumni highlights, stories, and event updates.', href: 'https://www.instagram.com/desoc_kkwieer/', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
                    { label: 'GitHub Organization', description: 'Explore open-source projects and collaborate with fellow alumni.', href: 'https://github.com/DESOC-CSD', icon: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12' },
                  ].map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-4 p-4 rounded-xl border border-white/10 bg-white/5 hover:border-red-500/30 hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="w-10 h-10 rounded-lg bg-red-600/15 border border-red-600/20 flex items-center justify-center shrink-0">
                        <svg className="w-5 h-5 text-red-400 group-hover:text-red-300 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                          <path d={link.icon} />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-sm group-hover:text-red-400 transition-colors">{link.label}</h4>
                        <p className="text-gray-400 text-xs mt-1 leading-relaxed">{link.description}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </GlassCard>

            {/* ==============================
                4. ALUMNI MENTORSHIP
            ============================== */}
            <GlassCard delay={400} isLoaded={isLoaded}>
              <SectionTitle sub="Guiding the next generation">Alumni Mentorship</SectionTitle>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: 'Career Guidance',
                    description: 'Alumni offer one-on-one sessions to help students navigate career choices, from choosing specializations to preparing for top-tier companies.',
                    icon: (
                      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                      </svg>
                    ),
                  },
                  {
                    title: 'Internship Pipeline',
                    description: 'Our alumni actively source and refer internship opportunities at their organizations, giving CSD students a competitive edge in the job market.',
                    icon: (
                      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-9.86a4.5 4.5 0 016.364 6.364l-4.5 4.5a4.5 4.5 0 01-7.244-1.242" />
                      </svg>
                    ),
                  },
                  {
                    title: 'Industry Insights',
                    description: 'Through guest lectures and workshops, alumni share real-world experiences, latest tech trends, and design practices directly from industry leaders.',
                    icon: (
                      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                      </svg>
                    ),
                  },
                ].map((item, i) => (
                  <div key={i} className="relative p-5 sm:p-8 rounded-2xl border border-white/10 bg-white/5 hover:border-red-500/30 transition-all duration-500">
                    <div className="absolute top-0 left-0 w-full h-1 rounded-t-2xl" style={{ background: 'linear-gradient(to right, #ef4444, #b91c1c)' }} />
                    <div className="text-red-400 mb-4">{item.icon}</div>
                    <h3 className="text-white font-bold text-lg sm:text-xl mb-3">{item.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* ==============================
                5. ALUMNI SUCCESS STORIES
            ============================== */}
            <GlassCard delay={500} isLoaded={isLoaded}>
              <SectionTitle sub="In their own words">Success Stories</SectionTitle>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {notableAlumni.slice(0, 6).map((alum, index) => (
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
                      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-red-600/40 shrink-0">
                        <img src={alum.image} alt={alum.name} className="w-full h-full object-cover object-top" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-sm">{alum.name}</h4>
                        <p className="text-red-400 text-xs">{alum.role} at {alum.company}</p>
                        <p className="text-gray-500 text-xs">Batch of {alum.batch}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* ==============================
                6. ALUMNI EVENTS
            ============================== */}
            <GlassCard delay={600} isLoaded={isLoaded}>
              <SectionTitle sub="Reconnect, celebrate, inspire">Alumni Events</SectionTitle>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {alumniEvents.map((event, index) => (
                  <div
                    key={index}
                    className="relative p-5 sm:p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-red-500/30 transition-all duration-500"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-red-600/15 border border-red-600/20 flex items-center justify-center shrink-0">
                        <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                        </svg>
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-white font-bold text-base sm:text-lg">{event.title}</h3>
                        </div>
                        <span className="inline-block bg-red-600/20 text-red-400 text-xs font-medium px-2.5 py-0.5 rounded-full mb-2">{event.date}</span>
                        <p className="text-gray-400 text-sm leading-relaxed">{event.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* ==============================
                7. ALUMNI REGISTRATION FORM
            ============================== */}
            <GlassCard delay={700} isLoaded={isLoaded}>
              <SectionTitle sub="Join the alumni network">Alumni Registration</SectionTitle>

              {submitted && (
                <div className="mb-6 p-4 rounded-xl border border-green-500/30 bg-green-500/10 text-green-400 text-sm flex items-center gap-3">
                  <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Thank you! Your registration has been submitted successfully.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-gray-400 text-xs uppercase tracking-wider mb-2 font-medium">Full Name</label>
                    <input
                      type="text" id="name" name="name" required
                      value={formData.name} onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/30 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label htmlFor="batch" className="block text-gray-400 text-xs uppercase tracking-wider mb-2 font-medium">Graduation Batch</label>
                    <input
                      type="text" id="batch" name="batch" required
                      value={formData.batch} onChange={handleChange}
                      placeholder="e.g. 2022"
                      className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/30 transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="company" className="block text-gray-400 text-xs uppercase tracking-wider mb-2 font-medium">Current Company / Position</label>
                    <input
                      type="text" id="company" name="company" required
                      value={formData.company} onChange={handleChange}
                      placeholder="e.g. UX Designer at Google"
                      className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/30 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-400 text-xs uppercase tracking-wider mb-2 font-medium">Email Address</label>
                    <input
                      type="email" id="email" name="email" required
                      value={formData.email} onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/30 transition-all duration-300"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="linkedin" className="block text-gray-400 text-xs uppercase tracking-wider mb-2 font-medium">LinkedIn Profile</label>
                  <input
                    type="url" id="linkedin" name="linkedin"
                    value={formData.linkedin} onChange={handleChange}
                    placeholder="https://linkedin.com/in/yourprofile"
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/30 transition-all duration-300"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-gray-400 text-xs uppercase tracking-wider mb-2 font-medium">Message</label>
                  <textarea
                    id="message" name="message" rows={4}
                    value={formData.message} onChange={handleChange}
                    placeholder="Share your experience, or tell us how you'd like to contribute..."
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/30 transition-all duration-300 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 bg-linear-to-r from-red-700 to-red-600 text-white font-bold uppercase tracking-wider rounded-full hover:from-red-600 hover:to-red-500 transition-all duration-300 hover:scale-105"
                  style={{ boxShadow: '0 0 30px rgba(220,38,38,0.25)' }}
                >
                  Register
                </button>
              </form>
            </GlassCard>

            {/* ==============================
                8. ALUMNI GALLERY
            ============================== */}
            <GlassCard delay={800} isLoaded={isLoaded}>
              <SectionTitle sub="Moments from alumni meetups & events">Alumni Gallery</SectionTitle>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                {galleryImages.map((img, index) => (
                  <div key={index} className="group relative aspect-square rounded-xl overflow-hidden border border-white/10">
                    <img
                      src={img}
                      alt={`Alumni gallery ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <svg className="w-8 h-8 text-white transform scale-0 group-hover:scale-100 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
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
              <span className="text-gray-500 text-sm uppercase tracking-widest">CSD Alumni — KKWIEER</span>
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

export default AlumniPage;
