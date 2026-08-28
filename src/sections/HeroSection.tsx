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
