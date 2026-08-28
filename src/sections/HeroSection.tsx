import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLinkedinIn, FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa6';
import ContactButton from '../components/ContactButton';
import FadeIn from '../components/FadeIn';
import Magnet from '../components/Magnet';
import { SocialTooltip, SocialItem } from '../components/ui/social-media';

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
      <div className="relative z-20 w-full overflow-hidden mt-2 flex items-center justify-center min-h-[100px] sm:min-h-[130px] md:min-h-[160px] px-[5%]">
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

      {/* Center Exposition Logo + Social Links Stack wrapped in Magnet */}
      <div className="relative z-20 flex flex-col items-center justify-center my-auto px-[5%]">
        <Magnet
          padding={180}
          strength={3.5}
          activeTransition="transform 0.3s ease-out"
          inactiveTransition="transform 0.6s ease-in-out"
          wrapperClassName="flex flex-col items-center justify-center w-[220px] sm:w-[280px] md:w-[320px] lg:w-[360px]"
        >
          <FadeIn delay={0.6} y={30} className="w-full flex justify-center">
            <img
              src="/ExpoLogo.png"
              alt="Exposition 21st Edition"
              className="h-auto w-full select-none drop-shadow-[0_0_25px_rgba(184,137,79,0.3)]"
              draggable={false}
            />
          </FadeIn>

          {/* Social Media Links below Exposition Logo moving together with cursor */}
          <FadeIn delay={0.75} y={20} className="mt-5 sm:mt-6">
            <SocialTooltip
              items={HERO_SOCIAL_ITEMS}
              borderClass="border-0"
              iconColorClass="text-[#E8C896] group-hover:text-[#0C0C0C]"
              containerSizeClass="w-12 h-12 sm:w-[50px] sm:h-[50px] bg-[#161616]/90"
              iconSizeClass="w-6 h-6"
            />
          </FadeIn>
        </Magnet>
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
