import { CircularTestimonials } from '@/components/ui/circular-testimonials';

export const testimonials = [
  {
    quote:
      "Disrupting ecosystems through digital engineering platforms and empowering millions with accessible native technology products.",
    name: "Dhanika Perera",
    designation: "Founder & CEO, Bhasha / Helakuru",
    src: "/resources/speakers/dhanika perera.png",
  },
  {
    quote:
      "Sustaining corporate governance and unlocking human potential in volatile, rapidly evolving international markets.",
    name: "Deepal Sooriyaarachchi",
    designation: "Leading Corporate Leader & Author",
    src: "/resources/speakers/deepal sooriyarachchi.png",
  },
  {
    quote:
      "Transforming enterprise architectures and digital cultures through fearless creative software thinking and bold digital leadership.",
    name: "Peter De Almeida",
    designation: "Managing Director / CEO, N-able",
    src: "/resources/speakers/peterdealmeida.png",
  },
  {
    quote:
      "Championing relentless high-performance team cultures and building internationally competitive enterprise powerhouses.",
    name: "Dian Gomes",
    designation: "Former Managing Director, MAS Holdings",
    src: "/resources/speakers/dian gomez.png",
  },
  {
    quote:
      "Empowering digital literacy and democratizing knowledge distribution through next-generation reading platforms.",
    name: "Kanchana Priyakantha",
    designation: "Co-Founder & CEO, KReader / KBooks",
    src: "/resources/speakers/kanchana.png",
  },
];

export const CircularTestimonialsDemo = () => (
  <section className="w-full">
    {/* Dark Keynote Testimonials Showcase */}
    <div className="bg-[#141414]/95 border border-[#D7E2EA]/15 p-8 sm:p-14 rounded-3xl min-h-[360px] flex flex-wrap gap-6 items-center justify-center relative shadow-2xl backdrop-blur-2xl">
      <div
        className="items-center justify-center relative flex w-full"
        style={{ maxWidth: "1024px" }}
      >
        <CircularTestimonials
          testimonials={testimonials}
          autoplay={true}
          colors={{
            name: "#D7E2EA",
            designation: "#94a3b8",
            testimony: "#e2e8f0",
            arrowBackground: "#1e1e1e",
            arrowForeground: "#f1f1f7",
            arrowHoverBackground: "#6366f1",
          }}
          fontSizes={{
            name: "2rem",
            designation: "0.95rem",
            quote: "1.15rem",
          }}
        />
      </div>
    </div>
  </section>
);
