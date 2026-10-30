import AnimatedText from '../components/AnimatedText';
import ContactButton from '../components/ContactButton';
import ScrollReveal from '../components/ScrollReveal';
import { useBatchReveal } from '../hooks/useBatchReveal';
import { PerspectiveBook } from '@/components/ui/perspective-book';

const PAST_MAGAZINES = [
  {
    issueNum: '18',
    issueLabel: 'ISSUE 18',
    year: '2021',
    readerUrl: '/magazine-reader?issue=18',
    title: 'EXPOSITION ISSUE 18 — 2021 EDITION',
    pdfUrl: '/resources/Exposition past magazines/Exposition Issue 18.pdf',
    coverImg: '/magazines/issue-18-cover.jpg',
  },
  {
    issueNum: '19',
    issueLabel: 'ISSUE 19',
    year: '2023',
    readerUrl: '/magazine-reader?issue=19',
    title: 'EXPOSITION ISSUE 19 — 2023 EDITION',
    pdfUrl: '/resources/Exposition past magazines/Exposition Issue 19.pdf',
    coverImg: '/magazines/issue-19-cover.jpg',
  },
  {
    issueNum: '20',
    issueLabel: 'ISSUE 20',
    year: '2024',
    readerUrl: '/magazine-reader?issue=20',
    title: 'EXPOSITION ISSUE 20 — 2024 EDITION',
    pdfUrl: '/magazines/Exposition-Issue-20.pdf',
    coverImg: '/magazines/issue-20-cover.jpg',
  },
  {
    issueNum: '21',
    issueLabel: 'ISSUE 21',
    year: '2025',
    readerUrl: '/magazine-reader?issue=21',
    title: 'EXPOSITION ISSUE 21 — 2025 EDITION',
    pdfUrl: '/resources/Exposition past magazines/Exposition Issue 21.pdf',
    coverImg: '/magazines/issue-21-cover.jpg',
  },
];

export default function AboutSection() {
  const booksRef = useBatchReveal<HTMLDivElement>({
    selector: '.about-mag-book',
    y: 50,
    stagger: 0.08,
    duration: 0.8,
  });

  return (
    <section
      id="about"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-transparent px-[5%] py-14 sm:py-20 md:py-24"
    >
      <div className="relative z-10 flex flex-col items-center gap-12 sm:gap-16 md:gap-20 max-w-5xl mx-auto w-full">
        <div className="flex flex-col items-center gap-8 sm:gap-12 md:gap-14">
          <ScrollReveal
            y={50}
            className="flex flex-col items-center"
          >
            <h2
              className="hero-heading section-title text-center font-black uppercase leading-none tracking-tight text-white drop-shadow-[0_4px_25px_rgba(201,162,95,0.25)]"
              style={{ fontSize: 'clamp(2.4rem, 5.5vw, 76px)' }}
            >
              What is Exposition?
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1} y={40} className="flex flex-col items-center gap-6 max-w-[720px]">
            <AnimatedText
              text="Exposition serves as a bridge between academia and industry, bringing together students, industry leaders, and organizations through meaningful conversations, collaborative experiences, and career-focused opportunities."
              className="text-center font-medium leading-relaxed text-[#9A9A9A]"
              style={{ fontSize: 'clamp(1rem, 1.8vw, 1.25rem)' }}
            />
          </ScrollReveal>

          {/* Read Our Previous Publications (3D Magazine Books) */}
          <div className="flex flex-col items-center gap-4 py-4 my-2 w-full">
            <ScrollReveal y={30}>
              <span
                className="text-lg sm:text-xl md:text-2xl lg:text-[26px] tracking-wide text-[#E8C896] italic text-center drop-shadow block"
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontWeight: 600,
                  fontStyle: 'italic',
                }}
              >
                Read Our Previous Publications
              </span>
            </ScrollReveal>
            <div ref={booksRef} className="flex items-center justify-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 flex-wrap pt-2">
              {PAST_MAGAZINES.map((mag) => (
                <a
                  key={mag.issueNum}
                  href={mag.readerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Open ${mag.issueLabel} (${mag.year}) in new tab`}
                  className="about-mag-book cursor-pointer block group/book focus:outline-none transition-all duration-500 ease-out hover:-translate-y-3.5"
                >
                  <PerspectiveBook size="md" textured className="p-0 border-0 bg-transparent overflow-hidden">
                    {/* 1. Underlying Magazine Cover Image (Clean full bleed) */}
                    <img
                      src={mag.coverImg}
                      alt={`${mag.issueLabel} Cover`}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover rounded-[inherit] transition-transform duration-500 ease-out group-hover/book:scale-[1.03]"
                    />

                    {/* 2. Frosted Blur Layer & Issue Wordings (Disappears on hover, revealing clean magazine) */}
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4 rounded-[inherit] bg-black/25 backdrop-blur-[2px] border border-white/[0.08] transition-all duration-500 ease-out opacity-100 group-hover/book:opacity-0 group-hover/book:pointer-events-none">
                      {/* Issue Badge & Title */}
                      <div className="flex flex-col items-center gap-2 text-center transform transition-all duration-500 ease-out group-hover/book:scale-90 group-hover/book:translate-y-2">
                        <div className="px-3.5 py-1.5 rounded-full bg-black/60 border border-[#E8C896]/50 shadow-[0_4px_16px_rgba(0,0,0,0.8)] backdrop-blur-sm">
                          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#E8C896] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                            {mag.issueLabel}
                          </span>
                        </div>
                        <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                          {mag.year} Edition
                        </span>
                      </div>
                    </div>
                  </PerspectiveBook>
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 max-w-[720px] pt-6 border-t border-white/10 w-full">
            <ScrollReveal y={30}>
              <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#E8C896]">
                IMSSA
              </h3>
            </ScrollReveal>
            <ScrollReveal delay={0.1} y={30}>
              <AnimatedText
                text="The Industrial Management Science Students' Association (IMSSA) is the student body of the Department of Industrial Management, University of Kelaniya, dedicated to fostering academic excellence, professional development, and industry engagement among undergraduates."
                className="text-center font-medium leading-relaxed text-[#9A9A9A]"
                style={{ fontSize: 'clamp(0.95rem, 1.6vw, 1.15rem)' }}
              />
            </ScrollReveal>
          </div>
        </div>

        <ScrollReveal delay={0.15} y={40}>
          <ContactButton label="Contact Us" href="https://www.imssa.lk/" />
        </ScrollReveal>
      </div>
    </section>
  );
}
