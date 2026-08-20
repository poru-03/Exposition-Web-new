"use client";
import React, { useMemo, useState, useEffect, useRef, useCallback, createContext, useContext } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { SpotLight } from "@react-three/drei";
import { cn } from "@/lib/utils";

const METAL_NOISE = 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%221.5%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E")';
const GRAIN_NOISE = 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22g%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23g)%22/%3E%3C/svg%3E")';

export interface VolumetricLightingState {
  lightsOn: boolean;
  isFlickering: boolean;
  intensity: number;
  lightColor: string;
  spots: number[];
}

export const VolumetricStudioContext = createContext<VolumetricLightingState>({
  lightsOn: true,
  isFlickering: false,
  intensity: 1,
  lightColor: "232,200,150",
  spots: [35, 50, 65],
});

export const useVolumetricStudio = () => useContext(VolumetricStudioContext);

type RoomProps = {
  backWall?: { tl: [number, number]; tr: [number, number]; br: [number, number]; bl: [number, number] };
  lightsOn?: boolean;
  intensity?: number;
  lightColor?: string;
  spots?: number[];
  vignette?: number;
  isFlickering?: boolean;
  className?: string;
};

function Room({
  backWall = {
    tl: [22, 10],
    tr: [78, 10],
    br: [78, 70],
    bl: [22, 70],
  },
  lightsOn = true,
  intensity = 1,
  lightColor = "232,200,150",
  spots = [35, 50, 65],
  vignette = 0.55,
  isFlickering = false,
  className = "",
}: RoomProps) {
  const { tl, tr, br, bl } = backWall;
  const poly = useMemo(
    () => (pts: readonly (readonly [number, number])[]) =>
      `polygon(${pts.map(([x, y]) => `${x}% ${y}%`).join(", ")})`,
    []
  );

  // Unified shared easing and duration constants to eliminate hard jump cuts
  const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
  const transitionDuration = isFlickering ? "130ms" : "750ms";

  return (
    <div
      aria-hidden
      className={`absolute inset-0 overflow-hidden bg-black pointer-events-none ${className}`}
    >
      <div
        className="absolute inset-0"
        style={{
          clipPath: poly([tl, tr, br, bl]),
          background:
            "linear-gradient(to bottom, rgba(20,20,22,1) 0%, rgba(8,8,10,1) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          clipPath: poly([[0, 0], [100, 0], tr, tl]),
          background:
            "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          clipPath: poly([[0, 0], tl, bl, [0, 100]]),
          background:
            "linear-gradient(to right, rgba(8,8,10,1) 0%, rgba(18,18,20,1) 70%, rgba(26,26,28,1) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          clipPath: poly([[100, 0], tr, br, [100, 100]]),
          background:
            "linear-gradient(to left, rgba(8,8,10,1) 0%, rgba(18,18,20,1) 70%, rgba(26,26,28,1) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          clipPath: poly([[0, 100], [100, 100], br, bl]),
          background:
            "linear-gradient(to top, rgba(15,15,17,1) 0%, rgba(6,6,8,1) 100%)",
        }}
      />
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 10 }}>
        <defs>
          <linearGradient id="baseGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="20%" stopColor="white" stopOpacity="0.5" />
            <stop offset="80%" stopColor="white" stopOpacity="0.5" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="vGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="50%" stopColor="white" stopOpacity="0.18" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1={`${bl[0]}%`} y1={`${bl[1]}%`} x2={`${br[0]}%`} y2={`${br[1]}%`}
          stroke="rgba(255,255,255,0.2)" strokeWidth="5" style={{ filter: "blur(3px)" }} />
        <line x1={`${bl[0]}%`} y1={`${bl[1]}%`} x2={`${br[0]}%`} y2={`${br[1]}%`}
          stroke="url(#baseGrad)" strokeWidth="1" />
        <line x1={`${tl[0]}%`} y1={`${tl[1]}%`} x2={`${bl[0]}%`} y2={`${bl[1]}%`}
          stroke="url(#vGrad)" strokeWidth="1" />
        <line x1={`${tr[0]}%`} y1={`${tr[1]}%`} x2={`${br[0]}%`} y2={`${br[1]}%`}
          stroke="url(#vGrad)" strokeWidth="1" />
      </svg>

      {/* Ambient Wall Light Washes with Eased Physics Transitions */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 15,
          opacity: lightsOn ? intensity : 0,
          transition: `opacity ${transitionDuration} ${EASE}`,
          mixBlendMode: "screen",
          willChange: "opacity",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            clipPath: poly([tl, tr, br, bl]),
            background: spots.map(x => `radial-gradient(ellipse 25% 40% at ${x}% 68%, rgba(${lightColor},0.15) 0%, transparent 70%)`).join(", ")
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            clipPath: poly([[0, 0], tl, bl, [0, 100]]),
            background: `radial-gradient(ellipse 40% 50% at 15% 75%, rgba(${lightColor},0.08) 0%, transparent 60%)`
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            clipPath: poly([[100, 0], tr, br, [100, 100]]),
            background: `radial-gradient(ellipse 40% 50% at 85% 75%, rgba(${lightColor},0.08) 0%, transparent 60%)`
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            clipPath: poly([[0, 100], [100, 100], br, bl]),
            background: spots.map(x => `radial-gradient(ellipse 35% 30% at ${x}% 80%, rgba(${lightColor},0.06) 0%, transparent 60%)`).join(", ")
          }}
        />
      </div>

      {/* 3D Volumetric Spotlight Cones with Eased Framer Transitions */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 16, mixBlendMode: "screen" }}
      >
        {spots.map((pos, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: lightsOn ? intensity : 0 }}
            transition={{
              duration: isFlickering ? 0.13 : 0.75,
              ease: [0.16, 1, 0.3, 1],
              delay: isFlickering ? 0 : i * 0.05,
            }}
            className="absolute flex w-200 h-[80vh] -translate-x-1/2 justify-center pointer-events-none"
            style={{
              left: `${pos}%`,
              top: "calc(3% + 80px)",
              mixBlendMode: "screen",
              willChange: "opacity"
            }}
          >
            <Canvas camera={{ position: [0, 0, 10], fov: 45 }} shadows={false} gl={{ alpha: true }}>
              <ambientLight intensity={0.5} />
              <SpotLight
                distance={12}
                angle={0.25}
                attenuation={6}
                anglePower={5}
                color={`rgb(${lightColor})`}
                position={[0, 4.1, 0]}
                volumetric
                opacity={1}
                radiusTop={0.1}
                radiusBottom={4}
              />
            </Canvas>
          </motion.div>
        ))}
      </div>

      {/* Fixtures & Bulb Glows with Eased Transitions */}
      <div
        className="absolute pointer-events-none"
        style={{
          zIndex: 31
        }}
      >
        {[35, 50, 65].map((pos, i) => (
          <div key={i} className="absolute flex flex-col items-center" style={{ left: `${pos}%`, top: '3%', transform: 'translate(-50%, -4px)' }}>
            <div className="w-[14px] h-[34px] rounded-sm border border-zinc-900 shadow-[0_5px_10px_rgba(0,0,0,0.9),inset_0_0_4px_rgba(255,255,255,0.5)] relative overflow-hidden"
              style={{ background: 'linear-gradient(to right, #666 0%, #ffffff 40%, #999 60%, #333 100%)' }}>
              <div className="absolute top-[4px] left-1/2 -translate-x-1/2 w-[6px] h-[6px] bg-zinc-900 rounded-full shadow-[inset_0_1px_1px_rgba(0,0,0,1)]" />
              <div className="absolute bottom-[4px] left-1/2 -translate-x-1/2 w-[6px] h-[6px] bg-zinc-900 rounded-full shadow-[inset_0_1px_1px_rgba(0,0,0,1)]" />
            </div>
            <div className="w-[8px] h-[18px] bg-gradient-to-r from-zinc-900 via-zinc-600 to-zinc-950 border-x border-black relative">
              <div className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-[18px] h-[18px] rounded-full border border-zinc-900 shadow-[0_4px_8px_rgba(0,0,0,1),inset_0_1px_2px_rgba(255,255,255,0.3)]"
                style={{ background: 'radial-gradient(circle at top left, #777, #111)' }} />
            </div>
            <div className="relative mt-[6px] w-[54px] h-[64px] flex justify-center perspective-near">
              <div className="absolute inset-0 rounded-b-2xl rounded-t-sm border border-black shadow-[0_20px_30px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col justify-evenly"
                style={{ background: 'linear-gradient(to right, #111 0%, #3a3a3a 30%, #555 50%, #2a2a2a 80%, #000 100%)' }}>
                <div className="absolute inset-0 opacity-[0.35] mix-blend-overlay pointer-events-none" style={{ backgroundImage: METAL_NOISE }} />
                <div className="w-full h-[2px] bg-black/90 shadow-[0_1px_0_rgba(255,255,255,0.15)] z-10" />
                <div className="w-full h-[2px] bg-black/90 shadow-[0_1px_0_rgba(255,255,255,0.15)] z-10" />
                <div className="w-full h-[2px] bg-black/90 shadow-[0_1px_0_rgba(255,255,255,0.15)] z-10" />
                <div className="w-full h-[2px] bg-black/90 shadow-[0_1px_0_rgba(255,255,255,0.15)] z-10" />
              </div>
              <div className="absolute bottom-[-6px] w-[58px] h-[18px] rounded-[50%] border-2 border-zinc-900 shadow-[0_10px_15px_rgba(0,0,0,1)] flex items-center justify-center z-10 overflow-hidden"
                style={{ background: 'radial-gradient(ellipse at center, #222, #000)' }}>
                <div className="w-[34px] h-[10px] rounded-[50%]"
                  style={{
                    background: lightsOn ? '#ffffff' : '#111',
                    boxShadow: lightsOn
                      ? `0 0 20px 8px rgba(255,255,255,0.9), inset 0 0 8px #fff`
                      : `inset 0 2px 5px rgba(0,0,0,0.9), inset 0 -1px 1px rgba(255,255,255,0.05)`,
                    transition: `background ${transitionDuration} ${EASE}, box-shadow ${transitionDuration} ${EASE}`,
                  }}
                />
              </div>
              <div className="absolute bottom-[-18px] w-[46px] h-[20px] border border-black shadow-[0_15px_15px_rgba(0,0,0,0.8)] origin-top z-20 flex justify-center"
                style={{ transform: 'rotateX(-45deg)', background: 'linear-gradient(to bottom, #222, #050505)' }}>
                <div className="w-[80%] h-full bg-white/3" />
              </div>
              <div className="absolute bottom-[6px] w-[46px] h-[20px] border border-black origin-bottom z-0"
                style={{ transform: 'rotateX(45deg)', background: 'linear-gradient(to top, #111, #000)' }} />
              <div className="absolute bottom-[-6px] left-[-6px] w-[14px] h-[22px] bg-zinc-900 border border-black origin-right z-10 shadow-[5px_0_10px_rgba(0,0,0,0.5)]"
                style={{ transform: 'rotateY(-55deg) skewY(15deg)' }} />
              <div className="absolute bottom-[-6px] right-[-6px] w-[14px] h-[22px] bg-zinc-900 border border-black origin-left z-10 shadow-[-5px_0_10px_rgba(0,0,0,0.5)]"
                style={{ transform: 'rotateY(55deg) skewY(-15deg)' }} />
            </div>
          </div>
        ))}
      </div>
      <div
        className="absolute pointer-events-none w-full h-[80px] bg-gradient-to-b from-black/60 to-transparent blur-xl"
        style={{ zIndex: 29, top: '4%', left: 0 }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 30,
          clipPath: poly([[0, 0], [100, 0], tr, tl])
        }}
      >
        <div
          className="absolute w-full h-[26px]"
          style={{
            top: '3%',
            left: '0%',
            background: 'linear-gradient(to bottom, #111 0%, #3a3a3a 30%, #555 50%, #2a2a2a 80%, #000 100%)',
            boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.15), inset 0 -1px 2px rgba(0,0,0,0.9), 0 10px 20px -5px rgba(0,0,0,0.8)'
          }}
        >
          <div className="absolute inset-0 opacity-[0.35] mix-blend-overlay pointer-events-none" style={{ backgroundImage: METAL_NOISE }} />
        </div>
      </div>
      <div
        className="absolute inset-0"
        style={{
          zIndex: 20,
          background: `radial-gradient(ellipse 90% 80% at 50% 45%,
            transparent 55%,
            rgba(0,0,0,${vignette}) 100%)`,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 25,
          opacity: 0.04,
          mixBlendMode: "screen",
          backgroundImage: GRAIN_NOISE,
          backgroundSize: "256px 256px",
        }}
      />
    </div>
  );
}

