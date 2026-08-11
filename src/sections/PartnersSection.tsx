import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import {
  Handshake,
  Download,
  FileText,
  X,
  CheckCircle2,
  Send,
  Sparkles,
} from 'lucide-react';
import FadeIn from '../components/FadeIn';

export type PartnerTier = 'Platinum' | 'Gold' | 'Silver' | 'Bronze';

export type Partner = {
  id: string;
  name: string;
  tier: PartnerTier;
  category: string;
  image: string;
  accentColor: string;
};

export const ROW1_PARTNERS: Partner[] = [
  // 1. Platinum (4)
  {
    id: 'partner-1',
    name: 'CodeGen & Vega',
    tier: 'Platinum',
    category: 'AI & EV DeepTech',
    image: '/resources/speakers/harsha.png',
    accentColor: '#38bdf8',
  },
  {
    id: 'partner-2',
    name: 'Dialog Axiata',
    tier: 'Platinum',
    category: 'Telecommunications & 5G',
    image: '/resources/speakers/saman perera.png',
    accentColor: '#38bdf8',
  },
  {
    id: 'partner-3',
    name: 'Creative Software',
    tier: 'Platinum',
    category: 'Global Engineering',
    image: '/resources/speakers/upendra pieris.png',
    accentColor: '#38bdf8',
  },
  {
    id: 'partner-4',
    name: 'GTN Group',
    tier: 'Platinum',
    category: 'FinTech Infrastructure',
    image: '/resources/magazine/GTN Logo_2025-BAwawNw1.png',
    accentColor: '#38bdf8',
  },
  // 2. Gold (4)
  {
    id: 'partner-5',
    name: 'MAS Holdings',
    tier: 'Gold',
    category: 'Apparel Tech & Innovation',
    image: '/resources/speakers/dian gomez.png',
    accentColor: '#fbbf24',
  },
  {
    id: 'partner-6',
    name: 'AICPA & CIMA',
    tier: 'Gold',
    category: 'Global Finance & Education',
    image: '/resources/magazine/AICPA_CIMA-BnZ9T7n6.png',
    accentColor: '#fbbf24',
  },
  {
    id: 'partner-7',
    name: 'Nestlé',
    tier: 'Gold',
    category: 'Sustainable Industry',
    image: '/resources/magazine/NSTLE-PEELAWAY-A2-R-LS-AW01-DgQ18Hsj.png',
    accentColor: '#fbbf24',
  },
  {
    id: 'partner-8',
    name: 'John Keells Holdings',
    tier: 'Gold',
    category: 'Corporate Conglomerate',
    image: '/resources/speakers/dilani alagarathnan.png',
    accentColor: '#fbbf24',
  },
];

export const ROW2_PARTNERS: Partner[] = [
  // 3. Silver (4)
  {
    id: 'partner-9',
    name: 'N-able',
    tier: 'Silver',
    category: 'Enterprise Cloud Systems',
    image: '/resources/speakers/peterdealmeida.png',
    accentColor: '#cbd5e1',
  },
  {
    id: 'partner-10',
    name: 'Bhasha / Helakuru',
    tier: 'Silver',
    category: 'Native Tech Ecosystems',
    image: '/resources/speakers/dhanika perera.png',
    accentColor: '#cbd5e1',
  },
  {
    id: 'partner-11',
    name: 'TechLead International',
    tier: 'Silver',
    category: 'Core Banking Solutions',
    image: '/resources/speakers/lasantha.png',
    accentColor: '#cbd5e1',
  },
  {
    id: 'partner-12',
    name: 'Digital 365',
    tier: 'Silver',
    category: 'Digital Media & Broadcast',
    image: '/resources/magazine/digital365-ofXxKHub.png',
    accentColor: '#cbd5e1',
  },
  // 4. Bronze (3)
  {
    id: 'partner-13',
    name: 'Kassa Advertising',
    tier: 'Bronze',
    category: 'Creative Communications',
    image: '/resources/magazine/Kassa Advertising Logo White-DIwYGvhd.png',
    accentColor: '#d97706',
  },
  {
    id: 'partner-14',
    name: 'Edify Education',
    tier: 'Bronze',
    category: 'EdTech & Skills Platform',
    image: '/resources/magazine/Edify.png',
    accentColor: '#d97706',
  },
  {
    id: 'partner-15',
    name: 'Rexona Unilever',
    tier: 'Bronze',
    category: 'Youth & Brand Partner',
    image: '/resources/magazine/rexona-2048-B0Rd5_-Q.png',
    accentColor: '#d97706',
  },
];

const ALL_PARTNERS = [...ROW1_PARTNERS, ...ROW2_PARTNERS];

