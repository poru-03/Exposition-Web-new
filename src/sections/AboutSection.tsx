import AnimatedText from '../components/AnimatedText';
import ContactButton from '../components/ContactButton';
import FadeIn from '../components/FadeIn';

const ABOUT_COPY =
  'With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let\u2019s build something incredible together!';

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative flex min-h-screen lg:h-screen w-full snap-start snap-always flex-col items-center justify-center overflow-hidden bg-[#0C0C0C] px-[5%] py-10 sm:py-14"
    >
      <div className="relative z-10 flex flex-col items-center gap-12 sm:gap-16 md:gap-20 max-w-4xl mx-auto">
        <div className="flex flex-col items-center gap-8 sm:gap-12 md:gap-14">
          <FadeIn
            as="h2"
            delay={0}
            y={40}
            className="hero-heading section-title text-center font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(2.4rem, 5.5vw, 76px)' }}
          >
            About me
          </FadeIn>

          <AnimatedText
            text={ABOUT_COPY}
            className="max-w-[580px] text-center font-medium leading-relaxed text-[#9A9A9A]"
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
