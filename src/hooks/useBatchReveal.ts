import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface BatchRevealOptions {
  /** CSS selector for items to batch animate within the container */
  selector: string;
  /** Y translation offset in px (default: 50) */
  y?: number;
  /** Duration in seconds (default: 0.8) */
  duration?: number;
  /** Stagger delay between batch items (default: 0.08) */
  stagger?: number;
  /** GSAP easing (default: 'power2.out') */
  ease?: string;
  /** Viewport trigger start point (default: 'top 85%') */
  start?: string;
}

export function useBatchReveal<T extends HTMLElement = HTMLDivElement>({
  selector,
  y = 50,
  duration = 0.8,
  stagger = 0.08,
  ease = 'power2.out',
  start = 'top 85%',
}: BatchRevealOptions) {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof window === 'undefined') return;

    // Respect user's OS prefers-reduced-motion setting
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      const items = container.querySelectorAll(selector);
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.batch(selector, {
        start,
        once: true,
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { opacity: 0, y },
            {
              opacity: 1,
              y: 0,
              duration,
              ease,
              stagger,
              overwrite: true,
              onStart: () => {
                gsap.set(batch, { willChange: 'transform, opacity' });
              },
              onComplete: () => {
                gsap.set(batch, { willChange: 'auto' });
              },
            }
          );
        },
      });
    }, container);

    return () => ctx.revert();
  }, [selector, y, duration, stagger, ease, start]);

  return containerRef;
}
