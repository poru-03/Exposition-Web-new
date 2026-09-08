import { motion, MotionValue, useTransform, useReducedMotion } from 'framer-motion';

export default function MagazineStack({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const prefersReducedMotion = useReducedMotion();

  // Magazines rise up and scale into place
  // Center magazine (21st)
  const centerTranslateY = useTransform(scrollYProgress, [0, 0.6], ['30%', '0%']);
  const centerScale = useTransform(scrollYProgress, [0, 0.6], [0.8, 1]);
  const centerOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  
  // Left magazine (19th)
  const leftTranslateY = useTransform(scrollYProgress, [0, 0.6], ['40%', '5%']);
  const leftTranslateX = useTransform(scrollYProgress, [0, 0.6], ['0%', '-60%']);
  const leftRotate = useTransform(scrollYProgress, [0, 0.6], [0, -10]);
  const sideScale = useTransform(scrollYProgress, [0, 0.6], [0.7, 0.85]);
  const sideOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 0.4]);

  // Right magazine (20th)
  const rightTranslateY = useTransform(scrollYProgress, [0, 0.6], ['40%', '5%']);
  const rightTranslateX = useTransform(scrollYProgress, [0, 0.6], ['0%', '60%']);
  const rightRotate = useTransform(scrollYProgress, [0, 0.6], [0, 10]);
  
  // Reduced motion fallbacks
  const fallbackY = prefersReducedMotion ? '0%' : centerTranslateY;
  const fallbackScale = prefersReducedMotion ? 1 : centerScale;

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
      <div className="relative w-full max-w-5xl flex items-center justify-center">
        {/* 19th Edition - hidden on small screens for performance/layout */}
        <motion.div
          className="hidden md:flex absolute w-[260px] lg:w-[320px] aspect-[3/4] rounded-lg shadow-2xl bg-zinc-900 border border-zinc-700 flex-col items-center justify-center overflow-hidden"
          style={{
            y: leftTranslateY,
            x: leftTranslateX,
            rotate: prefersReducedMotion ? 0 : leftRotate,
            scale: sideScale,
            opacity: sideOpacity,
            zIndex: 1,
          }}
        >
          <div className="absolute inset-0 bg-black/60 z-10" />
          <h3 className="text-zinc-500 font-bold text-2xl z-0">19TH EDITION</h3>
        </motion.div>

        {/* 20th Edition - hidden on small screens */}
        <motion.div
          className="hidden md:flex absolute w-[260px] lg:w-[320px] aspect-[3/4] rounded-lg shadow-2xl bg-zinc-900 border border-zinc-700 flex-col items-center justify-center overflow-hidden"
          style={{
            y: rightTranslateY,
            x: rightTranslateX,
            rotate: prefersReducedMotion ? 0 : rightRotate,
            scale: sideScale,
            opacity: sideOpacity,
            zIndex: 1,
          }}
        >
          <div className="absolute inset-0 bg-black/60 z-10" />
          <h3 className="text-zinc-500 font-bold text-2xl z-0">20TH EDITION</h3>
        </motion.div>

        {/* 21st Edition (Center) */}
        <motion.div
          className="relative w-[260px] sm:w-[320px] md:w-[380px] lg:w-[420px] aspect-[3/4] rounded-lg bg-gradient-to-br from-[#1a1a1a] to-[#050505] border border-gold-accent flex flex-col items-center justify-center overflow-hidden pointer-events-auto shadow-[0_20px_50px_rgba(0,0,0,1)]"
          style={{
            y: fallbackY,
            scale: fallbackScale,
            opacity: centerOpacity,
            zIndex: 10,
          }}
        >
          <div className="absolute inset-0 bg-gold-gradient opacity-10 mix-blend-overlay"></div>
          <h2 className="text-transparent bg-clip-text bg-gold-gradient font-black text-4xl lg:text-5xl mb-2 z-10 text-center tracking-wide drop-shadow-lg">EXPOSITION</h2>
          <p className="text-white font-medium tracking-widest text-xs sm:text-sm lg:text-base z-10 uppercase">21st Edition</p>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 z-0"></div>
        </motion.div>
      </div>
    </div>
  );
}
