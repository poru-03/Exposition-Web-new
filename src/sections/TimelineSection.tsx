import FadeIn from '../components/FadeIn';
import { DemoDark } from '@/components/ui/demo';

export default function TimelineSection() {
  return (
    <section
      id="timeline"
      className="relative z-10 min-h-screen bg-transparent px-[5%] py-14 sm:py-20 md:py-24"
    >
      {/* Header */}
      <div className="flex flex-col items-center justify-center text-center mb-12 sm:mb-16">
        <FadeIn
          as="h2"
          delay={0}
          y={40}
          className="hero-heading section-title text-center font-black uppercase leading-none tracking-tight"
          style={{ fontSize: 'clamp(2.4rem, 5.5vw, 76px)' }}
        >
          Our Initiatives
        </FadeIn>
      </div>

      {/* Interactive Process Flow Component (Process Timeline) */}
      <div className="mx-auto max-w-6xl">
        <DemoDark />
      </div>
    </section>
  );
}
