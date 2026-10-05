import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { ShinyButton } from '../components/ui/shiny-button';

export interface FeaturedHighlight {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  targetId: string;
}

export const FEATURED_HIGHLIGHTS: FeaturedHighlight[] = [
  {
    id: 'h-1',
    title: 'Exposition Issue 21',
    subtitle: 'Official Annual Magazine',
    image: '/resources/hero/1 (0).png',
    targetId: 'about',
  },
  {
    id: 'h-2',
    title: 'TechEvent Hub',
    subtitle: 'National Hackathon Series',
    image: '/resources/hero/1 (1).jpg',
    targetId: 'techevent-hub',
  },
  {
    id: 'h-3',
    title: 'Keynote Conclave',
    subtitle: 'Global Industry Luminaries',
    image: '/resources/hero/1 (2).jpg',
    targetId: 'keynote-speakers',
  },
  {
    id: 'h-4',
    title: 'Voices of Vision',
    subtitle: 'Executive Leadership Dialogues',
    image: '/resources/hero/1 (3).jpg',
    targetId: 'interviews',
  },
  {
    id: 'h-5',
    title: 'Career Fair Nexus',
    subtitle: 'Bridging Talent & Enterprise',
    image: '/resources/hero/1 (4).jpg',
    targetId: 'partners',
  },
];

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-cycle through highlights every 5 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % FEATURED_HIGHLIGHTS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const activeItem = FEATURED_HIGHLIGHTS[activeIndex];

  const handleScrollTo = (targetId: string) => {
    const id = targetId.replace('#', '');
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
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full min-h-[100dvh] bg-[#0C0C0C] text-white flex flex-col justify-end sm:justify-between px-5 sm:px-10 md:px-16 lg:px-20 xl:px-28 pt-20 sm:pt-28 lg:pt-32 pt-[calc(4.5rem+env(safe-area-inset-top))] pb-20 sm:pb-12 pb-[calc(4.5rem+env(safe-area-inset-bottom))] select-none overflow-hidden"
    >
      {/* ----------------- MOBILE TOP LEFT BRAND LOGO ----------------- */}
      <div className="absolute top-5 left-5 pt-[env(safe-area-inset-top)] z-40 sm:hidden flex items-center">
        <img
          src="/resources/Expo_Issue_22_logo.svg"
          alt="Exposition Logo"
          className="h-7 w-auto object-contain filter drop-shadow-[0_4px_18px_rgba(232,200,150,0.4)]"
        />
      </div>

      {/* ----------------- FULL-BLEED BACKGROUND SLIDESHOW WITH SMOOTH TRANSITION ----------------- */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeItem.id}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
          className="absolute inset-0 z-0 pointer-events-none"
        >
          <img
            src={activeItem.image}
            alt={activeItem.title}
            className="w-full h-full object-cover object-[center_28%] sm:object-[center_25%] filter brightness-[0.7] sm:brightness-[0.55] contrast-[1.08]"
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark Vignette & Mobile Contrast Overlay for Watermark/Text Readability */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0C0C0C]/65 via-[#0C0C0C]/35 to-[#0C0C0C]/85 lg:hidden pointer-events-none" />
      <div className="absolute inset-0 z-0 hidden lg:block bg-gradient-to-r from-[#0C0C0C]/90 via-[#0C0C0C]/60 to-transparent pointer-events-none" />
      <div className="absolute inset-0 z-0 hidden lg:block bg-gradient-to-t from-[#0C0C0C] via-transparent to-[#0C0C0C]/70 pointer-events-none" />

      {/* ----------------- 360-DEGREE CINEMATIC BACKGROUND EDGE FADES ----------------- */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 35%, rgba(12, 12, 12, 0.45) 75%, #0C0C0C 100%)',
        }}
      />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#0C0C0C] to-transparent pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 h-40 sm:h-64 md:h-80 lg:h-96 bg-gradient-to-b from-transparent via-[#0C0C0C]/70 via-[#0C0C0C]/95 to-[#0C0C0C] pointer-events-none z-10" />
      <div className="absolute inset-y-0 left-0 w-16 sm:w-40 bg-gradient-to-r from-[#0C0C0C]/80 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-16 sm:w-40 bg-gradient-to-l from-[#0C0C0C]/80 to-transparent pointer-events-none z-10" />

      {/* ----------------- MAIN CONTENT CONTAINER ----------------- */}
      <div className="relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center mt-auto mb-10 sm:my-auto w-full max-w-[1700px] mx-auto">

        {/* LEFT COLUMN: Logo, Headline, Paragraph & Pill CTA Buttons */}
        <div className="lg:col-span-7 flex flex-col items-start text-left max-w-2xl">

          {/* Logo & Headline */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-3 sm:space-y-4"
          >
            {/* Desktop Brand Logo */}
            <div className="hidden sm:flex items-center gap-3 mb-1">
              <img
                src="/resources/Expo_Issue_22_logo.svg"
                alt="Exposition Logo"
                className="h-11 md:h-14 w-auto object-contain filter drop-shadow-[0_4px_20px_rgba(232,200,150,0.3)]"
              />
            </div>

            <h1
              className="tracking-tight leading-[1.15] sm:leading-[1.05] italic"
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: 'clamp(1.4rem, 5vw, 4.5rem)',
                fontWeight: 500,
                fontStyle: 'italic',
              }}
            >
              <span className="text-white block italic" style={{ fontWeight: 500, fontStyle: 'italic' }}>
                Shaping Ideas.
              </span>
              <span className="hero-heading italic block mt-0.5 sm:mt-1" style={{ fontWeight: 500, fontStyle: 'italic' }}>
                Connecting Industry.
              </span>
            </h1>
          </motion.div>

          {/* Descriptive Body Paragraph */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-3 sm:mt-6 block"
          >
            <p
              className="text-zinc-300/90 text-[11px] sm:text-base md:text-lg font-medium leading-relaxed max-w-xl"
              style={{ fontFamily: "var(--font-body), 'Satoshi', sans-serif" }}
            >
              Explore extraordinary student research, compare cutting-edge technological frameworks,
              and uncover insights that elevate academic innovation. Bridging visionary leaders and future pioneers.
            </p>
          </motion.div>

          {/* Primary Action Buttons (Fixed Width on Mobile to Stop Width Shifting) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 sm:mt-10 flex flex-row items-center gap-2 sm:gap-4 w-full flex-nowrap overflow-x-auto no-scrollbar py-1"
          >
            <ShinyButton
              onClick={() => handleScrollTo(activeItem.targetId)}
              className="shrink-0 w-[165px] sm:w-auto"
            >
              <span className="truncate">Explore {activeItem.title}</span>
              <ArrowUpRight className="size-3.5 sm:size-4 shrink-0" />
            </ShinyButton>

            <button
              onClick={() => handleScrollTo('about')}
              className="shrink-0 inline-flex items-center justify-center gap-1 sm:gap-2 rounded-full border border-white/20 hover:border-[#E8C896]/60 bg-white/10 hover:bg-white/20 backdrop-blur-md px-3.5 sm:px-7 py-2 sm:py-3.5 text-[10px] sm:text-sm font-semibold uppercase tracking-wider text-white hover:text-[#F3E7C4] shadow-[0_10px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_32px_rgba(184,137,79,0.25)] transition-all duration-300 hover:scale-[1.04] active:scale-95 group cursor-pointer text-center whitespace-nowrap"
            >
              <span>About Exposition</span>
            </button>
          </motion.div>
        </div>

        {/* DESKTOP RIGHT COLUMN: Vertical Curved Arc Stack of Circular Feature Cards */}
        <div
          className="hidden lg:flex lg:col-span-5 flex-col items-end justify-center space-y-3 sm:space-y-4 md:space-y-5 relative pr-2 sm:pr-6"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {FEATURED_HIGHLIGHTS.map((item, idx) => {
            const isActive = idx === activeIndex;
            // Curved arc offset: center item (2) is furthest left (0px), top & bottom curve out to right (95px)
            const arcOffsets = [95, 40, 0, 40, 95];
            const arcOffset = arcOffsets[idx % arcOffsets.length];

            return (
              <motion.div
                key={item.id}
                onClick={() => setActiveIndex(idx)}
                initial={{ opacity: 0, x: arcOffset + 40 }}
                animate={{ opacity: 1, x: arcOffset }}
                transition={{ duration: 0.6, delay: 0.08 * idx }}
                className={`flex items-center gap-3 sm:gap-4.5 cursor-pointer group transition-opacity transition-scale duration-300 ${isActive ? 'scale-110 opacity-100' : 'opacity-70 hover:opacity-100 hover:scale-105'
                  }`}
              >
                {/* Title & Subtitle next to circle */}
                <div className="text-right space-y-0.5">
                  <h4
                    className={`text-xs sm:text-sm font-bold italic tracking-wide transition-colors ${isActive ? 'text-white' : 'text-zinc-300 group-hover:text-white'
                      }`}
                    style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
                  >
                    {item.title}
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-zinc-400 font-light tracking-wide">
                    {item.subtitle}
                  </p>
                </div>

                {/* Circular Image Card */}
                <div
                  className={`relative rounded-full overflow-hidden transition-all duration-500 shrink-0 shadow-2xl ${isActive
                      ? 'size-14 sm:size-16 md:size-20 lg:size-[78px] border-2 border-[#E8C896] ring-4 ring-[#B8894F]/30 shadow-[0_0_25px_rgba(232,200,150,0.5)]'
                      : 'size-11 sm:size-13 md:size-15 lg:size-[62px] border border-white/25 group-hover:border-white/60'
                    }`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                  />
                  {!isActive && (
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors" />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ----------------- DESKTOP FAR RIGHT VERTICAL PAGINATION DOTS ----------------- */}
      <div className="hidden lg:flex absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-2.5">
        {FEATURED_HIGHLIGHTS.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`rounded-full transition-all duration-300 ${i === activeIndex
              ? 'w-2.5 h-6 bg-[#E8C896] shadow-[0_0_12px_rgba(232,200,150,0.8)]'
              : 'w-2.5 h-2.5 bg-white/30 hover:bg-white/60'
              }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