/**
 * VolumetricLitText Component
 * Renders text whose color is directly driven by the room's 3 spotlights (35%, 50%, 65%).
 * - Anchors light hit-points directly to Three.js room spotlight X coordinates (mapped to text space).
 * - Cone-shaped falloff (~13.5% text radius) matching SpotLight angle=0.25.
 * - Multi-stop metallic falloff: Warm light peak (#f5e6c4) -> Gold (#e8d5a8) -> Metallic Amber (#8c7247) -> Matte Dark (#0d0d0d).
 * - Opacity is flat low (~0.05) during flicker phase (never strobing), and settled transition uses shared eased duration.
 * - Recomputes spatial mapping on window / container resize via ResizeObserver.
 */
export const VolumetricLitText = ({
  children,
  className,
  as: Component = "h1",
  style = {},
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  style?: React.CSSProperties;
}) => {
  const { lightsOn, isFlickering, spots } = useVolumetricStudio();
  const elementRef = useRef<HTMLElement | null>(null);
  const [mappedSpots, setMappedSpots] = useState<{ xPct: number; radiusPx: number }[]>([]);

  const recomputeSpatialMapping = useCallback(() => {
    const el = elementRef.current;
    if (!el) return;

    const textRect = el.getBoundingClientRect();
    if (textRect.width <= 0) return;

    const container = el.closest(".bg-black") || document.body;
    const containerRect = container.getBoundingClientRect();
    const roomWidth = containerRect.width || window.innerWidth;

    const mapped = spots.map((spotRoomPct) => {
      const spotRoomX = (spotRoomPct / 100) * roomWidth;
      const spotTextX = spotRoomX - (textRect.left - containerRect.left);
      const xPct = (spotTextX / textRect.width) * 100;

      const radiusPx = Math.max(80, Math.min(220, textRect.width * 0.135));
      return { xPct, radiusPx };
    });

    setMappedSpots(mapped);
  }, [spots]);

  useEffect(() => {
    recomputeSpatialMapping();
    window.addEventListener("resize", recomputeSpatialMapping);

    let observer: ResizeObserver | null = null;
    if (elementRef.current && typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(recomputeSpatialMapping);
      observer.observe(elementRef.current);
    }

    return () => {
      window.removeEventListener("resize", recomputeSpatialMapping);
      if (observer) observer.disconnect();
    };
  }, [recomputeSpatialMapping]);

  const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
  const transitionDuration = isFlickering ? "130ms" : "750ms";
  const activeIntensity = isFlickering ? 0.05 : lightsOn ? 1 : 0.04;

  const spotlightGradients = useMemo(() => {
    if (!mappedSpots.length) {
      return spots
        .map(
          (x) =>
            `radial-gradient(ellipse 18% 85% at ${x}% 50%, rgba(245,230,196,${activeIntensity}) 0%, rgba(232,213,168,${activeIntensity * 0.95}) 25%, rgba(140,110,65,${activeIntensity * 0.65}) 55%, rgba(45,34,18,${activeIntensity * 0.3}) 80%, rgba(13,13,13,0.98) 100%)`
        )
        .join(", ");
    }

    return mappedSpots
      .map(
        ({ xPct, radiusPx }) =>
          `radial-gradient(circle ${radiusPx}px at ${xPct.toFixed(2)}% 50%, rgba(245,230,196,${activeIntensity}) 0%, rgba(232,213,168,${activeIntensity * 0.95}) 25%, rgba(140,110,65,${activeIntensity * 0.65}) 55%, rgba(45,34,18,${activeIntensity * 0.3}) 80%, transparent 100%)`
      )
      .join(", ");
  }, [mappedSpots, spots, activeIntensity]);

  return (
    <Component
      ref={(node: HTMLElement | null) => {
        elementRef.current = node;
      }}
      className={cn("select-none tracking-wider font-black text-center relative", className)}
      style={{
        backgroundImage: `${spotlightGradients}, linear-gradient(to right, #0d0d0d, #0d0d0d)`,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        color: "transparent",
        filter:
          lightsOn && !isFlickering
            ? "drop-shadow(0 0 30px rgba(232, 213, 168, 0.3))"
            : "none",
        transition: `filter ${transitionDuration} ${EASE}`,
        ...style,
      }}
    >
      {children}
    </Component>
  );
};

