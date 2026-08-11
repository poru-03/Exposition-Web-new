import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25, restDelta: 0.001 });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[60] pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="h-full w-full"
        style={{ background: 'linear-gradient(90deg, #FF4D00 0%, #a855f7 50%, #22d3ee 100%)' }}
      />
    </motion.div>
  );
}
