"use client";

import React, { useRef, useEffect, useState, createElement, useMemo, memo } from "react";

export enum Tag {
  H1 = "h1",
  H2 = "h2",
  H3 = "h3",
  P = "p",
}

export type VaporizeTextCycleProps = {
  texts: string[];
  font?: {
    fontFamily?: string;
    fontSize?: string;
    fontWeight?: number;
  };
  color?: string;
  spread?: number;
  density?: number;
  animation?: {
    vaporizeDuration?: number;
    fadeInDuration?: number;
    waitDuration?: number;
  };
  direction?: "left-to-right" | "right-to-left";
  alignment?: "left" | "center" | "right";
  tag?: Tag;
  spotlightPositions?: number[];
  lightsOn?: boolean;
};

type Particle = {
  x: number;
  y: number;
  originalX: number;
  originalY: number;
  r: number;
  g: number;
  b: number;
  opacity: number;
  originalAlpha: number;
  size: number;
  velocityX: number;
  velocityY: number;
  angle: number;
  speed: number;
  shouldFadeQuickly?: boolean;
};

type TextBoundaries = {
  left: number;
  right: number;
  width: number;
};

declare global {
  interface HTMLCanvasElement {
    textBoundaries?: TextBoundaries;
  }
}

export default function VaporizeTextCycle({
  texts = ["EXPOSITION", "21st EDITION"],
  font = {
    fontFamily: "Inter, sans-serif",
    fontSize: "70px",
    fontWeight: 900,
  },
  color = "rgb(255, 255, 255)",
  spread = 5,
  density = 5,
  animation = {
    vaporizeDuration: 2,
    fadeInDuration: 1,
    waitDuration: 0.6,
  },
  direction = "left-to-right",
  alignment = "center",
  tag = Tag.H1,
  spotlightPositions,
  lightsOn = true,
}: VaporizeTextCycleProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const isInView = useIsInView(wrapperRef as React.RefObject<HTMLElement>);
  const lastFontRef = useRef<string | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [animationState, setAnimationState] = useState<"static" | "vaporizing" | "fadingIn" | "waiting">("static");
  const vaporizeProgressRef = useRef(0);
  const fadeOpacityRef = useRef(0);
  const [wrapperSize, setWrapperSize] = useState({ width: 0, height: 0 });
  const transformedDensity = transformValue(density, [0, 10], [0.3, 1], true);

  const wrapperStyle = useMemo(() => ({
    width: "100%",
    height: "100%",
    pointerEvents: "none" as const,
  }), []);

  const canvasStyle = useMemo(() => ({
    minWidth: "30px",
    minHeight: "20px",
    pointerEvents: "none" as const,
  }), []);

  const animationDurations = useMemo(() => ({
    VAPORIZE_DURATION: (animation.vaporizeDuration ?? 2) * 1000,
    FADE_IN_DURATION: (animation.fadeInDuration ?? 1) * 1000,
    WAIT_DURATION: (animation.waitDuration ?? 0.6) * 1000,
  }), [animation.vaporizeDuration, animation.fadeInDuration, animation.waitDuration]);

  const fontConfig = useMemo(() => {
    const fontSize = parseInt(font.fontSize?.replace("px", "") || "70");
    const VAPORIZE_SPREAD = calculateVaporizeSpread(fontSize) * spread;
    return {
      fontSize,
      VAPORIZE_SPREAD,
      font: `${font.fontWeight ?? 900} ${fontSize}px ${font.fontFamily ?? "sans-serif"}`,
    };
  }, [font.fontSize, font.fontWeight, font.fontFamily, spread]);

  // Start animation loop when in view
  useEffect(() => {
    if (isInView) {
      const timeout = setTimeout(() => {
        setAnimationState("vaporizing");
      }, 50);
      return () => clearTimeout(timeout);
    } else {
      setAnimationState("static");
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    }
  }, [isInView]);

  // Main animation loop
  useEffect(() => {
    if (!isInView) return;

    let lastTime = performance.now();
    let frameId: number;

    const animate = (currentTime: number) => {
      const deltaTime = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");

      if (!canvas || !ctx || !particlesRef.current.length) {
        frameId = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      switch (animationState) {
        case "static": {
          renderParticles(ctx, particlesRef.current);
          break;
        }

        case "vaporizing": {
          vaporizeProgressRef.current += (deltaTime * 100) / (animationDurations.VAPORIZE_DURATION / 1000);

          const textBoundaries = canvas.textBoundaries;
          if (!textBoundaries) break;

          const progress = Math.min(100, vaporizeProgressRef.current);
          const vaporizeX =
            direction === "left-to-right"
              ? textBoundaries.left + (textBoundaries.width * progress) / 100
              : textBoundaries.right - (textBoundaries.width * progress) / 100;

          const allVaporized = updateParticles(
            particlesRef.current,
            vaporizeX,
            deltaTime,
            fontConfig.VAPORIZE_SPREAD,
            animationDurations.VAPORIZE_DURATION,
            direction,
            transformedDensity
          );

          renderParticles(ctx, particlesRef.current);

          if (vaporizeProgressRef.current >= 100 && allVaporized) {
            setCurrentTextIndex((prev) => (prev + 1) % texts.length);
            setAnimationState("fadingIn");
            fadeOpacityRef.current = 0;
          }
          break;
        }

        case "fadingIn": {
          fadeOpacityRef.current += (deltaTime * 1000) / animationDurations.FADE_IN_DURATION;
          renderParticles(ctx, particlesRef.current, spotlightPositions, lightsOn);

          if (fadeOpacityRef.current >= 1) {
            setAnimationState("waiting");
            setTimeout(() => {
              setAnimationState("vaporizing");
              vaporizeProgressRef.current = 0;
              resetParticles(particlesRef.current);
            }, animationDurations.WAIT_DURATION);
          }
          break;
        }

        case "waiting": {
          renderParticles(ctx, particlesRef.current, spotlightPositions, lightsOn);
          break;
        }
      }

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [
    animationState,
    isInView,
    texts.length,
    direction,
    transformedDensity,
    fontConfig.VAPORIZE_SPREAD,
    animationDurations.FADE_IN_DURATION,
    animationDurations.WAIT_DURATION,
    animationDurations.VAPORIZE_DURATION,
    spotlightPositions,
    lightsOn,
  ]);

  useEffect(() => {
    renderCanvas({
      framerProps: {
        texts,
        font,
        color,
        alignment,
      },
      canvasRef: canvasRef as React.RefObject<HTMLCanvasElement>,
      wrapperSize,
      particlesRef,
      currentTextIndex,
    });

    const currentFont = font.fontFamily || "sans-serif";
    return handleFontChange({
      currentFont,
      lastFontRef,
      canvasRef: canvasRef as React.RefObject<HTMLCanvasElement>,
      wrapperSize,
      particlesRef,
      currentTextIndex,
      framerProps: {
        texts,
        font,
        color,
        alignment,
      },
    });
  }, [texts, font, color, alignment, wrapperSize, currentTextIndex]);

  useEffect(() => {
    const container = wrapperRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setWrapperSize({ width, height });
      }

      renderCanvas({
        framerProps: {
          texts,
          font,
          color,
          alignment,
        },
        canvasRef: canvasRef as React.RefObject<HTMLCanvasElement>,
        wrapperSize: { width: container.clientWidth, height: container.clientHeight },
        particlesRef,
        currentTextIndex,
      });
    });

    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, [wrapperRef.current, texts, font, color, alignment, currentTextIndex]);

  useEffect(() => {
    if (wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      setWrapperSize({
        width: rect.width,
        height: rect.height,
      });
    }
  }, []);

  return (
    <div ref={wrapperRef} style={wrapperStyle}>
      <canvas ref={canvasRef} style={canvasStyle} />
      <SeoElement tag={tag} texts={texts} />
    </div>
  );
}

// ------------------------------------------------------------ //
// SEO ELEMENT
// ------------------------------------------------------------ //
const SeoElement = memo(({ tag = Tag.H1, texts }: { tag: Tag; texts: string[] }) => {
  const style = useMemo(
    () => ({
      position: "absolute" as const,
      width: "0",
      height: "0",
      overflow: "hidden",
      userSelect: "none" as const,
      pointerEvents: "none" as const,
    }),
    []
  );

  const safeTag = Object.values(Tag).includes(tag) ? tag : "h1";
  return createElement(safeTag, { style }, texts?.join(" ") ?? "");
});

// ------------------------------------------------------------ //
// FONT HANDLING & CLEANUP
// ------------------------------------------------------------ //
const handleFontChange = ({
  currentFont,
  lastFontRef,
  canvasRef,
  wrapperSize,
  particlesRef,
  currentTextIndex,
  framerProps,
}: {
  currentFont: string;
  lastFontRef: React.MutableRefObject<string | null>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  wrapperSize: { width: number; height: number };
  particlesRef: React.MutableRefObject<Particle[]>;
  currentTextIndex: number;
  framerProps: VaporizeTextCycleProps;
}) => {
  if (currentFont !== lastFontRef.current) {
    lastFontRef.current = currentFont;

    const timeoutId = setTimeout(() => {
      cleanup({ canvasRef, particlesRef });
      renderCanvas({
        framerProps,
        canvasRef,
        wrapperSize,
        particlesRef,
        currentTextIndex,
      });
    }, 400);

    return () => {
      clearTimeout(timeoutId);
      cleanup({ canvasRef, particlesRef });
    };
  }

  return undefined;
};

const cleanup = ({
  canvasRef,
  particlesRef,
}: {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  particlesRef: React.MutableRefObject<Particle[]>;
}) => {
  const canvas = canvasRef.current;
  const ctx = canvas?.getContext("2d");
  if (canvas && ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  if (particlesRef.current) {
    particlesRef.current = [];
  }
};

// ------------------------------------------------------------ //
// RENDER CANVAS
// ------------------------------------------------------------ //
const renderCanvas = ({
  framerProps,
  canvasRef,
  wrapperSize,
  particlesRef,
  currentTextIndex,
}: {
  framerProps: VaporizeTextCycleProps;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  wrapperSize: { width: number; height: number };
  particlesRef: React.MutableRefObject<Particle[]>;
  currentTextIndex: number;
}) => {
  const canvas = canvasRef.current;
  if (!canvas || !wrapperSize.width || !wrapperSize.height) return;

  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return;

  const { width, height } = wrapperSize;

  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  canvas.width = Math.floor(width);
  canvas.height = Math.floor(height);

  const fontSize = parseInt(framerProps.font?.fontSize?.replace("px", "") || "70");
  const font = `${framerProps.font?.fontWeight ?? 900} ${fontSize}px ${framerProps.font?.fontFamily ?? "sans-serif"
    }`;
  const parsedColor = parseColorRGB(framerProps.color ?? "rgb(255, 255, 255)");

  let textX: number;
  const textY = canvas.height / 2;
  const currentText = framerProps.texts[currentTextIndex] || "EXPOSITION";

  if (framerProps.alignment === "center") {
    textX = canvas.width / 2;
  } else if (framerProps.alignment === "left") {
    textX = 0;
  } else {
    textX = canvas.width;
  }

  const { particles, textBoundaries } = createParticles(
    ctx,
    canvas,
    currentText,
    textX,
    textY,
    font,
    parsedColor,
    framerProps.alignment || "center",
    fontSize
  );

  particlesRef.current = particles;
  canvas.textBoundaries = textBoundaries;
};

// ------------------------------------------------------------ //
// PARTICLE GENERATOR (Solid Seamless Tile Fill + Fine Dust Spray)
// ------------------------------------------------------------ //
const createParticles = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  text: string,
  textX: number,
  textY: number,
  font: string,
  parsedColor: { r: number; g: number; b: number; a: number },
  alignment: "left" | "center" | "right",
  fontSize: number
) => {
  const particles: Particle[] = [];

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = `rgba(${parsedColor.r}, ${parsedColor.g}, ${parsedColor.b}, ${parsedColor.a})`;
  ctx.font = font;
  ctx.textAlign = alignment;
  ctx.textBaseline = "middle";

  const metrics = ctx.measureText(text);
  const textWidth = metrics.width;
  let textLeft: number;

  if (alignment === "center") {
    textLeft = textX - textWidth / 2;
  } else if (alignment === "left") {
    textLeft = textX;
  } else {
    textLeft = textX - textWidth;
  }

  const textBoundaries = {
    left: textLeft,
    right: textLeft + textWidth,
    width: textWidth,
  };

  ctx.fillText(text, textX, textY);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  // Seamless step: sampleRate equals particle size so solid text is 100% gapless pure white
  const sampleRate = Math.max(1, Math.min(2, Math.round(fontSize / 70)));
  const pSize = sampleRate;

  for (let y = 0; y < canvas.height; y += sampleRate) {
    for (let x = 0; x < canvas.width; x += sampleRate) {
      const index = (y * canvas.width + x) * 4;
      const alpha = data[index + 3];

      if (alpha > 20) {
        // High opacity solid pure white
        const originalAlpha = Math.min(1, (alpha / 230) * parsedColor.a);
        particles.push({
          x,
          y,
          originalX: x,
          originalY: y,
          r: parsedColor.r,
          g: parsedColor.g,
          b: parsedColor.b,
          opacity: originalAlpha,
          originalAlpha,
          size: pSize,
          velocityX: 0,
          velocityY: 0,
          angle: 0,
          speed: 0,
        });
      }
    }
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  return { particles, textBoundaries };
};

// ------------------------------------------------------------ //
// AUTHENTIC PARTICLE PHYSICS
// ------------------------------------------------------------ //
const updateParticles = (
  particles: Particle[],
  vaporizeX: number,
  deltaTime: number,
  MULTIPLIED_VAPORIZE_SPREAD: number,
  VAPORIZE_DURATION: number,
  direction: string,
  density: number
) => {
  let allParticlesVaporized = true;
  const len = particles.length;
  const baseFadeRate = 0.25;
  const durationBasedFadeRate = baseFadeRate * (2000 / VAPORIZE_DURATION);
  const maxVelocity = MULTIPLIED_VAPORIZE_SPREAD * 2;

  for (let i = 0; i < len; i++) {
    const particle = particles[i];
    const shouldVaporize =
      direction === "left-to-right"
        ? particle.originalX <= vaporizeX
        : particle.originalX >= vaporizeX;

    if (shouldVaporize) {
      if (particle.speed === 0) {
        particle.angle = Math.random() * Math.PI * 2;
        particle.speed = (Math.random() * 1 + 0.5) * MULTIPLIED_VAPORIZE_SPREAD;
        particle.velocityX = Math.cos(particle.angle) * particle.speed;
        particle.velocityY = Math.sin(particle.angle) * particle.speed;
        particle.shouldFadeQuickly = Math.random() > density;
      }

      if (particle.shouldFadeQuickly) {
        particle.opacity = Math.max(0, particle.opacity - deltaTime);
      } else {
        const dx = particle.originalX - particle.x;
        const dy = particle.originalY - particle.y;
        const distanceFromOrigin = Math.sqrt(dx * dx + dy * dy);
        const dampingFactor = Math.max(0.95, 1 - distanceFromOrigin / (100 * MULTIPLIED_VAPORIZE_SPREAD));

        const randomSpread = MULTIPLIED_VAPORIZE_SPREAD * 3;
        const spreadX = (Math.random() - 0.5) * randomSpread;
        const spreadY = (Math.random() - 0.5) * randomSpread;

        particle.velocityX = (particle.velocityX + spreadX + dx * 0.002) * dampingFactor;
        particle.velocityY = (particle.velocityY + spreadY + dy * 0.002) * dampingFactor;

        const currentVelocity = Math.sqrt(
          particle.velocityX * particle.velocityX + particle.velocityY * particle.velocityY
        );

        if (currentVelocity > maxVelocity) {
          const scale = maxVelocity / currentVelocity;
          particle.velocityX *= scale;
          particle.velocityY *= scale;
        }

        particle.x += particle.velocityX * deltaTime * 20;
        particle.y += particle.velocityY * deltaTime * 10;
        particle.opacity = Math.max(0, particle.opacity - deltaTime * durationBasedFadeRate);
      }

      if (particle.opacity > 0.01) {
        allParticlesVaporized = false;
      }
    } else {
      allParticlesVaporized = false;
    }
  }

  return allParticlesVaporized;
};

function getSpotlightGradientColor(
  p: Particle,
  canvasWidth: number,
  canvasHeight: number,
  spots: number[],
  lightsOn: boolean
) {
  const xRatio = p.x / (canvasWidth || 1000);
  const yRatio = p.y / (canvasHeight || 300);

  let maxBeam = 0;
  for (let s = 0; s < spots.length; s++) {
    const dist = Math.abs(xRatio - spots[s]);
    if (dist < 0.12) {
      const beam = Math.pow(1 - dist / 0.12, 1.5);
      if (beam > maxBeam) {
        maxBeam = beam;
      }
    }
  }

  const activeBeam = lightsOn ? maxBeam : maxBeam * 0.12;

  if (activeBeam <= 0.01) {
    return `rgba(50,50,55,${(p.opacity * 0.18).toFixed(2)})`;
  }

  // Gradient transition: Core White-Gold -> Champagne Gold -> Warm Bronze -> Dark Charcoal
  let r: number, g: number, b: number;
  if (activeBeam > 0.7) {
    const t = (activeBeam - 0.7) / 0.3;
    r = Math.round(232 + (255 - 232) * t);
    g = Math.round(200 + (245 - 200) * t);
    b = Math.round(150 + (220 - 150) * t);
  } else if (activeBeam > 0.3) {
    const t = (activeBeam - 0.3) / 0.4;
    r = Math.round(184 + (232 - 184) * t);
    g = Math.round(137 + (200 - 137) * t);
    b = Math.round(79 + (150 - 79) * t);
  } else {
    const t = activeBeam / 0.3;
    r = Math.round(50 + (184 - 50) * t);
    g = Math.round(50 + (137 - 50) * t);
    b = Math.round(55 + (79 - 55) * t);
  }

  // Vertical gradient tint
  const yShift = (0.5 - yRatio) * 15;
  r = Math.min(255, Math.max(0, Math.round(r + yShift)));
  g = Math.min(255, Math.max(0, Math.round(g + yShift)));
  b = Math.min(255, Math.max(0, Math.round(b + yShift)));

  const opacity = p.opacity * (0.18 + 0.82 * activeBeam);
  return `rgba(${r},${g},${b},${opacity.toFixed(2)})`;
}

// ------------------------------------------------------------ //
// RENDER PARTICLES (With Dynamic Spotlight Radial & Vertical Gradient)
// ------------------------------------------------------------ //
const renderParticles = (
  ctx: CanvasRenderingContext2D,
  particles: Particle[],
  spotlightPositions?: number[],
  lightsOn: boolean = true
) => {
  const len = particles.length;
  const canvasWidth = ctx.canvas.width || 1000;
  const canvasHeight = ctx.canvas.height || 300;
  const spots = spotlightPositions && spotlightPositions.length > 0 ? spotlightPositions : null;

  for (let i = 0; i < len; i++) {
    const p = particles[i];
    if (p.opacity > 0.01) {
      if (spots) {
        ctx.fillStyle = getSpotlightGradientColor(p, canvasWidth, canvasHeight, spots, lightsOn);
      } else {
        ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${p.opacity})`;
      }
      const drawSize = p.speed === 0 ? p.size : 1;
      ctx.fillRect(p.x, p.y, drawSize, drawSize);
    }
  }
};

const resetParticles = (particles: Particle[]) => {
  const len = particles.length;
  for (let i = 0; i < len; i++) {
    const p = particles[i];
    p.x = p.originalX;
    p.y = p.originalY;
    p.opacity = p.originalAlpha;
    p.speed = 0;
    p.velocityX = 0;
    p.velocityY = 0;
  }
};

const calculateVaporizeSpread = (fontSize: number) => {
  const size = typeof fontSize === "string" ? parseInt(fontSize) : fontSize;
  const points = [
    { size: 20, spread: 0.2 },
    { size: 50, spread: 0.5 },
    { size: 100, spread: 1.5 },
  ];

  if (size <= points[0].size) return points[0].spread;
  if (size >= points[points.length - 1].size) return points[points.length - 1].spread;

  let i = 0;
  while (i < points.length - 1 && points[i + 1].size < size) i++;
  const p1 = points[i];
  const p2 = points[i + 1];
  return p1.spread + ((size - p1.size) * (p2.spread - p1.spread)) / (p2.size - p1.size);
};

const parseColorRGB = (color: string) => {
  const rgbaMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (rgbaMatch) {
    return {
      r: parseInt(rgbaMatch[1]),
      g: parseInt(rgbaMatch[2]),
      b: parseInt(rgbaMatch[3]),
      a: rgbaMatch[4] ? parseFloat(rgbaMatch[4]) : 1,
    };
  }
  return { r: 255, g: 255, b: 255, a: 1 };
};

function transformValue(input: number, inputRange: number[], outputRange: number[], clamp = false): number {
  const [inputMin, inputMax] = inputRange;
  const [outputMin, outputMax] = outputRange;
  const progress = (input - inputMin) / (inputMax - inputMin);
  let result = outputMin + progress * (outputMax - outputMin);

  if (clamp) {
    if (outputMax > outputMin) {
      result = Math.min(Math.max(result, outputMin), outputMax);
    } else {
      result = Math.min(Math.max(result, outputMax), outputMin);
    }
  }
  return result;
}

function useIsInView(ref: React.RefObject<HTMLElement>) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.05, rootMargin: "50px" }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);

  return isInView;
}