function getTierBadgeStyles(tier: PartnerTier) {
  switch (tier) {
    case 'Platinum':
      return 'border-cyan-400/40 text-cyan-300 bg-cyan-500/10 shadow-[0_0_12px_rgba(56,189,248,0.15)]';
    case 'Gold':
      return 'border-amber-400/40 text-amber-300 bg-amber-500/10 shadow-[0_0_12px_rgba(251,191,36,0.15)]';
    case 'Silver':
      return 'border-slate-300/40 text-slate-200 bg-slate-400/10 shadow-[0_0_12px_rgba(203,213,225,0.15)]';
    case 'Bronze':
      return 'border-orange-500/40 text-orange-300 bg-orange-500/10 shadow-[0_0_12px_rgba(217,119,6,0.15)]';
  }
}

function VerticalPartnerCard({ partner }: { partner: Partner }) {
  return (
    <div className="group relative w-[160px] sm:w-[175px] md:w-[190px] h-[220px] sm:h-[240px] rounded-[24px] overflow-hidden border border-[#D7E2EA]/15 bg-[#151515] shadow-[0_20px_45px_rgba(0,0,0,0.85)] p-3.5 sm:p-4 flex flex-col justify-between items-center text-center transition-all duration-300 hover:border-white/40 hover:scale-[1.04] hover:bg-[#181818] shrink-0">
      {/* Top: Tier Badge + Circular Emblem */}
      <div className="flex flex-col items-center w-full space-y-2">
        {/* Tier Badge */}
        <span
          className={`rounded-full border px-2.5 py-0.5 text-[0.6rem] font-mono font-bold uppercase tracking-wider ${getTierBadgeStyles(
            partner.tier,
          )}`}
        >
          {partner.tier} Partner
        </span>

        {/* Circular Logo Emblem */}
        <div className="size-18 sm:size-20 rounded-full border-2 border-white/20 bg-white/5 p-1 flex items-center justify-center shrink-0 overflow-hidden shadow-md group-hover:border-white/40 group-hover:scale-105 transition-all duration-300">
          <img
            src={partner.image}
            alt={partner.name}
            className="w-full h-full object-cover object-center rounded-full filter brightness-105 contrast-105"
          />
        </div>
      </div>

      {/* Bottom: Company Name & Category */}
      <div className="w-full pt-2 border-t border-white/10 space-y-0.5">
        <h4 className="text-[0.8rem] sm:text-xs font-bold uppercase tracking-tight text-[#D7E2EA] group-hover:text-white transition-colors truncate">
          {partner.name}
        </h4>
        <p className="text-[0.62rem] font-semibold text-white/50 truncate">
          {partner.category}
        </p>
      </div>
    </div>
  );
}

