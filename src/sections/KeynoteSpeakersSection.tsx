import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import { CircularTestimonials, Testimonial } from '@/components/ui/circular-testimonials';

export type KeynoteSpeaker = {
  id: string;
  name: string;
  title: string;
  company: string;
  issue: string;
  issueLabel?: string;
  subtitle?: string;
  description?: string;
  image: string;
  category: 'Tech & AI' | 'Corporate Leadership' | 'Creative Arts' | 'Innovation';
  tags: string[];
  quote: string;
  highlight?: string;
};

export const ROW1_SPEAKERS: KeynoteSpeaker[] = [
  {
    id: 'speaker-issue-20',
    name: 'Deepal Sooriyarachchi',
    title: 'Management Consultant & Author',
    company: 'Former MD - AVIVA NDB',
    issue: 'Issue 20',
    issueLabel: 'Issue 20',
    image: '/speakers/deepal-sooriyarachchi.png',
    category: 'Corporate Leadership',
    tags: ['Corporate Governance', 'Strategic Management'],
    quote: 'Sustaining corporate governance and unlocking human potential in volatile, evolving global markets.',
    highlight: 'Keynote Address',
  },
  {
    id: 'speaker-issue-19',
    name: 'Dian Gomes',
    title: 'Former Group Director',
    subtitle: 'MAS Holdings',
    company: 'MAS Holdings',
    description: 'Influential figure in Sri Lankan business and apparel industry.',
    issue: 'Issue 19',
    issueLabel: 'Issue 19',
    image: '/speakers/dian-gomes.png',
    category: 'Corporate Leadership',
    tags: ['Business Development', 'Leadership', 'Apparel Industry'],
    quote: 'Influential figure in Sri Lankan business and apparel industry, championing high-performance team cultures.',
    highlight: 'Featured Keynote',
  },
  {
    id: 'speaker-issue-18',
    name: 'Peter De Almeida',
    title: 'Managing Director / CEO',
    company: 'N-able',
    issue: 'Issue 18',
    issueLabel: 'Issue 18',
    image: '/speakers/peter-de-almeida.png',
    category: 'Tech & AI',
    tags: ['Enterprise Tech', 'Digital Transformation'],
    quote: 'Transforming enterprise architectures and digital cultures through fearless creative software thinking.',
    highlight: 'Tech Solutions Innovator',
  },
  {
    id: 'speaker-issue-17',
    name: 'Dhanika Perera',
    title: 'Founder & CEO',
    company: 'Bhasha / Helakuru',
    issue: 'Issue 17',
    issueLabel: 'Issue 17',
    image: '/speakers/dhanika-perera.png',
    category: 'Tech & AI',
    tags: ['Tech Innovation', 'Digital Platforms'],
    quote: 'Disrupting ecosystems through digital engineering platforms and empowering millions with native tech.',
    highlight: 'Tech Innovator',
  },
  {
    id: 'speaker-issue-16',
    name: 'W.K.H. Wegapitiya',
    title: 'Chairman',
    company: 'LAUGFS Holdings',
    issue: 'Issue 16',
    issueLabel: 'Issue 16',
    image: '/speakers/w-k-h-wegapitiya.png',
    category: 'Corporate Leadership',
    tags: ['Energy Vision', 'Conglomerate Leadership'],
    quote: 'Leading technological advancement and bold industrial transformation initiatives that redefine core industries.',
    highlight: 'Energy Visionary',
  },
  {
    id: 'speaker-issue-15',
    name: 'Sushena Ranatunga',
    title: 'Director / Co-Founder',
    company: 'Creative Software',
    issue: 'Issue 15',
    issueLabel: 'Issue 15',
    image: '/speakers/sushena-ranathunga.png',
    category: 'Tech & AI',
    tags: ['Software Engineering', 'Innovation Strategy'],
    quote: 'Architecting resilient enterprise software solutions and scaling world-class engineering teams across borders.',
    highlight: 'Tech Keynote',
  },
];

