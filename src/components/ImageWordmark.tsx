import { useEffect, useRef, useState } from 'react';

const LETTERS = ['E','X','P','O','S','I','T','I','O','N'];
// Vertical offset per letter (px) - creates the staggered stair-step look
const OFFSETS = [0, -18, 12, -24, 6, -12, 16, -6, 22, -10];

export default function ImageWordmark() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [wordWidth, setWordWidth] = useState(0);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [offsets, setOffsets] = useState<number[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;
    const total = containerRef.current.offsetWidth;
    setWordWidth(total);
    const lefts = letterRefs.current.map(el => el?.offsetLeft ?? 0);
    setOffsets(lefts);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        display: 'inline-flex',
        position: 'relative',
        fontFamily: 'Arial Black, Helvetica, sans-serif',
        fontWeight: 900,
        fontSize: 'clamp(38px, 5.5vw, 80px)',
        lineHeight: 1,
        letterSpacing: '-0.02em',
      }}
    >
      {LETTERS.map((letter, i) => (
        <span
          key={i}
          ref={(el) => (letterRefs.current[i] = el)}
          style={{
            display: 'inline-block',
            transform: `translateY(${OFFSETS[i]}px)`,
            backgroundImage: 'url(/magazines/issue-21-cover.jpg)',
            backgroundSize: `${wordWidth || 800}px 140px`,
            backgroundPosition: `-${offsets[i] || 0}px -20px`,
            backgroundRepeat: 'no-repeat',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            WebkitTextStroke: '1.5px #c9a25f',
            paddingBottom: '4px',
          }}
        >
          {letter}
        </span>
      ))}
    </div>
  );
}
