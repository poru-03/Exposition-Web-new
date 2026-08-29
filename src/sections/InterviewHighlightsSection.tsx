import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Building,
} from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import { StaggerContainer, StaggerCard } from '../components/StaggerReveal';

export type InterviewItem = {
  id: string;
  name: string;
  position: string;
  company: string;
  handle: string;
  issue: string;
  category: string;
  image: string;
  quote: string;
  topics: string[];
  duration: string;
  likes: number;
  retweets: number;
  socials: {
    youtube: string;
    linkedin: string;
    facebook: string;
    instagram: string;
  };
};

export const INTERVIEWS_DATA: InterviewItem[] = [
  {
    id: 'interview-1',
    name: 'Dhanika Perera',
    position: 'Founder & CEO',
    company: 'Bhasha / Helakuru',
    handle: '@dhanikaperera',
    issue: 'Issue 07',
    category: 'Digital Innovation & Native Tech',
    image: '/resources/speakers/dhanika perera.png',
    quote:
      'Building native platforms that serve millions requires deep cultural empathy combined with relentless software architecture discipline.',
    topics: ['Native Ecosystems', 'Digital Sri Lanka', 'Startup Scaling', 'Helakuru Platform'],
    duration: '24 Mins Full Interview',
    likes: 184,
    retweets: 42,
    socials: {
      youtube: 'https://youtube.com',
      linkedin: 'https://linkedin.com',
      facebook: 'https://facebook.com',
      instagram: 'https://instagram.com',
    },
  },
  {
    id: 'interview-2',
    name: 'Dr. Harsha Subasinghe',
    position: 'Founder & CEO',
    company: 'CodeGen International & Vega Innovations',
    handle: '@harshasubasinghe',
    issue: 'Issue 19',
    category: 'Deep Tech & Autonomous AI',
    image: '/resources/speakers/harsha.png',
    quote:
      'To build world-class electric supercars and autonomous AI algorithms from South Asia, you must foster fearless engineering curiosity without borders.',
    topics: ['Vega EV Supercar', 'AI Travel Engines', 'Robotics', 'Hardware Innovation'],
    duration: '32 Mins Full Interview',
    likes: 312,
    retweets: 89,
    socials: {
      youtube: 'https://youtube.com',
      linkedin: 'https://linkedin.com',
      facebook: 'https://facebook.com',
      instagram: 'https://instagram.com',
    },
  },
  {
    id: 'interview-3',
    name: 'Deepal Sooriyaarachchi',
    position: 'Management Consultant & Author',
    company: 'Former Managing Director, AVIVA NDB',
    handle: '@deepalsooriya',
    issue: 'Issue 20',
    category: 'Leadership & Corporate Strategy',
    image: '/resources/speakers/deepal sooriyarachchi.png',
    quote:
      'True corporate leadership is not merely steering financial metrics; it is the mindfulness to unlock the latent creative spirit of your people.',
    topics: ['Mindful Leadership', 'Corporate Governance', 'Talent Mastery', 'Market Agility'],
    duration: '28 Mins Full Interview',
    likes: 245,
    retweets: 63,
    socials: {
      youtube: 'https://youtube.com',
      linkedin: 'https://linkedin.com',
      facebook: 'https://facebook.com',
      instagram: 'https://instagram.com',
    },
  },
  {
    id: 'interview-4',
    name: 'Dian Gomes',
    position: 'Global Business Leader & Motivational Icon',
    company: 'Former Managing Director, MAS Holdings',
    handle: '@diangomes_lead',
    issue: 'Issue 18',
    category: 'High-Performance Culture',
    image: '/resources/speakers/dian gomez.png',
    quote:
      'Winning in the global market demands an uncompromising championship mindset, relentless discipline, and championing homegrown talent.',
    topics: ['Global Brands', 'High-Performance Teams', 'Apparel Tech', 'Executive Resilience'],
    duration: '30 Mins Full Interview',
    likes: 420,
    retweets: 115,
    socials: {
      youtube: 'https://youtube.com',
      linkedin: 'https://linkedin.com',
      facebook: 'https://facebook.com',
      instagram: 'https://instagram.com',
    },
  },
  {
    id: 'interview-5',
    name: 'Peter De Almeida',
    position: 'Managing Director / CEO',
    company: 'N-able',
    handle: '@peterdealmeida',
    issue: 'Issue 17',
    category: 'Enterprise Tech & Digital Shift',
    image: '/resources/speakers/peterdealmeida.png',
    quote:
      'Digital transformation begins with unlearning obsolete habits and empowering engineers to challenge architectural status quos fearlessly.',
    topics: ['Enterprise Cloud', 'Culture of Innovation', 'Software Leadership', 'Future of Work'],
    duration: '26 Mins Full Interview',
    likes: 198,
    retweets: 48,
    socials: {
      youtube: 'https://youtube.com',
      linkedin: 'https://linkedin.com',
      facebook: 'https://facebook.com',
      instagram: 'https://instagram.com',
    },
  },
  {
    id: 'interview-6',
    name: 'Upendra Pieris',
    position: 'Director / Co-Founder',
    company: 'Creative Software',
    handle: '@upendrapieris',
    issue: 'Issue 15',
    category: 'Global Software Engineering',
    image: '/resources/speakers/upendra pieris.png',
    quote:
      'Scaling international engineering teams across continents hinges on trust, radical engineering transparency, and continuous technological upskilling.',
    topics: ['Nordic Software Tech', 'Engineering Teams', 'Cross-Border Tech', 'Cloud Scale'],
    duration: '25 Mins Full Interview',
    likes: 165,
    retweets: 39,
    socials: {
      youtube: 'https://youtube.com',
      linkedin: 'https://linkedin.com',
      facebook: 'https://facebook.com',
      instagram: 'https://instagram.com',
    },
  },
];

