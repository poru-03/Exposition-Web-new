import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const PORTRAIT_SRC =
  'https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png';

export default function BackgroundFaceParallax() {
  const { scrollYProgress } = useScroll();

  // Silky smooth spring physics for responsive inertia
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 26,
    restDelta: 0.001,
  });

  // Gracefully drifts downward through the entire page as you scroll
  const y = useTransform(smoothProgress, [0, 1], ['-2vh', '55vh']);

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
        className="w-[180px] sm:w-[260px] md:w-[340px] lg:w-[400px] xl:w-[460px] max-w-[65vw] filter contrast-125 brightness-95 will-change-transform"
      >
        <img
          src={PORTRAIT_SRC}
          alt="Exposition Ambient Background"
          className="w-full h-auto object-contain select-none mix-blend-screen pointer-events-none"
          draggable={false}
        />
      </motion.div>
    </div>
  );
}
