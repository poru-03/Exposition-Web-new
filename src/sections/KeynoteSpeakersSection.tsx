import { useState } from 'react';
import { Mic2, ExternalLink } from 'lucide-react';
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

export const KEYNOTE_SPEAKERS: KeynoteSpeaker[] = [
  {
    id: 'speaker-1',
    name: 'Dhanika Perera',
    title: 'Tech Innovator & Serial Entrepreneur',
    company: 'Founder & CEO, Bhasha / Helakuru',
    issue: 'Issue 07',
    image: '/resources/speakers/dhanika perera.png',
    category: 'Tech & AI',
    tags: ['Entrepreneurship', 'Tech Innovation', 'Mobile Platforms'],
    quote:
      'Disrupting ecosystems through digital engineering platforms and empowering millions with accessible native tech products.',
    highlight: 'Featured Innovator',
  },
  {
    id: 'speaker-2',
    name: 'Deepal Sooriyaarachchi',
    title: 'Leading Corporate Leader & Management Consultant',
    company: 'Strategic Perspectives / Former MD AVIVA NDB',
    issue: 'Issue 20',
    image: '/resources/speakers/deepal sooriyarachchi.png',
    category: 'Corporate Leadership',
    tags: ['Leadership', 'Strategy', 'Governance'],
    quote:
      'Sustaining corporate governance and unlocking human potential in volatile, rapidly evolving international markets.',
    highlight: 'Keynote Address',
  },
  {
    id: 'speaker-3',
    name: 'Peter De Almeida',
    title: 'Technology Visionary & Executive Leader',
    company: 'Managing Director / CEO, N-able',
    issue: 'Issue 17',
    image: '/resources/speakers/peterdealmeida.png',
    category: 'Tech & AI',
    tags: ['Digital Transformation', 'Enterprise Tech', 'Disruption'],
    quote:
      'Transforming enterprise architectures and digital cultures through fearless creative software thinking.',
    highlight: 'Industrial Forum Leader',
  },
  {
    id: 'speaker-4',
    name: 'Dian Gomes',
    title: 'Global Business Leader & Motivational Icon',
    company: 'Former Managing Director, MAS Holdings',
    issue: 'Issue 18',
    image: '/resources/speakers/dian gomez.png',
    category: 'Corporate Leadership',
    tags: ['Global Leadership', 'High Performance', 'Culture'],
    quote:
      'Championing relentless high-performance team cultures and building internationally competitive enterprise powerhouses.',
    highlight: 'Executive Spotlight',
  },
  {
    id: 'speaker-5',
    name: 'Kanchana Priyakantha',
    title: 'Co-Founder & CEO, KReader / KBooks',
    company: 'EdTech Pioneer & Digital Publisher',
    issue: 'Issue 16',
    image: '/resources/speakers/kanchana.png',
    category: 'Innovation',
    tags: ['EdTech', 'Digital Publishing', 'Startup Scaling'],
    quote:
      'Empowering digital literacy and democratizing knowledge distribution through next-generation reading platforms.',
    highlight: 'Innovation Pioneer',
  },
  {
    id: 'speaker-6',
    name: 'W.K.H. Wegapitiya',
    title: 'Technology Leader & Industrial Pioneer',
    company: 'Chairman, LAUGFS Holdings',
    issue: 'Issue 15',
    image: '/resources/speakers/ananda handunge.png',
    category: 'Corporate Leadership',
    tags: ['Industrial Tech', 'Energy Systems', 'Industry 4.0'],
    quote:
      'Leading technological advancement and bold digital transformation initiatives that redefine foundational industries.',
    highlight: 'Industry Pioneer',
  },
  {
    id: 'speaker-7',
    name: 'Sushena Ranatunga',
    title: 'Software Engineering Leader & Global Executive',
    company: 'Director / Co-Founder, Creative Software',
    issue: 'Issue 15',
    image: '/resources/speakers/upendra pieris.png',
    category: 'Tech & AI',
    tags: ['Software Engineering', 'Global Teams', 'Nordic Tech'],
    quote:
      'Architecting resilient enterprise software solutions and scaling world-class engineering teams across continents.',
    highlight: 'Tech Keynote',
  },
  {
    id: 'speaker-8',
    name: 'Santhush Weeraman',
    title: 'Creative Industry Entrepreneur & Producer',
    company: 'Co-Founder, BNS & Saregama Music Labs',
    issue: 'Issue 12',
    image: '/resources/speakers/santhush.png',
    category: 'Creative Arts',
    tags: ['Creative Industries', 'Media Tech', 'Sonic Production'],
    quote:
      'Fusing cutting-edge multimedia production technology with authentic cultural storytelling and modern artistry.',
    highlight: 'Creative Arts Lead',
  },
];

