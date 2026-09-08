import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
      className="relative z-10 min-h-screen w-full flex flex-col justify-center bg-[#0c0c0c] px-[5%] py-14 sm:py-20 md:py-24 overflow-hidden"
    >
      {/* ================= SECTION-LEVEL DYNAMIC SKEWED BACKDROP BANNER (Top Margins on Slices 1, 3, 5) ================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-45">
        <motion.div
          className="absolute -inset-x-20 top-0 bottom-0 flex justify-between items-start gap-3 sm:gap-5 -skew-x-12 scale-105"
          initial={{ opacity: 0.9 }}
          animate={{ opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          {Array.from({ length: 6 }).map((_, idx) => {
            const item = INTERVIEWS_DATA[idx % INTERVIEWS_DATA.length];
            // Explicit Margin Top for Slices 1, 3, 5 (idx 0, 2, 4)
            // Slices 2, 4, 6 (idx 1, 3, 5) have mt-0
            const sliceMarginClass = idx % 2 === 0 ? 'mt-20 sm:mt-32 md:mt-40' : 'mt-0';

            return (
              <div
                key={`bg-slice-${idx}`}
                className={`relative flex-1 h-[130%] min-w-0 bg-[#0c0c0c] border-r-4 border-[#0c0c0c] ring-1 ring-[#c9a25f]/30 overflow-hidden shadow-2xl ${sliceMarginClass} transition-all duration-700`}
              >
                {/* Photo Layer - Properly Centered Image */}
                <img
                  src={encodeURI(item.image)}
                  alt={`Background Slice ${idx + 1}`}
                  className="absolute inset-0 w-full h-full object-cover object-center filter grayscale contrast-120 brightness-85 opacity-75"
                />

                {/* Subtle dark gold vignette overlay on each slice */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c0c]/50 via-[#0c0c0c]/30 to-[#0c0c0c]/70 z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#c9a25f]/15 via-transparent to-transparent z-10" />
              </div>
            );
          })}
        </motion.div>

        {/* Diagonal Gold Streak Accent Lines */}
        <div className="absolute top-1/3 -left-20 w-[150%] h-[3px] bg-gradient-to-r from-transparent via-[#c9a25f]/60 to-transparent -skew-y-6 pointer-events-none z-30" />
        <div className="absolute bottom-1/4 -left-20 w-[150%] h-[2px] bg-gradient-to-r from-transparent via-[#e8a33d]/50 to-transparent -skew-y-6 pointer-events-none z-30" />
      </div>

      {/* Section Header */}
      <ScrollReveal className="flex flex-col items-center justify-center text-center pt-4 sm:pt-6 mb-6 sm:mb-8 relative z-20">
        <h2
          className="hero-heading section-title text-center font-black uppercase leading-tight tracking-tight pt-2"
          style={{ fontSize: 'clamp(2.4rem, 5.5vw, 76px)' }}
        >
          Interview Highlights
        </h2>
      </ScrollReveal>

      {/* Main IPN Conclave Banner Container */}
      <div className="mx-auto max-w-7xl w-full relative z-20">
        <div className="rounded-3xl border border-[#c9a25f]/30 bg-black/10 p-6 sm:p-10 shadow-[0_30px_70px_rgba(0,0,0,0.5)] flex flex-col gap-10">

          {/* ================= TOP SECTION: FEATURED KEYNOTE SPOTLIGHT + EVENT DETAILS ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-[#c9a25f]/20 pb-10">

            {/* TOP-LEFT: Keynote Speaker / Featured Interviewee Card */}
            <div className="lg:col-span-5 flex flex-col sm:flex-row items-center sm:items-start gap-6">

              {/* Featured Photo Card (Clean image without gold reveal background) */}
              <div className="relative group/photo shrink-0 w-[170px] h-[220px] sm:w-[200px] sm:h-[260px] rounded-xl shadow-2xl border border-white/10 overflow-hidden bg-[#0a0908]">
                {/* Photo: Full Container */}
                <img
                  src={activeItem.image}
                  alt={activeItem.name}
                  className="w-full h-full object-cover object-top contrast-110 brightness-105 transition-all duration-500"
                />
              </div>

              {/* Speaker Header Info */}
              <div className="flex flex-col text-center sm:text-left justify-center my-auto space-y-2">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#c9a25f]">
                  {activeItem.issue}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white drop-shadow-md">
                  {activeItem.name}
                </h3>
                <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#c9a25f]">
                  {activeItem.position}
                </p>
                <p className="text-xs font-medium text-[#9a9a9a]">
                  {activeItem.company}
                </p>
              </div>
            </div>

            {/* TOP-RIGHT: Full Interview Details & Quote Card */}
            <div className="lg:col-span-7 flex flex-col space-y-4">
              {/* Featured Quote Card with Large Quotes Layout */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`quote-${activeItem.id}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full p-4 sm:p-6 flex flex-col justify-between items-center text-center overflow-hidden min-h-[200px]"
                >
                  {/* Top-Left Large Decorative Quotation Mark */}
                  <div className="absolute -top-4 -left-2 text-[#c9a25f]/35 font-serif text-8xl sm:text-9xl md:text-[10rem] font-bold leading-none select-none pointer-events-none z-0">
                    “
                  </div>

                  {/* Quote Body: Bold, Italicized, Centered Typography */}
                  <blockquote className="relative z-10 my-auto text-base sm:text-xl font-extrabold italic tracking-tight text-[#f5ebd9] leading-snug sm:leading-normal max-w-xl py-2">
                    {activeItem.quote}
                  </blockquote>

                  {/* Bottom-Right Large Decorative Quotation Mark */}
                  <div className="absolute -bottom-10 -right-2 text-[#c9a25f]/35 font-serif text-8xl sm:text-9xl md:text-[10rem] font-bold leading-none select-none pointer-events-none z-0">
                    ”
                  </div>

                  {/* Footer Stats Row */}
                  <div className="relative z-10 w-full flex items-center justify-end pt-3 border-t border-white/10 text-xs font-mono text-[#9a9a9a]">
                    <span className="text-[#c9a25f] font-bold">{activeItem.handle}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

          {/* ================= BOTTOM SECTION: HORIZONTAL PANEL DISCUSSION ROW ================= */}
          <div className="flex flex-col space-y-4">

            {/* Horizontal Cards Grid (5-6 Panelist Cards) */}
            <StaggerContainer
              staggerChildren={0.06}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4"
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
                      className={`group w-full flex flex-col items-center text-center p-2 rounded-xl transition-all duration-300 cursor-pointer ${isSelected ? 'scale-105' : 'hover:scale-[1.02] opacity-80 hover:opacity-100'}`}
                    >
                      {/* Panelist Photo Container (Full Color Photos) */}
                      <div className={`relative w-full aspect-[3/4] rounded-xl overflow-hidden shadow-md border transition-all bg-[#0a0908] ${isSelected ? 'border-[#c9a25f] ring-2 ring-[#c9a25f]/50 shadow-[0_5px_20px_rgba(201,162,95,0.3)]' : 'border-white/10'}`}>

                        {/* Photo: Full Color only when selected/active; Grayscale for others */}
                        <img
                          src={interview.image}
                          alt={interview.name}
                          className={`w-full h-full object-cover object-top transition-all duration-300 ${
                            isSelected
                              ? 'filter grayscale-0 contrast-110 brightness-105'
                              : 'filter grayscale contrast-125 group-hover:grayscale-0'
                          }`}
                        />

                        {/* Top-Left Dark Tag */}
                        <div className="absolute top-1 left-0 bg-[#0c0c0c]/90 text-white text-[0.42rem] font-mono font-bold uppercase px-1.5 py-0.5 border-y border-r border-white/20 z-10">
                          {isSelected ? 'ACTIVE' : 'PANELIST'}
                        </div>
                      </div>

                      {/* Name & Role Underneath Card */}
                      <div className="mt-2.5 flex flex-col items-center w-full px-1">
                        <h6 className={`text-[0.7rem] sm:text-xs font-extrabold uppercase tracking-tight truncate w-full ${isSelected ? 'text-white' : 'text-white/80'}`}>
                          {interview.name}
                        </h6>
                        <p className="text-[0.6rem] text-[#c9a25f] font-semibold truncate w-full mt-0.5">
                          {interview.position}
                        </p>
                      </div>
                    </button>
                  </StaggerCard>
                );
              })}
            </StaggerContainer>

          </div>

        </div>
      </div>
    </section>
  );
}
