import AnimatedText from '../components/AnimatedText';
import ContactButton from '../components/ContactButton';
import FadeIn from '../components/FadeIn';

const DECOR_BASE =
  'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7';

const ABOUT_COPY =
  'With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let\u2019s build something incredible together!';

const DECORATIONS = [
  {
    src: `${DECOR_BASE}/moon_icon.11395d36.png`,
    alt: '',
    className:
      'absolute top-[4%] left-[1%] w-[120px] sm:left-[2%] sm:w-[160px] md:left-[4%] md:w-[210px]',
    delay: 0.1,
    x: -80,
  },
  {
    src: `${DECOR_BASE}/p59_1.4659672e.png`,
    alt: '',
    className:
      'absolute bottom-[8%] left-[3%] w-[100px] sm:left-[6%] sm:w-[140px] md:left-[10%] md:w-[180px]',
    delay: 0.25,
    x: -80,
  },
  {
    src: `${DECOR_BASE}/lego_icon-1.703bb594.png`,
    alt: '',
    className:
      'absolute top-[4%] right-[1%] w-[120px] sm:right-[2%] sm:w-[160px] md:right-[4%] md:w-[210px]',
    delay: 0.15,
    x: 80,
  },
  {
    src: `${DECOR_BASE}/Group_134-1.2e04f3ce.png`,
    alt: '',
    className:
      'absolute bottom-[8%] right-[3%] w-[130px] sm:right-[6%] sm:w-[170px] md:right-[10%] md:w-[220px]',
    delay: 0.3,
    x: 80,
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0C0C0C] px-5 py-20 sm:px-8 md:px-10"
    >
      {DECORATIONS.map((decoration) => (
        <FadeIn
          key={decoration.src}
          className={`${decoration.className} pointer-events-none select-none`}
          delay={decoration.delay}
          duration={0.9}
          x={decoration.x}
          y={0}
        >
          <img src={decoration.src} alt={decoration.alt} className="h-auto w-full" />
        </FadeIn>
      ))}

      <div className="relative z-10 flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
        <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
          <FadeIn
            as="h2"
            delay={0}
            y={40}
            className="hero-heading text-center font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            About me
          </FadeIn>

          <AnimatedText
            text={ABOUT_COPY}
            className="max-w-[560px] text-center font-medium leading-relaxed text-[#D7E2EA]"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
          />
        </div>

        <FadeIn delay={0.15} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
}
