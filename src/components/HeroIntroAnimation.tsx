import { useEffect, useRef, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { FaLinkedinIn, FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa6';

interface HeroIntroAnimationProps {
  onComplete: () => void;
}

export default function HeroIntroAnimation({ onComplete }: HeroIntroAnimationProps) {
  const flipBookRef = useRef<any>(null);
  const [showSkip, setShowSkip] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [showLandingFlash, setShowLandingFlash] = useState(false);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const finishIntro = () => {
    timeoutsRef.current.forEach((t) => clearTimeout(t));
    try {
      sessionStorage.setItem('exposition_hero_intro_done', 'true');
    } catch (e) {
      // Ignore storage errors
    }
    setIsFadingOut(true);
    setTimeout(() => {
      onComplete();
    }, 450);
  };

  useEffect(() => {
    // Show skip button after 500ms
    const timerSkip = setTimeout(() => setShowSkip(true), 500);
    timeoutsRef.current.push(timerSkip);

    // ================= DELIBERATE FLIP TIMING WITH DECELERATION CURVE =================
    // 0.0s: Closed book with Issue 21 Front Cover
    
    // Flip 1 (350ms duration flip): starts at t = 0.40s
    const t1 = setTimeout(() => {
      if (flipBookRef.current?.pageFlip()) {
        try {
          flipBookRef.current.pageFlip().flipNext();
        } catch (e) {}
      }
    }, 400);
    timeoutsRef.current.push(t1);

    // Flip 2 (350ms duration flip): starts at t = 0.85s
    const t2 = setTimeout(() => {
      if (flipBookRef.current?.pageFlip()) {
        try {
          flipBookRef.current.pageFlip().flipNext();
        } catch (e) {}
      }
    }, 850);
    timeoutsRef.current.push(t2);

    // Flip 3 (500ms duration decelerating flip): starts at t = 1.35s
    const t3 = setTimeout(() => {
      if (flipBookRef.current?.pageFlip()) {
        try {
          flipBookRef.current.pageFlip().flipNext();
        } catch (e) {}
      }
    }, 1350);
    timeoutsRef.current.push(t3);

    // Flip 4 (500ms duration decelerating flip): starts at t = 1.95s
    const t4 = setTimeout(() => {
      if (flipBookRef.current?.pageFlip()) {
        try {
          flipBookRef.current.pageFlip().flipNext();
        } catch (e) {}
      }
    }, 1950);
    timeoutsRef.current.push(t4);

    // Final Flip into Landing Spread (700ms pronounced ease-out settling flip): starts at t = 2.55s
    const tFinal = setTimeout(() => {
      if (flipBookRef.current?.pageFlip()) {
        try {
          flipBookRef.current.pageFlip().flipNext();
        } catch (e) {}
      }
    }, 2550);
    timeoutsRef.current.push(tFinal);

    // 4. Soft Gold Flash Pulse upon landing on final spread (t = 2.85s)
    const tFlash = setTimeout(() => {
      setShowLandingFlash(true);
      setTimeout(() => setShowLandingFlash(false), 200);
    }, 2850);
    timeoutsRef.current.push(tFlash);

    // Start 450ms cross-fade to static hero state (t = 3.10s)
    const tFade = setTimeout(() => {
      setIsFadingOut(true);
    }, 3100);
    timeoutsRef.current.push(tFade);

    // Complete transition (t = 3.55s total)
    const tEnd = setTimeout(() => {
      finishIntro();
    }, 3550);
    timeoutsRef.current.push(tEnd);

    return () => {
      timeoutsRef.current.forEach((t) => clearTimeout(t));
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0908] transition-opacity duration-450 ease-out overflow-hidden select-none ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        backgroundImage:
          'radial-gradient(ellipse 1200px 800px at 50% 50%, rgba(201, 162, 95, 0.05) 0%, transparent 75%), linear-gradient(to bottom, #0a0908 0%, #0c0b0a 100%)',
      }}
    >
      {/* Ambient background gold glow pool */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(201, 162, 95, 0.18) 0%, transparent 70%)',
          filter: 'blur(90px)',
        }}
      />

      {/* 4. Soft Gold Flash Pulse across Landing Spread */}
      <div
        className={`absolute inset-0 pointer-events-none z-40 transition-opacity duration-200 ${
          showLandingFlash ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'radial-gradient(ellipse 800px 500px at 50% 50%, rgba(201, 162, 95, 0.40) 0%, transparent 75%)',
        }}
      />

      {/* Main FlipBook Workspace Container */}
      <div className="relative flex items-center justify-center p-4">
        {/* Central Spine Shadow Gutter Overlay */}
        <div className="absolute left-1/2 top-0 bottom-0 w-8 -translate-x-1/2 bg-gradient-to-r from-transparent via-black/70 to-transparent pointer-events-none z-30" />

        {/* Outer Shadow Wrapper for Real Physical Depth */}
        <div
          className="relative rounded-xl transition-all duration-300"
          style={{
            boxShadow: `
              0 2px 4px rgba(0, 0, 0, 0.5),
              0 16px 32px rgba(0, 0, 0, 0.6),
              0 40px 80px rgba(0, 0, 0, 0.8),
              0 0 60px rgba(201, 162, 95, 0.25)
            `,
          }}
        >
          {/* @ts-ignore */}
          <HTMLFlipBook
            ref={flipBookRef}
            width={320}
            height={440}
            size="fixed"
            minWidth={280}
            maxWidth={350}
            minHeight={380}
            maxHeight={480}
            maxShadowOpacity={0.75}
            drawShadow={true}
            showCover={true}
            usePortrait={false}
            startPage={0}
            flippingTime={450}
            useMouseEvents={false}
            className="rounded-lg overflow-hidden border border-[#c9a25f]/40"
          >
            {/* ================= PAGE 1: FRONT COVER (Issue 21) ================= */}
            <div className="relative w-full h-full bg-[#0c0b0a] overflow-hidden border-r border-[#c9a25f]/30">
              <img
                src="/magazines/issue-21-cover.jpg"
                alt="Issue 21 Front Cover"
                className="w-full h-full object-cover filter brightness-100 contrast-105 saturate-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0908]/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-4 left-4 inline-flex items-center px-3.5 py-1 rounded-full bg-[#0a0908]/95 border border-[#c9a25f] text-[11px] font-mono font-bold tracking-[0.12em] text-[#c9a25f] shadow-lg">
                21ST EDITION
              </div>
            </div>

            {/* ================= PAGE 2: REAL MAGAZINE INTERIOR PAGE (Page 2) ================= */}
            <div className="relative w-full h-full bg-[#121110] overflow-hidden border-l border-[#c9a25f]/20">
              <img
                src="/magazines/pages/issue-21-page-2.jpg"
                alt="Magazine Interior Page 2"
                className="w-full h-full object-cover filter brightness-95 contrast-105 saturate-90 sepia-[0.10]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/20 pointer-events-none" />
            </div>

            {/* ================= PAGE 3: REAL MAGAZINE INTERIOR PAGE (Page 3) ================= */}
            <div className="relative w-full h-full bg-[#121110] overflow-hidden border-r border-[#c9a25f]/20">
              <img
                src="/magazines/pages/issue-21-page-3.jpg"
                alt="Magazine Interior Page 3"
                className="w-full h-full object-cover filter brightness-95 contrast-105 saturate-90 sepia-[0.10]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/30 pointer-events-none" />
            </div>

            {/* ================= PAGE 4: REAL MAGAZINE INTERIOR PAGE (Page 7) ================= */}
            <div className="relative w-full h-full bg-[#121110] overflow-hidden border-l border-[#c9a25f]/20">
              <img
                src="/magazines/pages/issue-21-page-7.jpg"
                alt="Magazine Interior Page 7"
                className="w-full h-full object-cover filter brightness-95 contrast-105 saturate-90 sepia-[0.10]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/20 pointer-events-none" />
            </div>

            {/* ================= PAGE 5: REAL MAGAZINE INTERIOR PAGE (Page 12) ================= */}
            <div className="relative w-full h-full bg-[#121110] overflow-hidden border-r border-[#c9a25f]/20">
              <img
                src="/magazines/pages/issue-21-page-12.jpg"
                alt="Magazine Interior Page 12"
                className="w-full h-full object-cover filter brightness-95 contrast-105 saturate-90 sepia-[0.10]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/30 pointer-events-none" />
            </div>

            {/* ================= PAGE 6: REAL MAGAZINE INTERIOR PAGE (Page 14) ================= */}
            <div className="relative w-full h-full bg-[#121110] overflow-hidden border-l border-[#c9a25f]/20">
              <img
                src="/magazines/pages/issue-21-page-14.jpg"
                alt="Magazine Interior Page 14"
                className="w-full h-full object-cover filter brightness-95 contrast-105 saturate-90 sepia-[0.10]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/20 pointer-events-none" />
            </div>

            {/* ================= PAGE 7: REAL MAGAZINE INTERIOR PAGE (Page 25) ================= */}
            <div className="relative w-full h-full bg-[#121110] overflow-hidden border-r border-[#c9a25f]/20">
              <img
                src="/magazines/pages/issue-21-page-25.jpg"
                alt="Magazine Interior Page 25"
                className="w-full h-full object-cover filter brightness-95 contrast-105 saturate-90 sepia-[0.10]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/30 pointer-events-none" />
            </div>

            {/* ================= PAGE 8: REAL MAGAZINE INTERIOR PAGE (Page 30) ================= */}
            <div className="relative w-full h-full bg-[#121110] overflow-hidden border-l border-[#c9a25f]/20">
              <img
                src="/magazines/pages/issue-21-page-30.jpg"
                alt="Magazine Interior Page 30"
                className="w-full h-full object-cover filter brightness-95 contrast-105 saturate-90 sepia-[0.10]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/20 pointer-events-none" />
            </div>

            {/* ================= PAGE 9: REAL MAGAZINE INTERIOR PAGE (Page 42) ================= */}
            <div className="relative w-full h-full bg-[#121110] overflow-hidden border-r border-[#c9a25f]/20">
              <img
                src="/magazines/pages/issue-21-page-42.jpg"
                alt="Magazine Interior Page 42"
                className="w-full h-full object-cover filter brightness-95 contrast-105 saturate-90 sepia-[0.10]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/30 pointer-events-none" />
            </div>

            {/* ================= PAGE 10: LANDING SPREAD (LEFT PAGE) ================= */}
            <div className="relative w-full h-full bg-[#0a0908] p-6 flex flex-col items-end justify-between border-r border-[#c9a25f]/25 overflow-hidden">
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle at 100% 50%, rgba(201, 162, 95, 0.18) 0%, transparent 70%)',
                }}
              />

              {/* Eyebrow Badge (Left Portion) */}
              <div className="relative z-10 self-start inline-flex items-center px-3.5 py-1 rounded-full bg-[#c9a25f]/15 border border-[#c9a25f]/40 text-[11px] font-mono font-bold tracking-[0.15em] text-[#c9a25f]">
                21ST EDITION
              </div>

              {/* Center Gutter Left Wordmark Half */}
              <div className="relative z-10 text-right pr-1 my-auto">
                <h2
                  style={{
                    fontFamily: 'Playfair Display, Times New Roman, Georgia, serif',
                    fontSize: '54px',
                    lineHeight: 0.95,
                    fontWeight: 900,
                    color: '#c9a25f',
                  }}
                  className="tracking-tight drop-shadow-[0_12px_24px_rgba(0,0,0,0.95)]"
                >
                  Expo
                </h2>
              </div>

              {/* Bottom Social Icons (Left Half) */}
              <div className="relative z-10 flex items-center gap-3.5 self-end pr-2">
                <div className="w-8.5 h-8.5 rounded-full bg-[#121212] border border-[#c9a25f]/45 flex items-center justify-center text-[#c9a25f] shadow-md">
                  <FaLinkedinIn className="size-3.5" />
                </div>
                <div className="w-8.5 h-8.5 rounded-full bg-[#121212] border border-[#c9a25f]/45 flex items-center justify-center text-[#c9a25f] shadow-md">
                  <FaFacebookF className="size-3.5" />
                </div>
              </div>
            </div>

            {/* ================= PAGE 11: LANDING SPREAD (RIGHT PAGE) ================= */}
            <div className="relative w-full h-full bg-[#0a0908] p-6 flex flex-col items-start justify-between border-l border-[#c9a25f]/25 overflow-hidden">
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle at 0% 50%, rgba(201, 162, 95, 0.18) 0%, transparent 70%)',
                }}
              />

              {/* Subtitle Badge (Right Portion) */}
              <div className="relative z-10 self-end inline-flex items-center px-3.5 py-1 rounded-full bg-[#c9a25f]/15 border border-[#c9a25f]/40 text-[11px] font-mono font-bold tracking-[0.15em] text-[#c9a25f]">
                2024
              </div>

              {/* Center Gutter Right Wordmark Half */}
              <div className="relative z-10 text-left pl-1 my-auto">
                <h2
                  style={{
                    fontFamily: 'Playfair Display, Times New Roman, Georgia, serif',
                    fontSize: '54px',
                    lineHeight: 0.95,
                    fontWeight: 900,
                    color: '#c9a25f',
                  }}
                  className="tracking-tight drop-shadow-[0_12px_24px_rgba(0,0,0,0.95)]"
                >
                  sition
                </h2>
              </div>

              {/* Bottom Social Icons (Right Half) */}
              <div className="relative z-10 flex items-center gap-3.5 self-start pl-2">
                <div className="w-8.5 h-8.5 rounded-full bg-[#121212] border border-[#c9a25f]/45 flex items-center justify-center text-[#c9a25f] shadow-md">
                  <FaInstagram className="size-3.5" />
                </div>
                <div className="w-8.5 h-8.5 rounded-full bg-[#121212] border border-[#c9a25f]/45 flex items-center justify-center text-[#c9a25f] shadow-md">
                  <FaYoutube className="size-3.5" />
                </div>
              </div>
            </div>
          </HTMLFlipBook>
        </div>
      </div>

      {/* Skip Intro Button */}
      {showSkip && (
        <button
          type="button"
          onClick={finishIntro}
          className="absolute bottom-6 right-6 z-60 text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#c9a25f]/75 hover:text-[#c9a25f] bg-[#0a0908]/90 border border-[#c9a25f]/40 px-4 py-2 rounded-full backdrop-blur-md transition-all hover:border-[#c9a25f] hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
        >
          Skip intro →
        </button>
      )}
    </div>
  );
}
