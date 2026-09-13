import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function AboutBackgroundPills() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.001,
  });

  // Vertical scroll shifts for subtle parallax motion
  const yShift2 = useTransform(smoothProgress, [0, 1], [30, -30]);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden z-0 bg-transparent">
      {/* Sticky Inner Container shifts logo downward behind About content */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center pt-64 sm:pt-80 md:pt-96 opacity-75 sm:opacity-90 pointer-events-none px-4">

        {/* University & Department Crests: unilogos.png */}
        <motion.div
          style={{ y: yShift2 }}
          className="w-full max-w-5xl flex justify-center items-center mt-12 sm:mt-16"
        >
          <img
            src="/resources/unilogos.png"
            alt="University & Department Partner Crests"
            className="w-full max-w-4xl h-auto object-contain filter brightness-150 contrast-125 drop-shadow-[0_0_40px_rgba(255,255,255,0.45)]"
          />
        </motion.div>

      </div>
    </div>
  );
}
