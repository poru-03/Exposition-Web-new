import { useEffect, useState } from 'react';
import ContactButton from '../components/ContactButton';
import FadeIn from '../components/FadeIn';
import Magnet from '../components/Magnet';
import VaporizeTextCycle, { Tag } from '@/components/ui/vapour-text-effect';
import { VolumetricStudio } from '@/components/ui/volumetric-studio';

const PORTRAIT_SRC =
  'https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png';

export default function HeroSection() {
  const [fontSize, setFontSize] = useState('85px');

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

  return (
    <section
      className="relative flex h-screen flex-col bg-[#0C0C0C]"
      style={{ overflowX: 'clip' }}
    >
      <VolumetricStudio lightColor="232,200,150" className="h-full min-h-screen">
        {/* Top Navbar Spacer */}
        <div className="relative z-20 w-full px-[5%] pt-6 md:pt-8 h-12 md:h-16 pointer-events-none" />

        {/* Hero Title with Vapour Particle Text Cycle Effect */}
        <div className="relative z-20 w-full overflow-hidden mt-4 sm:mt-2 md:-mt-2 flex items-center justify-center min-h-[120px] sm:min-h-[160px] md:min-h-[200px] lg:min-h-[230px] px-[5%]">
          <FadeIn
            delay={0.15}
            y={40}
            className="w-full h-[120px] sm:h-[160px] md:h-[200px] lg:h-[230px] flex items-center justify-center"
          >
            <VaporizeTextCycle
              texts={['EXPOSITION', '21st EDITION']}
              font={{
                fontFamily: 'Inter, Outfit, sans-serif',
                fontSize: fontSize,
                fontWeight: 900,
              }}
              color="rgb(232, 200, 150)"
              spread={5}
              density={5}
              animation={{
                vaporizeDuration: 2.2,
                fadeInDuration: 1.2,
                waitDuration: 0.8,
              }}
              direction="left-to-right"
              alignment="center"
              tag={Tag.H1}
            />
          </FadeIn>
        </div>

        <Magnet
          padding={150}
          strength={3}
          activeTransition="transform 0.3s ease-out"
          inactiveTransition="transform 0.6s ease-in-out"
          wrapperClassName="pointer-events-none absolute left-1/2 top-1/2 z-10 w-[280px] -translate-x-1/2 -translate-y-1/2 sm:bottom-0 sm:top-auto sm:w-[360px] sm:translate-y-0 md:w-[440px] lg:w-[520px]"
        >
          <FadeIn delay={0.6} y={30}>
            <img
              src={PORTRAIT_SRC}
              alt="Exposition 21st Edition"
              className="h-auto w-full select-none"
              draggable={false}
            />
          </FadeIn>
        </Magnet>

        <div className="relative z-20 mt-auto flex items-end justify-between px-[5%] pb-7 sm:pb-8 md:pb-10 pointer-events-auto">
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
      </VolumetricStudio>
    </section>
  );
}
