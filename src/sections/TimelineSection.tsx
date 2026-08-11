import FadeIn from '../components/FadeIn';
import { DemoDark } from '@/components/ui/demo';

export default function TimelineSection() {
  return (
    <section
      id="timeline"
      className="relative z-10 min-h-screen bg-transparent px-[5%] py-20 md:py-28"
    >
      {/* Header */}
      <div className="flex flex-col items-center justify-center text-center mb-12 sm:mb-16">
        <FadeIn
          as="span"
          delay={0}
          y={20}
          className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#D7E2EA]/60 sm:text-sm"
        >
          My Creative Journey & Process
        </FadeIn>
        <FadeIn
          as="h2"
          delay={0.1}
          y={40}
          className="hero-heading text-center font-black uppercase leading-none tracking-tight text-[#D7E2EA]"
          style={{ fontSize: 'clamp(2.2rem, 6.5vw, 84px)' }}
        >
          Timeline
        </FadeIn>
      </div>

      {/* Interactive Process Flow Component (Process Timeline) */}
      <div className="mx-auto max-w-6xl">
        <DemoDark />
      </div>
    </section>
  );
}
