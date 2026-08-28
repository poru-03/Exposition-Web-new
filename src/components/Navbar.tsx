import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const NAV_LINKS = [
  { name: 'About', href: '#about' },
  { name: 'Timeline', href: '#timeline' },
  { name: 'Events', href: '#techevent-hub' },
  { name: 'Speakers', href: '#keynote-speakers' },
  { name: 'Interviews', href: '#interviews' },
  { name: 'Reviews', href: '#reviews' },
  { name: 'Partners', href: '#partners' },
  { name: 'Team', href: '#team' },
  { name: 'FAQ', href: '#qa' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('#hero');

  // Throttled scroll listener using requestAnimationFrame for 60fps performance
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          setIsScrolled(scrollY > 100);

          // Find active section based on scroll offset
          const sectionIds = NAV_LINKS.map((link) => link.href.replace('#', ''));
          let current = '';

          for (const id of sectionIds) {
            const el = document.getElementById(id);
            if (el) {
              const top = el.offsetTop - 180;
              const height = el.offsetHeight;
              if (scrollY >= top && scrollY < top + height) {
                current = `#${id}`;
                break;
              }
            }
          }

          if (current !== activeSection) {
            setActiveSection(current);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      if ((window as any).__lenis) {
        (window as any).__lenis.scrollTo(el, { offset: 0, duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none hidden md:flex justify-center px-[4%] pt-4 md:pt-6">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`pointer-events-auto transition-all duration-500 ease-out flex items-center justify-between w-full max-w-7xl ${isScrolled
            ? 'rounded-full bg-[#0C0C0C]/85 backdrop-blur-xl border border-[#B8894F]/30 px-5 sm:px-8 py-2.5 sm:py-3 shadow-[0_15px_35px_rgba(0,0,0,0.85),0_0_25px_rgba(184,137,79,0.15)]'
            : 'bg-transparent border border-transparent px-0 py-0'
          }`}
      >
        {/* Brand Crest when scrolled */}
        <AnimatePresence>
          {isScrolled && (
            <motion.a
              href="#hero"
              onClick={(e) => handleLinkClick(e, '#hero')}
              initial={{ opacity: 0, scale: 0.8, x: -10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: -10 }}
              transition={{ duration: 0.25 }}
              className="hidden lg:flex items-center gap-2 pr-4 shrink-0"
            >
              <div className="flex items-center gap-1 h-5">
                <span className="w-1 h-full bg-[#B8894F] rounded-xs" />
                <span className="w-1 h-full bg-[#E8C896] rounded-xs" />
                <span className="w-1 h-full bg-[#B8894F] rounded-xs" />
              </div>
              <span className="font-bold text-xs font-mono tracking-wider text-white uppercase">
                EXPO <span className="text-gold-gradient font-black">21</span>
              </span>
            </motion.a>
          )}
        </AnimatePresence>

        {/* Nav Links with 3D Perspective Tilt on Hover & Active Glow Indicator */}
        <div className="flex items-center justify-between w-full [perspective:800px] overflow-x-auto no-scrollbar gap-1 sm:gap-2">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href;

            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`relative px-2.5 sm:px-3.5 py-1.5 text-xs sm:text-sm md:text-[0.95rem] font-medium uppercase tracking-wider transition-all duration-300 whitespace-nowrap [transform-style:preserve-3d] ${isActive
                    ? 'text-[#E8C896] font-semibold bg-[#B8894F]/10 border border-[#B8894F]/40 rounded-full shadow-[0_0_15px_rgba(184,137,79,0.25)]'
                    : 'text-[#9A9A9A] hover:text-white border border-transparent'
                  }`}
              >
                <span className="relative z-10">{link.name}</span>
              </a>
            );
          })}
        </div>
      </motion.nav>
    </header>
  );
}
