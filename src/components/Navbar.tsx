import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Home,
  Info,
  Clock,
  Zap,
  Mic,
  Video,
  Image as ImageIcon,
  Star,
  Users,
  HelpCircle,
} from 'lucide-react';

export const NAV_LINKS = [
  { name: 'Home', href: '#hero', icon: Home },
  { name: 'About', href: '#about', icon: Info },
  { name: 'Timeline', href: '#timeline', icon: Clock },
  { name: 'Events', href: '#techevent-hub', icon: Zap },
  { name: 'Speakers', href: '#keynote-speakers', icon: Mic },
  { name: 'Interviews', href: '#interviews', icon: Video },
  { name: 'Gallery', href: '#gallery', icon: ImageIcon },
  { name: 'Reviews', href: '#reviews', icon: Star },
  { name: 'Team', href: '#team', icon: Users },
  { name: 'FAQ', href: '#faq', icon: HelpCircle },
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
            if (delta > 6) {
              setIsVisible(false);
            } else if (delta < -6) {
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
    } else if (href === '#hero') {
      if ((window as any).__lenis) {
        (window as any).__lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* DESKTOP TOP NAVBAR */}
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
          className={`transition-all duration-500 ease-out flex items-center justify-between w-full max-w-7xl rounded-full bg-[#121212]/80 backdrop-blur-2xl border border-white/15 px-5 sm:px-7 py-2.5 shadow-[0_15px_40px_rgba(0,0,0,0.85)] ${
            isVisible ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
        >
          {/* Left Side: Exposition SVG Brand Logo */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, '#hero')}
            className="flex items-center pl-1 pr-4 py-0.5 rounded-full group transition-transform duration-300 hover:scale-105 shrink-0 cursor-pointer"
          >
            <img
              src="/resources/Expo_Issue_22_logo.svg"
              alt="Exposition Logo"
              className="h-7 sm:h-8 md:h-9 w-auto object-contain filter drop-shadow-[0_0_12px_rgba(201,162,95,0.3)] group-hover:drop-shadow-[0_0_18px_rgba(201,162,95,0.6)] transition-all"
            />
          </a>

          {/* Center & Right: Navigation Links */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 overflow-x-auto no-scrollbar [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] py-0.5">
            {NAV_LINKS.filter((l) => l.name !== 'Home').map((link) => {
              const isActive = activeSection === link.href;

              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`relative px-3.5 sm:px-4.5 py-1.5 text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 whitespace-nowrap rounded-full ${
                    isActive
                      ? 'text-black font-black bg-gradient-to-r from-[#F5E6C8] via-[#E8C896] to-[#c9a25f] scale-105'
                      : 'text-zinc-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span>{link.name}</span>
                </a>
              );
            })}
          </div>
        </nav>
      </motion.header>
    </>
  );
}
