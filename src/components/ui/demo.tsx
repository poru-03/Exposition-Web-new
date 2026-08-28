import { useRef } from "react"
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion"
import {
  Radio,
  Trophy,
  Globe,
  Users,
  Briefcase,
  BookOpen,
  Sparkles,
  ArrowRight,
  ExternalLink,
} from "lucide-react"
import ScrollReveal from "@/components/ScrollReveal"
import { StaggerContainer, StaggerCard } from "@/components/StaggerReveal"

export type PhaseItem = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  icon: any;
  deliverables: string[];
  isElite10?: boolean;
};

export const PROCESS_PHASES: PhaseItem[] = [
  {
    id: "process-1",
    number: "01",
    title: "Voices of Vision (Podcast Series)",
    subtitle: "Industry Voices & Insights",
    description:
      "A curated podcast series featuring industry leaders, entrepreneurs and academics sharing the insights, experiences, and perspectives that define modern professional thinking.",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800&auto=format&fit=crop",
    icon: Radio,
    deliverables: ["Industry Voices", "Expert Insights", "Real Stories"],
  },
  {
    id: "process-2",
    number: "02",
    title: "Elite 10",
    subtitle: "Undergraduate Recognition Program",
    description:
      "Sri Lanka's first undergraduate recognition and development program, identifying 10 exceptional undergraduates from universities across the country.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
    icon: Trophy,
    deliverables: ["Top Talent", "National Recognition"],
    isElite10: true,
  },
  {
    id: "process-3",
    number: "03",
    title: "University Tech Events Hub",
    subtitle: "Innovation Network & Hackathons",
    description:
      "A live digital platform aggregating university-level tech events across Sri Lanka including hackathons, robotics competitions, and innovation challenges, all in one place.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop",
    icon: Globe,
    deliverables: ["Hackathons", "Robotics Competitions", "Innovation Challenges"],
  },
  {
    id: "process-4",
    number: "04",
    title: "Industrial Forum",
    subtitle: "Thought Leadership & Expert Dialogue",
    description:
      "A high-impact thought leadership event bringing together industry experts, academics, and students in insightful conversations and real perspectives that equip the next generation for an evolving future.",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=800&auto=format&fit=crop",
    icon: Users,
    deliverables: ["Expert Dialogue", "Industry Insights", "Future Thinking"],
  },
  {
    id: "process-5",
    number: "05",
    title: "Industrial Week & Career Fair",
    subtitle: "Recruitment & Corporate Networking",
    description:
      "A dedicated recruitment platform where top companies meet motivated undergraduates and fresh graduates from faculties across the University of Kelaniya.",
    image: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?q=80&w=800&auto=format&fit=crop",
    icon: Briefcase,
    deliverables: ["Career Opportunities", "Industry Connections"],
  },
  {
    id: "process-6",
    number: "06",
    title: "Exposition Magazine",
    subtitle: "Premier Business & IT Publication",
    description:
      "Sri Lanka's premier university business magazine, bridging the worlds of IT and Management while connecting undergraduates with industry, ideas, and opportunity.",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop",
    icon: BookOpen,
    deliverables: ["IT & Management", "University Publication", "Industry Bridge"],
  },
  {
    id: "process-7",
    number: "07",
    title: "Exposition Magazine Launch",
    subtitle: "Official Issue 22 Unveiling",
    description:
      "The closing event of Industrial Week and the official launch of Exposition Issue 22.",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop",
    icon: Sparkles,
    deliverables: ["Issue 22 Launch", "Closing Ceremony", "Grand Unveiling"],
  },
]

const STICKY_TOP_BASE = 80
const TAB_MARGIN = 48

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
        <div className="inline-flex items-center gap-2 rounded-full border border-[#B8894F]/30 bg-[#161616]/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#E8C896] backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5 text-[#E8C896]" />
          INTERACTIVE PROCESS FLOW
        </div>
        <p className="max-w-[56ch] text-sm sm:text-base leading-relaxed text-[#9A9A9A]">
          Exposition is built around a series of initiatives that are
          thoughtfully designed to encourage knowledge sharing, industry
          engagement, and professional development.
        </p>
      </ScrollReveal>

      {/* Vertical Sticky Stack Container */}
      <div ref={timelineRef} className="relative mx-auto max-w-5xl px-4 sm:px-8 pb-32">
        {/* Continuous Vertical Line Track */}
        <div className="absolute left-8 sm:left-12 top-4 bottom-12 w-[2.5px] bg-white/15 rounded-full z-10" />

        {/* Dynamic Glowing Progress Connector Line */}
        {!shouldReduceMotion && (
          <motion.div
            className="absolute left-8 sm:left-12 top-4 w-[2.5px] bg-gradient-to-b from-[#B8894F] via-[#E8C896] to-white shadow-[0_0_18px_rgba(184,137,79,0.7)] rounded-full z-10 origin-top"
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
                  <div className="group relative rounded-3xl border border-white/10 bg-[#141414]/98 shadow-[0_25px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl transition-all duration-300 hover:border-[#B8894F]/40 overflow-hidden">
                    {/* Top Tab Header Bar (Visible when stacked at top margin) */}
                    <div className="flex items-center justify-between gap-4 px-6 py-4 sm:px-8 sm:py-5 border-b border-white/10 bg-[#181818]/90">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="rounded-full size-8 sm:size-9 bg-[#222222] border border-white/15 text-xs sm:text-sm font-black flex justify-center items-center text-silver-gradient shadow-[0_0_12px_rgba(216,216,216,0.15)] shrink-0">
                          {phase.number}
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
                          <h3 className="text-base sm:text-lg md:text-xl font-bold uppercase tracking-tight text-white">
                            {phase.title}
                          </h3>
                          <span className="text-[0.65rem] sm:text-xs font-semibold uppercase tracking-wider text-[#9A9A9A]">
                            {phase.subtitle}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-[#E8C896]/80" />
                      </div>
                    </div>

                    {/* Card Body Content */}
                    <div className="p-6 sm:p-8 md:p-10 space-y-6">
                      <p className="text-[#9A9A9A] text-sm sm:text-base md:text-lg leading-relaxed font-light max-w-2xl">
                        {phase.description}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-center pt-2">
                        <div className="relative overflow-hidden rounded-2xl border border-white/10 h-36 sm:h-44">
                          <img
                            src={phase.image}
                            alt={phase.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C]/80 via-transparent to-transparent" />
                        </div>

                        <div className="flex flex-col gap-3">
                          <span className="text-xs font-bold uppercase tracking-wider text-[#9A9A9A]">
                            Key Highlights
                          </span>
                          <ul className="space-y-2 text-xs sm:text-sm text-white/85">
                            {phase.deliverables.map((item) => (
                              <li key={item} className="flex items-center gap-2.5">
                                <ArrowRight className="h-3.5 w-3.5 text-[#E8C896] shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>

                          {phase.isElite10 && (
                            <div className="pt-2">
                              <a
                                href="/elite-10"
                                onClick={(e) => {
                                  e.preventDefault();
                                  window.history.pushState({}, '', '/elite-10');
                                  window.dispatchEvent(new Event('popstate'));
                                }}
                                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#B8894F] to-[#E8C896] px-5 py-2 text-xs font-bold uppercase tracking-wider text-[#0C0C0C] shadow-[0_0_20px_rgba(184,137,79,0.3)] transition-all hover:scale-105 cursor-pointer"
                              >
                                <span>Explore Elite 10</span>
                                <ExternalLink className="h-3.5 w-3.5" />
                              </a>
                            </div>
                          )}
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
