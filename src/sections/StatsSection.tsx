import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface StatItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
}

export const STATS_DATA: StatItem[] = [
  {
    id: 'legacy',
    value: 20,
    suffix: '+',
    label: 'Years of Legacy',
  },
  {
    id: 'segments',
    value: 5,
    suffix: '+',
    label: 'Tech Segments',
  },
  {
    id: 'partners',
    value: 100,
    suffix: '+',
    label: 'Corporate Partners',
  },
  {
    id: 'attendees',
    value: 500,
    suffix: '+',
    label: 'Event Attendees',
  },
  {
    id: 'community',
    value: 6000,
    suffix: '+',
    label: 'Digital Community',
  },
];

function AnimatedCounter({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!isInView) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setCount(end);
      return;
    }

    let startTime: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      // Smooth cubic ease-out
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easedProgress * end));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

export default function StatsSection() {
  return (
    <section
      id="stats"
      className="relative w-full bg-[#0C0C0C] py-12 sm:py-16 md:py-20 select-none overflow-hidden border-y border-white/[0.06]"
      aria-label="Exposition Key Milestones and Stats"
    >
      {/* Top Subtle Gold Accent Hairline */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#E8C896]/30 to-transparent pointer-events-none" />

      {/* Ambient Radial Golden Shimmer Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_75%_55%_at_50%_50%,rgba(184,137,79,0.06),transparent_75%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Top Title - In paragraph font, sized between paragraphs and main titles */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-12 md:mb-14">
          <div className="h-px w-8 sm:w-16 bg-gradient-to-r from-transparent to-[#E8C896]/50" />
          <h2
            className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-normal text-center drop-shadow-[0_2px_12px_rgba(201,162,95,0.2)]"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Impact & Legacy in Numbers
          </h2>
          <div className="h-px w-8 sm:w-16 bg-gradient-to-l from-transparent to-[#E8C896]/50" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 md:gap-5">
          {STATS_DATA.map((item, index) => {
            const isLastOnMobile = index === STATS_DATA.length - 1;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`group relative flex flex-col items-center justify-center p-6 sm:p-7 md:p-8 rounded-2xl bg-[#121212]/75 border border-white/[0.07] backdrop-blur-md transition-all duration-300 hover:border-[#E8C896]/35 hover:bg-[#161616]/90 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.6),0_0_24px_rgba(232,200,150,0.08)] ${isLastOnMobile
                    ? 'col-span-2 md:col-span-1 max-w-[280px] md:max-w-none mx-auto w-full'
                    : ''
                  }`}
              >
                {/* Subtle Top Card Glow on Hover */}
                <div className="absolute top-0 inset-x-6 h-[1.5px] bg-gradient-to-r from-transparent via-[#E8C896]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />

                {/* Stat Number */}
                <div className="flex items-baseline justify-center font-heading font-black tracking-tight my-1">
                  <span className="text-3xl sm:text-4xl md:text-[2.75rem] leading-none bg-gradient-to-b from-white via-[#F5E6CA] to-[#C9A25F] bg-clip-text text-transparent drop-shadow-[0_2px_14px_rgba(201,162,95,0.25)]">
                    <AnimatedCounter end={item.value} />
                  </span>
                  <span className="text-xl sm:text-2xl md:text-3xl font-light text-[#E8C896] ml-0.5 leading-none">
                    {item.suffix}
                  </span>
                </div>

                {/* Stat Box Label */}
                <p className="mt-2.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-zinc-300 group-hover:text-white transition-colors text-center leading-snug">
                  {item.label}
                </p>
                {/* Decorative Bottom Dot/Bar on Hover */}
                <div className="w-5 h-0.5 mt-3 rounded-full bg-transparent group-hover:bg-[#E8C896]/50 transition-colors duration-300" />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom Subtle Gold Accent Hairline */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#B8894F]/25 to-transparent pointer-events-none" />
    </section>
  );
}