/**
 * VolumetricLitTextRotator Component
 * Extends VolumetricLitText to support preloaded headline rotation.
 * - All text items in `texts` are rendered in the DOM from initial mount.
 * - Inactive text nodes use `visibility: hidden; position: absolute; pointer-events: none;` so layout/font metrics are pre-measured with zero shift.
 * - State machine watches `lightsOn` transition to `false` (blackout moment) to silently advance active text index.
 * - When lights turn ON, the active text reveals using exact spotlight-mapped radial gradient colors.
 * - Loops indefinitely through all items in `texts`.
 */
export const VolumetricLitTextRotator = ({
  texts,
  className,
  as: Component = "h1",
  style = {},
}: {
  texts: string[];
  className?: string;
  as?: React.ElementType;
  style?: React.CSSProperties;
}) => {
  const { lightsOn } = useVolumetricStudio();
  const [activeIndex, setActiveIndex] = useState(0);
  const prevLightsOnRef = useRef(lightsOn);

  useEffect(() => {
    if (prevLightsOnRef.current && !lightsOn) {
      setActiveIndex((prev) => (prev + 1) % texts.length);
    }
    prevLightsOnRef.current = lightsOn;
  }, [lightsOn, texts.length]);

  return (
    <div className="relative w-full flex items-center justify-center min-h-[120px] sm:min-h-[160px] md:min-h-[200px] lg:min-h-[230px]">
      {texts.map((text, idx) => {
        const isActive = idx === activeIndex;
        return (
          <div
            key={text}
            aria-hidden={!isActive}
            className={`w-full flex items-center justify-center transition-none ${isActive
                ? "relative z-10 opacity-100"
                : "absolute inset-0 z-0 opacity-0 pointer-events-none"
              }`}
            style={{
              visibility: isActive ? "visible" : "hidden",
            }}
          >
            <VolumetricLitText className={className} as={Component} style={style}>
              {text}
            </VolumetricLitText>
          </div>
        );
      })}
    </div>
  );
};

