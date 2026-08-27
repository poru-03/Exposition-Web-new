import { motion, MotionValue, useTransform } from 'framer-motion';

export default function Spotlight({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  // Spotlight opacity peaks when curtains are open (around 0.6)
  const spotlightOpacity = useTransform(scrollYProgress, [0.3, 0.6, 1], [0, 0.8, 1]);
  const spotlightScale = useTransform(scrollYProgress, [0.3, 0.6], [0.8, 1.2]);

  return (
    <motion.div 
      className="pointer-events-none absolute inset-0 z-25 flex items-center justify-center overflow-hidden mix-blend-screen"
      style={{ opacity: spotlightOpacity, scale: spotlightScale }}
    >
      <div 
        className="w-[120vw] h-[120vh] rounded-full blur-[100px] md:blur-[150px]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(232,200,150,0.25) 0%, rgba(232,200,150,0) 50%)',
          transform: 'translateY(-10%)'
        }}
      />
    </motion.div>
  );
}
