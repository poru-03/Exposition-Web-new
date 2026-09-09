import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export const NAV_LINKS = [
  { name: 'About', href: '#about' },
  { name: 'Timeline', href: '#timeline' },
  { name: 'Events', href: '#techevent-hub' },
  { name: 'Speakers', href: '#keynote-speakers' },
  { name: 'Interviews', href: '#interviews' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Reviews', href: '#reviews' },
  { name: 'Partners', href: '#partners' },
  { name: 'Team', href: '#team' },
  { name: 'FAQ', href: '#qa' },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('#hero');
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const lastScrollY = lastScrollYRef.current;
          const delta = scrollY - lastScrollY;

          // Hero threshold: When in the top Hero area, always keep navbar visible
          if (scrollY < 120) {
            setIsVisible(true);
          } else {
            // When in other sections:
            // If scrolling down, hide navbar
            if (delta > 6) {
              setIsVisible(false);
            }
            // If scrolling up, show navbar
            else if (delta < -6) {
              setIsVisible(true);
            }
          }

          lastScrollYRef.current = scrollY;

          // Track active section for link highlight
          const sectionIds = NAV_LINKS.map((link) => link.href.replace('#', ''));
          let current = '#hero';

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
    <motion.header
      initial={{ y: 0, opacity: 1 }}
      animate={{
        y: isVisible ? 0 : -90,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-[100] pointer-events-none hidden md:flex justify-center px-4 sm:px-8 pt-4 sm:pt-5"
    >
      <nav
        className={`transition-all duration-500 ease-out flex items-center justify-between w-full max-w-5xl rounded-full bg-white/[0.03] backdrop-blur-xl border border-white/15 px-6 sm:px-8 py-2.5 sm:py-3 shadow-[0_10px_35px_rgba(0,0,0,0.6)] ${
          isVisible ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        {/* Nav Links evenly spaced across the floating capsule */}
        <div className="flex items-center justify-between w-full overflow-x-auto no-scrollbar gap-2 sm:gap-4">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href;

            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`relative px-3.5 sm:px-4.5 py-1.5 text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 whitespace-nowrap rounded-full ${
                  isActive
                    ? 'text-neutral-950 font-bold bg-gradient-to-r from-[#F5E6C8] via-[#E8C896] to-[#D4AF37] shadow-[0_0_22px_rgba(212,175,55,0.55)] scale-105'
                    : 'text-zinc-300 hover:text-white hover:bg-white/[0.08]'
                }`}
              >
                <span>{link.name}</span>
              </a>
            );
          })}
        </div>
      </nav>
    </motion.header>
  );
}
