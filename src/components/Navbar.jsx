import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ topOffset = 0 }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const moreDropdownRef = useRef(null);
  const location = useLocation();

  const leftNavItems = [
    { name: 'Home', path: '/', type: 'route' },
    { name: 'About', path: '/about', type: 'route' },
    { name: 'Community', path: '/committee', type: 'route' },
  ];

  const rightNavItems = [
    { name: 'Genesis', path: '/genesis', type: 'route' },
    { name: 'Events', path: '/events', type: 'route' },
  ];

  const moreItems = [
    { name: 'CSD Department', path: '/csd-department', type: 'route' },
    { name: 'Alumni', path: '/alumni', type: 'route' },
    { name: 'Gallery', path: '/#gallery', type: 'hash' },
    { name: 'Contact Us', path: '/contact', type: 'route' },
  ];

  const allNavItems = [
    ...leftNavItems,
    ...rightNavItems,
    ...moreItems,
  ];

  const isActive = (item) => {
    if (item.type !== 'route') return false;
    if (item.path === '/') return location.pathname === '/';
    return location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);
  };

  const isMoreActive = moreItems.some((item) => isActive(item));

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (moreDropdownRef.current && !moreDropdownRef.current.contains(event.target)) {
        setIsMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 w-full max-w-full flex items-center justify-center pointer-events-none pt-3 sm:pt-5 pb-2"
      style={{ top: `${topOffset}px` }}
    >
      {/* ========================================================================= */}
      {/* DESKTOP NAVBAR (md and above) - Floating pill with large breaking-out logo */}
      {/* ========================================================================= */}
      <nav
        className="hidden md:flex items-center justify-between h-11 lg:h-12 bg-black/70 hover:bg-black/85 backdrop-blur-2xl border border-white/10 hover:border-white/20 rounded-full px-6 lg:px-8 shadow-[0_8px_32px_rgba(0,0,0,0.7)] transition-all duration-300 pointer-events-auto relative overflow-visible"
        style={{ fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif" }}
      >
        {/* Left Links */}
        <div className="flex items-center gap-5 lg:gap-7 pr-2">
          {leftNavItems.map((item) => {
            const active = isActive(item);
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`relative py-1 text-[13px] lg:text-sm font-medium tracking-wide transition-colors duration-200 ${
                  active ? 'text-white font-semibold' : 'text-neutral-300 hover:text-white'
                }`}
              >
                {item.name}
                {active && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#ff3366] shadow-[0_0_8px_#ff3366]" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Center Slot for Protruding Breaking-Out Logo */}
        <div className="relative w-18 lg:w-22 h-full flex items-center justify-center">
          <Link
            to="/"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex items-center justify-center group focus:outline-none cursor-pointer"
            title="DESOC Home"
          >
            <div className="relative w-16 h-16 lg:w-19 lg:h-19 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <img
                src="/desoc-logo.png"
                alt="DESOC Logo"
                className="w-full h-full object-contain filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] drop-shadow-[0_0_16px_rgba(255,255,255,0.2)]"
              />
            </div>
          </Link>
        </div>

        {/* Right Links */}
        <div className="flex items-center gap-5 lg:gap-7 pl-2">
          {rightNavItems.map((item) => {
            const active = isActive(item);
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`relative py-1 text-[13px] lg:text-sm font-medium tracking-wide transition-colors duration-200 ${
                  active ? 'text-white font-semibold' : 'text-neutral-300 hover:text-white'
                }`}
              >
                {item.name}
                {active && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#ff3366] shadow-[0_0_8px_#ff3366]" />
                )}
              </Link>
            );
          })}

          {/* More Dropdown */}
          <div className="relative" ref={moreDropdownRef}>
            <button
              onClick={() => setIsMoreOpen(!isMoreOpen)}
              className={`relative inline-flex items-center gap-1.5 py-1 text-[13px] lg:text-sm font-medium tracking-wide transition-colors duration-200 cursor-pointer ${
                isMoreActive ? 'text-white' : 'text-neutral-300 hover:text-white'
              }`}
            >
              <span>More</span>
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-200 ${isMoreOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
              {isMoreActive && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#ff3366] shadow-[0_0_8px_#ff3366]" />
              )}
            </button>

            {/* Dropdown Menu */}
            {isMoreOpen && (
              <div className="absolute right-0 mt-3 w-48 py-2 bg-black/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl animate-fadeIn z-50">
                {moreItems.map((item) =>
                  item.type === 'route' ? (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setIsMoreOpen(false)}
                      className={`block px-4 py-2 text-xs lg:text-sm transition-colors ${
                        isActive(item) ? 'text-white bg-white/10 font-semibold' : 'text-neutral-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <a
                      key={item.name}
                      href={item.path}
                      onClick={() => setIsMoreOpen(false)}
                      className="block px-4 py-2 text-xs lg:text-sm text-neutral-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      {item.name}
                    </a>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* ========================================================================= */}
      {/* MOBILE NAVBAR (<md) - Perfectly Centered, 0 Overflow, 6-Dot Menu          */}
      {/* ========================================================================= */}
      <div className="md:hidden w-[calc(100%-2rem)] max-w-[340px] sm:max-w-sm h-11 bg-black/80 backdrop-blur-2xl border border-white/12 rounded-full px-4 flex items-center justify-between shadow-[0_6px_24px_rgba(0,0,0,0.8)] pointer-events-auto relative overflow-visible mx-auto">
        
        {/* LEFT: Compact DESOC Wordmark */}
        <Link
          to="/"
          className="text-white font-semibold text-xs tracking-wider hover:text-[#ff3366] transition-colors py-1.5 focus:outline-none z-40"
        >
          DESOC
        </Link>

        {/* CENTER: Floating Round Emblem (Centered to Viewport) */}
        <Link
          to="/"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 focus:outline-none cursor-pointer"
          title="DESOC Home"
        >
          <div className="w-13 h-13 rounded-full flex items-center justify-center transition-transform active:scale-95">
            <img
              src="/desoc-logo.png"
              alt="DESOC Emblem"
              className="w-full h-full object-contain filter drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]"
            />
          </div>
        </Link>

        {/* RIGHT: Custom Six-Dot Menu Button (2 rows of 3 dots) */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center justify-center w-8 h-8 -mr-1 rounded-full text-neutral-300 hover:text-white focus:outline-none transition-all active:scale-90 group cursor-pointer z-40"
          aria-label="Toggle navigation menu"
        >
          <div
            className={`grid grid-cols-3 gap-[3px] p-1 transition-transform duration-300 ${
              isMenuOpen ? 'rotate-90 scale-90' : 'group-hover:scale-105'
            }`}
          >
            <span className={`w-1 h-1 rounded-full transition-colors duration-200 ${isMenuOpen ? 'bg-[#ff3366]' : 'bg-neutral-300 group-hover:bg-white'}`} />
            <span className={`w-1 h-1 rounded-full transition-colors duration-200 ${isMenuOpen ? 'bg-[#ff3366]' : 'bg-neutral-300 group-hover:bg-white'}`} />
            <span className={`w-1 h-1 rounded-full transition-colors duration-200 ${isMenuOpen ? 'bg-[#ff3366]' : 'bg-neutral-300 group-hover:bg-white'}`} />
            <span className={`w-1 h-1 rounded-full transition-colors duration-200 ${isMenuOpen ? 'bg-[#ff3366]' : 'bg-neutral-300 group-hover:bg-white'}`} />
            <span className={`w-1 h-1 rounded-full transition-colors duration-200 ${isMenuOpen ? 'bg-[#ff3366]' : 'bg-neutral-300 group-hover:bg-white'}`} />
            <span className={`w-1 h-1 rounded-full transition-colors duration-200 ${isMenuOpen ? 'bg-[#ff3366]' : 'bg-neutral-300 group-hover:bg-white'}`} />
          </div>
        </button>
      </div>

      {/* Mobile Menu Dropdown Panel */}
      {isMenuOpen && (
        <div className="md:hidden fixed top-16 left-4 right-4 max-w-[340px] sm:max-w-sm mx-auto bg-black/95 backdrop-blur-2xl border border-white/12 rounded-2xl p-4 shadow-2xl z-50 pointer-events-auto animate-fadeIn">
          <div className="grid grid-cols-2 gap-2">
            {allNavItems.map((item) =>
              item.type === 'route' ? (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-3 py-2.5 text-xs rounded-xl transition-all ${
                    isActive(item)
                      ? 'bg-[#ff3366]/20 text-white font-semibold border border-[#ff3366]/40'
                      : 'text-neutral-300 hover:text-white hover:bg-white/8'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ) : (
                <a
                  key={item.name}
                  href={item.path}
                  className="block px-3 py-2.5 text-xs text-neutral-300 hover:text-white hover:bg-white/8 rounded-xl transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              )
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;