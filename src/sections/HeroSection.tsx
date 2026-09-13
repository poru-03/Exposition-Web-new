import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface HeroSlideItem {
  id: number;
  src: string;
  title: string;
  description: string;
}

export const HERO_SLIDES: HeroSlideItem[] = [
  {
    id: 1,
    src: '/resources/hero/1 (0).png',
    title: 'Exposition 21st Edition',
    description: 'Premier Technology & Management Symposium',
  },
  {
    id: 2,
    src: '/resources/hero/1 (1).jpg',
    title: 'Career Fair Nexus',
    description: 'Bridging elite talent with industry giants',
  },
  {
    id: 3,
    src: '/resources/hero/1 (2).jpg',
    title: 'Keynote Conclave',
    description: 'Visionary insights shaping tomorrow',
  },
  {
    id: 4,
    src: '/resources/hero/1 (2).png',
    title: 'Innovation Hub',
    description: 'Pioneering breakthrough tech solutions',
  },
  {
    id: 5,
    src: '/resources/hero/1 (3).jpg',
    title: 'Executive Panel',
    description: 'Conversations with national leaders',
  },
  {
    id: 6,
    src: '/resources/hero/1 (3).png',
    title: 'Tech Arena',
    description: 'Fostering excellence and discovery',
  },
  {
    id: 7,
    src: '/resources/hero/1 (4).jpg',
    title: 'Industry Network',
    description: 'Connecting future corporate leaders',
  },
];

