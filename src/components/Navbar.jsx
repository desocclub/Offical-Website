import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: 'Home', path: '/', isRoute: true },
    { name: 'Events', path: '/#events', isRoute: false },
    { name: 'Alumni', path: '/#alumni', isRoute: false },
    { name: 'Committee', path: '/committee', isRoute: true },
    { name: 'Gallery', path: '/#gallery', isRoute: false },
    { name: 'Contact Us', path: '/#contact-us', isRoute: false },
  ];

  const isActive = (item) => item.isRoute && location.pathname === item.path;

  return (
    <nav className="sticky top-0 z-50 bg-black">
      <div className="flex justify-between items-center">
        {/* Logo Section */}
        <div className="px-6 py-3">
          <Link to="/">
            <h1 className="text-white font-bold text-lg">Design Society</h1>
            <p className="text-gray-400 text-xs">Department of Computer Science & Design</p>
          </Link>
        </div>

        {/* Desktop Menu - Red Background Section */}
        <div className="hidden md:flex items-center bg-red-700 h-full">
          {menuItems.map((item, index) => (
            item.isRoute ? (
              <Link
                key={item.name}
                to={item.path}
                className={`text-white hover:bg-red-800 transition-all duration-300 px-6 py-4 text-sm ${
                  index !== menuItems.length - 1 ? 'border-r border-red-800' : ''
                } ${isActive(item) ? 'bg-red-800' : ''}`}
              >
                {item.name}
              </Link>
            ) : (
              <a
                key={item.name}
                href={item.path}
                className={`text-white hover:bg-red-800 transition-all duration-300 px-6 py-4 text-sm ${
                  index !== menuItems.length - 1 ? 'border-r border-red-800' : ''
                }`}
              >
                {item.name}
              </a>
            )
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white px-6 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-red-700">
          {menuItems.map((item) => (
            item.isRoute ? (
              <Link
                key={item.name}
                to={item.path}
                className={`block text-white hover:bg-red-800 px-6 py-3 border-b border-red-800 transition-all duration-300 ${
                  isActive(item) ? 'bg-red-800' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ) : (
              <a
                key={item.name}
                href={item.path}
                className="block text-white hover:bg-red-800 px-6 py-3 border-b border-red-800 transition-all duration-300"
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