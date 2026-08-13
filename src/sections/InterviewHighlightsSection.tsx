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
  Layers,
  FileText,
  MessageSquareQuote,
} from 'lucide-react';
import {
  FaYoutube,
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
} from 'react-icons/fa6';
import ScrollReveal from '../components/ScrollReveal';
import { StaggerContainer, StaggerCard } from '../components/StaggerReveal';
import Testimonials, { TestimonialCardProps } from '@/components/ui/twitter-testimonial-cards';
import { Testimonial } from '@/components/ui/testimonial';

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
  const [viewMode, setViewMode] = useState<'social_stack' | 'editorial' | 'profile'>('social_stack');

  const activeItem = INTERVIEWS_DATA[selectedIndex];

  // Generate 3 Twitter cards based on selected index and adjacent interviewees
  const twitterCards: TestimonialCardProps[] = [
    {
      className:
        "[grid-area:stack] hover:-translate-y-6 before:absolute before:w-[100%] before:outline-1 before:rounded-2xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-[#0C0C0C]/60 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-500 hover:grayscale-0 before:left-0 before:top-0",
      avatar: INTERVIEWS_DATA[selectedIndex].image,
      username: INTERVIEWS_DATA[selectedIndex].name,
      handle: INTERVIEWS_DATA[selectedIndex].handle,
      content: INTERVIEWS_DATA[selectedIndex].quote,
      date: `${INTERVIEWS_DATA[selectedIndex].issue} • Exposition`,
      verified: true,
      likes: INTERVIEWS_DATA[selectedIndex].likes,
      retweets: INTERVIEWS_DATA[selectedIndex].retweets,
      tweetUrl: 'https://x.com',
    },
    {
      className:
        "[grid-area:stack] translate-x-6 sm:translate-x-10 translate-y-5 sm:translate-y-8 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-2xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-[#0C0C0C]/60 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-500 hover:grayscale-0 before:left-0 before:top-0",
      avatar: INTERVIEWS_DATA[(selectedIndex + 1) % INTERVIEWS_DATA.length].image,
      username: INTERVIEWS_DATA[(selectedIndex + 1) % INTERVIEWS_DATA.length].name,
      handle: INTERVIEWS_DATA[(selectedIndex + 1) % INTERVIEWS_DATA.length].handle,
      content: INTERVIEWS_DATA[(selectedIndex + 1) % INTERVIEWS_DATA.length].quote,
      date: `${INTERVIEWS_DATA[(selectedIndex + 1) % INTERVIEWS_DATA.length].issue} • Exposition`,
      verified: true,
      likes: INTERVIEWS_DATA[(selectedIndex + 1) % INTERVIEWS_DATA.length].likes,
      retweets: INTERVIEWS_DATA[(selectedIndex + 1) % INTERVIEWS_DATA.length].retweets,
      tweetUrl: 'https://x.com',
    },
    {
      className:
        "[grid-area:stack] translate-x-12 sm:translate-x-20 translate-y-10 sm:translate-y-16 hover:translate-y-6 sm:hover:translate-y-8",
      avatar: INTERVIEWS_DATA[(selectedIndex + 2) % INTERVIEWS_DATA.length].image,
      username: INTERVIEWS_DATA[(selectedIndex + 2) % INTERVIEWS_DATA.length].name,
      handle: INTERVIEWS_DATA[(selectedIndex + 2) % INTERVIEWS_DATA.length].handle,
      content: INTERVIEWS_DATA[(selectedIndex + 2) % INTERVIEWS_DATA.length].quote,
      date: `${INTERVIEWS_DATA[(selectedIndex + 2) % INTERVIEWS_DATA.length].issue} • Exposition`,
      verified: true,
      likes: INTERVIEWS_DATA[(selectedIndex + 2) % INTERVIEWS_DATA.length].likes,
      retweets: INTERVIEWS_DATA[(selectedIndex + 2) % INTERVIEWS_DATA.length].retweets,
      tweetUrl: 'https://x.com',
    },
  ];

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
      className="relative z-10 min-h-screen lg:h-screen lg:max-h-[105vh] w-full flex flex-col justify-center bg-transparent px-[4%] sm:px-[5%] py-4 sm:py-6 lg:py-6 overflow-hidden"
    >
      {/* Section Header */}
      <ScrollReveal className="flex flex-col items-center justify-center text-center mb-3 sm:mb-4 lg:mb-5">
        <span className="mb-1.5 inline-flex items-center gap-2 rounded-full border border-[#B8894F]/30 bg-[#161616]/70 px-3.5 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#E8C896] backdrop-blur-md">
          <Radio className="h-3 w-3 text-[#E8C896] animate-pulse" />
          Exposition Talks & Executive Dialogues
        </span>

        <h2
          className="hero-heading section-title text-center font-black uppercase leading-none tracking-tight"
          style={{ fontSize: 'clamp(2.4rem, 5.5vw, 76px)' }}
        >
          Interview Highlights
        </h2>

        <p className="mt-1 max-w-2xl text-center text-xs sm:text-sm leading-snug text-[#9A9A9A] font-light">
          In-depth conversations and strategic perspectives from distinguished industry leaders.
        </p>

        {/* View Mode Switcher Pills */}
        <div className="mt-2.5 flex flex-wrap items-center justify-center gap-1.5 p-1 rounded-full border border-white/15 bg-black/60 backdrop-blur-lg">
          <button
            onClick={() => setViewMode('social_stack')}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              viewMode === 'social_stack'
                ? 'bg-gradient-to-r from-[#B8894F] to-[#E8C896] text-black shadow-md'
                : 'text-[#9A9A9A] hover:text-white hover:bg-white/5'
            }`}
          >
            <Layers className="size-3" />
            <span>X / Twitter Stack</span>
          </button>

          <button
            onClick={() => setViewMode('editorial')}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              viewMode === 'editorial'
                ? 'bg-gradient-to-r from-[#B8894F] to-[#E8C896] text-black shadow-md'
                : 'text-[#9A9A9A] hover:text-white hover:bg-white/5'
            }`}
          >
            <MessageSquareQuote className="size-3" />
            <span>Editorial Quote</span>
          </button>

          <button
            onClick={() => setViewMode('profile')}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              viewMode === 'profile'
                ? 'bg-white text-black shadow-md'
                : 'text-[#9A9A9A] hover:text-white hover:bg-white/5'
            }`}
          >
            <FileText className="size-3" />
            <span>Executive Profile</span>
          </button>
        </div>
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

              {/* Autoplay Pause / Play Toggle */}
              <button
                onClick={() => setIsAutoPlaying((prev) => !prev)}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[0.62rem] font-mono font-medium text-[#9A9A9A] hover:text-white hover:border-white/30 transition-all cursor-pointer"
                title={isAutoPlaying ? 'Pause Auto Display' : 'Resume Auto Display'}
              >
                {isAutoPlaying ? (
                  <>
                    <Pause className="size-2.5 text-emerald-400" />
                    <span>Auto-Cycling</span>
                  </>
                ) : (
                  <>
                    <Play className="size-2.5 text-amber-400" />
                    <span>Paused</span>
                  </>
                )}
              </button>
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
                      className={`w-full text-left rounded-2xl p-2.5 sm:p-3 transition-all duration-300 flex items-center justify-between gap-3 border cursor-pointer ${
                        isSelected
                          ? 'bg-[#1e1e1e] border-[#B8894F]/60 shadow-[0_10px_25px_rgba(184,137,79,0.15)] scale-[1.01]'
                          : 'bg-[#141414]/90 border-white/10 hover:border-[#B8894F]/30 hover:bg-[#181818]'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Avatar */}
                        <div
                          className={`size-10 sm:size-11 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                            isSelected ? 'border-[#E8C896] shadow-md' : 'border-white/10 opacity-75'
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
                              className={`text-xs sm:text-sm font-bold uppercase tracking-tight truncate ${
                                isSelected ? 'text-white' : 'text-white/85'
                              }`}
                            >
                              {interview.name}
                            </span>
                            <span className="text-[0.58rem] font-mono px-1.5 py-0.2 rounded-full border border-[#B8894F]/30 bg-[#B8894F]/10 text-[#E8C896] shrink-0">
                              {interview.issue}
                            </span>
                          </div>
                          <p className="text-[0.68rem] text-[#9A9A9A] truncate mt-0.5">
                            {interview.position} • {interview.company}
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

          {/* ================= RIGHT COLUMN: Twitter Cards Stack or Executive Profile ================= */}
          <ScrollReveal delay={0.15} y={16} className="lg:col-span-7 flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              {viewMode === 'social_stack' ? (
                /* ================= TWITTER / X STACKED TESTIMONIAL CARDS ================= */
                <motion.div
                  key={`social-${selectedIndex}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="w-full flex flex-col items-center justify-center py-2"
                >
                  <div className="flex items-center gap-2 mb-2 self-center sm:self-start">
                    <span className="h-2 w-2 rounded-full bg-[#E8C896] animate-pulse" />
                    <span className="text-[0.68rem] font-mono font-bold uppercase tracking-widest text-[#9A9A9A]">
                      Executive Thought Leadership Quotes (Hover / Tap to Expand)
                    </span>
                  </div>

                  <Testimonials cards={twitterCards} />
                </motion.div>
              ) : viewMode === 'editorial' ? (
                /* ================= EDITORIAL HIGHLIGHTED TESTIMONIAL SPOTLIGHT ================= */
                <motion.div
                  key={`editorial-${activeItem.id}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="w-full relative rounded-3xl overflow-hidden border border-white/15 bg-[#141414]/95 p-4 sm:p-6 shadow-[0_25px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl flex flex-col justify-center items-center"
                >
                  {/* Subtle Background Glow */}
                  <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 w-64 h-32 bg-[#B8894F]/15 rounded-full blur-3xl" />

                  <Testimonial
                    quote={activeItem.quote}
                    highlightedText={
                      activeItem.quote.includes('empathy')
                        ? 'cultural empathy'
                        : activeItem.quote.includes('curiosity')
                        ? 'engineering curiosity'
                        : activeItem.quote.includes('mindfulness')
                        ? 'mindfulness'
                        : activeItem.quote.includes('championship mindset')
                        ? 'championship mindset'
                        : activeItem.quote.includes('unlearning')
                        ? 'unlearning obsolete habits'
                        : 'engineering transparency'
                    }
                    authorName={activeItem.name}
                    authorPosition={`${activeItem.position}, ${activeItem.company} • ${activeItem.issue}`}
                    authorImage={activeItem.image}
                  />

                  {/* Discussion Track Badges */}
                  <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2 border-t border-white/10 w-full">
                    {activeItem.topics.map((t, i) => (
                      <span
                        key={i}
                        className="rounded-lg bg-white/5 border border-white/10 px-2 py-0.5 text-[0.62rem] font-mono text-[#9A9A9A]"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ) : (
                /* ================= EXECUTIVE PROFILE SHOWCASE ================= */
                <motion.div
                  key={`profile-${activeItem.id}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="w-full relative rounded-3xl overflow-hidden border border-white/15 bg-[#141414]/95 p-4 sm:p-5 shadow-[0_25px_60px_rgba(0,0,0,0.9)] flex flex-col justify-between"
                >
                  {/* Background Artwork Watermark */}
                  <div className="absolute right-0 top-0 bottom-0 w-[45%] opacity-15 pointer-events-none overflow-hidden">
                    <img
                      src={activeItem.image}
                      alt={activeItem.name}
                      className="w-full h-full object-cover object-top filter contrast-125"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/80 to-transparent" />
                  </div>

                  {/* Top Row: Tag, Issue Pill, Duration & Live Indicator */}
                  <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full border border-[#B8894F]/40 bg-[#B8894F]/10 px-2.5 py-0.5 text-[0.65rem] font-mono font-bold uppercase tracking-wider text-[#E8C896]">
                        {activeItem.issue} Special
                      </span>
                      <span className="text-[0.68rem] font-semibold uppercase tracking-wider text-[#9A9A9A]">
                        {activeItem.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono text-[#9A9A9A] bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10">
                      <Video className="size-3 text-[#E8C896]" />
                      <span>{activeItem.duration}</span>
                    </div>
                  </div>

                  {/* Main Profile Info & Photo */}
                  <div className="relative z-10 my-3 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    {/* High-Res Portrait Frame */}
                    <div className="relative size-20 sm:size-24 rounded-2xl overflow-hidden border-2 border-[#E8C896]/40 shadow-xl shrink-0 group">
                      <img
                        src={activeItem.image}
                        alt={activeItem.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-1.5 left-1.5 flex items-center gap-1 text-[0.55rem] font-mono font-bold text-white bg-black/60 px-1.5 py-0.5 rounded-md backdrop-blur-sm">
                        <Sparkles className="size-2 text-[#E8C896]" />
                        Key Voice
                      </div>
                    </div>

                    {/* Name, Company & Position */}
                    <div className="space-y-1 flex-1 min-w-0">
                      <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight text-white">
                        {activeItem.name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-[#E8C896]">
                        <User className="size-3.5 text-white/40 shrink-0" />
                        <span className="truncate">{activeItem.position}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[0.72rem] font-medium text-[#9A9A9A]">
                        <Building className="size-3.5 text-white/40 shrink-0" />
                        <span className="truncate">{activeItem.company}</span>
                      </div>
                    </div>
                  </div>

                  {/* Quote / Takeaway Card */}
                  <div className="relative z-10 rounded-xl bg-black/40 border border-white/10 p-3 mb-3">
                    <Quote className="size-4 text-[#E8C896]/70 mb-1" />
                    <blockquote className="text-xs sm:text-sm text-white/90 font-light leading-relaxed italic">
                      &ldquo;{activeItem.quote}&rdquo;
                    </blockquote>
                  </div>

                  {/* Topics Pills */}
                  <div className="relative z-10 space-y-1.5 mb-3">
                    <span className="text-[0.62rem] font-mono uppercase tracking-wider text-[#9A9A9A]">
                      Core Discussion Tracks
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeItem.topics.map((topic, i) => (
                        <span
                          key={i}
                          className="rounded-lg border border-white/10 bg-white/5 px-2 py-0.5 text-[0.65rem] text-[#9A9A9A]"
                        >
                          #{topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Social & Broadcast Links Group */}
                  <div className="relative z-10 pt-2.5 border-t border-white/10 space-y-2">
                    <span className="text-[0.65rem] font-mono uppercase tracking-wider text-[#9A9A9A] block">
                      Watch & Explore Interview Across Platforms
                    </span>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <a
                        href={activeItem.socials.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 rounded-xl bg-white/5 border border-white/10 px-2 py-1.5 text-xs font-bold text-[#9A9A9A] hover:bg-[#B8894F]/15 hover:text-[#E8C896] hover:border-[#B8894F]/40 transition-all"
                      >
                        <FaYoutube className="size-3.5 text-[#E8C896]" />
                        <span>YouTube</span>
                      </a>

                      <a
                        href={activeItem.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 rounded-xl bg-white/5 border border-white/10 px-2 py-1.5 text-xs font-bold text-[#9A9A9A] hover:bg-[#B8894F]/15 hover:text-[#E8C896] hover:border-[#B8894F]/40 transition-all"
                      >
                        <FaLinkedinIn className="size-3.5 text-[#E8C896]" />
                        <span>LinkedIn</span>
                      </a>

                      <a
                        href={activeItem.socials.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 rounded-xl bg-white/5 border border-white/10 px-2 py-1.5 text-xs font-bold text-[#9A9A9A] hover:bg-[#B8894F]/15 hover:text-[#E8C896] hover:border-[#B8894F]/40 transition-all"
                      >
                        <FaFacebookF className="size-3 text-[#E8C896]" />
                        <span>Facebook</span>
                      </a>

                      <a
                        href={activeItem.socials.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 rounded-xl bg-white/5 border border-white/10 px-2 py-1.5 text-xs font-bold text-[#9A9A9A] hover:bg-[#B8894F]/15 hover:text-[#E8C896] hover:border-[#B8894F]/40 transition-all"
                      >
                        <FaInstagram className="size-3.5 text-[#E8C896]" />
                        <span>Instagram</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
