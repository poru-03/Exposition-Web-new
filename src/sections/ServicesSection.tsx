import FadeIn from '../components/FadeIn';

const SERVICES = [
  {
    number: '01',
    name: '3D Modeling',
    description:
      'Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations.',
  },
  {
    number: '02',
    name: 'Rendering',
    description:
      'High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life.',
  },
  {
    number: '03',
    name: 'Motion Design',
    description:
      'Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences.',
  },
  {
    number: '04',
    name: 'Branding',
    description:
      'Crafting cohesive visual identities \u2014 from logos to full brand systems \u2014 that communicate a clear and memorable presence.',
  },
  {
    number: '05',
    name: 'Web Design',
    description:
      'Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience.',
  },
];

const DIVIDER = '1px solid rgba(12, 12, 12, 0.15)';

export default function ServicesSection() {
  return (
    <section
      id="price"
      className="relative z-10 rounded-t-[40px] bg-white px-[5%] py-20 sm:rounded-t-[50px] sm:py-24 md:rounded-t-[60px] md:py-32"
    >
      <FadeIn
        as="h2"
        delay={0}
        y={40}
        className="mb-16 text-center font-black uppercase leading-none tracking-tight text-[#0C0C0C] sm:mb-20 md:mb-28"
        style={{ fontSize: 'clamp(2.2rem, 6.5vw, 84px)' }}
      >
        Services
      </FadeIn>

      <div className="mx-auto max-w-5xl">
        {SERVICES.map((service, index) => (
          <FadeIn
            key={service.number}
            delay={index * 0.1}
            y={30}
            className="flex items-start gap-4 py-8 sm:gap-8 sm:py-10 md:gap-12 md:py-12"
            style={{
              borderTop: DIVIDER,
              borderBottom: index === SERVICES.length - 1 ? DIVIDER : undefined,
            }}
          >
            <span
              className="shrink-0 font-black leading-none text-[#0C0C0C] tabular-nums"
              style={{
                fontSize: 'clamp(3rem, 10vw, 140px)',
                minWidth: 'clamp(4.5rem, 15vw, 200px)',
              }}
            >
              {service.number}
            </span>

            <div className="flex flex-col gap-3 text-[#0C0C0C] md:gap-4">
              <h3
                className="font-medium uppercase leading-tight"
                style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
              >
                {service.name}
              </h3>
              <p
                className="max-w-2xl font-light leading-relaxed"
                style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)', opacity: 0.6 }}
              >
                {service.description}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