const easyEaseTransition = {
  duration: 1.0,
  ease: [0.42, 0, 0.58, 1] as const, // Cubic-bezier easy-ease tuple
};

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);

  // Automatically cycle through slides every 4 seconds (cascades top -> middle -> bottom)
  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => prev + 1);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const total = HERO_SLIDES.length;
  // Step T: Top has (step + 2), Mid has (step + 1), Bot has (step)
  // At Step T+1: Top receives (step + 3) [new from top], Mid receives (step + 2) [previous top!], Bot receives (step + 1) [previous mid!]
  const topSlide = HERO_SLIDES[(step + 2) % total];
  const midSlide = HERO_SLIDES[(step + 1) % total];
  const botSlide = HERO_SLIDES[step % total];

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
      ref={containerRef}
      className="relative w-full h-screen max-h-[100dvh] bg-[#0a0a08] text-white flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-20 xl:px-28 pt-16 sm:pt-20 pb-4 sm:pb-6 select-none overflow-hidden"
    >
      {/* ----------------- SOFT AMBIENT BACKGROUND GLOWS ----------------- */}
      {/* 1. Subtle warm gold ambient glow behind the left text content */}
      <div className="absolute top-1/2 left-[15%] -translate-y-1/2 w-[450px] sm:w-[550px] h-[450px] sm:h-[550px] bg-[radial-gradient(circle,rgba(212,175,55,0.12)_0%,rgba(184,137,79,0.04)_50%,transparent_70%)] pointer-events-none blur-3xl -z-10" />

      {/* 2. Soft warm gold/amber ambient glow behind the top-right image stack */}
      <div className="absolute top-1/2 right-[12%] -translate-y-1/2 w-[550px] sm:w-[680px] h-[550px] sm:h-[680px] bg-[radial-gradient(circle,rgba(212,175,55,0.22)_0%,rgba(184,137,79,0.08)_45%,transparent_70%)] pointer-events-none blur-3xl -z-10" />

      {/* ----------------- MAIN TWO-COLUMN CONTENT GRID ----------------- */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center my-auto w-full max-w-[1700px] mx-auto h-full max-h-[calc(100dvh-5rem)] flex-1">

        {/* LEFT CONTENT COLUMN (~50% width) */}
        <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-start justify-center my-auto pr-0 lg:pr-4 text-left">

          {/* Brand Logo Image (/resources/ExpositionLogo_original.png) - Optically Aligned with Shimmer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-center justify-start -ml-2.5 sm:-ml-3.5 md:-ml-4.5 lg:-ml-5.5 p-0 group overflow-hidden"
          >
            <div className="relative inline-block overflow-hidden rounded-sm">
              <img
                src="/resources/ExpositionLogo_original.png"
                alt="Exposition"
                className="h-[95px] sm:h-[120px] md:h-[140px] lg:h-[160px] xl:h-[175px] w-auto max-w-full object-contain object-left select-none pointer-events-none drop-shadow-[0_8px_35px_rgba(212,175,55,0.3)]"
              />
              {/* Luxury Diagonal Light Reflection Sweep */}
              <motion.div
                initial={{ x: '-120%' }}
                animate={{ x: '240%' }}
                transition={{
                  repeat: Infinity,
                  repeatDelay: 3.5,
                  duration: 1.6,
                  ease: 'easeInOut',
                }}
                className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-25deg] pointer-events-none mix-blend-overlay"
              />
            </div>
          </motion.div>

          {/* Brand Description Hierarchy */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 sm:mt-6 max-w-[480px]"
          >
            <p className="text-white font-bold text-base sm:text-lg md:text-xl lg:text-[1.35rem] leading-snug tracking-tight">
              Shaping Ideas. Connecting Industry.
            </p>
            <p className="text-zinc-300 text-xs sm:text-sm md:text-[0.95rem] font-normal leading-relaxed mt-2 text-zinc-300/90">
              A platform where the next generation of business leaders, innovators, and industry professionals come together.
            </p>
          </motion.div>

          {/* Exposure Analytics Stats Grid with Outfit Font & Metallic Gold Shimmer */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-3 gap-3 sm:gap-6 pt-5 sm:pt-6 mt-5 sm:mt-6 border-t border-white/10 max-w-[480px]"
          >
            <div className="flex flex-col items-start justify-start text-left">
              <div className="text-2xl sm:text-3xl lg:text-[2.25rem] font-extrabold font-['Outfit',sans-serif] tracking-tight leading-none animate-shimmer-gold">
                300+
              </div>
              <div className="text-[11px] sm:text-xs text-zinc-400 font-medium leading-tight mt-2 text-left">
                Career Fair Registrations
              </div>
            </div>

            <div className="flex flex-col items-start justify-start text-left">
              <div className="text-2xl sm:text-3xl lg:text-[2.25rem] font-extrabold font-['Outfit',sans-serif] tracking-tight leading-none animate-shimmer-gold">
                7,500+
              </div>
              <div className="text-[11px] sm:text-xs text-zinc-400 font-medium leading-tight mt-2 text-left">
                Total Social Followers
              </div>
            </div>

            <div className="flex flex-col items-start justify-start text-left">
              <div className="text-2xl sm:text-3xl lg:text-[2.25rem] font-extrabold font-['Outfit',sans-serif] tracking-tight leading-none animate-shimmer-gold">
                20+
              </div>
              <div className="text-[11px] sm:text-xs text-zinc-400 font-medium leading-tight mt-2 text-left">
                Universities Reached
              </div>
            </div>
          </motion.div>

          {/* Two Pill-Shaped CTA Buttons Side by Side */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 sm:mt-8 flex items-center gap-3 sm:gap-5"
          >
            {/* Primary Pill Button */}
            <a
              href="#gallery"
              onClick={(e) => {
                e.preventDefault();
                handleScrollTo('gallery');
              }}
              className="inline-flex items-center justify-center rounded-full bg-white hover:bg-[#F3E7C4] text-black font-semibold text-xs sm:text-sm md:text-base px-6 sm:px-8 py-2.5 sm:py-3 shadow-[0_10px_30px_rgba(255,255,255,0.18)] transition-all duration-300 min-w-[120px] sm:min-w-[140px] text-center cursor-pointer"
            >
              <span>View Gallery</span>
            </a>

            {/* Secondary Pill Button */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleScrollTo('contact');
              }}
              className="inline-flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white hover:text-[#F3E7C4] border border-white/20 hover:border-[#C9A25F]/60 font-semibold text-xs sm:text-sm md:text-base px-6 sm:px-8 py-2.5 sm:py-3 shadow-[0_10px_30px_rgba(0,0,0,0.4)] backdrop-blur-md transition-all duration-300 min-w-[120px] sm:min-w-[140px] text-center cursor-pointer"
            >
              <span>Contact Us</span>
            </a>
          </motion.div>
        </div>

        {/* RIGHT IMAGE COLUMN (~50% width): Vertical Stack of 3 Asymmetric 2048x1367 Slideshow Cards */}
        <div className="lg:col-span-6 xl:col-span-6 relative w-full max-w-[500px] lg:max-w-[580px] xl:max-w-[640px] mx-auto h-[clamp(520px,80vh,740px)] flex flex-col justify-center items-center gap-3 sm:gap-4 overflow-hidden">

          {/* 1. TOP IMAGE CARD: Smaller (76%), shifted right, all outer edges softly blurred/feathered */}
          <div className="relative w-[76%] max-w-[340px] sm:max-w-[380px] lg:max-w-[420px] aspect-[2048/1367] rounded-xl overflow-hidden translate-x-4 sm:translate-x-6 lg:translate-x-8 [mask-image:radial-gradient(ellipse_at_center,black_45%,rgba(0,0,0,0.85)_65%,transparent_96%)] [-webkit-mask-image:radial-gradient(ellipse_at_center,black_45%,rgba(0,0,0,0.85)_65%,transparent_96%)] bg-black/50 shrink-0">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={topSlide.src + '-top'}
                initial={{ y: -40, opacity: 0, scale: 0.98 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 40, opacity: 0, scale: 1.02 }}
                transition={easyEaseTransition}
                className="relative w-full h-full"
              >
                <img
                  src={topSlide.src}
                  alt={topSlide.title}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
                <div className="absolute bottom-2 left-3 sm:bottom-2.5 sm:left-3.5 z-10 text-left pointer-events-none pr-3">
                  <div className="text-xs sm:text-sm font-bold text-white tracking-wide drop-shadow-md">
                    {topSlide.title}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-zinc-300 font-normal drop-shadow-sm line-clamp-1">
                    {topSlide.description}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            {/* Perimeter soft ambient fade gradients */}
            <div className="absolute inset-0 pointer-events-none z-20 [background:radial-gradient(ellipse_at_center,transparent_45%,#0a0a08_95%)]" />
          </div>

          {/* 2. MIDDLE IMAGE CARD: Prominently Large Centerpiece (100%), centered with crisp gold border */}
          <div className="relative w-full max-w-[460px] sm:max-w-[520px] lg:max-w-[560px] aspect-[2048/1367] rounded-xl overflow-hidden border border-[#C9A25F]/75 shadow-[0_0_40px_rgba(212,175,55,0.25),0_15px_35px_rgba(0,0,0,0.9)] bg-black/60 shrink-0 z-10">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={midSlide.src + '-mid'}
                initial={{ y: -45, opacity: 0, scale: 0.98 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 45, opacity: 0, scale: 1.02 }}
                transition={easyEaseTransition}
                className="relative w-full h-full"
              >
                <img
                  src={midSlide.src}
                  alt={midSlide.title}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
                <div className="absolute bottom-2.5 left-3.5 sm:bottom-3 sm:left-4 z-10 text-left pointer-events-none pr-3">
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-white tracking-wide drop-shadow-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E8C896] inline-block animate-pulse shrink-0" />
                    <span className="truncate">{midSlide.title}</span>
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-zinc-300 font-normal drop-shadow-sm line-clamp-1">
                    {midSlide.description}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 3. BOTTOM IMAGE CARD: Smaller (76%), shifted right, all outer edges softly blurred/feathered */}
          <div className="relative w-[76%] max-w-[340px] sm:max-w-[380px] lg:max-w-[420px] aspect-[2048/1367] rounded-xl overflow-hidden translate-x-4 sm:translate-x-6 lg:translate-x-8 [mask-image:radial-gradient(ellipse_at_center,black_45%,rgba(0,0,0,0.85)_65%,transparent_96%)] [-webkit-mask-image:radial-gradient(ellipse_at_center,black_45%,rgba(0,0,0,0.85)_65%,transparent_96%)] bg-black/50 shrink-0">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={botSlide.src + '-bot'}
                initial={{ y: -40, opacity: 0, scale: 0.98 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 40, opacity: 0, scale: 1.02 }}
                transition={easyEaseTransition}
                className="relative w-full h-full"
              >
                <img
                  src={botSlide.src}
                  alt={botSlide.title}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
                <div className="absolute bottom-2 left-3 sm:bottom-2.5 sm:left-3.5 z-10 text-left pointer-events-none pr-3">
                  <div className="text-xs sm:text-sm font-bold text-white tracking-wide drop-shadow-md">
                    {botSlide.title}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-zinc-300 font-normal drop-shadow-sm line-clamp-1">
                    {botSlide.description}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            {/* Perimeter soft ambient fade gradients */}
            <div className="absolute inset-0 pointer-events-none z-20 [background:radial-gradient(ellipse_at_center,transparent_45%,#0a0a08_95%)]" />
          </div>

        </div>

      </div>

    </section>
  );
}
