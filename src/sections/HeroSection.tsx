import { useRef } from 'react';
import { useScroll, useTransform, useSpring, motion, useReducedMotion } from 'framer-motion';
import ContactButton from '../components/ContactButton';

export default function CurtainHeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Spring physics for curtains
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.001,
  });

  // Curtain Translations and Skew (weight lag)
  const leftX = useTransform(smoothProgress, [0, 0.6], ['0%', '-100%']);
  const rightX = useTransform(smoothProgress, [0, 0.6], ['0%', '100%']);
  const skewLeft = useTransform(smoothProgress, [0, 0.3, 0.6], [0, -3, 0]);
  const skewRight = useTransform(smoothProgress, [0, 0.3, 0.6], [0, 3, 0]);
  const innerShadowOpacity = useTransform(smoothProgress, [0, 0.6], [0.3, 0.8]);

  // Spotlight bindings
  const spotlightOpacity = useTransform(scrollYProgress, [0.3, 0.5, 0.7, 1], [0, 0.8, 1, 1]);
  const spotlightScale = useTransform(scrollYProgress, [0.3, 0.6], [0.5, 1]);
  const spotlightY = useTransform(scrollYProgress, [0.3, 0.6], ['-30%', '-10%']);

  // Magazine Translations (3D depth handled by `z` and `perspective`)
  const centerTranslateY = useTransform(scrollYProgress, [0, 0.6], ['30%', '0%']);
  const centerScale = useTransform(scrollYProgress, [0, 0.6], [0.8, 1]);
  const centerOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const leftTranslateY = useTransform(scrollYProgress, [0, 0.6], ['40%', '5%']);
  const leftTranslateX = useTransform(scrollYProgress, [0, 0.6], ['0%', '-45%']);
  const leftRotate = useTransform(scrollYProgress, [0, 0.6], [0, -8]);
  const sideOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  const rightTranslateY = useTransform(scrollYProgress, [0, 0.6], ['40%', '5%']);
  const rightTranslateX = useTransform(scrollYProgress, [0, 0.6], ['0%', '45%']);
  const rightRotate = useTransform(scrollYProgress, [0, 0.6], [0, 8]);

  const fallbackY = prefersReducedMotion ? '0%' : centerTranslateY;
  const fallbackScale = prefersReducedMotion ? 1 : centerScale;

  // Title & CTA bindings
  const titleOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const titleScale = useTransform(scrollYProgress, [0, 0.25], [1, 1.2]);
  const ctaOpacity = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);
  const ctaY = useTransform(scrollYProgress, [0.6, 0.8], [30, 0]);

  // Flashbulb Opacities
  const flash1 = useTransform(scrollYProgress, [0.85, 0.86, 0.87], [0, 1, 0]);
  const flash2 = useTransform(scrollYProgress, [0.87, 0.88, 0.89], [0, 1, 0]);
  const flash3 = useTransform(scrollYProgress, [0.89, 0.90, 0.91], [0, 1, 0]);
  const flash4 = useTransform(scrollYProgress, [0.91, 0.92, 0.93], [0, 1, 0]);
  const flash5 = useTransform(scrollYProgress, [0.93, 0.94, 0.95], [0, 1, 0]);

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-[#0C0C0C]" style={{ overflowX: 'clip' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-center">
        
        {/* Ambient Gold Background */}
        <motion.div
          className="absolute inset-0 z-0 opacity-40 pointer-events-none"
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          style={{
            background: 'linear-gradient(45deg, #0C0C0C 0%, #2A1F13 30%, #0C0C0C 60%, #1A140D 100%)',
            backgroundSize: '200% 200%',
          }}
        />

        {/* Navbar Spacer */}
        <div className="absolute top-0 left-0 z-50 w-full px-[5%] pt-6 md:pt-8 h-12 md:h-16 pointer-events-none" />

        {/* --- CURTAINS --- */}
        <div className="pointer-events-none absolute inset-0 z-40 flex overflow-hidden perspective-[1000px]">
          {/* Left Panel */}
          <motion.div
            style={{ x: leftX, skewX: skewLeft, boxShadow: 'inset -20px 0 50px rgba(0,0,0,0.8), 20px 0 50px rgba(0,0,0,0.9)' }}
            className="h-full w-1/2 flex justify-end origin-top overflow-hidden"
          >
            {/* Waving Physics Layer */}
            <motion.div 
              className="absolute inset-0 w-full h-full origin-top"
              animate={{ rotateZ: [-0.5, 0.5, -0.5] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div 
                className="absolute inset-0 z-0 opacity-95"
                style={{ background: 'repeating-linear-gradient(90deg, #0a0805 0%, #1a140d 2%, #2a1f13 4%, #1a140d 6%, #0a0805 8%)' }}
              />
              <div className="absolute inset-0 z-10 w-[200%] opacity-20 bg-gold-gradient mix-blend-overlay"></div>
            </motion.div>
            <motion.div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-r from-transparent to-black" style={{ opacity: innerShadowOpacity }} />
            <div className="absolute right-0 top-0 bottom-0 z-30 w-[4px] bg-gradient-to-b from-transparent via-gold-accent to-transparent opacity-80 blur-[1px]"></div>
          </motion.div>
          
          {/* Right Panel */}
          <motion.div
            style={{ x: rightX, skewX: skewRight, boxShadow: 'inset 20px 0 50px rgba(0,0,0,0.8), -20px 0 50px rgba(0,0,0,0.9)' }}
            className="h-full w-1/2 flex justify-start origin-top overflow-hidden"
          >
            <motion.div 
              className="absolute inset-0 w-full h-full origin-top"
              animate={{ rotateZ: [0.5, -0.5, 0.5] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            >
              <div 
                className="absolute inset-0 z-0 opacity-95"
                style={{ background: 'repeating-linear-gradient(90deg, #0a0805 0%, #1a140d 2%, #2a1f13 4%, #1a140d 6%, #0a0805 8%)' }}
              />
              <div className="absolute inset-0 z-10 w-[200%] opacity-20 bg-gold-gradient mix-blend-overlay"></div>
            </motion.div>
            <motion.div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-l from-transparent to-black" style={{ opacity: innerShadowOpacity }} />
            <div className="absolute left-0 top-0 bottom-0 z-30 w-[4px] bg-gradient-to-b from-transparent via-gold-accent to-transparent opacity-80 blur-[1px]"></div>
          </motion.div>
        </div>

        {/* --- SPOTLIGHT --- */}
        <motion.div 
          className="pointer-events-none absolute inset-0 z-25 flex items-center justify-center overflow-hidden mix-blend-screen"
          style={{ opacity: spotlightOpacity, scale: spotlightScale, y: spotlightY }}
        >
          <div 
            className="w-[120vw] h-[150vh] rounded-full blur-[100px]"
            style={{ background: 'radial-gradient(circle at 50% 30%, rgba(232, 200, 150, 0.7) 0%, rgba(232, 200, 150, 0.1) 40%, transparent 65%)' }}
          />
        </motion.div>

        {/* --- 3D MAGAZINE STACK --- */}
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none" style={{ perspective: '1200px' }}>
          <div className="relative w-full max-w-5xl flex items-center justify-center preserve-3d">
            
            {/* 19th Edition (Deep Back Left) */}
            <motion.div
              className="hidden md:flex absolute w-[260px] lg:w-[320px] aspect-[3/4] rounded-lg shadow-2xl bg-zinc-900 border border-zinc-700 flex-col items-center justify-center overflow-hidden"
              style={{
                y: leftTranslateY,
                x: leftTranslateX,
                z: -300,
                rotate: prefersReducedMotion ? 0 : leftRotate,
                opacity: sideOpacity,
                filter: 'brightness(0.4) blur(3px)',
              }}
            >
              <div className="absolute inset-0 bg-black/60 z-10" />
              <h3 className="text-zinc-500 font-bold text-2xl z-0">19TH EDITION</h3>
            </motion.div>

            {/* 20th Edition (Mid Back Right) */}
            <motion.div
              className="hidden md:flex absolute w-[260px] lg:w-[320px] aspect-[3/4] rounded-lg shadow-2xl bg-zinc-900 border border-zinc-700 flex-col items-center justify-center overflow-hidden"
              style={{
                y: rightTranslateY,
                x: rightTranslateX,
                z: -150,
                rotate: prefersReducedMotion ? 0 : rightRotate,
                opacity: sideOpacity,
                filter: 'brightness(0.6) blur(1px)',
              }}
            >
              <div className="absolute inset-0 bg-black/60 z-10" />
              <h3 className="text-zinc-500 font-bold text-2xl z-0">20TH EDITION</h3>
            </motion.div>

            {/* 21st Edition (Center Hero pulled forward) */}
            <motion.div
              className="relative w-[260px] sm:w-[320px] md:w-[380px] lg:w-[420px] aspect-[3/4] rounded-lg bg-gradient-to-br from-[#1a1a1a] to-[#050505] border border-gold-accent flex flex-col items-center justify-center overflow-hidden pointer-events-auto shadow-[0_20px_50px_rgba(0,0,0,1)]"
              style={{
                y: fallbackY,
                z: 100,
                scale: fallbackScale,
                opacity: centerOpacity,
              }}
            >
              <div className="absolute inset-0 bg-gold-gradient opacity-10 mix-blend-overlay"></div>
              <h2 className="text-transparent bg-clip-text bg-gold-gradient font-black text-4xl lg:text-5xl mb-2 z-10 text-center tracking-wide drop-shadow-lg">EXPOSITION</h2>
              <p className="text-white font-medium tracking-widest text-xs sm:text-sm lg:text-base z-10 uppercase">21st Edition</p>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 z-0"></div>
            </motion.div>
          </div>
        </div>

        {/* --- HERO TITLE & CTA --- */}
        <motion.div 
          className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center"
          style={{ opacity: titleOpacity, scale: titleScale }}
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gold-gradient drop-shadow-[0_0_25px_rgba(232,200,150,0.4)] tracking-wider">
            EXPOSITION
          </h1>
        </motion.div>

        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-8 sm:bottom-12 md:bottom-16 z-50 flex flex-col items-center justify-end px-[5%]"
          style={{ opacity: ctaOpacity, y: ctaY }}
        >
          <p className="max-w-[280px] sm:max-w-md text-center font-light uppercase leading-relaxed tracking-widest text-[#9A9A9A] mb-6 sm:mb-8 text-xs sm:text-sm drop-shadow-md">
            the premier technology symposium & magazine by mit department, university of kelaniya
          </p>
          <div className="pointer-events-auto">
            <ContactButton />
          </div>
        </motion.div>

        {/* --- LOCALIZED PAPARAZZI FLASHES --- */}
        <div className="absolute inset-0 z-[100] pointer-events-none overflow-hidden mix-blend-screen">
          <motion.div style={{ opacity: flash1 }} className="absolute left-[15%] bottom-[20%] w-[150px] h-[150px] md:w-[300px] md:h-[300px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_70%)]" />
          <motion.div style={{ opacity: flash2 }} className="absolute right-[20%] bottom-[35%] w-[180px] h-[180px] md:w-[400px] md:h-[400px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_70%)]" />
          <motion.div style={{ opacity: flash3 }} className="absolute left-[30%] bottom-[5%] w-[120px] h-[120px] md:w-[250px] md:h-[250px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_70%)]" />
          <motion.div style={{ opacity: flash4 }} className="absolute right-[10%] bottom-[15%] w-[200px] h-[200px] md:w-[350px] md:h-[350px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_70%)]" />
          <motion.div style={{ opacity: flash5 }} className="absolute left-[45%] bottom-[25%] w-[160px] h-[160px] md:w-[280px] md:h-[280px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_70%)]" />
        </div>
        
import { useEffect, useState } from 'react';
import { FaLinkedinIn, FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa6';
import ContactButton from '../components/ContactButton';
import FadeIn from '../components/FadeIn';
import Magnet from '../components/Magnet';
import { SocialTooltip, SocialItem } from '../components/ui/social-media';
import { HeroBackground } from '../components/ui/hero-background';

const HERO_SOCIAL_ITEMS: SocialItem[] = [
  {
    href: 'https://www.linkedin.com/company/exposition-magazine/',
    ariaLabel: 'LinkedIn',
    tooltip: 'LinkedIn',
    color: '#0077b5',
    icon: <FaLinkedinIn className="size-4" />,
  },
  {
    href: 'https://www.facebook.com/Exposition.uok/',
    ariaLabel: 'Facebook',
    tooltip: 'Facebook',
    color: '#1877f2',
    icon: <FaFacebookF className="size-4" />,
  },
  {
    href: 'https://www.instagram.com/exposition_magazine/',
    ariaLabel: 'Instagram',
    tooltip: 'Instagram',
    color: '#e4405f',
    icon: <FaInstagram className="size-4" />,
  },
  {
    href: 'https://www.youtube.com/@expositionmagazine',
    ariaLabel: 'YouTube',
    tooltip: 'YouTube',
    color: '#ff0000',
    icon: <FaYoutube className="size-4" />,
  },
];

export default function HeroSection() {
  const [fontSize, setFontSize] = useState('85px');

  useEffect(() => {
    const updateSize = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setFontSize(`${Math.max(36, Math.floor(w * 0.1))}px`);
      } else if (w < 1024) {
        setFontSize(`${Math.max(56, Math.floor(w * 0.085))}px`);
      } else {
        setFontSize(`${Math.min(125, Math.floor(w * 0.08))}px`);
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <section
      className="relative flex h-screen flex-col bg-[#0C0C0C]"
      style={{ overflowX: 'clip' }}
    >
      {/* Animated Magazine Covers & Gold Ambient Background */}
      <HeroBackground />

      {/* Top Navbar Spacer */}
      <div className="relative z-20 w-full px-[5%] pt-6 md:pt-8 h-12 md:h-16 pointer-events-none" />

      {/* Primary Wordmark & Subtitle Lockup */}
      <div className="relative z-20 w-full flex flex-col items-center justify-center my-auto px-[5%]">
        <FadeIn delay={0.2} y={30} className="flex flex-col items-center justify-center text-center">
          <h1
            style={{
              fontFamily: 'Times New Roman, Georgia, serif',
              fontSize: fontSize,
              fontWeight: 900,
            }}
            className="text-metallic-gold-shine tracking-tight drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)]"
          >
            Exposition
          </h1>
          <p className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base font-mono font-bold tracking-[0.3em] uppercase text-[#E8C896] drop-shadow-md">
            21ST EDITION
          </p>
        </FadeIn>

        {/* Social Links Row */}
        <Magnet
          padding={120}
          strength={3}
          activeTransition="transform 0.3s ease-out"
          inactiveTransition="transform 0.6s ease-in-out"
          wrapperClassName="flex items-center justify-center mt-6 sm:mt-8"
        >
          <FadeIn delay={0.4} y={20}>
            <SocialTooltip
              items={HERO_SOCIAL_ITEMS}
              borderClass="border border-[#B8894F]/30"
              iconColorClass="text-[#E8C896] group-hover:text-[#0C0C0C]"
              containerSizeClass="w-11 h-11 sm:w-12 sm:h-12 bg-black/80 backdrop-blur-md"
              iconSizeClass="w-5 h-5"
            />
          </FadeIn>
        </Magnet>

        {/* Subtle Gold Divider Line */}
        <FadeIn delay={0.45} y={10} className="w-full max-w-xs mt-8 sm:mt-10">
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#C9A25F]/40 to-transparent" />
        </FadeIn>
      </div>

      {/* Bottom Bar: Contact Us Button on Right */}
      <div className="relative z-20 mt-auto flex items-end justify-end px-[5%] pb-7 sm:pb-8 md:pb-10">
        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
}
