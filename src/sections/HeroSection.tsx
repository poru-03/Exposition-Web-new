import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ContactButton from '../components/ContactButton';

type AnimationPhase =
  | 'EXPOSITION_IN'
  | 'EXPOSITION_HOLD'
  | 'EXPOSITION_OUT'
  | 'EDITION_IN'
  | 'EDITION_HOLD'
  | 'EDITION_OUT';

const WORD_1 = "EXPOSITION".split("");
const WORD_2 = "21ST EDITION".split("");

const LETTER_IN_DELAY = 100;
const LETTER_OUT_DELAY = 70;
const HOLD_DURATION = 1400;

export default function HeroSection() {
  const [phase, setPhase] = useState<AnimationPhase>('EXPOSITION_IN');
  const [word1Count, setWord1Count] = useState(0);
  const [word2Count, setWord2Count] = useState(0);
  const [contentRevealed, setContentRevealed] = useState(false);

  // Phase 1: EXPOSITION build-in (letter by letter + left-shift)
  useEffect(() => {
    if (phase === 'EXPOSITION_IN') {
      if (word1Count < WORD_1.length) {
        const t = setTimeout(() => {
          setWord1Count((prev) => prev + 1);
        }, word1Count === 0 ? 300 : LETTER_IN_DELAY);
        return () => clearTimeout(t);
      } else {
        setPhase('EXPOSITION_HOLD');
      }
    }
  }, [phase, word1Count]);

  // Phase 2: Hold EXPOSITION
  useEffect(() => {
    if (phase === 'EXPOSITION_HOLD') {
      const t = setTimeout(() => {
        setPhase('EXPOSITION_OUT');
      }, HOLD_DURATION);
      return () => clearTimeout(t);
    }
  }, [phase]);

  // Phase 3: EXPOSITION reverse-exit
  useEffect(() => {
    if (phase === 'EXPOSITION_OUT') {
      if (word1Count > 0) {
        const t = setTimeout(() => {
          setWord1Count((prev) => prev - 1);
        }, LETTER_OUT_DELAY);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => {
          setPhase('EDITION_IN');
        }, 200);
        return () => clearTimeout(t);
      }
    }
  }, [phase, word1Count]);

  // Phase 4: 21ST EDITION build-in
  useEffect(() => {
    if (phase === 'EDITION_IN') {
      if (word2Count < WORD_2.length) {
        const t = setTimeout(() => {
          setWord2Count((prev) => prev + 1);
        }, word2Count === 0 ? 200 : LETTER_IN_DELAY);
        return () => clearTimeout(t);
      } else {
        setContentRevealed(true);
        setPhase('EDITION_HOLD');
      }
    }
  }, [phase, word2Count]);

  // Phase 5: Hold 21ST EDITION
  useEffect(() => {
    if (phase === 'EDITION_HOLD') {
      const t = setTimeout(() => {
        setPhase('EDITION_OUT');
      }, HOLD_DURATION);
      return () => clearTimeout(t);
    }
  }, [phase]);

  // Phase 6: 21ST EDITION reverse-exit and loop back to EXPOSITION
  useEffect(() => {
    if (phase === 'EDITION_OUT') {
      if (word2Count > 0) {
        const t = setTimeout(() => {
          setWord2Count((prev) => prev - 1);
        }, LETTER_OUT_DELAY);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => {
          setWord1Count(0);
          setWord2Count(0);
          setPhase('EXPOSITION_IN');
        }, 300);
        return () => clearTimeout(t);
      }
    }
  }, [phase, word2Count]);

  const currentLetters =
    phase === 'EXPOSITION_IN' || phase === 'EXPOSITION_HOLD' || phase === 'EXPOSITION_OUT'
      ? WORD_1.slice(0, word1Count)
      : WORD_2.slice(0, word2Count);

  return (
    <section
      className="relative flex h-screen flex-col bg-[#0C0C0C] w-full"
      style={{ overflowX: 'clip' }}
    >
      {/* Top Navbar Spacer */}
      <div className="relative z-20 w-full px-[5%] pt-6 md:pt-8 h-12 md:h-16 pointer-events-none" />

      {/* Centered Hero Title Area */}
      <div className="relative z-20 w-full flex-1 flex flex-col items-center justify-center px-[5%]">
        {/* Centered Word Container with Automatic Left-Shift & Re-Centering Layout Animation */}
        <motion.div
          layout
          className="flex items-center justify-center overflow-hidden py-4 px-2"
          transition={{ layout: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
        >
          <AnimatePresence mode="popLayout">
            {currentLetters.map((letter, index) => (
              <motion.span
                key={`${phase.startsWith('EXPOSITION') ? 'exp' : 'edi'}-${index}`}
                layout
                initial={{ opacity: 0, scale: 0.35, y: 25, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.35, y: -20, filter: 'blur(8px)' }}
                transition={{
                  duration: 0.32,
                  ease: [0.22, 1, 0.36, 1],
                  layout: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
                }}
                className="inline-block text-[#E8C896] font-black uppercase tracking-wider select-none whitespace-pre"
                style={{
                  fontSize: 'clamp(2.5rem, 8vw, 110px)',
                  letterSpacing: '0.04em',
                  textShadow: '0 0 35px rgba(232, 200, 150, 0.35)',
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Bottom Hero Content: Subheading & CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={contentRevealed || phase.startsWith('EDITION') ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-20 mt-auto flex items-end justify-between px-[5%] pb-7 sm:pb-8 md:pb-10 pointer-events-auto"
      >
        <p
          className="max-w-[160px] font-light uppercase leading-snug tracking-wide text-[#9A9A9A] sm:max-w-[220px] md:max-w-[260px]"
          style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
        >
          the premier technology symposium & magazine by mit department, university of kelaniya
        </p>

        <ContactButton />
      </motion.div>
    </section>
  );
}



