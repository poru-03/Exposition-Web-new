import { useEffect, useState } from 'react';
import ContactButton from '../components/ContactButton';
import FadeIn from '../components/FadeIn';
import Magnet from '../components/Magnet';
import VaporizeTextCycle, { Tag } from '@/components/ui/vapour-text-effect';

const NAV_LINKS = [
  { name: 'About', href: '#about' },
  { name: 'Timeline', href: '#timeline' },
  { name: 'Events', href: '#techevent-hub' },
  { name: 'Speakers', href: '#keynote-speakers' },
  { name: 'Interviews', href: '#interviews' },
  { name: 'Reviews', href: '#reviews' },
  { name: 'Partners', href: '#partners' },
  { name: 'Team', href: '#team' },
  { name: 'FAQ', href: '#faq' },
];

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
      <FadeIn
        as="nav"
        delay={0}
        y={-20}
        className="relative z-20 flex w-full items-center justify-between px-[5%] pt-6 text-sm font-medium uppercase tracking-wider text-[#D7E2EA] md:pt-8 md:text-lg lg:text-[1.4rem]"
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="transition-opacity duration-200 hover:opacity-70"
          >
            {link.name}
          </a>
        ))}
      </FadeIn>

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
            color="rgb(255, 255, 255)"
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

      <div className="relative z-20 mt-auto flex items-end justify-between px-[5%] pb-7 sm:pb-8 md:pb-10">
        <FadeIn
          as="p"
          delay={0.35}
          y={20}
          className="max-w-[160px] font-light uppercase leading-snug tracking-wide text-[#D7E2EA] sm:max-w-[220px] md:max-w-[260px]"
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