export default function InterviewHighlightsSection() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const activeItem = INTERVIEWS_DATA[selectedIndex];

  // Auto-cycle through interviewees one by one
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % INTERVIEWS_DATA.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  return (
    <section
      id="interviews"
      className="relative z-10 min-h-screen w-full flex flex-col justify-center bg-transparent px-[5%] py-14 sm:py-20 md:py-24 overflow-hidden"
    >
      {/* Section Header */}
      <ScrollReveal className="flex flex-col items-center justify-center text-center mb-6 sm:mb-8 lg:mb-10">
        <h2
          className="hero-heading section-title text-center font-black uppercase leading-none tracking-tight"
          style={{ fontSize: 'clamp(2.4rem, 5.5vw, 76px)' }}
        >
          Interview Highlights
        </h2>

        <p className="mt-1 max-w-2xl text-center text-xs sm:text-sm leading-snug text-[#9A9A9A] font-light">
          Insights from accomplished professionals and industry leaders who are driving change and shaping the future of their respective industries.
        </p>
      </ScrollReveal>

      {/* Main Two-Column Layout */}
      <div className="mx-auto max-w-7xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center">

          {/* ================= LEFT COLUMN: Scrollable Interviewees List ================= */}
          <div className="lg:col-span-5 flex flex-col space-y-2">
            <ScrollReveal delay={0.05} className="flex items-center justify-between px-2 pb-0.5 shrink-0">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#E8C896] animate-ping" />
                <span className="text-[0.68rem] font-mono font-bold uppercase tracking-widest text-[#9A9A9A]">
                  Featured Leaders ({INTERVIEWS_DATA.length})
                </span>
              </div>
            </ScrollReveal>

            {/* List Container */}
            <StaggerContainer
              staggerChildren={0.06}
              className="flex flex-col gap-2"
            >
              {INTERVIEWS_DATA.map((interview, index) => {
                const isSelected = index === selectedIndex;
                return (
                  <StaggerCard key={interview.id}>
                    <button
                      onClick={() => {
                        setSelectedIndex(index);
                        setIsAutoPlaying(false);
                      }}
                      className={`w-full text-left rounded-2xl p-2.5 sm:p-3 transition-all duration-300 flex items-center justify-between gap-3 border cursor-pointer ${isSelected
                        ? 'bg-[#1e1e1e] border-[#B8894F]/60 shadow-[0_10px_25px_rgba(184,137,79,0.15)] scale-[1.01]'
                        : 'bg-[#141414]/90 border-white/10 hover:border-[#B8894F]/30 hover:bg-[#181818]'
                        }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Avatar */}
                        <div
                          className={`size-10 sm:size-11 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${isSelected ? 'border-[#E8C896] shadow-md' : 'border-white/10 opacity-75'
                            }`}
                        >
                          <img
                            src={interview.image}
                            alt={interview.name}
                            className="w-full h-full object-cover object-top filter brightness-105"
                          />
                        </div>

                        {/* Text Info */}
                        <div className="flex flex-col min-w-0 pr-1">
                          <h4
                            className={`text-xs sm:text-sm font-bold uppercase tracking-tight truncate ${isSelected ? 'text-white' : 'text-white/85'
                              }`}
                          >
                            {interview.name}
                          </h4>
                          <p className="text-[0.68rem] text-[#9A9A9A] truncate mt-0.5">
                            {interview.position} • {interview.company}
                          </p>
                          <p className="text-[0.65rem] font-mono font-bold text-[#E8C896] uppercase tracking-wider mt-0.5">
                            {interview.issue}
                          </p>
                        </div>
                      </div>

                      {/* Active Chevron / Indicator */}
                      <div className="shrink-0">
                        {isSelected ? (
                          <div className="size-6 rounded-full bg-[#B8894F]/20 text-[#E8C896] flex items-center justify-center border border-[#B8894F]/40">
                            <ArrowRight className="size-3" />
                          </div>
                        ) : (
                          <div className="size-6 rounded-full text-white/20 flex items-center justify-center">
                            <ArrowRight className="size-3 opacity-40" />
                          </div>
                        )}
                      </div>
                    </button>
                  </StaggerCard>
                );
              })}
            </StaggerContainer>
          </div>

          {/* ================= RIGHT COLUMN: Testimonial Spotlight Card ================= */}
          <ScrollReveal delay={0.15} y={16} className="lg:col-span-7 flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={`testimonial-${activeItem.id}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="w-full flex flex-col items-center justify-center py-4 h-full"
              >
                  <div className="group relative w-full rounded-3xl overflow-hidden border border-white/15 bg-[#121215]/95 p-6 sm:p-10 shadow-[0_30px_70px_rgba(0,0,0,0.95)] flex flex-col justify-between min-h-[380px]">
                    {/* Animated Gold Corner Glow Radial Gradient */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(ellipse_at_top_right,rgba(232,200,150,0.30)_0%,rgba(184,137,79,0.12)_40%,transparent_75%)] animate-corner-glow pointer-events-none" />

                    {/* Card Content Overlay */}
                    <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                      {/* Company Icon on Top */}
                      <div className="p-3 rounded-2xl bg-black/60 border border-[#B8894F]/40 text-[#E8C896] backdrop-blur-md shadow-lg">
                        <Building className="size-8 text-[#E8C896]" />
                      </div>

                      {/* Rounded Person Portrait Image below Top Icon */}
                      <div className="size-20 sm:size-24 rounded-full overflow-hidden border-2 border-[#E8C896] shadow-xl shrink-0 group-hover:scale-105 transition-transform duration-500">
                        <img
                          src={activeItem.image}
                          alt={activeItem.name}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>

                      {/* Issue Number in Golden Font directly below Image */}
                      <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-[#E8C896] -mt-1">
                        {activeItem.issue}
                      </span>

                      {/* Name and Position directly below Icon, Portrait & Issue */}
                      <div className="space-y-1 max-w-lg">
                        <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white drop-shadow-md">
                          {activeItem.name}
                        </h3>
                        <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#E8C896]">
                          {activeItem.position} • {activeItem.company}
                        </p>
                      </div>

                      {/* Quote Text below Name & Position */}
                      <blockquote className="mt-2 max-w-xl text-sm sm:text-base md:text-lg text-white/90 font-light leading-relaxed italic bg-black/40 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/10 shadow-inner">
                        &ldquo;{activeItem.quote}&rdquo;
                      </blockquote>
                    </div>

                    {/* Bottom Tagline */}
                    <div className="relative z-10 flex items-center justify-end pt-4 mt-4 border-t border-white/10 text-xs font-mono text-[#9A9A9A]">
                      <span className="text-[0.68rem] uppercase font-semibold tracking-wider text-[#E8C896]">
                        {activeItem.category}
                      </span>
                    </div>
                  </div>
                </motion.div>
            </AnimatePresence>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
