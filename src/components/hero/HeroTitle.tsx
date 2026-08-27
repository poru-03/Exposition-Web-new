import { motion, MotionValue, useTransform } from 'framer-motion';
import ContactButton from '../ContactButton';

export default function HeroTitle({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  // Initial Title fades out and scales up as scroll starts
  const titleOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const titleScale = useTransform(scrollYProgress, [0, 0.25], [1, 1.2]);

  // CTA fades in after curtains are fully open
  const ctaOpacity = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);
  const ctaY = useTransform(scrollYProgress, [0.6, 0.8], [30, 0]);

  return (
    <>
      {/* Front Title (disappears as curtain opens) */}
      <motion.div 
        className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center"
        style={{ opacity: titleOpacity, scale: titleScale }}
      >
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gold-gradient drop-shadow-[0_0_25px_rgba(232,200,150,0.4)] tracking-wider">
          EXPOSITION
        </h1>
      </motion.div>

      {/* CTA and Supporting Text (appears below the magazine) */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-8 sm:bottom-12 md:bottom-16 z-50 flex flex-col items-center justify-end px-[5%]"
        style={{ opacity: ctaOpacity, y: ctaY }}
      >
        <p className="max-w-[280px] sm:max-w-md text-center font-light uppercase leading-relaxed tracking-widest text-[#9A9A9A] mb-6 sm:mb-8 text-xs sm:text-sm drop-shadow-md">
          the premier technology symposium & magazine by mit department, university of kelaniya
        </p>
        <div className="pointer-events-auto">
          <ContactButton />
        </div>
      </motion.div>
    </>
  );
}
