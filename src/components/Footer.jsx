import desocLogo from '../assets/desoc-logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '#' },
    { name: 'Events', href: '#events' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'About Us', href: '#about' }
  ];

  const supportLinks = [
    { name: 'FAQs', href: '#faqs' },
    { name: 'Feedback', href: '#feedback' },
    { name: 'Contact', href: '#contact' }
  ];

  const policyLinks = [
    { name: 'Terms & Conditions', href: '#terms' },
    { name: 'Privacy Policy', href: '#privacy' },
    { name: 'Disclaimer', href: '#disclaimer' }
  ];

  return (
    <footer className="relative bg-gradient-to-b from-black via-[#0a0a0a] to-[#1a0a0a] text-white">
      {/* Top red accent line */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {/* Top Section - Logo and Tagline */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <img src={desocLogo} alt="DESOC Logo" className="w-12 h-12" />
            <h3 className="text-2xl font-bold uppercase tracking-wider">DESOC</h3>
          </div>
          <p className="text-gray-400 text-sm uppercase tracking-widest">
            Design • Creativity • Innovation
          </p>
        </div>

        {/* Middle Section - 4 Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Address Column */}
          <div>
            <h4 className="text-red-500 font-semibold text-lg mb-4 uppercase tracking-wide">
              Address
            </h4>
            <address className="not-italic text-gray-300 text-sm leading-relaxed space-y-1">
              <p className="font-medium">K K Wagh Institute of Engineering Education & Research</p>
              <p>Hirabai Hiradas Vidyanagari,Amrutdham,Panchavati</p>
              <p>Nashik,Maharashtra, 422003,India.</p>
              
            </address>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-red-500 font-semibold text-lg mb-4 uppercase tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 text-sm hover:text-red-500 hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="text-red-500 font-semibold text-lg mb-4 uppercase tracking-wide">
              Support
            </h4>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 text-sm hover:text-red-500 hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies Column */}
          <div>
            <h4 className="text-red-500 font-semibold text-lg mb-4 uppercase tracking-wide">
              Policies
            </h4>
            <ul className="space-y-2">
              {policyLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 text-sm hover:text-red-500 hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-red-900/50 to-transparent mb-8"></div>

        {/* Bottom Section - Social Icons and Copyright */}
        <div className="text-center">
          {/* Social Media Icons */}
          <div className="flex justify-center gap-6 mb-6">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/desoc.kkwieer/"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center transition-all duration-300 group-hover:bg-red-600 group-hover:shadow-lg group-hover:shadow-red-600/50">
                <svg className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/desoc-kkwieer/posts/?feedView=all"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center transition-all duration-300 group-hover:bg-red-600 group-hover:shadow-lg group-hover:shadow-red-600/50">
                <svg className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </div>
            </a>

            {/* Email */}
            <a
              href="mailto:desoc.club@gmail.com"
              className="group"
            >
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center transition-all duration-300 group-hover:bg-red-600 group-hover:shadow-lg group-hover:shadow-red-600/50">
                <svg className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z"/>
                </svg>
              </div>
            </a>
          </div>

          {/* Copyright */}
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} DESOC - Design Society. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Made with <span className="text-red-500">❤</span> by DESOC Tech Team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
