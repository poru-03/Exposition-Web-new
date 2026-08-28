import { useEffect } from 'react';
import {
  Trophy,
  CheckCircle2,
  FileCheck,
  Award,
  ArrowLeft,
  Sparkles,
  Users,
  Video,
  UserCheck,
  Target,
  ShieldCheck,
} from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

export default function Elite10Page() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBackToHome = (e: React.MouseEvent) => {
    e.preventDefault();
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new Event('popstate'));
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0C0C0C] text-white selection:bg-[#B8894F] selection:text-black">
      {/* Background Subtle Gradient */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#B8894F]/10 via-[#0C0C0C] to-[#0C0C0C]" />

      {/* Top Floating Navigation Bar */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#0C0C0C]/80 border-b border-white/10 px-[5%] py-4">
        <div className="mx-auto max-w-6xl flex items-center justify-between">
          <a
            href="/"
            onClick={handleBackToHome}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#E8C896] hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Exposition</span>
          </a>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#9A9A9A] hidden sm:inline-block">
              Exposition 22
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#E8C896] animate-ping" />
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-[5%] py-12 sm:py-16 md:py-20 space-y-20 sm:space-y-28">
        
        {/* ================= 1. HERO & INTRO SECTION ================= */}
        <section className="flex flex-col items-center text-center space-y-6">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#B8894F]/40 bg-[#161616]/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-[#E8C896] backdrop-blur-md shadow-[0_0_20px_rgba(184,137,79,0.25)]">
              <Trophy className="h-3.5 w-3.5 text-[#E8C896]" />
              NATIONAL UNDERGRADUATE RECOGNITION PROGRAM
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1
              className="hero-heading section-title font-black uppercase leading-none tracking-tight text-white"
              style={{ fontSize: 'clamp(2.8rem, 6.5vw, 88px)' }}
            >
              Elite 10
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="max-w-3xl">
            <p className="text-base sm:text-xl md:text-2xl font-light text-[#E8C896]/95 leading-relaxed">
              Sri Lanka&apos;s first undergraduate recognition and development program, identifying 10 exceptional undergraduates from universities across the country.
            </p>
          </ScrollReveal>
        </section>

        {/* ================= 2. ELIGIBILITY CRITERIA ================= */}
        <section className="space-y-8">
          <ScrollReveal className="flex flex-col items-center text-center">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#E8C896]">
              PREREQUISITES
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-white mt-1">
              Eligibility Criteria
            </h2>
            <p className="text-sm sm:text-base text-[#9A9A9A] font-light mt-2">
              Applicants must fulfill the following requirements to be considered:
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {[
              {
                title: 'University Enrollment',
                desc: 'Be a currently enrolled undergraduate at a public or private university in Sri Lanka.',
                icon: Award,
              },
              {
                title: 'Age Limit',
                desc: 'Be below 28 years of age at the time of application submission.',
                icon: ShieldCheck,
              },
              {
                title: 'Beyond Academics',
                desc: 'Demonstrate proven achievements and tangible impact beyond academic coursework.',
                icon: Target,
              },
              {
                title: 'Multi-Disciplinary Excellence',
                desc: 'Show excellence in leadership, innovation, entrepreneurship, sports, research, or community impact.',
                icon: Sparkles,
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={idx} delay={idx * 0.08}>
                  <div className="rounded-2xl border border-white/10 bg-[#141414]/90 p-6 sm:p-7 hover:border-[#B8894F]/40 transition-all duration-300 backdrop-blur-xl h-full flex flex-col justify-between group">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-[#1e1e1e] border border-white/10 text-[#E8C896] group-hover:scale-110 transition-transform">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-base sm:text-lg font-bold uppercase text-white tracking-tight">
                          {item.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#9A9A9A] leading-relaxed font-light">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </section>

        {/* ================= 3. APPLICATION GUIDELINES ================= */}
        <section className="space-y-8">
          <ScrollReveal className="flex flex-col items-center text-center">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#E8C896]">
              SUBMISSION CHECKLIST
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-white mt-1">
              Application Guidelines
            </h2>
            <p className="text-sm sm:text-base text-[#9A9A9A] font-light mt-2">
              Prepare and submit the following required assets:
            </p>
          </ScrollReveal>

          <div className="rounded-3xl border border-white/10 bg-[#141414]/95 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {[
                { label: 'Curriculum Vitae (CV)', optional: false, icon: FileCheck },
                { label: 'LinkedIn Profile', optional: false, icon: Users },
                { label: 'Portfolio', optional: true, icon: Award },
                { label: 'Relevant certificates and supporting documents', optional: false, icon: CheckCircle2 },
                { label: 'Recommendation letter', optional: true, icon: FileCheck },
                { label: 'Responses to the three application essays', optional: false, icon: CheckCircle2 },
                { label: 'A 2-minute video introduction explaining why you should become an Elite 10 Awardee', optional: false, icon: Video },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-3.5 p-3.5 rounded-xl border border-white/5 bg-[#181818]/80 hover:bg-[#1f1f1f] transition-colors"
                  >
                    <Icon className="h-4 w-4 text-[#E8C896] shrink-0" />
                    <span className="text-xs sm:text-sm font-medium text-white/90">
                      {item.label}
                      {item.optional && (
                        <span className="ml-1.5 text-[0.65rem] font-mono text-[#9A9A9A] uppercase">
                          (optional)
                        </span>
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= 4. SELECTION GUIDELINES (3-ROUND STEPPER) ================= */}
        <section className="space-y-10">
          <ScrollReveal className="flex flex-col items-center text-center">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#E8C896]">
              SELECTION PROCESS
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-white mt-1">
              Selection Guidelines
            </h2>
            <p className="text-sm sm:text-base text-[#9A9A9A] max-w-2xl font-light mt-2">
              Elite 10 follows a structured three-round selection process designed to identify well-rounded and impactful undergraduate talent.
            </p>
          </ScrollReveal>

          {/* Stepper Timeline Cards */}
          <div className="space-y-6">
            {/* ROUND 01 */}
            <ScrollReveal delay={0.1}>
              <div className="rounded-3xl border border-[#B8894F]/30 bg-[#151515]/95 p-6 sm:p-8 md:p-10 backdrop-blur-2xl relative overflow-hidden group hover:border-[#B8894F]/60 transition-all">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-6">
                  <div className="flex items-center gap-3">
                    <span className="rounded-full size-10 bg-gradient-to-br from-[#B8894F] to-[#E8C896] text-black font-black text-sm flex items-center justify-center">
                      01
                    </span>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold uppercase text-white tracking-tight">
                        Round 01 – Online Application
                      </h3>
                      <span className="text-xs font-mono text-[#E8C896] uppercase tracking-wider">
                        Stage 1: Open Screening
                      </span>
                    </div>
                  </div>
                  <span className="self-start md:self-auto rounded-full bg-[#1e1e1e] border border-white/10 px-3 py-1 text-xs font-mono text-emerald-400">
                    Advances to Top 50
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#9A9A9A] leading-relaxed font-light">
                  Applicants will submit their CV, relevant certificates and supporting documents, along with written responses and a short video introduction. Applications will be evaluated based on academic excellence, leadership, sports and extracurricular achievements, innovation, entrepreneurship, community impact, and the overall strength of the application.
                </p>
                <div className="mt-4 pt-3 border-t border-white/5 text-xs text-white/80 font-semibold">
                  Result: The highest-scoring applicants will advance to the Top 50.
                </div>
              </div>
            </ScrollReveal>

            {/* ROUND 02 */}
            <ScrollReveal delay={0.2}>
              <div className="rounded-3xl border border-white/10 bg-[#151515]/95 p-6 sm:p-8 md:p-10 backdrop-blur-2xl relative overflow-hidden group hover:border-[#B8894F]/40 transition-all">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-6">
                  <div className="flex items-center gap-3">
                    <span className="rounded-full size-10 bg-[#222222] border border-white/15 text-[#E8C896] font-black text-sm flex items-center justify-center">
                      02
                    </span>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold uppercase text-white tracking-tight">
                        Round 02 – Online Interview
                      </h3>
                      <span className="text-xs font-mono text-[#9A9A9A] uppercase tracking-wider">
                        Stage 2: Structured Panel Interview
                      </span>
                    </div>
                  </div>
                  <span className="self-start md:self-auto rounded-full bg-[#1e1e1e] border border-white/10 px-3 py-1 text-xs font-mono text-amber-400">
                    Top 50 &rarr; Top 20
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#9A9A9A] leading-relaxed font-light">
                  The Top 50 candidates will participate in a structured online interview with a panel of academic and industry professionals. Candidates will be assessed on areas including leadership, innovation, entrepreneurship, community impact, communication, and creativity.
                </p>
                <div className="mt-4 pt-3 border-t border-white/5 text-xs text-white/80 font-semibold">
                  Result: The strongest candidates will progress to the Top 20.
                </div>
              </div>
            </ScrollReveal>

            {/* ROUND 03 */}
            <ScrollReveal delay={0.3}>
              <div className="rounded-3xl border border-[#B8894F]/40 bg-[#161616]/95 p-6 sm:p-8 md:p-10 backdrop-blur-2xl relative overflow-hidden group hover:border-[#E8C896] transition-all">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-6">
                  <div className="flex items-center gap-3">
                    <span className="rounded-full size-10 bg-gradient-to-br from-[#B8894F] to-[#E8C896] text-black font-black text-sm flex items-center justify-center">
                      03
                    </span>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold uppercase text-white tracking-tight">
                        Round 03 – Final Assessment Day
                      </h3>
                      <span className="text-xs font-mono text-[#E8C896] uppercase tracking-wider">
                        Stage 3: Live In-Person Final Assessment
                      </span>
                    </div>
                  </div>
                  <span className="self-start md:self-auto rounded-full bg-[#B8894F]/20 border border-[#B8894F]/40 px-3 py-1 text-xs font-mono text-[#E8C896]">
                    Final 10 Selection
                  </span>
                </div>

                <div className="space-y-4">
                  <p className="text-xs sm:text-sm text-[#9A9A9A] leading-relaxed font-light">
                    The Top 20 finalists will take part in the final assessment, consisting of:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-[#1e1e1e]/90 border border-white/10 space-y-1">
                      <h4 className="text-xs sm:text-sm font-bold uppercase text-[#E8C896]">
                        Group Discussion
                      </h4>
                      <p className="text-xs text-[#9A9A9A] font-light">
                        Evaluating leadership, teamwork, communication, active listening, and critical thinking.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#1e1e1e]/90 border border-white/10 space-y-1">
                      <h4 className="text-xs sm:text-sm font-bold uppercase text-[#E8C896]">
                        Panel Interview
                      </h4>
                      <p className="text-xs text-[#9A9A9A] font-light">
                        Evaluating authenticity, demonstrated impact, future vision, and the ability to respond confidently under challenge.
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-white/90 font-medium pt-2 border-t border-white/5">
                    Final selections will be made based on the candidates&apos; combined performance across all three stages.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ================= 5. CLOSING STATEMENT ================= */}
        <section>
          <ScrollReveal>
            <div className="rounded-3xl border border-[#B8894F]/50 bg-gradient-to-br from-[#1a1510] via-[#141414] to-[#0C0C0C] p-8 sm:p-12 text-center space-y-4 shadow-[0_0_50px_rgba(184,137,79,0.2)]">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#B8894F]/20 px-4 py-1 text-xs font-mono text-[#E8C896]">
                <UserCheck className="h-3.5 w-3.5" />
                THE ELITE 10 AWARDEES
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                The Final Recognition
              </h2>
              <p className="max-w-2xl mx-auto text-sm sm:text-base leading-relaxed text-[#9A9A9A] font-light">
                The final ten selected candidates will be recognized as the Elite 10 Awardees, representing exceptional undergraduate talent across diverse areas of achievement and impact.
              </p>
              <div className="pt-4">
                <a
                  href="/"
                  onClick={handleBackToHome}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#B8894F] to-[#E8C896] px-8 py-3 text-xs font-bold uppercase tracking-wider text-black shadow-lg hover:scale-105 transition-transform cursor-pointer"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Return to Main Website</span>
                </a>
              </div>
            </div>
          </ScrollReveal>
        </section>

      </main>
    </div>
  );
}