const TESTIMONIALS_DATA: Testimonial[] = KEYNOTE_SPEAKERS.map((speaker) => ({
  name: speaker.name,
  designation: `${speaker.title} • ${speaker.company}`,
  quote: speaker.quote,
  src: speaker.image,
}));

const CATEGORIES = ['All', 'Tech & AI', 'Corporate Leadership', 'Innovation', 'Creative Arts'] as const;

export default function KeynoteSpeakersSection() {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredSpeakers =
    activeCategory === 'All'
      ? KEYNOTE_SPEAKERS
      : KEYNOTE_SPEAKERS.filter((s) => s.category === activeCategory);

  return (
    <section
      id="keynote-speakers"
      className="relative z-10 min-h-screen bg-transparent px-5 py-24 sm:px-8 md:px-10 md:py-32"
    >
      {/* Section Header */}
      <div className="flex flex-col items-center justify-center text-center mb-16 sm:mb-20">
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
          style={{ fontSize: 'clamp(2.5rem, 9vw, 130px)' }}
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
          have headlined the Exposition symposium and shaped the technological landscape.
        </FadeIn>
      </div>

      <div className="mx-auto max-w-6xl space-y-16">
        {/* ================= 1. CIRCULAR TESTIMONIALS INTEGRATION ================= */}
        <FadeIn delay={0.25} y={30}>
          <div className="bg-transparent border-none p-0 flex flex-col items-center justify-center shadow-none">
            <div className="flex items-center gap-2 mb-4 self-start">
              <span className="h-2 w-2 rounded-full bg-indigo-400 animate-pulse" />
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D7E2EA]/60">
                Voices that fueled our vision
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

        {/* ================= 2. ALL SPEAKERS ROSTER WITH FILTERS ================= */}
        <div className="space-y-8 pt-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-2">
            <h4 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-[#D7E2EA]">
              All Keynote Speakers ({filteredSpeakers.length})
            </h4>

            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => {
                const isSelected = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                      isSelected
                        ? 'bg-white text-black shadow-md'
                        : 'bg-[#181818] text-[#D7E2EA]/70 hover:text-white border border-white/10 hover:bg-[#222]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredSpeakers.map((speaker, index) => (
              <FadeIn key={speaker.id} delay={index * 0.06} y={20}>
                <div className="group relative overflow-hidden rounded-3xl border border-[#D7E2EA]/15 bg-[#141414]/90 p-5 transition-all duration-300 backdrop-blur-xl hover:border-[#D7E2EA]/40 hover:bg-[#191919]">
                  {/* Speaker Image Thumbnail */}
                  <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden mb-4 bg-[#1a1a1a]">
                    <img
                      src={speaker.image}
                      alt={speaker.name}
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105 filter brightness-105"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C]/80 via-transparent to-transparent" />

                    <span className="absolute top-3 left-3 rounded-full border border-white/20 bg-[#0C0C0C]/80 px-2.5 py-0.5 text-[0.65rem] font-mono font-bold text-white backdrop-blur-md">
                      {speaker.issue}
                    </span>
                  </div>

                  {/* Speaker Info */}
                  <div className="space-y-1">
                    <span className="text-[0.65rem] font-mono uppercase tracking-wider text-[#D7E2EA]/50 block">
                      {speaker.category}
                    </span>
                    <h5 className="text-base sm:text-lg font-bold uppercase tracking-tight text-[#D7E2EA] group-hover:text-white transition-colors line-clamp-1">
                      {speaker.name}
                    </h5>
                    <p className="text-xs text-[#D7E2EA]/70 font-light line-clamp-2 leading-relaxed">
                      {speaker.title}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/5">
                    <span className="text-[0.65rem] font-medium text-[#D7E2EA]/40 uppercase tracking-wider">
                      {speaker.company}
                    </span>
                    <ExternalLink className="h-3.5 w-3.5 text-[#D7E2EA]/40 group-hover:text-white transition-colors" />
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
