import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: 'Home', path: '/', type: 'route' },
    { name: 'Events', path: '/#events', type: 'hash' },
    { name: 'Alumni', path: '/alumni', type: 'route' },
    { name: 'Committee', path: '/committee', type: 'route' },
    { name: 'Genesis', path: '/genesis', type: 'route' },
    { name: 'CSD Department', path: '/csd-department', type: 'route' },
    { name: 'Gallery', path: '/#gallery', type: 'hash' },
    { name: 'Contact Us', path: '/contact', type: 'route' },
  ];

  const isActive = (item) => item.type === 'route' && location.pathname === item.path;

  return (
    <nav className="fixed top-6 right-6 lg:right-12 z-50">
      {/* Desktop Menu - Pill Container */}
      <div className="hidden md:flex items-center bg-gradient-to-r from-[#7a0000] to-[#b00000] rounded-full px-2 py-1 shadow-lg">
        {menuItems.map((item) => (
          item.type === 'route' ? (
            <Link
              key={item.name}
              to={item.path}
              className={`text-white transition-all duration-300 px-4 py-2 text-sm font-medium rounded-full ${
                isActive(item) ? 'bg-white/20' : 'hover:bg-white/10'
              }`}
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
                className={`block text-white hover:bg-white/10 px-6 py-3 text-sm ${isActive(item) ? 'bg-white/10' : ''}`}
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
  );
};

export default Navbar;