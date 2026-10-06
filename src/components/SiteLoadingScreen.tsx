import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Loader from '@/components/ui/loader-15';

interface SiteLoadingScreenProps {
  onComplete: () => void;
}

export default function SiteLoadingScreen({ onComplete }: SiteLoadingScreenProps) {
  // Phase 1: 'loading' -> loader spinning above logo
  // Phase 2: 'fading-loader' -> loader fades out
  // Phase 3: 'flying-logo' -> logo animates and resizes to hero logo
  // Phase 4: 'done' -> finished and removed
  const [phase, setPhase] = useState<'loading' | 'fading-loader' | 'flying-logo' | 'done'>('loading');
  const [logoTarget, setLogoTarget] = useState<{ x: number; y: number; scale: number } | null>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prevent background scrolling while loading screen is active
    document.body.style.overflow = 'hidden';

    const minLoadTime = 1800; // 1.8s minimum presentation time
    const startTime = Date.now();

    const triggerReady = () => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, minLoadTime - elapsed);

      setTimeout(() => {
        // Step 1: Fade out the loader
        setPhase('fading-loader');

        // Step 2: Measure hero logo and start flying logo transition
        setTimeout(() => {
          if (logoRef.current) {
            const currentRect = logoRef.current.getBoundingClientRect();
            const targetId = window.innerWidth < 640 ? 'hero-mobile-logo' : 'hero-desktop-logo';
            const targetEl = document.getElementById(targetId);

            if (targetEl) {
              const targetRect = targetEl.getBoundingClientRect();
              const scale = targetRect.height / currentRect.height;
              // Align center to center, then adjust for scale
              const currentCenterX = currentRect.left + currentRect.width / 2;
              const currentCenterY = currentRect.top + currentRect.height / 2;
              const targetCenterX = targetRect.left + targetRect.width / 2;
              const targetCenterY = targetRect.top + targetRect.height / 2;

              setLogoTarget({
                x: targetCenterX - currentCenterX,
                y: targetCenterY - currentCenterY,
                scale,
              });
            } else {
              setLogoTarget({ x: 0, y: -100, scale: 0.8 });
            }
          }
          setPhase('flying-logo');
        }, 350);
      }, remaining);
    };

    if (document.readyState === 'complete') {
      triggerReady();
    } else {
      window.addEventListener('load', triggerReady);
    }

    return () => {
      window.removeEventListener('load', triggerReady);
      document.body.style.overflow = '';
    };
  }, []);

  const handleFlightComplete = () => {
    setPhase('done');
    document.body.style.overflow = '';
    onComplete();
  };

  if (phase === 'done') {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        key="site-loader-screen"
        initial={{ opacity: 1 }}
        animate={{
          opacity: phase === 'flying-logo' ? [1, 1, 0] : 1,
        }}
        transition={{
          duration: 0.85,
          times: [0, 0.6, 1],
          ease: 'easeInOut',
        }}
        onAnimationComplete={() => {
          if (phase === 'flying-logo') {
            handleFlightComplete();
          }
        }}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0C0C0C] select-none pointer-events-auto overflow-hidden"
      >
        {/* Soft Ambient Gold Glow */}
        <motion.div
          animate={{
            opacity: phase === 'loading' ? [0.4, 0.7, 0.4] : 0,
            scale: phase === 'loading' ? [1, 1.08, 1] : 0.8,
          }}
          transition={{
            duration: 2.5,
            repeat: phase === 'loading' ? Infinity : 0,
            ease: 'easeInOut',
          }}
          className="absolute size-[380px] rounded-full bg-[#c9a25f]/15 blur-[100px] pointer-events-none"
        />

        {/* Central Content Stack */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          {/* 1. Loader element located ABOVE the Exposition logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{
              opacity: phase === 'loading' ? 1 : 0,
              scale: phase === 'loading' ? 1 : 0.75,
              y: phase === 'loading' ? 0 : -20,
            }}
            transition={{
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex items-center justify-center mb-6 sm:mb-8"
          >
            <Loader />
          </motion.div>

          {/* 2. Exposition Logo positioned directly below the loader */}
          <motion.div
            ref={logoRef}
            initial={{ opacity: 0, y: 15 }}
            animate={
              phase === 'flying-logo' && logoTarget
                ? {
                    x: logoTarget.x,
                    y: logoTarget.y,
                    scale: logoTarget.scale,
                    opacity: [1, 1, 0],
                  }
                : {
                    opacity: 1,
                    y: 0,
                    x: 0,
                    scale: 1,
                  }
            }
            transition={
              phase === 'flying-logo'
                ? {
                    duration: 0.85,
                    ease: [0.22, 1, 0.36, 1],
                    opacity: { duration: 0.85, times: [0, 0.85, 1] },
                  }
                : {
                    duration: 0.6,
                    delay: 0.15,
                    ease: 'easeOut',
                  }
            }
            className="flex items-center justify-center origin-center"
          >
            <img
              src="/resources/Expo_Issue_22_logo.svg"
              alt="Exposition Logo"
              className="h-14 sm:h-16 md:h-20 w-auto object-contain filter drop-shadow-[0_4px_25px_rgba(232,200,150,0.45)]"
              draggable={false}
            />
          </motion.div>


        </div>
      </motion.div>
    </AnimatePresence>
  );
}
