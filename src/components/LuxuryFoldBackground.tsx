import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function LuxuryFoldBackground() {
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

  // Animate path length drawing from top to bottom as user scrolls
  const pathLength = useTransform(smoothProgress, [0.05, 0.85], [0.05, 1]);

  // Dynamic glow brightness lights up on scroll - toned down for subtle elegance
  const glowOpacity = useTransform(smoothProgress, [0.05, 0.75], [0.1, 0.4]);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden z-0 bg-[#090a10]">
      {/* 1. Base Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a12] via-[#0e0e1a] to-[#19192c]" />

      {/* 2. Layered Paper-Fold Diagonal Panel Divisions */}
      <div className="absolute -inset-x-20 top-0 bottom-0 flex justify-between items-start -skew-x-12 scale-105 opacity-60">
        <div className="flex-1 h-[140%] bg-[#08080e] border-r border-white/5 shadow-[20px_0_40px_rgba(0,0,0,0.8)]" />
        <div className="flex-1 h-[140%] bg-[#0b0c16] border-r border-white/5 shadow-[20px_0_40px_rgba(0,0,0,0.8)] mt-20 sm:mt-32" />
        <div className="flex-1 h-[140%] bg-[#0f101f] border-r border-white/5 shadow-[20px_0_40px_rgba(0,0,0,0.8)]" />
        <div className="flex-1 h-[140%] bg-[#141528] border-r border-white/5 shadow-[20px_0_40px_rgba(0,0,0,0.8)] mt-20 sm:mt-32" />
        <div className="flex-1 h-[140%] bg-[#1a1b32] border-r border-white/5 shadow-[20px_0_40px_rgba(0,0,0,0.8)]" />
      </div>

      {/* 3. Soft Radial Glow behind the Gold Wave - Softened */}
      <motion.div
        style={{ opacity: glowOpacity }}
        className="absolute top-1/4 left-1/6 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-[#d4af37]/10 rounded-full blur-[160px]"
      />
      <motion.div
        style={{ opacity: glowOpacity }}
        className="absolute bottom-1/4 left-1/4 w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] bg-[#f4e5b0]/08 rounded-full blur-[140px]"
      />

      {/* 4. Flowing Curved Gold Line (S-Curve Ribbon) that draws & illuminates on scroll */}
      <svg
        className="absolute left-0 top-0 h-full w-full max-w-[600px] md:max-w-[750px] opacity-75"
        viewBox="0 0 500 1200"
        fill="none"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="goldRibbonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f4e5b0" />
            <stop offset="35%" stopColor="#d4af37" />
            <stop offset="70%" stopColor="#c9a25f" />
            <stop offset="100%" stopColor="#f4e5b0" />
          </linearGradient>

          <filter id="goldGlow" x="-50%" y="-20%" width="200%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur1" />
            <feGaussianBlur stdDeviation="9" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Muted Track Guide Line */}
        <path
          d="M 180 0 C 380 250, 40 450, 260 700 C 440 920, 100 1080, 300 1200"
          stroke="#d4af37"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.1"
        />

        {/* Outer Bloom Glow Path - Softened */}
        <motion.path
          d="M 180 0 C 380 250, 40 450, 260 700 C 440 920, 100 1080, 300 1200"
          stroke="url(#goldRibbonGradient)"
          strokeWidth="5"
          strokeLinecap="round"
          style={{ pathLength, opacity: glowOpacity }}
          filter="url(#goldGlow)"
        />

        {/* Primary Crisp Glowing Gold Path - Animated pathLength */}
        <motion.path
          d="M 180 0 C 380 250, 40 450, 260 700 C 440 920, 100 1080, 300 1200"
          stroke="url(#goldRibbonGradient)"
          strokeWidth="3.5"
          strokeLinecap="round"
          style={{ pathLength }}
          filter="url(#goldGlow)"
        />
      </svg>

      {/* Subtle Dark Fade Vignettes at top & bottom */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0a0a12] to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a0a12] to-transparent pointer-events-none" />
    </div>
  );
}
