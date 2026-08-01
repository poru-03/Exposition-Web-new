import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from 'react';

type MagnetProps = {
  children: ReactNode;
  /** Distance in px outside the element bounds where the magnet activates. */
  padding?: number;
  /** Higher values dampen the pull. */
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
  wrapperClassName?: string;
  style?: CSSProperties;
  disabled?: boolean;
};

export default function Magnet({
  children,
  padding = 100,
  strength = 2,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.5s ease-in-out',
  className,
  wrapperClassName,
  style,
  disabled = false,
}: MagnetProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (disabled) {
      setIsActive(false);
      setOffset({ x: 0, y: 0 });
      return;
    }

    const handleMouseMove = (event: MouseEvent) => {
      const node = wrapperRef.current;
      if (!node) return;

      const { left, top, width, height } = node.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const distanceX = Math.abs(centerX - event.clientX);
      const distanceY = Math.abs(centerY - event.clientY);

      const withinReach =
        distanceX < width / 2 + padding && distanceY < height / 2 + padding;

      if (withinReach) {
        setIsActive(true);
        setOffset({
          x: (event.clientX - centerX) / strength,
          y: (event.clientY - centerY) / strength,
        });
      } else {
        setIsActive(false);
        setOffset({ x: 0, y: 0 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [padding, strength, disabled]);

  return (
    <div ref={wrapperRef} className={wrapperClassName} style={style}>
      <div
        className={className}
        style={{
          transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
          transition: isActive ? activeTransition : inactiveTransition,
          willChange: 'transform',
        }}
      >
        {children}
      </div>
    </div>
  );
}
