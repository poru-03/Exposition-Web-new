"use client";
import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  src: string;
}
export interface Colors {
  name?: string;
  designation?: string;
  testimony?: string;
  arrowBackground?: string;
  arrowForeground?: string;
  arrowHoverBackground?: string;
}
export interface FontSizes {
  name?: string;
  designation?: string;
  quote?: string;
}
export interface CircularTestimonialsProps {
  testimonials: Testimonial[];
  autoplay?: boolean;
  colors?: Colors;
  fontSizes?: FontSizes;
}

function calculateGap(width: number) {
  const minWidth = 1024;
  const maxWidth = 1456;
  const minGap = 60;
  const maxGap = 86;
  if (width <= minWidth) return minGap;
  if (width >= maxWidth)
    return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}

export const CircularTestimonials = ({
  testimonials,
  autoplay = true,
  colors = {},
  fontSizes = {},
}: CircularTestimonialsProps) => {
  // Color & font config
  const colorName = colors.name ?? "#D7E2EA";
  const colorDesignation = colors.designation ?? "#94a3b8";
  const colorTestimony = colors.testimony ?? "#cbd5e1";
  const fontSizeName = fontSizes.name ?? "1.75rem";
  const fontSizeDesignation = fontSizes.designation ?? "0.95rem";
  const fontSizeQuote = fontSizes.quote ?? "1.15rem";

  // State
  const [activeIndex, setActiveIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(1200);

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const testimonialsLength = useMemo(() => testimonials.length, [testimonials]);
  const activeTestimonial = useMemo(
    () => testimonials[activeIndex],
    [activeIndex, testimonials]
  );

  // Responsive gap calculation
  useEffect(() => {
    function handleResize() {
      if (imageContainerRef.current) {
        setContainerWidth(imageContainerRef.current.offsetWidth);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Autoplay
  useEffect(() => {
    if (autoplay) {
      autoplayIntervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonialsLength);
      }, 5000);
    }
    return () => {
      if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    };
  }, [autoplay, testimonialsLength]);

  // Navigation handlers
  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonialsLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [testimonialsLength]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + testimonialsLength) % testimonialsLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [testimonialsLength]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handlePrev, handleNext]);

  // Compute transforms for each image (always show 3: left, center, right)
  function getImageStyle(index: number): React.CSSProperties {
    const gap = calculateGap(containerWidth);
    const maxStickUp = gap * 0.8;
    const isActive = index === activeIndex;
    const isLeft = (activeIndex - 1 + testimonialsLength) % testimonialsLength === index;
    const isRight = (activeIndex + 1) % testimonialsLength === index;
    if (isActive) {
      return {
        zIndex: 3,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(0px) translateY(0px) scale(1) rotateY(0deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    if (isLeft) {
      return {
        zIndex: 2,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(15deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    if (isRight) {
      return {
        zIndex: 2,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(-15deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    // Hide all other images
    return {
      zIndex: 1,
      opacity: 0,
      pointerEvents: "none",
      transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
    };
  }

  // Framer Motion variants for quote
  const quoteVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  if (!activeTestimonial) return null;

  return (
    <div className="w-full max-w-5xl p-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
        {/* Images Perspective Container */}
        <div
          className="relative w-full h-[340px] sm:h-[420px] md:h-[450px]"
          style={{ perspective: 1000 }}
          ref={imageContainerRef}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.src + index}
              className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.8)] border border-white/15 bg-[#1a1a1a]"
              style={getImageStyle(index)}
            >
              <img
                src={testimonial.src}
                alt={testimonial.name}
                className="w-full h-full object-cover object-top filter brightness-105 contrast-105 transition-transform duration-500"
                data-index={index}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C]/60 via-transparent to-transparent pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Content Side */}
        <div className="flex flex-col justify-between space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              variants={quoteVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="space-y-3"
            >
              <h3
                className="font-bold tracking-tight"
                style={{ color: colorName, fontSize: fontSizeName }}
              >
                {activeTestimonial.name}
              </h3>
              <p
                className="font-medium tracking-wide uppercase text-xs sm:text-sm"
                style={{ color: colorDesignation, fontSize: fontSizeDesignation }}
              >
                {activeTestimonial.designation}
              </p>
              <motion.p
                className="leading-relaxed font-light mt-4"
                style={{ color: colorTestimony, fontSize: fontSizeQuote }}
              >
                {activeTestimonial.quote.split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{
                      filter: "blur(10px)",
                      opacity: 0,
                      y: 5,
                    }}
                    animate={{
                      filter: "blur(0px)",
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.22,
                      ease: "easeInOut",
                      delay: 0.025 * i,
                    }}
                    style={{ display: "inline-block" }}
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center gap-4 pt-4">
            <button
              className="w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 border border-white/15 bg-[#181818] text-[#D7E2EA] shadow-lg hover:bg-white hover:text-black hover:border-white hover:scale-105"
              onClick={handlePrev}
              aria-label="Previous testimonial"
            >
              <FaArrowLeft size={16} />
            </button>
            <button
              className="w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 border border-white/15 bg-[#181818] text-[#D7E2EA] shadow-lg hover:bg-white hover:text-black hover:border-white hover:scale-105"
              onClick={handleNext}
              aria-label="Next testimonial"
            >
              <FaArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircularTestimonials;