export default function PartnersSection() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    email: '',
    tier: 'Gold Partner',
    message: '',
  });

  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Spring physics for responsive parallax scroll
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 32,
    restDelta: 0.001,
  });

  // Row 1: Left to Right on scroll down (-35% -> 10%)
  const x1 = useTransform(smoothProgress, [0, 1], ['-35%', '10%']);

  // Row 2: Right to Left on scroll down (10% -> -35%)
  const x2 = useTransform(smoothProgress, [0, 1], ['10%', '-35%']);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsFormOpen(false);
      setFormData({ company: '', name: '', email: '', tier: 'Gold Partner', message: '' });
    }, 2500);
  };

  const handleDownloadGuide = () => {
    const link = document.createElement('a');
    link.href = '#';
    link.download = 'Exposition_Partnership_Prospectus_2025.pdf';
    alert('Thank you for your interest! The Exposition 2025 Partnership Prospectus download will begin shortly.');
  };

  return (
    <section
      id="partners"
      ref={sectionRef}
      className="relative z-10 bg-transparent py-24 sm:py-32 overflow-hidden w-full"
    >
      {/* Section Header */}
      <div className="flex flex-col items-center justify-center text-center mb-14 sm:mb-18 px-[5%]">
        <FadeIn
          as="span"
          delay={0}
          y={20}
          className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#D7E2EA]/20 bg-[#161616]/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-[#D7E2EA]/80 backdrop-blur-md"
        >
          <Handshake className="h-3.5 w-3.5 text-[#D7E2EA]" />
          Partner With Us
        </FadeIn>

        <FadeIn
          as="h2"
          delay={0.1}
          y={40}
          className="hero-heading text-center font-black uppercase leading-none tracking-tight text-[#D7E2EA]"
          style={{ fontSize: 'clamp(2.2rem, 6.5vw, 84px)' }}
        >
          Our Partners
        </FadeIn>

        <FadeIn
          as="p"
          delay={0.2}
          y={20}
          className="mt-5 max-w-2xl text-center text-sm sm:text-base leading-relaxed text-[#D7E2EA]/70 font-light"
        >
          Partner with us to empower the next generation of technological leaders and visionary innovators.
          Join our ecosystem of 15 industry collaborators across Platinum, Gold, Silver, and Bronze tiers.
        </FadeIn>

        {/* CTA Buttons: Download Partnership Guide & Become a Partner */}
        <FadeIn delay={0.25} y={20} className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={handleDownloadGuide}
            className="inline-flex items-center gap-2 rounded-full border border-[#D7E2EA]/25 bg-[#181818]/90 px-6 py-2.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#D7E2EA] shadow-xl backdrop-blur-md hover:bg-white hover:text-black hover:border-white transition-all duration-300"
          >
            <Download className="h-4 w-4" />
            <span>Download Partnership Guide</span>
          </button>

          <button
            onClick={() => setIsFormOpen(true)}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 px-7 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-[0_0_30px_rgba(99,102,241,0.5)] hover:shadow-[0_0_40px_rgba(99,102,241,0.8)] hover:scale-105 transition-all duration-300"
          >
            <FileText className="h-4 w-4" />
            <span>Become a Partner</span>
          </button>
        </FadeIn>
      </div>

      {/* ================= DUAL-ROW SCROLL-DRIVEN PARALLAX STREAM (ALL 15 PARTNERS) ================= */}
      <div className="relative w-full overflow-hidden space-y-6 pt-2">
        <div className="flex items-center justify-between px-[5%] max-w-7xl mx-auto mb-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D7E2EA]/60 flex items-center gap-2">
            <span className="size-2 rounded-full bg-indigo-400" />
            Corporate & Strategic Network ({ALL_PARTNERS.length} Partners)
          </span>
          <span className="text-[0.65rem] font-mono text-white/40 uppercase tracking-wider hidden sm:inline-block">
            Scroll-reactive parallax stream
          </span>
        </div>

        {/* Row 1: Flows Left-to-Right on scroll down (Platinum & Gold) */}
        <div className="relative w-full overflow-hidden flex items-center">
          <motion.div style={{ x: x1 }} className="flex gap-6 shrink-0 will-change-transform">
            {[...ROW1_PARTNERS, ...ROW1_PARTNERS].map((partner, idx) => (
              <VerticalPartnerCard key={`${partner.id}-r1-${idx}`} partner={partner} />
            ))}
          </motion.div>

          {/* Side Fade Vignettes */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-36 bg-gradient-to-r from-[#0C0C0C] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-36 bg-gradient-to-l from-[#0C0C0C] to-transparent z-10" />
        </div>

        {/* Row 2: Flows Right-to-Left on scroll down (Silver & Bronze) */}
        <div className="relative w-full overflow-hidden flex items-center">
          <motion.div style={{ x: x2 }} className="flex gap-6 shrink-0 will-change-transform">
            {[...ROW2_PARTNERS, ...ROW2_PARTNERS].map((partner, idx) => (
              <VerticalPartnerCard key={`${partner.id}-r2-${idx}`} partner={partner} />
            ))}
          </motion.div>

          {/* Side Fade Vignettes */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-36 bg-gradient-to-r from-[#0C0C0C] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-36 bg-gradient-to-l from-[#0C0C0C] to-transparent z-10" />
        </div>
      </div>

      {/* ================= PARTNER REGISTRATION FORM MODAL ================= */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFormOpen(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-xl"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 w-full max-w-xl rounded-3xl border border-white/20 bg-[#161616] p-6 sm:p-8 md:p-9 shadow-[0_30px_80px_rgba(0,0,0,0.95)]"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsFormOpen(false)}
                className="absolute right-5 top-5 size-9 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all"
              >
                <X className="size-4" />
              </button>

              {isSubmitted ? (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="size-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center">
                    <CheckCircle2 className="size-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Partnership Request Received!</h3>
                  <p className="text-sm text-white/70 max-w-md">
                    Thank you for applying to partner with Exposition. Our corporate relations team will review your details and contact you within 24 hours.
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-6 space-y-1">
                    <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
                      <Sparkles className="size-3.5" />
                      Collaborate With Exposition 2025
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white">Partner Application</h3>
                    <p className="text-xs sm:text-sm text-white/60">
                      Fill in your company details to join our industry partner network.
                    </p>
                  </div>

                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                        Company / Organization Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. Acme Tech Global"
                        className="w-full rounded-xl border border-white/15 bg-black/50 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-indigo-400 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                          Contact Person Name
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Jane Doe"
                          className="w-full rounded-xl border border-white/15 bg-black/50 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-indigo-400 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                          Work Email Address
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="name@company.com"
                          className="w-full rounded-xl border border-white/15 bg-black/50 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-indigo-400 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                        Partnership Category / Tier
                      </label>
                      <select
                        value={formData.tier}
                        onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
                        className="w-full rounded-xl border border-white/15 bg-[#1c1c1c] px-4 py-2.5 text-sm text-white focus:border-indigo-400 focus:outline-none"
                      >
                        <option value="Platinum Partner">Platinum Partner (Tier 1 Co-Branding)</option>
                        <option value="Gold Partner">Gold Partner (Corporate Track & Booth)</option>
                        <option value="Silver Partner">Silver Partner (Technical Sponsor)</option>
                        <option value="Bronze Partner">Bronze Partner (Brand Partner)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                        Message / Collaboration Objectives
                      </label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us briefly about your organization's goals for this partnership..."
                        className="w-full rounded-xl border border-white/15 bg-black/50 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-indigo-400 focus:outline-none resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-lg hover:brightness-110 transition-all"
                    >
                      <Send className="size-4" />
                      <span>Submit Partnership Application</span>
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
