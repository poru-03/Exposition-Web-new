import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ContactButton from '../components/ContactButton';
import FadeIn from '../components/FadeIn';
import Magnet from '../components/Magnet';

export default function HeroSection() {
  const [fontSize, setFontSize] = useState('85px');
  const [currentIndex, setCurrentIndex] = useState(0);

  const texts = [
    { text: 'Exposition', className: 'text-metallic-gold-shine' },
    { text: '21st Edition', className: 'text-metallic-silver-shine' },
  ];

  useEffect(() => {
    const updateSize = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setFontSize(`${Math.max(32, Math.floor(w * 0.095))}px`);
      } else if (w < 1024) {
        setFontSize(`${Math.max(52, Math.floor(w * 0.08))}px`);
      } else {
        setFontSize(`${Math.min(115, Math.floor(w * 0.072))}px`);
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative flex h-screen flex-col bg-[#0C0C0C]"
      style={{ overflowX: 'clip' }}
    >
      {/* Top Navbar Spacer */}
      <div className="relative z-20 w-full px-[5%] pt-6 md:pt-8 h-12 md:h-16 pointer-events-none" />

      {/* Hero Title with Solid Text Slide Transition Effect */}
      <div className="relative z-20 w-full overflow-hidden mt-4 sm:mt-2 md:-mt-2 flex items-center justify-center min-h-[120px] sm:min-h-[160px] md:min-h-[200px] lg:min-h-[230px] px-[5%]">
        <AnimatePresence mode="wait">
          <motion.h1
            key={currentIndex}
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 80, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'Times New Roman, Georgia, serif',
              fontSize: fontSize,
              fontWeight: 900,
            }}
            className={`w-full text-center ${texts[currentIndex].className}`}
          >
            {texts[currentIndex].text}
          </motion.h1>
        </AnimatePresence>
      </div>

      <Magnet
        padding={150}
        strength={3}
        activeTransition="transform 0.3s ease-out"
        inactiveTransition="transform 0.6s ease-in-out"
        wrapperClassName="pointer-events-none absolute left-1/2 top-[48%] z-10 w-[220px] -translate-x-1/2 -translate-y-1/2 sm:w-[280px] md:w-[320px] lg:w-[360px]"
      >
        <FadeIn delay={0.6} y={30}>
          <img
            src="/ExpoLogo.png"
            alt="Exposition 21st Edition"
            className="h-auto w-full select-none"
            draggable={false}
          />
        </FadeIn>
      </Magnet>

      <div className="relative z-20 mt-auto flex items-end justify-between px-[5%] pb-7 sm:pb-8 md:pb-10">
        <FadeIn
          as="p"
          delay={0.35}
          y={20}
          className="max-w-[160px] font-light uppercase leading-snug tracking-wide text-[#9A9A9A] sm:max-w-[220px] md:max-w-[260px]"
          style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
        >
          the premier technology symposium & magazine by mit department, university of kelaniya
        </FadeIn>

        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
}