export const ROW2_SPEAKERS: KeynoteSpeaker[] = [
  {
    id: 'speaker-issue-14',
    name: 'Mangala Karunarathne',
    title: 'Founder & CEO',
    company: 'Calcey Technologies',
    issue: 'Issue 14',
    issueLabel: 'Issue 14',
    image: '/speakers/mangala-karunarathne.png',
    category: 'Innovation',
    tags: ['Economic Policy', 'Global Tech Services'],
    quote: 'Unlocking high-value knowledge services and driving economic growth through global technology integration.',
    highlight: 'Economic Strategist',
  },
  {
    id: 'speaker-issue-13',
    name: 'Lakmini Wijesundara',
    title: 'Co-Founder & CEO',
    company: 'IronOne Technologies & BoardPAC',
    issue: 'Issue 13',
    issueLabel: 'Issue 13',
    image: '/speakers/lakmini-wijesundara.png',
    category: 'Corporate Leadership',
    tags: ['Sustainability', 'Global Enterprise Software'],
    quote: 'Pioneering global SaaS governance solutions and driving sustainable enterprise digital transformation.',
    highlight: 'Sustainability Expert',
  },
  {
    id: 'speaker-issue-12',
    name: 'Meril Fernando',
    title: 'Founder',
    company: 'Dilmah Tea',
    issue: 'Issue 12',
    issueLabel: 'Issue 12',
    image: '/speakers/meril-fernando.png',
    category: 'Corporate Leadership',
    tags: ['Tea Industry Icon', 'Ethical Business'],
    quote: 'Building an authentic global brand founded on uncompromising integrity, highest quality, and human kindness.',
    highlight: 'Tea Industry Icon',
  },
  {
    id: 'speaker-issue-11',
    name: 'Ranjith Pandithage',
    title: 'Chairman / Managing Director',
    company: 'DIMO',
    issue: 'Issue 11',
    issueLabel: 'Issue 11',
    image: '/speakers/ranjith-pandithage.png',
    category: 'Corporate Leadership',
    tags: ['Strategic Growth', 'Engineering Excellence'],
    quote: 'Spearheading diversification, engineering excellence, and multi-sector industrial advancement across Sri Lanka.',
    highlight: 'Strategic Business Pioneer',
  },
  {
    id: 'speaker-issue-10',
    name: 'Ashok Pathirage',
    title: 'Chairman / Managing Director',
    company: 'Softlogic Holdings',
    issue: 'Issue 10',
    issueLabel: 'Issue 10',
    image: '/speakers/ashok-pathirage.png',
    category: 'Corporate Leadership',
    tags: ['Business Excellence', 'Conglomerate Growth'],
    quote: 'Driving bold entrepreneurial ventures and building transformative consumer and retail powerhouses.',
    highlight: 'Catalyst for Business Excellence',
  },
  {
    id: 'speaker-issue-9',
    name: 'Lalith Weerathunga',
    title: 'Former Secretary to the President',
    company: 'Government of Sri Lanka',
    issue: 'Issue 9',
    issueLabel: 'Issue 9',
    image: '/speakers/lalith-weerathunga.png',
    category: 'Corporate Leadership',
    tags: ['Public Policy', 'Strategic Leadership'],
    quote: 'Executing large-scale strategic initiatives and governance reforms with precision and long-term vision.',
    highlight: 'Strategic Leader',
  },
];

export const ALL_SPEAKERS = [...ROW1_SPEAKERS, ...ROW2_SPEAKERS];

// Featured Speaker appears first in the Circular 3D Highlights Spotlight
export const FEATURED_SPEAKER = ROW1_SPEAKERS.find((s) => s.id === 'speaker-issue-19')!;

const TESTIMONIALS_DATA: Testimonial[] = [
  {
    name: FEATURED_SPEAKER.name,
    issue: FEATURED_SPEAKER.issue,
    designation: `${FEATURED_SPEAKER.title} • ${FEATURED_SPEAKER.subtitle || FEATURED_SPEAKER.company}`,
    quote: FEATURED_SPEAKER.description || FEATURED_SPEAKER.quote,
    src: FEATURED_SPEAKER.image,
  },
  ...ALL_SPEAKERS.filter((s) => s.id !== 'speaker-issue-19').map((speaker) => ({
    name: speaker.name,
    issue: speaker.issue,
    designation: `${speaker.title} • ${speaker.company}`,
    quote: speaker.quote,
    src: speaker.image,
  })),
];

