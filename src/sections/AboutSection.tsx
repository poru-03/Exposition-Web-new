import { BookOpen } from 'lucide-react';
import AnimatedText from '../components/AnimatedText';
import ContactButton from '../components/ContactButton';
import FadeIn from '../components/FadeIn';

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
  return (
    <section
      id="about"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#0C0C0C] px-[5%] py-14 sm:py-20 md:py-24"
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
            What is Exposition?
          </FadeIn>

          <div className="flex flex-col items-center gap-6 max-w-[720px]">
            <AnimatedText
              text="Exposition is a flagship industry engagement platform organized by the Industrial Management Science Students' Association at the Department of Industrial Management, University of Kelaniya."
              className="text-center font-medium leading-relaxed text-[#9A9A9A]"
              style={{ fontSize: 'clamp(1rem, 1.8vw, 1.25rem)' }}
            />
            <AnimatedText
              text="Exposition serves as a bridge between academia and industry, bringing together students, industry leaders, and organizations through meaningful conversations, collaborative experiences, and career-focused opportunities."
              className="text-center font-medium leading-relaxed text-[#9A9A9A]"
              style={{ fontSize: 'clamp(1rem, 1.8vw, 1.25rem)' }}
            />
          </div>

          {/* Read Our Previous Publications (3D Magazine Books) */}
          <FadeIn delay={0.1} y={20} className="flex flex-col items-center gap-4 py-4 my-2">
            <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-[#E8C896] font-semibold text-center drop-shadow">
              Read Our Previous Publications
            </span>
            <div className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap">
              {PAST_MAGAZINES.map((mag) => (
                <a
                  key={mag.issueNum}
                  href={mag.readerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Open ${mag.issueLabel} (${mag.year}) in new tab`}
                  className="group relative flex flex-col justify-between w-28 h-40 sm:w-36 sm:h-52 md:w-40 md:h-56 rounded-xl p-3 border border-[#B8894F]/40 bg-[#121212] shadow-[0_15px_35px_rgba(0,0,0,0.95),inset_4px_0_8px_rgba(255,255,255,0.15)] transition-all duration-300 hover:-translate-y-3 hover:rotate-[-4deg] hover:border-[#E8C896] hover:shadow-[0_25px_45px_rgba(184,137,79,0.5)] cursor-pointer overflow-hidden text-left"
                >
                  {/* PDF Cover Image */}
                  <img
                    src={mag.coverImg}
                    alt={`${mag.issueLabel} Cover`}
                    className="absolute inset-0 w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Dark Gradient Overlay on Top Edge */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/70 rounded-xl" />

                  {/* Book Spine Highlight Effect */}
                  <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-r from-white/40 via-white/15 to-transparent z-10" />

                  {/* Top Issue Badge */}
                  <div className="flex items-center justify-between z-20 w-full">
                    <span className="text-[0.62rem] sm:text-xs font-black uppercase tracking-wider text-[#E8C896] bg-black/80 backdrop-blur-sm px-2 py-0.5 rounded-md border border-[#B8894F]/50 shadow-md">
                      {mag.issueLabel}
                    </span>
                    <BookOpen className="h-4 w-4 text-[#E8C896] drop-shadow opacity-90 group-hover:opacity-100 transition-opacity" />
                  </div>
                </a>
              ))}
            </div>
          </FadeIn>

          <div className="flex flex-col items-center gap-4 max-w-[720px] pt-6 border-t border-white/10 w-full">
            <FadeIn
              as="h3"
              delay={0.1}
              y={20}
              className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#E8C896]"
            >
              IMSSA
            </FadeIn>
            <AnimatedText
              text="The Industrial Management Science Students' Association (IMSSA) is the student body of the Department of Industrial Management, University of Kelaniya, dedicated to fostering academic excellence, professional development, and industry engagement among undergraduates."
              className="text-center font-medium leading-relaxed text-[#9A9A9A]"
              style={{ fontSize: 'clamp(0.95rem, 1.6vw, 1.15rem)' }}
            />
          </div>
        </div>

        <FadeIn delay={0.15} y={20}>
          <ContactButton label="Contact Us" />
        </FadeIn>
      </div>
    </section>
  );
}