export const VolumetricStudio = ({
  className,
  children,
  lightColor = "232,200,150",
  onDarkPhase,
}: {
  className?: string;
  children?: React.ReactNode | ((state: VolumetricLightingState) => React.ReactNode);
  lightColor?: string;
  onDarkPhase?: () => void;
}) => {
  const [lightsOn, setLightsOn] = useState(false);
  const [isFlickering, setIsFlickering] = useState(true);
  const spots = useMemo(() => [35, 50, 65], []);
  const onDarkPhaseRef = useRef(onDarkPhase);

  useEffect(() => {
    onDarkPhaseRef.current = onDarkPhase;
  }, [onDarkPhase]);

  useEffect(() => {
    let mounted = true;
    const runFlicker = async () => {
      const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

      // Initial studio startup ignition flicker (130ms eased pulses, no jump-cuts)
      setIsFlickering(true);
      setLightsOn(true);
      await sleep(130);
      if (!mounted) return;
      setLightsOn(false);
      await sleep(140);
      if (!mounted) return;
      setLightsOn(true);
      await sleep(100);
      if (!mounted) return;
      setLightsOn(false);
      await sleep(120);
      if (!mounted) return;
      setIsFlickering(false);
      setLightsOn(true);

      // Main Loop: Lights ON 4.5s -> Turn OFF smoothly 750ms (silent text swap) -> Turn ON
      while (mounted) {
        await sleep(4500);
        if (!mounted) break;
        setIsFlickering(false);
        setLightsOn(false); // Lights turn OFF smoothly

        onDarkPhaseRef.current?.();

        await sleep(750);   // Dark phase
        if (!mounted) break;
        setIsFlickering(true);
        setLightsOn(true);  // Lights turn back ON
        await sleep(100);
        if (!mounted) break;
        setIsFlickering(false);
      }
    };
    runFlicker();
    return () => {
      mounted = false;
    };
  }, []);

  const contextValue = useMemo(
    () => ({
      lightsOn,
      isFlickering,
      intensity: 1,
      lightColor,
      spots,
    }),
    [lightsOn, isFlickering, lightColor, spots]
  );

  return (
    <VolumetricStudioContext.Provider value={contextValue}>
      <div className={cn("relative w-full h-full min-h-[600px] bg-black overflow-hidden font-sans", className)}>
        <Room
          lightsOn={lightsOn}
          intensity={1}
          lightColor={lightColor}
          spots={spots}
          isFlickering={isFlickering}
        />
        <div className="relative z-10 w-full h-full pointer-events-none flex flex-col justify-between">
          {typeof children === "function" ? children(contextValue) : children}
        </div>
      </div>
    </VolumetricStudioContext.Provider>
  );
};