function SpeakerLandscapeCard({ speaker }: { speaker: KeynoteSpeaker }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.25 }}
      className="group relative w-[280px] sm:w-[330px] h-[170px] sm:h-[185px] rounded-2xl overflow-hidden border border-white/15 bg-[#141414]/95 shadow-[0_20px_50px_rgba(0,0,0,0.9)] p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 hover:border-[#B8894F]/40 shrink-0"
    >
      {/* Background Speaker Photo Artwork Overlay */}
      <div className="absolute right-0 top-0 bottom-0 w-[55%] opacity-35 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none overflow-hidden">
        <img
          src={speaker.image}
          alt={speaker.name}
          className="w-full h-full object-cover object-top filter brightness-110 contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/75 to-transparent" />
      </div>

      {/* Top Header Row: Issue Number Badge & Category */}
      <div className="relative z-10 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[0.65rem] font-mono font-bold tracking-wider uppercase text-[#E8C896] bg-[#E8C896]/10 border border-[#E8C896]/30">
            {speaker.issue}
          </span>
          <span className="text-[0.68rem] font-bold uppercase tracking-wider text-[#9A9A9A]">
            {speaker.category}
          </span>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="relative z-10 space-y-1 pr-12">
        <h4 className="text-base sm:text-lg font-black uppercase tracking-tight text-white group-hover:text-[#E8C896] transition-colors truncate">
          {speaker.name}
        </h4>
        <p className="text-xs font-medium text-[#9A9A9A] truncate">
          {speaker.title}
        </p>
      </div>

      {/* Bottom Footer: Company Affiliation + Action Button */}
      <div className="relative z-10 flex items-center justify-between pt-2 border-t border-white/10">
        <span className="text-[0.65rem] font-mono text-[#9A9A9A] truncate max-w-[190px]">
          {speaker.company}
        </span>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#E8C896] group-hover:text-white group-hover:translate-x-1 transition-all">
          <span>Explore</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </div>
      </div>
    </motion.div>
  );
}

export default function KeynoteSpeakersSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.35, 0]);

  // Spring physics for responsive momentum
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 32,
    restDelta: 0.001,
  });

  // Row 1: Left to Right on scroll down (-35% -> 10%)
  const x1 = useTransform(smoothProgress, [0, 1], ['-35%', '10%']);

  // Row 2: Right to Left on scroll down (10% -> -35%)
  const x2 = useTransform(smoothProgress, [0, 1], ['10%', '-35%']);

  return (
    <section
      id="keynote-speakers"
      ref={sectionRef}
      className="relative z-10 min-h-screen bg-transparent px-[5%] py-14 sm:py-20 md:py-24 overflow-hidden w-full"
    >
      {/* Subtle Section Glow Pulse */}
      {!shouldReduceMotion && (
        <motion.div
          className="absolute inset-0 pointer-events-none -z-10"
          style={{
            opacity: glowOpacity,
            background: 'radial-gradient(circle at 50% 30%, rgba(184, 137, 79, 0.12), transparent 65%)',
          }}
        />
      )}

      {/* Section Header */}
      <ScrollReveal className="flex flex-col items-center justify-center text-center mb-16 sm:mb-20 px-[5%]">
        <h2
          className="hero-heading section-title text-center font-black uppercase leading-none tracking-tight"
          style={{ fontSize: 'clamp(2.4rem, 5.5vw, 76px)' }}
        >
          Keynote Speakers
        </h2>
      </ScrollReveal>

      <div className="space-y-16 sm:space-y-20">

        {/* ================= 1. CIRCULAR TESTIMONIALS 3D SPOTLIGHT ================= */}
        <div className="mx-auto max-w-6xl px-[5%]">
          <ScrollReveal delay={0.15} y={30}>
            <div className="bg-transparent border-none p-0 flex flex-col items-center justify-center shadow-none">
              <div className="w-full flex justify-center">
                <CircularTestimonials
                  testimonials={TESTIMONIALS_DATA}
                  autoplay={true}
                  colors={{
                    name: '#FFFFFF',
                    designation: '#9A9A9A',
                    testimony: '#D5D5D5',
                    arrowBackground: '#1e1e1e',
                    arrowForeground: '#E8C896',
                    arrowHoverBackground: '#B8894F',
                  }}
                  fontSizes={{
                    name: 'clamp(1.5rem, 2.5vw, 2.2rem)',
                    designation: '0.95rem',
                    quote: 'clamp(1rem, 1.4vw, 1.25rem)',
                  }}
                />
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* ================= 2. SCROLL-DRIVEN DUAL-ROW PARALLAX STREAM ================= */}
        <div className="relative w-full overflow-hidden space-y-6 pt-4">

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
