import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const LOGO_SRC = '/ExpoLogo.png';

export default function BackgroundFaceParallax() {
  const { scrollYProgress } = useScroll();

  // Silky smooth spring physics for responsive inertia
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 26,
    restDelta: 0.001,
  });

  // Gracefully drifts downward through the entire page as you scroll
  const y = useTransform(smoothProgress, [0, 1], ['-2vh', '50vh']);

  // Low visibility watermark across the entire web site (emerges past hero)
  const opacity = useTransform(
    smoothProgress,
    [0, 0.08, 0.5, 0.85, 1],
    [0, 0.14, 0.12, 0.10, 0.08]
  );

  // Subtle organic scaling as user navigates down
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.95, 1.05, 0.98]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[1] overflow-hidden flex items-center justify-center"
    >
      <motion.div
        style={{ y, opacity, scale }}
        className="w-[280px] sm:w-[380px] md:w-[500px] lg:w-[640px] xl:w-[740px] max-w-[85vw] will-change-transform"
      >
        <img
          src={LOGO_SRC}
          alt="Exposition Ambient Background"
          className="w-full h-auto object-contain select-none pointer-events-none drop-shadow-[0_0_30px_rgba(184,137,79,0.2)]"
          draggable={false}
        />
      </motion.div>
    </div>
  );
}


