import { useEffect, useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
  ease?: string;
  start?: string;
}

export default function ScrollReveal({
  children,
  delay = 0,
  y = 50,
  duration = 0.8,
  className,
  ease = 'power2.out',
  start = 'top 85%',
}: ScrollRevealProps) {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el || typeof window === 'undefined') return;

    // Respect user's OS prefers-reduced-motion setting
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease,
          scrollTrigger: {
            trigger: el,
            start,
            once: true,
          },
          onStart: () => {
            el.style.willChange = 'transform, opacity';
          },
          onComplete: () => {
            el.style.willChange = 'auto';
          },
        }
      );
    });

    return () => ctx.revert();
  }, [delay, y, duration, ease, start]);

  return (
    <div ref={elRef} className={className}>
      {children}
    </div>
  );
}
