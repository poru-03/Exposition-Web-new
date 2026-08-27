import { useRef } from 'react';
import { useScroll } from 'framer-motion';
import Curtain from '../components/hero/Curtain';
import MagazineStack from '../components/hero/MagazineStack';
import Spotlight from '../components/hero/Spotlight';
import HeroTitle from '../components/hero/HeroTitle';

export default function CurtainHeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Start tracking when the top of the section hits the top of the viewport.
    // End tracking when the bottom of the section hits the bottom of the viewport.
    offset: ['start start', 'end end']
  });

  return (
    // The wrapper is 300vh tall to allow for plenty of scrolling space to drive the animation
    <section ref={containerRef} className="relative h-[300vh] bg-[#0C0C0C]" style={{ overflowX: 'clip' }}>
      {/* 
        Sticky container stays pinned to the top of the viewport 
        while we scroll through the 300vh wrapper
      */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-center">
        {/* Navbar Spacer to ensure content doesn't overlap the fixed navbar */}
        <div className="absolute top-0 left-0 z-50 w-full px-[5%] pt-6 md:pt-8 h-12 md:h-16 pointer-events-none" />

        <Curtain scrollYProgress={scrollYProgress} />
        
        {/* The spotlight sits behind the title but over the magazines (z-index managed internally) */}
        <Spotlight scrollYProgress={scrollYProgress} />
        
        <MagazineStack scrollYProgress={scrollYProgress} />
        
        <HeroTitle scrollYProgress={scrollYProgress} />
      </div>
    </section>
  );
}
