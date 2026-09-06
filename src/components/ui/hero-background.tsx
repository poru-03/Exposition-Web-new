import { useEffect, useState } from 'react';

export function HeroBackground() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMotionChange);

    checkViewport();
    window.addEventListener('resize', checkViewport);

    return () => {
      window.removeEventListener('resize', checkViewport);
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  useEffect(() => {
    if (isMobile || reducedMotion) return;

    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      // Parallax range: opposite cursor shift (-10px to +10px)
      targetX = (0.5 - e.clientX / innerWidth) * 20;
      targetY = (0.5 - e.clientY / innerHeight) * 20;
    };

    const animateParallax = () => {
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;
      setMousePos({ x: currentX, y: currentY });
      animationFrameId = requestAnimationFrame(animateParallax);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animationFrameId = requestAnimationFrame(animateParallax);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile, reducedMotion]);

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none bg-[#0a0a0a]"
    >
      <style>{`
        @keyframes breathingDriftLeft {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes breathingDriftRight {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes rimLightPulse {
          0%, 100% { opacity: 0.7; transform: scale(1.01); }
          50% { opacity: 1; transform: scale(1.03); }
        }
        @keyframes orbGlowPulse {
          0%, 100% { opacity: 0.12; transform: scale(1); }
          50% { opacity: 0.18; transform: scale(1.08); }
        }
        @media (prefers-reduced-motion: reduce) {
          .portrait-drift, .rim-light-anim, .orb-glow-anim {
            animation: none !important;
          }
        }
      `}</style>

      {/* ================= LAYER 1: SOLID NEAR-BLACK BACKGROUND ================= */}
      <div className="absolute inset-0 bg-[#0a0a0a] z-0" />

      {/* ================= LAYER 2: SECONDARY BACKGROUND CUTOUTS (ISSUE 19 & 20) ================= */}
      {!isMobile && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          {/* Issue 19 cutout (Inward Left Background) */}
          <div
            className="portrait-drift absolute bottom-0 left-[16%] sm:left-[19%] md:left-[22%] lg:left-[24%] h-[60vh] sm:h-[64vh] max-h-[640px] pointer-events-none opacity-80"
            style={{
              transform: !reducedMotion
                ? `translate3d(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px, 0)`
                : undefined,
              animation: reducedMotion ? 'none' : 'breathingDriftRight 11s ease-in-out infinite 1s',
              filter: 'grayscale(100%) sepia(45%) saturate(160%) hue-rotate(-10deg) brightness(0.75) contrast(1.15) blur(0px)',
              WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 10%, black 90%, transparent 100%)',
              maskImage: 'linear-gradient(to top, transparent 0%, black 10%, black 90%, transparent 100%)',
            }}
          >
            <img
              src="/magazines/cutouts/person-19.png"
              alt=""
              className="h-full w-auto object-contain"
            />
          </div>

          {/* Issue 20 cutout (Inward Right Background) */}
          <div
            className="portrait-drift absolute bottom-0 right-[16%] sm:right-[19%] md:right-[22%] lg:right-[24%] h-[60vh] sm:h-[64vh] max-h-[640px] pointer-events-none opacity-80"
            style={{
              transform: !reducedMotion
                ? `translate3d(${mousePos.x * -0.4}px, ${mousePos.y * -0.4}px, 0)`
                : undefined,
              animation: reducedMotion ? 'none' : 'breathingDriftLeft 12s ease-in-out infinite 2s',
              filter: 'grayscale(100%) sepia(45%) saturate(160%) hue-rotate(-10deg) brightness(0.75) contrast(1.15) blur(0px)',
              WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 10%, black 90%, transparent 100%)',
              maskImage: 'linear-gradient(to top, transparent 0%, black 10%, black 90%, transparent 100%)',
            }}
          >
            <img
              src="/magazines/cutouts/person-20.png"
              alt=""
              className="h-full w-auto object-contain"
            />
          </div>
        </div>
      )}

      {/* ================= LAYER 3: AMBIENT GOLD GLOW BLOBS ================= */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {/* Left Spotlight Glow Blob */}
        <div
          className="orb-glow-anim absolute top-[15%] left-[5%] md:left-[8%] w-[550px] h-[550px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(201, 162, 95, 0.16) 0%, transparent 70%)',
            filter: 'blur(80px)',
            animation: reducedMotion ? 'none' : 'orbGlowPulse 8s ease-in-out infinite',
          }}
        />

        {/* Right Spotlight Glow Blob */}
        <div
          className="orb-glow-anim absolute top-[15%] right-[5%] md:right-[8%] w-[550px] h-[550px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(201, 162, 95, 0.16) 0%, transparent 70%)',
            filter: 'blur(80px)',
            animation: reducedMotion ? 'none' : 'orbGlowPulse 9s ease-in-out infinite 2s',
          }}
        />

        {/* Centered Ambient Warmth Halo behind Headline */}
        <div
          className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[850px] h-[500px] rounded-full opacity-70 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(201, 162, 95, 0.07) 0%, transparent 70%)',
            filter: 'blur(85px)',
          }}
        />
      </div>

      {/* ================= LAYER 4: LARGE FOREGROUND PORTRAITS (ISSUE 18 & 21) ================= */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        {/* Left Primary Hero Portrait: Issue 18 */}
        <div
          className="portrait-drift absolute bottom-0 left-[-2%] sm:left-[1%] md:left-[3%] lg:left-[5%] h-[58vh] sm:h-[68vh] md:h-[76vh] max-h-[750px] pointer-events-none"
          style={{
            transform: !isMobile && !reducedMotion
              ? `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`
              : undefined,
            animation: reducedMotion ? 'none' : 'breathingDriftLeft 9s ease-in-out infinite',
            willChange: 'transform',
          }}
        >
          {/* Gold Rim-Light Silhouette Glow Layer */}
          <div
            className="rim-light-anim absolute inset-0 pointer-events-none opacity-85"
            style={{
              animation: reducedMotion ? 'none' : 'rimLightPulse 6s ease-in-out infinite',
              filter: 'drop-shadow(-5px -5px 25px rgba(201, 162, 95, 0.85)) drop-shadow(5px 5px 30px rgba(232, 200, 150, 0.6))',
              WebkitMaskImage: 'linear-gradient(to right, black 65%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
              maskImage: 'linear-gradient(to right, black 65%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
            }}
          >
            <img
              src="/magazines/cutouts/person-18.png"
              alt=""
              className="h-full w-auto object-contain brightness-200 sepia-100"
            />
          </div>

          {/* Main Duotone Portrait */}
          <img
            src="/magazines/cutouts/person-18.png"
            alt="Exposition Issue 18 Cover Feature"
            className="h-full w-auto object-contain relative z-10 opacity-90"
            style={{
              filter: 'grayscale(100%) sepia(50%) saturate(190%) hue-rotate(-10deg) brightness(0.75) contrast(1.15)',
              WebkitMaskImage: 'linear-gradient(to right, black 60%, transparent 98%), linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
              maskImage: 'linear-gradient(to right, black 60%, transparent 98%), linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
            }}
          />
        </div>

        {/* Right Primary Hero Portrait: Issue 21 */}
        <div
          className="portrait-drift absolute bottom-0 right-[-2%] sm:right-[1%] md:right-[3%] lg:right-[5%] h-[58vh] sm:h-[68vh] md:h-[76vh] max-h-[750px] pointer-events-none"
          style={{
            transform: !isMobile && !reducedMotion
              ? `translate3d(${mousePos.x * -1}px, ${mousePos.y * -1}px, 0)`
              : undefined,
            animation: reducedMotion ? 'none' : 'breathingDriftRight 10s ease-in-out infinite 1.5s',
            willChange: 'transform',
          }}
        >
          {/* Gold Rim-Light Silhouette Glow Layer */}
          <div
            className="rim-light-anim absolute inset-0 pointer-events-none opacity-85"
            style={{
              animation: reducedMotion ? 'none' : 'rimLightPulse 6.5s ease-in-out infinite 1s',
              filter: 'drop-shadow(5px -5px 25px rgba(201, 162, 95, 0.85)) drop-shadow(-5px 5px 30px rgba(232, 200, 150, 0.6))',
              WebkitMaskImage: 'linear-gradient(to left, black 65%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
              maskImage: 'linear-gradient(to left, black 65%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
            }}
          >
            <img
              src="/magazines/cutouts/person-21.png"
              alt=""
              className="h-full w-auto object-contain brightness-200 sepia-100"
            />
          </div>

          {/* Main Duotone Portrait */}
          <img
            src="/magazines/cutouts/person-21.png"
            alt="Exposition Issue 21 Cover Feature"
            className="h-full w-auto object-contain relative z-10 opacity-90"
            style={{
              filter: 'grayscale(100%) sepia(50%) saturate(190%) hue-rotate(-10deg) brightness(0.75) contrast(1.15)',
              WebkitMaskImage: 'linear-gradient(to left, black 60%, transparent 98%), linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
              maskImage: 'linear-gradient(to left, black 60%, transparent 98%), linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
            }}
          />
        </div>
      </div>

      {/* ================= LAYER 5: FINE FILM GRAIN OVERLAY ================= */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04] z-40 pointer-events-none mix-blend-overlay">
        <filter id="hero-film-grain-cutouts">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#hero-film-grain-cutouts)" />
      </svg>

      {/* ================= LAYER 6: CENTER VIGNETTE (TEXT READABILITY) ================= */}
      <div
        className="absolute inset-0 z-50 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 650px 450px at center, rgba(10, 10, 10, 0.88) 0%, rgba(10, 10, 10, 0.40) 60%, rgba(10, 10, 10, 0.95) 100%)',
        }}
      />
      <div className="absolute inset-0 z-50 pointer-events-none bg-gradient-to-b from-[#0a0a0a]/50 via-transparent to-[#0a0a0a]" />
    </div>
  );
}

export default HeroBackground;
