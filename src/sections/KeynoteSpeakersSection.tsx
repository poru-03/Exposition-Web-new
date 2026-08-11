import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Mic2, ArrowRight } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import { CircularTestimonials, Testimonial } from '@/components/ui/circular-testimonials';

export type KeynoteSpeaker = {
  id: string;
  name: string;
  title: string;
  company: string;
  issue: string;
  image: string;
  category: 'Tech & AI' | 'Corporate Leadership' | 'Creative Arts' | 'Innovation';
  tags: string[];
  quote: string;
  highlight?: string;
};

export const ROW1_SPEAKERS: KeynoteSpeaker[] = [
  {
    id: 'speaker-1',
    name: 'Dhanika Perera',
    title: 'Serial Entrepreneur & Platform Innovator',
    company: 'Founder & CEO, Bhasha / Helakuru',
    issue: 'Issue 07',
    image: '/resources/speakers/dhanika perera.png',
    category: 'Tech & AI',
    tags: ['Tech Innovation', 'Digital Platforms'],
    quote: 'Disrupting ecosystems through digital engineering platforms and empowering millions with native tech.',
    highlight: 'Featured Innovator',
  },
  {
    id: 'speaker-2',
    name: 'Deepal Sooriyaarachchi',
    title: 'Management Consultant & Author',
    company: 'Former Managing Director, AVIVA NDB',
    issue: 'Issue 20',
    image: '/resources/speakers/deepal sooriyarachchi.png',
    category: 'Corporate Leadership',
    tags: ['Leadership', 'Corporate Strategy'],
    quote: 'Sustaining corporate governance and unlocking human potential in volatile, evolving global markets.',
    highlight: 'Keynote Address',
  },
  {
    id: 'speaker-3',
    name: 'Peter De Almeida',
    title: 'Technology Visionary & Executive',
    company: 'Managing Director / CEO, N-able',
    issue: 'Issue 17',
    image: '/resources/speakers/peterdealmeida.png',
    category: 'Tech & AI',
    tags: ['Enterprise Tech', 'Digital Shift'],
    quote: 'Transforming enterprise architectures and digital cultures through fearless creative software thinking.',
    highlight: 'Industrial Leader',
  },
  {
    id: 'speaker-4',
    name: 'Dr. Harsha Subasinghe',
    title: 'Founder & CEO, CodeGen International',
    company: 'Creator of Vega Innovations & AI Engines',
    issue: 'Issue 19',
    image: '/resources/speakers/harsha.png',
    category: 'Tech & AI',
    tags: ['AI Engines', 'EV Engineering', 'Innovation'],
    quote: 'Building world-class AI engines and pioneering high-performance electric supercars from South Asia.',
    highlight: 'Deep Tech Pioneer',
  },
  {
    id: 'speaker-5',
    name: 'Kanchana Priyakantha',
    title: 'Co-Founder & CEO, KReader / KBooks',
    company: 'EdTech Pioneer & Digital Publisher',
    issue: 'Issue 16',
    image: '/resources/speakers/kanchana.png',
    category: 'Innovation',
    tags: ['EdTech', 'Digital Publishing'],
    quote: 'Empowering digital literacy and democratizing knowledge distribution across modern interactive channels.',
    highlight: 'EdTech Lead',
  },
  {
    id: 'speaker-6',
    name: 'W.K.H. Wegapitiya',
    title: 'Technology Leader & Industrial Pioneer',
    company: 'Chairman, LAUGFS Holdings',
    issue: 'Issue 15',
    image: '/resources/speakers/ananda handunge.png',
    category: 'Corporate Leadership',
    tags: ['Energy Systems', 'Industry 4.0'],
    quote: 'Leading technological advancement and bold digital transformation initiatives that redefine core industries.',
    highlight: 'Industry Pioneer',
  },
];

