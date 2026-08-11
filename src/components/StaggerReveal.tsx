import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

const EASE = [0.22, 1, 0.36, 1] as const;

export function StaggerContainer({
  children,
  className,
  staggerChildren = 0.08,
}: {
  children: ReactNode;
  className?: string;
  staggerChildren?: number;
}) {
  const reducedMotion = useReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reducedMotion ? 0 : staggerChildren } },
  };

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerCard({ children, className }: { children: ReactNode; className?: string }) {
  const reducedMotion = useReducedMotion();

  const item = {
    hidden: reducedMotion ? { opacity: 1 } : { opacity: 0, y: 28, scale: 0.97 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: EASE } },
  };

  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}
