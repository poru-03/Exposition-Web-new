import { motion, MotionValue, useTransform } from 'framer-motion';

export default function Curtain({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  // Translate from 0 to -100% (left) and 100% (right) between 0 and 0.6 scroll progress
  const leftX = useTransform(scrollYProgress, [0, 0.6], ['0%', '-100%']);
  const rightX = useTransform(scrollYProgress, [0, 0.6], ['0%', '100%']);
  
  return (
    <div className="pointer-events-none absolute inset-0 z-40 flex overflow-hidden">
      {/* Left Panel */}
      <motion.div
        style={{ x: leftX }}
        className="h-full w-1/2 bg-gradient-to-r from-ink via-[#111] to-[#1a140d] border-r border-gold-accent shadow-[20px_0_50px_rgba(0,0,0,0.8)] flex justify-end overflow-hidden"
      >
        {/* Velvet texture overlay */}
        <div className="h-full w-[200%] opacity-20 bg-gold-gradient mix-blend-overlay"></div>
        {/* Edge highlight */}
        <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-gold-accent to-transparent opacity-80"></div>
      </motion.div>
      
      {/* Right Panel */}
      <motion.div
        style={{ x: rightX }}
        className="h-full w-1/2 bg-gradient-to-l from-ink via-[#111] to-[#1a140d] border-l border-gold-accent shadow-[-20px_0_50px_rgba(0,0,0,0.8)] flex justify-start overflow-hidden"
      >
        {/* Velvet texture overlay */}
        <div className="h-full w-[200%] opacity-20 bg-gold-gradient mix-blend-overlay"></div>
        {/* Edge highlight */}
        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-gold-accent to-transparent opacity-80"></div>
      </motion.div>
    </div>
  );
}