export const ROW2_SPEAKERS: KeynoteSpeaker[] = [
  {
    id: 'speaker-7',
    name: 'Dian Gomes',
    title: 'Global Business Leader & Motivational Icon',
    company: 'Former Managing Director, MAS Holdings',
    issue: 'Issue 18',
    image: '/resources/speakers/dian gomez.png',
    category: 'Corporate Leadership',
    tags: ['High Performance', 'Global Brands'],
    quote: 'Championing relentless high-performance team cultures and building internationally competitive enterprise powerhouses.',
    highlight: 'Executive Spotlight',
  },
  {
    id: 'speaker-8',
    name: 'Sushena Ranatunga',
    title: 'Software Engineering Leader',
    company: 'Director / Co-Founder, Creative Software',
    issue: 'Issue 15',
    image: '/resources/speakers/upendra pieris.png',
    category: 'Tech & AI',
    tags: ['Global Engineering', 'Nordic Tech'],
    quote: 'Architecting resilient enterprise software solutions and scaling world-class engineering teams across continents.',
    highlight: 'Tech Keynote',
  },
  {
    id: 'speaker-9',
    name: 'Santhush Weeraman',
    title: 'Creative Industry Entrepreneur & Producer',
    company: 'Co-Founder, BNS & Saregama Music Labs',
    issue: 'Issue 12',
    image: '/resources/speakers/santhush.png',
    category: 'Creative Arts',
    tags: ['Sonic Tech', 'Media Arts'],
    quote: 'Fusing cutting-edge multimedia production technology with authentic cultural storytelling and modern artistry.',
    highlight: 'Creative Lead',
  },
  {
    id: 'speaker-10',
    name: 'Mr. Saman Perera',
    title: 'Chief Information Officer, Mobitel',
    company: 'Telecom Architecture Specialist',
    issue: 'Issue 14',
    image: '/resources/speakers/saman perera.png',
    category: 'Tech & AI',
    tags: ['5G Networks', 'Cloud Telecom'],
    quote: 'Deploying next-generation cellular infrastructure, 5G testbeds, and enterprise distributed data pipelines.',
    highlight: 'Telecom Pioneer',
  },
  {
    id: 'speaker-11',
    name: 'Mrs. Dilani Alagaratnam',
    title: 'President, HR & Legal, John Keells Holdings',
    company: 'Corporate Governance Executive',
    issue: 'Issue 16',
    image: '/resources/speakers/dilani alagarathnan.png',
    category: 'Corporate Leadership',
    tags: ['Corporate Law', 'Executive HR'],
    quote: 'Cultivating sustainable corporate governance frameworks and building future-ready talent architectures.',
    highlight: 'Corporate Leader',
  },
  {
    id: 'speaker-12',
    name: 'Mr. Lasantha Wickramasinghe',
    title: 'Managing Director, TechLead International',
    company: 'Fintech & Enterprise Systems',
    issue: 'Issue 17',
    image: '/resources/speakers/lasantha.png',
    category: 'Innovation',
    tags: ['FinTech', 'Cloud Architecture'],
    quote: 'Scaling mission-critical banking and fintech infrastructure across international technological hubs.',
    highlight: 'Fintech Lead',
  },
];

const ALL_SPEAKERS = [...ROW1_SPEAKERS, ...ROW2_SPEAKERS];

const TESTIMONIALS_DATA: Testimonial[] = ALL_SPEAKERS.slice(0, 6).map((speaker) => ({
  name: speaker.name,
  designation: `${speaker.title} • ${speaker.company}`,
  quote: speaker.quote,
  src: speaker.image,
}));

