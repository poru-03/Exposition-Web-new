import { useEffect, useState } from 'react';

interface SectionInfo {
  id: string;
  name: string;
}

const SECTIONS: SectionInfo[] = [
  { id: 'hero', name: 'Home' },
  { id: 'about', name: 'About' },
  { id: 'timeline', name: 'Timeline' },
  { id: 'techevent-hub', name: 'Events' },
  { id: 'keynote-speakers', name: 'Speakers' },
  { id: 'interviews', name: 'Interviews' },
  { id: 'reviews', name: 'Reviews' },
  { id: 'partners', name: 'Partners' },
  { id: 'team', name: 'Team' },
  { id: 'qa', name: 'FAQ' },
  { id: 'footer', name: 'Footer' },
];

export default function SectionSnapDots() {
  const [activeSection, setActiveSection] = useState<string>('hero');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.4;

      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(SECTIONS[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      if (window.__lenis) {
        window.__lenis.scrollTo(el, { offset: 0, duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <nav
      aria-label="Section Navigation"
      className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-3.5 bg-black/40 backdrop-blur-md px-2.5 py-4 rounded-full border border-white/10 shadow-2xl"
    >
      {SECTIONS.map(({ id, name }) => {
        const isActive = activeSection === id;
        return (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className="group relative flex items-center justify-center p-1 cursor-pointer"
            aria-label={`Scroll to ${name}`}
          >
            {/* Hover Tooltip */}
            <span className="pointer-events-none absolute right-8 px-2.5 py-1 rounded-md bg-[#161616] text-[#E8C896] text-[0.65rem] font-mono uppercase tracking-wider font-bold border border-[#B8894F]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-xl whitespace-nowrap">
              {name}
            </span>

            {/* Dot Indicator */}
            <div
              className={`rounded-full transition-all duration-300 ${
                isActive
                  ? 'size-3.5 bg-gradient-to-r from-[#B8894F] to-[#E8C896] shadow-[0_0_12px_rgba(232,200,150,0.8)] scale-110'
                  : 'size-2 bg-white/30 hover:bg-white/70 hover:scale-125'
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
}
