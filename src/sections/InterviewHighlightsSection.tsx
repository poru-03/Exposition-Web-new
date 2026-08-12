import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Video,
  Play,
  Pause,
  ArrowRight,
  Sparkles,
  Quote,
  Radio,
  Building,
  User,
} from 'lucide-react';
import {
  FaYoutube,
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
} from 'react-icons/fa6';
import ScrollReveal from '../components/ScrollReveal';
import { StaggerContainer, StaggerCard } from '../components/StaggerReveal';

export type InterviewItem = {
  id: string;
  name: string;
  position: string;
  company: string;
  issue: string;
  category: string;
  image: string;
  quote: string;
  topics: string[];
  duration: string;
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
    issue: 'Issue 07',
    category: 'Digital Innovation & Native Tech',
    image: '/resources/speakers/dhanika perera.png',
    quote:
      'Building native platforms that serve millions requires deep cultural empathy combined with relentless software architecture discipline.',
    topics: ['Native Ecosystems', 'Digital Sri Lanka', 'Startup Scaling', 'Helakuru Platform'],
    duration: '24 Mins Full Interview',
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
    issue: 'Issue 19',
    category: 'Deep Tech & Autonomous AI',
    image: '/resources/speakers/harsha.png',
    quote:
      'To build world-class electric supercars and autonomous AI algorithms from South Asia, you must foster fearless engineering curiosity without borders.',
    topics: ['Vega EV Supercar', 'AI Travel Engines', 'Robotics', 'Hardware Innovation'],
    duration: '32 Mins Full Interview',
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
    issue: 'Issue 20',
    category: 'Leadership & Corporate Strategy',
    image: '/resources/speakers/deepal sooriyarachchi.png',
    quote:
      'True corporate leadership is not merely steering financial metrics; it is the mindfulness to unlock the latent creative spirit of your people.',
    topics: ['Mindful Leadership', 'Corporate Governance', 'Talent Mastery', 'Market Agility'],
    duration: '28 Mins Full Interview',
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
    issue: 'Issue 18',
    category: 'High-Performance Culture',
    image: '/resources/speakers/dian gomez.png',
    quote:
      'Winning in the global market demands an uncompromising championship mindset, relentless discipline, and championing homegrown talent.',
    topics: ['Global Brands', 'High-Performance Teams', 'Apparel Tech', 'Executive Resilience'],
    duration: '30 Mins Full Interview',
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
    issue: 'Issue 17',
    category: 'Enterprise Tech & Digital Shift',
    image: '/resources/speakers/peterdealmeida.png',
    quote:
      'Digital transformation begins with unlearning obsolete habits and empowering engineers to challenge architectural status quos fearlessly.',
    topics: ['Enterprise Cloud', 'Culture of Innovation', 'Software Leadership', 'Future of Work'],
    duration: '26 Mins Full Interview',
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
    issue: 'Issue 15',
    category: 'Global Software Engineering',
    image: '/resources/speakers/upendra pieris.png',
    quote:
      'Scaling international engineering teams across continents hinges on trust, radical engineering transparency, and continuous technological upskilling.',
    topics: ['Nordic Software Tech', 'Engineering Teams', 'Cross-Border Tech', 'Cloud Scale'],
    duration: '25 Mins Full Interview',
    socials: {
      youtube: 'https://youtube.com',
      linkedin: 'https://linkedin.com',
      facebook: 'https://facebook.com',
      instagram: 'https://instagram.com',
    },
  },
  {
    id: 'interview-7',
    name: 'Mr. Saman Perera',
    position: 'Chief Information Officer',
    company: 'Mobitel',
    issue: 'Issue 14',
    category: 'Telecommunications & 5G',
    image: '/resources/speakers/saman perera.png',
    quote:
      'Deploying nationwide 5G cellular infrastructure and distributed cloud edge pipelines will unlock the next era of industrial IoT and automation.',
    topics: ['5G Testbeds', 'Telecom Infrastructure', 'Edge Computing', 'Digital Connectivity'],
    duration: '22 Mins Full Interview',
    socials: {
      youtube: 'https://youtube.com',
      linkedin: 'https://linkedin.com',
      facebook: 'https://facebook.com',
      instagram: 'https://instagram.com',
    },
  },
  {
    id: 'interview-8',
    name: 'Kanchana Priyakantha',
    position: 'Co-Founder & CEO',
    company: 'KReader / KBooks',
    issue: 'Issue 16',
    category: 'EdTech & Digital Publishing',
    image: '/resources/speakers/kanchana.png',
    quote:
      'Democratizing knowledge access through modern interactive reading platforms creates generational impact for youth across developing ecosystems.',
    topics: ['EdTech Platforms', 'Digital Literacy', 'Content Ecosystems', 'Youth Education'],
    duration: '20 Mins Full Interview',
    socials: {
      youtube: 'https://youtube.com',
      linkedin: 'https://linkedin.com',
      facebook: 'https://facebook.com',
      instagram: 'https://instagram.com',
    },
  },
  {
    id: 'interview-9',
    name: 'Mrs. Dilani Alagaratnam',
    position: 'President, HR & Legal',
    company: 'John Keells Holdings',
    issue: 'Issue 16',
    category: 'Corporate Governance & Talent',
    image: '/resources/speakers/dilani alagarathnan.png',
    quote:
      'Sustainable enterprise governance and diverse talent pipelines form the resilient foundation that supports massive corporate technological transformations.',
    topics: ['Corporate Law', 'Executive HR Strategy', 'Governance', 'Talent Transformation'],
    duration: '27 Mins Full Interview',
    socials: {
      youtube: 'https://youtube.com',
      linkedin: 'https://linkedin.com',
      facebook: 'https://facebook.com',
      instagram: 'https://instagram.com',
    },
  },
  {
    id: 'interview-10',
    name: 'Mr. Lasantha Wickramasinghe',
    position: 'Managing Director',
    company: 'TechLead International',
    issue: 'Issue 17',
    category: 'FinTech & Core Banking',
    image: '/resources/speakers/lasantha.png',
    quote:
      'High-frequency banking pipelines require zero-downtime reliability and uncompromising security architectures to compete in modern fintech ecosystems.',
    topics: ['Core Banking', 'High-Frequency FinTech', 'Cloud Financials', 'Payment Networks'],
    duration: '23 Mins Full Interview',
    socials: {
      youtube: 'https://youtube.com',
      linkedin: 'https://linkedin.com',
      facebook: 'https://facebook.com',
      instagram: 'https://instagram.com',
    },
  },
  {
    id: 'interview-11',
    name: 'Santhush Weeraman',
    position: 'Co-Founder & Producer',
    company: 'BNS & Saregama Music Labs',
    issue: 'Issue 12',
    category: 'Creative Multimedia & Sonic Tech',
    image: '/resources/speakers/santhush.png',
    quote:
      'Technology has liberated creative artistry, enabling South Asian sonic culture and visual storytelling to resonate with audiences globally.',
    topics: ['Multimedia Production', 'Sonic Technology', 'Creative Economy', 'Media Production'],
    duration: '29 Mins Full Interview',
    socials: {
      youtube: 'https://youtube.com',
      linkedin: 'https://linkedin.com',
      facebook: 'https://facebook.com',
      instagram: 'https://instagram.com',
    },
  },
  {
    id: 'interview-12',
    name: 'Mr. Asela Waidyalankara',
    position: 'Cyber Security & AI Policy Lead',
    company: 'Independent Cyber Strategist',
    issue: 'Issue 20',
    category: 'Cyber Security & AI Ethics',
    image: '/resources/speakers/asela.jpeg',
    quote:
      'As AI agents proliferate across vital infrastructure, proactive cyber resilience and ethical regulatory frameworks become existential necessities.',
    topics: ['Cyber Resilience', 'AI Safety & Policy', 'Threat Intelligence', 'Data Privacy'],
    duration: '25 Mins Full Interview',
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

  // Auto-cycle through interviewees one by one (without auto-focusing/scrolling)
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % INTERVIEWS_DATA.length);
    }, 5500);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  return (
    <section
      id="interviews"
      className="relative z-10 min-h-screen bg-transparent px-[5%] py-24 md:py-32"
    >
      {/* Section Header */}
      <ScrollReveal className="flex flex-col items-center justify-center text-center mb-16 sm:mb-20">
        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#B8894F]/30 bg-[#161616]/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-[#E8C896] backdrop-blur-md">
          <Radio className="h-3.5 w-3.5 text-[#E8C896] animate-pulse" />
          Exposition Talks & Executive Dialogues
        </span>

        <h2
          className="hero-heading section-title text-center font-black uppercase leading-none tracking-tight"
          style={{ fontSize: 'clamp(2.4rem, 5.5vw, 76px)' }}
        >
          Interview Highlights
        </h2>

        <p className="mt-6 max-w-2xl text-center text-sm sm:text-base leading-relaxed text-[#9A9A9A] font-light">
          In-depth conversations, visionary insights, and strategic perspectives from distinguished
          industry titans and innovators who headlined our exclusive Exposition interviews.
        </p>
      </ScrollReveal>

      {/* Main Two-Column Layout */}
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

          {/* ================= LEFT COLUMN: Scrollable Interviewees List (With Auto Display) ================= */}
          <div className="lg:col-span-5 flex flex-col space-y-3">
            <ScrollReveal delay={0.05} className="flex items-center justify-between px-2 pb-1">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#E8C896] animate-ping" />
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#9A9A9A]">
                  Featured Leaders ({INTERVIEWS_DATA.length})
                </span>
              </div>

              {/* Autoplay Pause / Play Toggle */}
              <button
                onClick={() => setIsAutoPlaying((prev) => !prev)}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.68rem] font-mono font-medium text-[#9A9A9A] hover:text-white hover:border-white/30 transition-all"
                title={isAutoPlaying ? 'Pause Auto Display' : 'Resume Auto Display'}
              >
                {isAutoPlaying ? (
                  <>
                    <Pause className="size-3 text-emerald-400" />
                    <span>Auto-Cycling</span>
                  </>
                ) : (
                  <>
                    <Play className="size-3 text-amber-400" />
                    <span>Paused</span>
                  </>
                )}
              </button>
            </ScrollReveal>

            {/* Scrollable List Container */}
            <StaggerContainer
              staggerChildren={0.06}
              className="max-h-[580px] sm:max-h-[640px] overflow-y-auto pr-2 space-y-2.5 custom-scrollbar"
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
                      className={`w-full text-left rounded-2xl p-3.5 sm:p-4 transition-all duration-300 flex items-center justify-between gap-3.5 border ${isSelected
                        ? 'bg-[#1e1e1e] border-[#B8894F]/60 shadow-[0_10px_30px_rgba(184,137,79,0.15)] scale-[1.01]'
                        : 'bg-[#141414]/90 border-white/10 hover:border-[#B8894F]/30 hover:bg-[#181818]'
                        }`}
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        {/* Avatar */}
                        <div
                          className={`size-12 sm:size-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${isSelected ? 'border-[#E8C896] shadow-md' : 'border-white/10 opacity-75'
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
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-xs sm:text-sm font-bold uppercase tracking-tight truncate ${isSelected ? 'text-white' : 'text-white/85'
                                }`}
                            >
                              {interview.name}
                            </span>
                            <span className="text-[0.62rem] font-mono px-2 py-0.5 rounded-full border border-[#B8894F]/30 bg-[#B8894F]/10 text-[#E8C896] shrink-0">
                              {interview.issue}
                            </span>
                          </div>
                          <p className="text-[0.72rem] text-[#9A9A9A] truncate mt-0.5">
                            {interview.position} • {interview.company}
                          </p>
                          <span className="text-[0.65rem] font-medium text-[#E8C896] truncate mt-0.5">
                            {interview.category}
                          </span>
                        </div>
                      </div>

                      {/* Active Chevron / Indicator */}
                      <div className="shrink-0">
                        {isSelected ? (
                          <div className="size-8 rounded-full bg-[#B8894F]/20 text-[#E8C896] flex items-center justify-center border border-[#B8894F]/40">
                            <ArrowRight className="size-4" />
                          </div>
                        ) : (
                          <div className="size-8 rounded-full text-white/20 flex items-center justify-center">
                            <ArrowRight className="size-4 opacity-40" />
                          </div>
                        )}
                      </div>
                    </button>
                  </StaggerCard>
                );
              })}
            </StaggerContainer>
          </div>

          {/* ================= RIGHT COLUMN: Featured Interview Showcase Display ================= */}
          <ScrollReveal delay={0.15} y={20} className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="relative rounded-[32px] overflow-hidden border border-white/15 bg-[#141414]/95 p-6 sm:p-8 lg:p-9 shadow-[0_30px_70px_rgba(0,0,0,0.9)] flex flex-col justify-between"
              >
                {/* Background Artwork Watermark */}
                <div className="absolute right-0 top-0 bottom-0 w-[50%] opacity-15 pointer-events-none overflow-hidden">
                  <img
                    src={activeItem.image}
                    alt={activeItem.name}
                    className="w-full h-full object-cover object-top filter contrast-125"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/80 to-transparent" />
                </div>

                {/* Top Row: Tag, Issue Pill, Duration & Live Indicator */}
                <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full border border-[#B8894F]/40 bg-[#B8894F]/10 px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider text-[#E8C896]">
                      {activeItem.issue} Special
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#9A9A9A]">
                      {activeItem.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-[#9A9A9A] bg-white/5 px-3 py-1 rounded-full border border-white/10">
                    <Video className="size-3.5 text-[#E8C896]" />
                    <span>{activeItem.duration}</span>
                  </div>
                </div>

                {/* Main Profile Info & Photo */}
                <div className="relative z-10 my-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  {/* High-Res Portrait Frame */}
                  <div className="relative size-28 sm:size-32 rounded-2xl overflow-hidden border-2 border-[#E8C896]/40 shadow-2xl shrink-0 group">
                    <img
                      src={activeItem.image}
                      alt={activeItem.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-2 left-2 flex items-center gap-1 text-[0.62rem] font-mono font-bold text-white bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-sm">
                      <Sparkles className="size-2.5 text-[#E8C896]" />
                      Key Voice
                    </div>
                  </div>

                  {/* Name, Company & Position */}
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                      {activeItem.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm sm:text-base font-semibold text-[#E8C896]">
                      <User className="size-4 text-white/40 shrink-0" />
                      <span className="truncate">{activeItem.position}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[#9A9A9A]">
                      <Building className="size-4 text-white/40 shrink-0" />
                      <span className="truncate">{activeItem.company}</span>
                    </div>
                  </div>
                </div>

                {/* Quote / Takeaway Card */}
                <div className="relative z-10 rounded-2xl bg-black/40 border border-white/10 p-5 mb-6">
                  <Quote className="size-5 text-[#E8C896]/70 mb-2" />
                  <blockquote className="text-sm sm:text-base text-white/90 font-light leading-relaxed italic">
                    &ldquo;{activeItem.quote}&rdquo;
                  </blockquote>
                </div>

                {/* Topics Pills */}
                <div className="relative z-10 space-y-2 mb-6">
                  <span className="text-[0.7rem] font-mono uppercase tracking-wider text-[#9A9A9A]">
                    Core Discussion Tracks
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeItem.topics.map((topic, i) => (
                      <span
                        key={i}
                        className="rounded-xl border border-white/10 bg-white/5 px-3 py-1 text-xs text-[#9A9A9A]"
                      >
                        #{topic}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Social & Broadcast Links Group */}
                <div className="relative z-10 pt-5 border-t border-white/10 space-y-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#9A9A9A] block">
                    Watch & Explore Interview Across Platforms
                  </span>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {/* YouTube Watch Button */}
                    <a
                      href={activeItem.socials.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 rounded-xl bg-white/5 border border-white/10 px-3 py-2.5 text-xs font-bold text-[#9A9A9A] hover:bg-[#B8894F]/15 hover:text-[#E8C896] hover:border-[#B8894F]/40 transition-all"
                    >
                      <FaYoutube className="size-4 text-[#E8C896]" />
                      <span>YouTube</span>
                    </a>

                    {/* LinkedIn Button */}
                    <a
                      href={activeItem.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 rounded-xl bg-white/5 border border-white/10 px-3 py-2.5 text-xs font-bold text-[#9A9A9A] hover:bg-[#B8894F]/15 hover:text-[#E8C896] hover:border-[#B8894F]/40 transition-all"
                    >
                      <FaLinkedinIn className="size-4 text-[#E8C896]" />
                      <span>LinkedIn</span>
                    </a>

                    {/* Facebook Button */}
                    <a
                      href={activeItem.socials.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 rounded-xl bg-white/5 border border-white/10 px-3 py-2.5 text-xs font-bold text-[#9A9A9A] hover:bg-[#B8894F]/15 hover:text-[#E8C896] hover:border-[#B8894F]/40 transition-all"
                    >
                      <FaFacebookF className="size-3.5 text-[#E8C896]" />
                      <span>Facebook</span>
                    </a>

                    {/* Instagram Button */}
                    <a
                      href={activeItem.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 rounded-xl bg-white/5 border border-white/10 px-3 py-2.5 text-xs font-bold text-[#9A9A9A] hover:bg-[#B8894F]/15 hover:text-[#E8C896] hover:border-[#B8894F]/40 transition-all"
                    >
                      <FaInstagram className="size-4 text-[#E8C896]" />
                      <span>Instagram</span>
                    </a>
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