function SpeakerLandscapeCard({ speaker }: { speaker: KeynoteSpeaker }) {
  return (
    <div className="group relative w-[360px] sm:w-[440px] md:w-[480px] h-[250px] sm:h-[270px] rounded-3xl overflow-hidden border border-[#D7E2EA]/15 bg-[#141414]/95 shadow-[0_25px_60px_rgba(0,0,0,0.9)] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:border-white/40 hover:scale-[1.02] shrink-0">
      {/* Background Speaker Photo Artwork Overlay */}
      <div className="absolute right-0 top-0 bottom-0 w-[55%] opacity-30 group-hover:opacity-45 transition-opacity duration-300 pointer-events-none overflow-hidden">
        <img
          src={speaker.image}
          alt={speaker.name}
          className="w-full h-full object-cover object-top filter brightness-110 contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/70 to-transparent" />
      </div>

      {/* Top Header Row: Issue Badge & Category Tag */}
      <div className="relative z-10 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[0.7rem] font-mono font-bold uppercase tracking-wider text-[#D7E2EA]">
            {speaker.issue}
          </span>
          <span className="text-[0.7rem] font-semibold uppercase tracking-wider text-indigo-400">
            {speaker.category}
          </span>
        </div>

        {speaker.highlight && (
          <span className="text-[0.65rem] font-mono text-white/40 uppercase tracking-widest hidden sm:inline-block">
            {speaker.highlight}
          </span>
        )}
      </div>

      {/* Main Content Body */}
      <div className="relative z-10 space-y-1.5 pr-12 sm:pr-16">
        <h4 className="text-lg sm:text-xl md:text-2xl font-black uppercase tracking-tight text-[#D7E2EA] group-hover:text-white transition-colors truncate">
          {speaker.name}
        </h4>
        <p className="text-xs sm:text-sm font-medium text-white/50 truncate">
          {speaker.title}
        </p>
        <p className="text-xs sm:text-sm text-[#D7E2EA]/75 font-light line-clamp-2 leading-relaxed mt-1">
          &ldquo;{speaker.quote}&rdquo;
        </p>
      </div>

      {/* Bottom Footer: Company Affiliation + Action Button */}
      <div className="relative z-10 flex items-center justify-between pt-3 border-t border-white/10">
        <span className="text-[0.7rem] font-mono text-white/50 truncate max-w-[220px]">
          {speaker.company}
        </span>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-white/80 group-hover:text-white group-hover:translate-x-1 transition-all">
          <span>Explore</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </div>
      </div>
    </div>
  );
}

