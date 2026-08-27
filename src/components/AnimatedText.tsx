import { type CSSProperties, useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';

type AnimatedTextProps = {
  text: string;
  className?: string;
  style?: CSSProperties;
};

/**
 * Reveals text one character at a time as the paragraph passes through the viewport.
 * Each character keeps an invisible copy in the flow so wrapping stays natural while
 * the animated copy is absolutely positioned on top of it. Characters are grouped per
 * word so lines only ever break at spaces.
 */
export default function AnimatedText({ text, className, style }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'start 0.35'],
  });

  const total = text.length;
  const words = text.split(' ');
  let charIndex = 0;

  return (
    <p ref={ref} className={className} style={style} aria-label={text}>
      {words.map((word, wordIndex) => {
        const start = charIndex;
        charIndex += word.length + 1;

        return (
          <span key={`${word}-${wordIndex}`} aria-hidden>
            <span className="inline-block whitespace-nowrap">
              {word.split('').map((character, index) => (
                <Character
                  key={index}
                  progress={scrollYProgress}
                  range={[(start + index) / total, (start + index + 1) / total]}
                >
                  {character}
                </Character>
              ))}
            </span>
            {wordIndex < words.length - 1 ? ' ' : null}
          </span>
        );
      })}
    </p>
  );
}

type CharacterProps = {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
};

function Character({ children, progress, range }: CharacterProps) {
  const opacity = useTransform(progress, range, [0.35, 1]);
  const color = useTransform(progress, range, ['#6B6B6B', '#FFFFFF']);

  return (
    <span className="relative inline-block">
      <span className="opacity-0">{children}</span>
      <motion.span className="absolute left-0 top-0" style={{ opacity, color }}>
        {children}
      </motion.span>
    </span>
  );
}
