import { useRef } from "react"
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion"
import { Compass, Layers, Palette, Code2, Sparkles, ArrowRight } from "lucide-react"
import ScrollReveal from "@/components/ScrollReveal"
import { StaggerContainer, StaggerCard } from "@/components/StaggerReveal"

export const PROCESS_PHASES = [
  {
    id: "process-1",
    number: "01",
    title: "Research and Analysis",
    subtitle: "Discovery & Market Insights",
    description:
      "With your vision in mind, we enter the Research and Analysis phase. Here, we examine your competitors, industry trends, and user preferences. This informed approach ensures your website stands out and provides an excellent user experience.",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop",
    icon: Compass,
    deliverables: ["Brand Benchmarking", "Audience Persona Mapping", "3D Style Direction"],
  },
  {
    id: "process-2",
    number: "02",
    title: "Wireframing and Prototyping",
    subtitle: "Spatial UX & Architecture",
    description:
      "We move on to Wireframing and Prototyping, where we create skeletal representations of your website's pages. These visual blueprints allow us to test and refine the user experience before diving into high-fidelity design.",
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=800&auto=format&fit=crop",
    icon: Layers,
    deliverables: ["Interactive Wireframes", "Spatial Motion Flow", "UX Architecture"],
  },
  {
    id: "process-3",
    number: "03",
    title: "Design Creation",
    subtitle: "3D Visuals & Identity",
    description:
      "Now, it's time for the Design Creation phase. Our talented designers bring your vision to life. We focus on aesthetics, ensuring your website not only looks stunning but also aligns perfectly with your brand identity.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    icon: Palette,
    deliverables: ["Photorealistic 3D Assets", "Color & Typography Systems", "Dynamic Motion Graphics"],
  },
  {
    id: "process-4",
    number: "04",
    title: "Development and Testing",
    subtitle: "Performance & Launch",
    description:
      "In the Development and Testing phase, our skilled developers turn designs into a fully functional website. Rigorous testing ensures everything works seamlessly, providing an exceptional user experience across all devices.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
    icon: Code2,
    deliverables: ["WebGL / 3D Integration", "Responsive Animations", "Cross-Browser Optimization"],
  },
]

const STICKY_TOP_BASE = 96
const TAB_MARGIN = 62

export const DemoDark = () => {
  const timelineRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 20%"],
  })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <div className="relative w-full py-10 bg-transparent">
      {/* Intro Header */}
      <ScrollReveal className="mb-20 space-y-4 max-w-3xl mx-auto text-center flex flex-col items-center px-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#D7E2EA]/20 bg-[#161616]/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#D7E2EA]/80 backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5 text-[#D7E2EA]" />
          Interactive Process Flow
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase text-[#D7E2EA] leading-tight">
          Planning your project
          <br />
          <span className="text-[#D7E2EA]/60 font-light">development journey</span>
        </h2>
        <p className="max-w-[56ch] text-sm sm:text-base leading-relaxed text-[#D7E2EA]/70">
          We blend creative 3D design with cutting-edge frontend development to
          build stunning, high-performance websites that elevate your brand and
          captivate your audience.
        </p>
      </ScrollReveal>

      {/* Vertical Sticky Stack Container */}
      <div ref={timelineRef} className="relative mx-auto max-w-5xl px-4 sm:px-8 pb-32">
        {/* Continuous Vertical Line Track */}
        <div className="absolute left-8 sm:left-12 top-4 bottom-12 w-[2.5px] bg-white/15 rounded-full z-10" />

        {/* Dynamic Glowing Progress Connector Line */}
        {!shouldReduceMotion && (
          <motion.div
            className="absolute left-8 sm:left-12 top-4 w-[2.5px] bg-gradient-to-b from-cyan-400 via-sky-300 to-indigo-400 shadow-[0_0_18px_rgba(34,211,238,0.9)] rounded-full z-10 origin-top"
            style={{ height: lineHeight }}
          />
        )}

        {/* Stacked Cards adding downwards with top margin headers */}
        <StaggerContainer staggerChildren={0.12} className="flex flex-col gap-12 sm:gap-16">
          {PROCESS_PHASES.map((phase, index) => {
            const Icon = phase.icon
            const stickyTop = STICKY_TOP_BASE + index * TAB_MARGIN

            return (
              <div
                key={phase.id}
                style={{ top: `${stickyTop}px` }}
                className="sticky z-20 flex items-start gap-6 sm:gap-10 pl-4 sm:pl-8"
              >
                {/* Glowing White Node Dot on the vertical line */}
                <div className="relative z-30 shrink-0 mt-6 -ml-[13px] sm:-ml-[17px] h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-white border-4 border-[#0C0C0C] shadow-[0_0_22px_rgba(255,255,255,1)] flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-[#0C0C0C]" />
                </div>

                {/* Sticky Card with Exposed Top Margin Header */}
                <StaggerCard className="flex-1 w-full">
                  <div className="group relative rounded-3xl border border-[#D7E2EA]/20 bg-[#141414]/98 shadow-[0_25px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl transition-all duration-300 hover:border-[#D7E2EA]/40 overflow-hidden">
                    {/* Top Tab Header Bar (Visible when stacked at top margin) */}
                    <div className="flex items-center justify-between gap-4 px-6 py-4 sm:px-8 sm:py-5 border-b border-[#D7E2EA]/10 bg-[#181818]/90">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="rounded-full size-8 sm:size-9 bg-[#222222] border border-[#D7E2EA]/25 text-xs sm:text-sm font-black flex justify-center items-center text-[#D7E2EA] shadow-[0_0_12px_rgba(215,226,234,0.15)] shrink-0">
                          {phase.number}
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
                          <h3 className="text-base sm:text-lg md:text-xl font-bold uppercase tracking-tight text-[#D7E2EA]">
                            {phase.title}
                          </h3>
                          <span className="text-[0.65rem] sm:text-xs font-semibold uppercase tracking-wider text-[#D7E2EA]/50">
                            {phase.subtitle}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-[#D7E2EA]/70" />
                      </div>
                    </div>

                    {/* Card Body Content */}
                    <div className="p-6 sm:p-8 md:p-10 space-y-6">
                      <p className="text-[#D7E2EA]/80 text-sm sm:text-base md:text-lg leading-relaxed font-light max-w-2xl">
                        {phase.description}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-center pt-2">
                        <div className="relative overflow-hidden rounded-2xl border border-[#D7E2EA]/10 h-36 sm:h-44">
                          <img
                            src={phase.image}
                            alt={phase.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C]/80 via-transparent to-transparent" />
                        </div>

                        <div className="flex flex-col gap-2.5">
                          <span className="text-xs font-bold uppercase tracking-wider text-[#D7E2EA]/60">
                            Key Deliverables
                          </span>
                          <ul className="space-y-2 text-xs sm:text-sm text-[#D7E2EA]/85">
                            {phase.deliverables.map((item) => (
                              <li key={item} className="flex items-center gap-2.5">
                                <ArrowRight className="h-3.5 w-3.5 text-[#D7E2EA]/60 shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </StaggerCard>
              </div>
            )
          })}
        </StaggerContainer>
      </div>
    </div>
  )
}