export default function KeynoteSpeakersSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Spring physics for responsive momentum
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 32,
    restDelta: 0.001,
  });

  // Row 1: Left to Right on scroll down (-35% -> 10%)
  // When scrolling DOWN (0 -> 1): shifts from -35% to 10% (flows Left to Right ->)
  // When scrolling UP (1 -> 0): shifts from 10% to -35% (flows Right to Left <-)
  const x1 = useTransform(smoothProgress, [0, 1], ['-35%', '10%']);

  // Row 2: Right to Left on scroll down (10% -> -35%)
  // When scrolling DOWN (0 -> 1): shifts from 10% to -35% (flows Right to Left <-)
  // When scrolling UP (1 -> 0): shifts from -35% to 10% (flows Left to Right ->)
  const x2 = useTransform(smoothProgress, [0, 1], ['10%', '-35%']);

  return (
    <section
      id="keynote-speakers"
      ref={sectionRef}
      className="relative z-10 min-h-screen bg-transparent py-24 sm:py-32 overflow-hidden w-full"
    >
      {/* Section Header */}
      <div className="flex flex-col items-center justify-center text-center mb-16 sm:mb-20 px-[5%]">
        <FadeIn
          as="span"
          delay={0}
          y={20}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D7E2EA]/20 bg-[#161616]/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-[#D7E2EA]/80 backdrop-blur-md"
        >
          <Mic2 className="h-3.5 w-3.5 text-[#D7E2EA]" />
          Voices of Impact & Inspiration
        </FadeIn>

        <FadeIn
          as="h2"
          delay={0.1}
          y={40}
          className="hero-heading text-center font-black uppercase leading-none tracking-tight text-[#D7E2EA]"
          style={{ fontSize: 'clamp(2.2rem, 6.5vw, 84px)' }}
        >
          Keynote Speakers
        </FadeIn>

        <FadeIn
          as="p"
          delay={0.2}
          y={20}
          className="mt-6 max-w-2xl text-center text-sm sm:text-base leading-relaxed text-[#D7E2EA]/70 font-light"
        >
          Distinguished technology visionaries, corporate icons, and creative pioneers who
          have headlined the Exposition symposium and shaped the global technological landscape.
        </FadeIn>
      </div>

      <div className="space-y-16 sm:space-y-20">
        
        {/* ================= 1. CIRCULAR TESTIMONIALS 3D SPOTLIGHT ================= */}
        <div className="mx-auto max-w-6xl px-[5%]">
          <FadeIn delay={0.25} y={30}>
            <div className="bg-transparent border-none p-0 flex flex-col items-center justify-center shadow-none">
              <div className="flex items-center gap-2 mb-4 self-start">
                <span className="h-2 w-2 rounded-full bg-indigo-400 animate-pulse" />
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D7E2EA]/60">
                  Featured Voices Spotlight
                </span>
              </div>

              <div className="w-full flex justify-center">
                <CircularTestimonials
                  testimonials={TESTIMONIALS_DATA}
                  autoplay={true}
                  colors={{
                    name: '#D7E2EA',
                    designation: '#94a3b8',
                    testimony: '#cbd5e1',
                    arrowBackground: '#1e1e1e',
                    arrowForeground: '#f1f1f7',
                    arrowHoverBackground: '#6366f1',
                  }}
                  fontSizes={{
                    name: 'clamp(1.5rem, 2.5vw, 2.2rem)',
                    designation: '0.95rem',
                    quote: 'clamp(1rem, 1.4vw, 1.25rem)',
                  }}
                />
              </div>
            </div>
          </FadeIn>
        </div>

        {/* ================= 2. SCROLL-DRIVEN DUAL-ROW PARALLAX STREAM ================= */}
        <div className="relative w-full overflow-hidden space-y-6 pt-4">
          <div className="flex items-center justify-between px-[5%] max-w-7xl mx-auto">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D7E2EA]/60 flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-400" />
              All Keynote Speakers Roster ({ALL_SPEAKERS.length})
            </span>
            <span className="text-[0.65rem] font-mono text-white/40 uppercase tracking-wider hidden sm:inline-block">
              Scroll-reactive parallax stream
            </span>
          </div>

          {/* Row 1: Flows Left-to-Right on scroll down, Right-to-Left on scroll up */}
          <div className="relative w-full overflow-hidden flex items-center">
            <motion.div
              style={{ x: x1 }}
              className="flex gap-6 shrink-0 will-change-transform"
            >
              {[...ROW1_SPEAKERS, ...ROW1_SPEAKERS].map((speaker, idx) => (
                <SpeakerLandscapeCard key={`${speaker.id}-r1-${idx}`} speaker={speaker} />
              ))}
            </motion.div>

            {/* Side Fade Vignettes */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-36 bg-gradient-to-r from-[#0C0C0C] to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-36 bg-gradient-to-l from-[#0C0C0C] to-transparent z-10" />
          </div>

          {/* Row 2: Flows Right-to-Left on scroll down, Left-to-Right on scroll up */}
          <div className="relative w-full overflow-hidden flex items-center">
            <motion.div
              style={{ x: x2 }}
              className="flex gap-6 shrink-0 will-change-transform"
            >
              {[...ROW2_SPEAKERS, ...ROW2_SPEAKERS].map((speaker, idx) => (
                <SpeakerLandscapeCard key={`${speaker.id}-r2-${idx}`} speaker={speaker} />
              ))}
            </motion.div>

            {/* Side Fade Vignettes */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-36 bg-gradient-to-r from-[#0C0C0C] to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-36 bg-gradient-to-l from-[#0C0C0C] to-transparent z-10" />
          </div>
        </div>

      </div>
    </section>
  );
}
