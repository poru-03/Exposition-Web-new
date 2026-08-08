"use client"

import * as React from "react"
import { useMeasure } from "@uidotdev/usehooks"
import { VariantProps, cva } from "class-variance-authority"
import {
  HTMLMotionProps,
  MotionValue,
  motion,
  useScroll,
  useTransform,
} from "framer-motion"
import { cn } from "@/lib/utils"

const processCardVariants = cva(
  "flex border backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl transition-colors duration-300",
  {
    variants: {
      variant: {
        dark:
          "border-[#D7E2EA]/15 text-[#D7E2EA] bg-[#141414]/95 hover:border-[#D7E2EA]/30 shadow-[0_20px_50px_rgba(0,0,0,0.7)]",
        indigo:
          "border-[#D7E2EA]/15 text-[#D7E2EA] bg-[#141414]/95 hover:border-[#D7E2EA]/30 shadow-[0_20px_50px_rgba(0,0,0,0.7)]",
        light: "shadow-lg bg-white/90 text-[#0C0C0C] border-black/10",
      },
      size: {
        sm: "min-w-[30%] max-w-[30%]",
        md: "min-w-[85%] sm:min-w-[72%] md:min-w-[65%] max-w-[85%] sm:max-w-[72%] md:max-w-[65%]",
        lg: "min-w-[75%] max-w-[75%]",
        xl: "min-w-full max-w-full",
      },
    },
    defaultVariants: {
      variant: "dark",
      size: "md",
    },
  }
)

interface ContainerScrollContextValue {
  scrollYProgress: MotionValue<number>
}

interface ProcessCardProps
  extends HTMLMotionProps<"div">,
    VariantProps<typeof processCardVariants> {
  itemsLength: number
  index: number
  tabWidth?: number
}

const ContainerScrollContext = React.createContext<
  ContainerScrollContextValue | undefined
>(undefined)

function useContainerScrollContext() {
  const context = React.useContext(ContainerScrollContext)
  if (!context) {
    throw new Error(
      "useContainerScrollContext must be used within a ContainerScroll Component"
    )
  }
  return context
}

export const ContainerScroll = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  })

  return (
    <ContainerScrollContext.Provider value={{ scrollYProgress }}>
      <div
        ref={scrollRef}
        className={cn("relative min-h-[240vh]", className)}
        {...props}
      >
        {children}
      </div>
    </ContainerScrollContext.Provider>
  )
}

export const ContainerSticky = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "sticky top-24 sm:top-28 left-0 w-full z-10 flex flex-nowrap items-center overflow-visible",
      className
    )}
    {...props}
  />
))
ContainerSticky.displayName = "ContainerSticky"

export const ProcessCardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "p-4 sm:p-6 border-r border-[#D7E2EA]/10 shrink-0 flex flex-col items-center justify-start w-[64px] sm:w-[80px]",
      className
    )}
    {...props}
  />
))
ProcessCardTitle.displayName = "ProcessCardTitle"

export const ProcessCardBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-5 p-6 sm:p-8 flex-1 min-w-0", className)}
    {...props}
  />
))
ProcessCardBody.displayName = "ProcessCardBody"

export const ProcessCard: React.FC<ProcessCardProps> = ({
  className,
  style,
  variant,
  size,
  itemsLength,
  index,
  tabWidth = 80,
  ...props
}) => {
  const { scrollYProgress } = useContainerScrollContext()
  const start = index / itemsLength
  const end = Math.min(1, start + 1 / itemsLength)
  const innerWidth = typeof window !== "undefined" ? window.innerWidth : 1200
  const [measureRef, { width }] = useMeasure()

  // Slides from off-screen right into its stacked accordion position
  const targetOffset = -((width ?? 0) * index) + tabWidth * index
  const x = useTransform(
    scrollYProgress,
    [start, end],
    [innerWidth, targetOffset]
  )

  return (
    <motion.div
      ref={measureRef as any}
      style={{
        x: index > 0 ? x : 0,
        ...style,
      }}
      className={cn(processCardVariants({ variant, size }), className)}
      {...props}
    />
  )
}
ProcessCard.displayName = "ProcessCard"
