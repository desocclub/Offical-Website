import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const committeeOptions = [
  { name: 'Committee 2025–26', path: '/committee/2025-26', description: 'View the archive' },
  { name: 'Committee 2026–27', path: '/committee/2026-27', description: 'Revealing soon' },
];

const Navbar = ({ topOffset = 0, hideOnHeroScroll = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCommitteeOpen, setIsCommitteeOpen] = useState(false);
  const [heroScrollProgress, setHeroScrollProgress] = useState(0);
  const location = useLocation();
  const effectiveScrollProgress = hideOnHeroScroll ? heroScrollProgress : 0;

  useEffect(() => {
    if (!hideOnHeroScroll) return undefined;

    let frameId;
    const updateVisibility = () => {
      frameId = undefined;
      setHeroScrollProgress(Math.min(window.scrollY / 420, 1));
    };
    const handleScroll = () => {
      if (!frameId) frameId = window.requestAnimationFrame(updateVisibility);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, [hideOnHeroScroll]);

  const menuItems = [
    { name: 'Home', path: '/', type: 'route' },
    { name: 'Events', path: '/events', type: 'route' },
    { name: 'Alumni', path: '/alumni', type: 'route' },
    { name: 'Committee', path: '/committee', type: 'committee' },
    { name: 'Genesis', path: '/genesis', type: 'route' },
    { name: 'CSD Department', path: '/csd-department', type: 'route' },
    { name: 'Gallery', path: '/#gallery', type: 'hash' },
    { name: 'Contact Us', path: '/contact', type: 'route' },
  ];

  const isActive = (path) => path === '/' ? location.pathname === '/' : location.pathname === path || location.pathname.startsWith(`${path}/`);
  const closeMobileMenu = () => {
    setIsMenuOpen(false);
    setIsCommitteeOpen(false);
  };

  const itemClass = (active) => `inline-flex h-8 items-center rounded-full px-3 py-1.5 text-sm font-medium text-white transition-all duration-300 ${active ? 'bg-white/20' : 'hover:bg-white/10'}`;

  return (
    <nav
      className={`fixed left-0 right-0 z-50 flex h-17.5 items-center justify-end px-4 lg:px-8 ${effectiveScrollProgress > 0.96 ? 'pointer-events-none' : ''}`}
      style={{
        top: `${topOffset}px`,
        opacity: 1 - effectiveScrollProgress,
        transform: `translateY(${-42 * effectiveScrollProgress}px)`,
        fontFamily: "'Roboto Condensed', system-ui, Avenir, Helvetica, Arial, sans-serif",
        willChange: 'opacity, transform',
      }}
    >
      <div className="hidden h-11 items-center whitespace-nowrap rounded-full bg-[#970233] px-4 py-1.5 shadow-lg md:flex">
        {menuItems.map((item) => {
          if (item.type === 'committee') {
            return (
              <div key={item.name} className="group relative">
                <Link to={item.path} aria-haspopup="menu" className={itemClass(isActive('/committee'))}>
                  Committee
                  <svg className="ml-1.5 h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
                  </svg>
                </Link>
                <div role="menu" className="invisible absolute left-1/2 top-full w-56 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <div className="overflow-hidden rounded-2xl border border-white/15 bg-[#710026]/95 p-1.5 shadow-2xl backdrop-blur-xl">
                    {committeeOptions.map((option) => (
                      <Link key={option.path} to={option.path} role="menuitem" className={`block rounded-xl px-3 py-2.5 transition-colors ${location.pathname === option.path ? 'bg-white/15' : 'hover:bg-white/10'}`}>
                        <span className="block text-sm font-semibold text-white">{option.name}</span>
                        <span className="mt-0.5 block text-xs text-white/65">{option.description}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          }

          return item.type === 'route' ? (
            <Link key={item.name} to={item.path} className={itemClass(isActive(item.path))}>{item.name}</Link>
          ) : (
            <a key={item.name} href={item.path} className={itemClass(false)}>{item.name}</a>
          );
        })}
      </div>

      <button type="button" onClick={() => setIsMenuOpen((open) => !open)} aria-label="Toggle navigation menu" aria-expanded={isMenuOpen} className="group flex h-12 w-12 flex-col items-center justify-center gap-1.5 rounded-full border border-white/10 bg-[#970233] text-white shadow-[0_8px_20px_rgba(79,0,25,0.35)] transition-all duration-300 hover:bg-[#b50040] active:scale-95 md:hidden">
        <span className={`h-0.5 w-5 rounded-full bg-white transition-all duration-300 ${isMenuOpen ? 'translate-y-2 rotate-45' : ''}`} />
        <span className={`h-0.5 w-5 rounded-full bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
        <span className={`h-0.5 w-5 rounded-full bg-white transition-all duration-300 ${isMenuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
      </button>

      <div className={`absolute right-0 top-14 overflow-hidden transition-all duration-300 md:hidden ${isMenuOpen ? 'max-h-[36rem] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="min-w-52 rounded-2xl bg-[#970233] py-2 shadow-xl">
          {menuItems.map((item) => {
            if (item.type === 'committee') {
              return (
                <div key={item.name}>
                  <div className="flex items-center">
                    <Link to="/committee" onClick={closeMobileMenu} className={`flex-1 px-6 py-3 text-sm text-white hover:bg-white/10 ${isActive('/committee') ? 'bg-white/10' : ''}`}>Committee</Link>
                    <button type="button" onClick={() => setIsCommitteeOpen((open) => !open)} aria-label="Show committee options" aria-expanded={isCommitteeOpen} className="px-5 py-3 text-white hover:bg-white/10">
                      <svg className={`h-4 w-4 transition-transform ${isCommitteeOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" /></svg>
                    </button>
                  </div>
                  {isCommitteeOpen && <div className="mx-3 mb-2 overflow-hidden rounded-xl bg-black/20 py-1">{committeeOptions.map((option) => <Link key={option.path} to={option.path} onClick={closeMobileMenu} className={`block px-4 py-2.5 text-sm text-white/90 hover:bg-white/10 ${location.pathname === option.path ? 'bg-white/10' : ''}`}>{option.name}</Link>)}</div>}
                </div>
              );
            }

            return item.type === 'route' ? (
              <Link key={item.name} to={item.path} onClick={closeMobileMenu} className={`block px-6 py-3 text-sm text-white hover:bg-white/10 ${isActive(item.path) ? 'bg-white/10' : ''}`}>{item.name}</Link>
            ) : (
              <a key={item.name} href={item.path} onClick={closeMobileMenu} className="block px-6 py-3 text-sm text-white hover:bg-white/10">{item.name}</a>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
