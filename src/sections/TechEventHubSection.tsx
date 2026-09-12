import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

export default function TechEventHubSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'center center'],
  });
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [0, 0.35]);

  return (
    <section
      ref={sectionRef}
      id="techevent-hub"
      className="relative z-10 min-h-screen w-full flex flex-col justify-center bg-transparent px-[5%] py-14 sm:py-20 md:py-24 overflow-hidden"
    >
      {/* Subtle Section Glow Pulse */}
      {!shouldReduceMotion && (
        <motion.div
          className="absolute inset-0 pointer-events-none -z-10"
          style={{
            opacity: glowOpacity,
            background: 'radial-gradient(circle at 50% 30%, rgba(184, 137, 79, 0.12), transparent 65%)',
          }}
        />
      )}

      {/* Section Header */}
      <ScrollReveal className="flex flex-col items-center justify-center text-center mb-6 sm:mb-8 lg:mb-10">
        <h2
          className="hero-heading section-title text-center font-black uppercase leading-none tracking-tight"
          style={{ fontSize: 'clamp(2.4rem, 5.5vw, 76px)' }}
        >
          TechEvent Hub
        </h2>
        <p className="mt-1 max-w-2xl text-center text-xs sm:text-sm leading-snug text-[#9A9A9A] font-light">
          Discover premier hackathons, academic symposiums, and spatial computing conclaves.
        </p>
      </ScrollReveal>

      {/* Split Screen Container / Coming Soon Display */}
      <div className="mx-auto max-w-5xl w-full">
        <ScrollReveal y={16}>
          <div className="relative overflow-hidden rounded-[28px] border border-[#B8894F]/30 bg-[#141414]/95 p-8 sm:p-14 md:p-20 text-center shadow-[0_25px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl flex flex-col items-center justify-center gap-6">
            {/* Soft Ambient Glow */}
            <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#B8894F]/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[#E8C896]/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="inline-flex items-center gap-2 rounded-full bg-[#B8894F]/15 px-5 py-2 border border-[#B8894F]/40 text-[#E8C896] text-xs sm:text-sm font-bold uppercase tracking-widest animate-pulse shadow-[0_0_20px_rgba(184,137,79,0.2)]">
              <Sparkles className="h-4 w-4" />
              <span>Coming Soon</span>
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-white max-w-xl">
              University Tech Events Hub
            </h3>

            <p className="text-sm sm:text-base md:text-lg text-[#9A9A9A] font-light leading-relaxed max-w-2xl">
              We are assembling a live digital platform to aggregate university hackathons, robotics competitions, and spatial computing conclaves across Sri Lanka. Stay tuned!
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
