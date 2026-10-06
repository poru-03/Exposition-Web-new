import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download,
  FileText,
  X,
  CheckCircle2,
  Send,
  Sparkles,
} from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import { Marquee } from '@/components/ui/3d-testimonails';
import {
  ISSUE_22_PARTNERS,
  LEGACY_PARTNERS,
  type Partner,
} from '../data/partnersData';

// Re-export for any external consumers
export { ISSUE_22_PARTNERS, LEGACY_PARTNERS, type Partner };
export const ALL_PARTNERS = [...ISSUE_22_PARTNERS, ...LEGACY_PARTNERS];
export const ROW1_PARTNERS = ISSUE_22_PARTNERS;
export const ROW2_PARTNERS = LEGACY_PARTNERS;

function getTierTextColor(tier: string) {
  const t = tier.toLowerCase();
  if (t.includes('platinum') || t.includes('title')) {
    return 'text-[#38bdf8] drop-shadow-[0_0_10px_rgba(56,189,248,0.3)]';
  }
  if (t.includes('gold') || t.includes('studio')) {
    return 'text-[#E8C896] drop-shadow-[0_0_10px_rgba(232,200,150,0.3)]';
  }
  if (t.includes('silver') || t.includes('printing') || t.includes('media')) {
    return 'text-[#38bdf8] drop-shadow-[0_0_10px_rgba(56,189,248,0.3)]';
  }
  return 'text-[#cd7f32] drop-shadow-[0_0_10px_rgba(205,127,50,0.3)]';
}

/**
 * Full-size Card for Exposition Issue 22 Confirmed Partners
 */
export function VerticalPartnerCard({
  partner,
}: {
  partner: Partner;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className="group relative w-[250px] sm:w-[270px] md:w-[290px] rounded-2xl overflow-hidden bg-[#121212] border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)] p-5 flex flex-col items-center justify-between transition-all duration-300 ease-out hover:-translate-y-2 hover:border-[#E8C896]/50 hover:shadow-[0_20px_40px_rgba(184,137,79,0.2)] shrink-0 select-none will-change-transform text-center gap-4"
    >
      {/* Top Accent Line */}
      <div
        className="absolute top-0 inset-x-0 h-1 opacity-80 group-hover:h-1.5 transition-all duration-300"
        style={{ backgroundColor: partner.accentColor || '#B8894F' }}
      />

      {/* Top Media / Logo Display Container - Uniform White Background */}
      <div className="relative w-full h-32 sm:h-36 flex items-center justify-center p-3 rounded-xl overflow-hidden transition-colors bg-white border border-white/10 shadow-inner">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 rounded-xl animate-pulse bg-slate-100" />
        )}

        {imageError ? (
          <span className="text-xs font-black uppercase tracking-wider truncate px-2 text-slate-800">
            {partner.name}
          </span>
        ) : (
          <img
            src={partner.image}
            alt={partner.name}
            loading="lazy"
            decoding="async"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`max-w-full max-h-full object-contain filter contrast-105 transition-all duration-300 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}
      </div>

      {/* Center Text Details: Title & Subtitle */}
      <div className="flex flex-col items-center gap-1 w-full px-1">
        <h4 className="text-base sm:text-lg font-extrabold text-white tracking-tight leading-snug truncate w-full group-hover:text-[#E8C896] transition-colors">
          {partner.name}
        </h4>
        <p className="text-[0.75rem] sm:text-xs font-medium text-[#9A9A9A] tracking-normal truncate w-full">
          {partner.category}
        </p>
      </div>

      {/* Bottom Plain Text Label with Tier-Based Text Color */}
      <div className="mt-0.5 w-full flex justify-center">
        <span
          className={`text-[0.72rem] sm:text-xs font-bold tracking-wider uppercase ${getTierTextColor(
            partner.tier
          )}`}
        >
          {partner.tier}
        </span>
      </div>
    </div>
  );
}

/**
 * Slightly smaller card style for Partnership Legacy section
 */
export function LegacyPartnerCard({
  partner,
}: {
  partner: Partner;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className="group relative w-[175px] sm:w-[195px] md:w-[210px] rounded-xl overflow-hidden bg-[#121212] border border-white/10 shadow-[0_8px_20px_rgba(0,0,0,0.7)] p-4 flex flex-col items-center justify-between transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-white/25 hover:shadow-[0_12px_28px_rgba(0,0,0,0.9)] shrink-0 select-none will-change-transform text-center gap-3"
    >
      {/* Top Media / Logo Display Container - Uniform White Background */}
      <div className="relative w-full h-22 sm:h-24 flex items-center justify-center p-2 rounded-lg overflow-hidden transition-colors bg-white border border-white/10 shadow-sm">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 rounded-lg animate-pulse bg-slate-200" />
        )}

        {imageError ? (
          <span className="text-[0.72rem] font-bold uppercase tracking-wider truncate px-1 text-slate-800">
            {partner.name}
          </span>
        ) : (
          <img
            src={partner.image}
            alt={partner.name}
            loading="lazy"
            decoding="async"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`max-w-full max-h-full object-contain filter contrast-105 transition-all duration-300 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}
      </div>

      {/* Center Details */}
      <div className="flex flex-col items-center gap-0.5 w-full px-1">
        <h5 className="text-xs sm:text-[0.82rem] font-bold text-white tracking-tight truncate w-full group-hover:text-[#E8C896] transition-colors">
          {partner.name}
        </h5>
        <p className="text-[0.66rem] sm:text-[0.7rem] font-medium text-[#9A9A9A] tracking-normal truncate w-full">
          {partner.category}
        </p>
      </div>

      {/* Bottom Tier Label */}
      <div className="w-full flex justify-center">
        <span className="text-[0.64rem] sm:text-[0.68rem] font-semibold tracking-wider uppercase text-[#B8894F]">
          {partner.tier}
        </span>
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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsFormOpen(false);
      setFormData({
        company: '',
        name: '',
        email: '',
        tier: 'Gold Partner',
        message: '',
      });
    }, 2500);
  };


  return (
    <section
      id="partners"
      className="relative z-10 bg-transparent px-[5%] py-14 sm:py-20 md:py-24 overflow-hidden w-full"
    >
      {/* ================================================================= */}
      {/* 1. OUR PARTNERS (Exposition Issue 22 Confirmed Partners)        */}
      {/* ================================================================= */}
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="flex flex-col items-center justify-center text-center mb-8 sm:mb-10 px-4">
          <h2
            className="hero-heading section-title text-center font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(2.4rem, 5.5vw, 76px)' }}
          >
            Our Partners
          </h2>

          <p className="mt-4 text-xs sm:text-sm md:text-base text-[#9A9A9A] max-w-2xl mx-auto font-light leading-relaxed">
            Proudly presenting the confirmed corporate partners collaborating with
            Exposition Issue 22 to drive technological leadership, academic brilliance, and student innovation.
          </p>
        </ScrollReveal>

        {/* Clean, spacious layout for confirmed Issue 22 partners */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-10 my-8 sm:my-10">
          {ISSUE_22_PARTNERS.map((partner) => (
            <VerticalPartnerCard
              key={partner.id}
              partner={partner}
            />
          ))}
        </div>

        {/* Integrated Partnership CTA Block */}
        <ScrollReveal className="mt-8 sm:mt-10 max-w-2xl mx-auto text-center px-4">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <a
              href="/resources/partners/Exposition%20Issue%2022%20Partnership%20Proposal.pdf"
              download="Exposition Issue 22 Partnership Proposal.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#B8894F]/50 bg-[#181818]/90 px-6 py-2.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#E8C896] shadow-xl backdrop-blur-md hover:bg-[#B8894F]/15 hover:border-[#E8C896] transition-all duration-300 active:scale-95 cursor-pointer"
            >
              <Download className="h-4 w-4" />
              <span>Partnership Guide</span>
            </a>

            <button
              onClick={() => setIsFormOpen(true)}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#B8894F] to-[#E8C896] px-7 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0C0C0C] shadow-[0_0_25px_rgba(184,137,79,0.35)] hover:shadow-[0_0_35px_rgba(184,137,79,0.5)] hover:scale-105 transition-all duration-300 active:scale-95 cursor-pointer"
            >
              <FileText className="h-4 w-4" />
              <span>Become a Partner</span>
            </button>
          </div>
        </ScrollReveal>
      </div>

      {/* Subtle Luxury Gold Divider */}
      <div className="w-full max-w-5xl mx-auto my-14 sm:my-20 h-px bg-gradient-to-r from-transparent via-[#B8894F]/30 to-transparent" />

      {/* ================================================================= */}
      {/* 2. OUR PARTNERSHIP LEGACY (Past Exposition Editions)             */}
      {/* ================================================================= */}
      <div className="w-full">
        <ScrollReveal className="flex flex-col items-center justify-center text-center mb-8 px-4 max-w-4xl mx-auto">
          <h3
            className="hero-heading section-title text-center font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 56px)' }}
          >
            Our Partnership Legacy
          </h3>

          <p className="mt-3 text-xs sm:text-sm md:text-base text-[#9A9A9A] max-w-3xl mx-auto leading-relaxed font-light">
            Over the years, Exposition has built meaningful collaborations with organizations across
            multiple industries, creating a strong connection between university talent and the professional world.
          </p>
        </ScrollReveal>

        {/* Constantly flowing marquee ticker with slightly smaller cards */}
        <ScrollReveal delay={0.15} y={50} className="relative w-full overflow-hidden mt-4 pt-2">
          <Marquee
            pauseOnHover
            repeat={4}
            className="[--duration:40s] [--gap:1.25rem] py-2"
          >
            {LEGACY_PARTNERS.map((partner) => (
              <LegacyPartnerCard
                key={partner.id}
                partner={partner}
              />
            ))}
          </Marquee>

          {/* Luxury Side Fade Vignettes */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-36 bg-gradient-to-r from-[#0C0C0C] via-[#0C0C0C]/80 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-36 bg-gradient-to-l from-[#0C0C0C] via-[#0C0C0C]/80 to-transparent z-10" />
        </ScrollReveal>
      </div>

      {/* ================================================================= */}
      {/* PARTNER REGISTRATION FORM MODAL                                   */}
      {/* ================================================================= */}
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
                className="absolute right-5 top-5 size-9 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer"
              >
                <X className="size-4" />
              </button>

              {isSubmitted ? (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="size-16 rounded-full bg-[#B8894F]/20 border border-[#B8894F]/40 text-[#E8C896] flex items-center justify-center">
                    <CheckCircle2 className="size-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    Partnership Request Received!
                  </h3>
                  <p className="text-sm text-[#9A9A9A] max-w-md font-light">
                    Thank you for applying to partner with Exposition Issue 22.
                    Our corporate relations team will review your details and contact you within 24 hours.
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-6 space-y-1">
                    <div className="flex items-center gap-2 text-[#E8C896] text-xs font-semibold uppercase tracking-wider">
                      <Sparkles className="size-3.5" />
                      Collaborate With Exposition Issue 22
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white">
                      Partner Application
                    </h3>
                    <p className="text-xs sm:text-sm text-[#9A9A9A]">
                      Fill in your company details to join our industry partner network.
                    </p>
                  </div>

                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#9A9A9A] mb-1.5">
                        Company / Organization Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) =>
                          setFormData({ ...formData, company: e.target.value })
                        }
                        placeholder="e.g. Acme Tech Global"
                        className="w-full rounded-xl border border-white/15 bg-black/50 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-[#E8C896] focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#9A9A9A] mb-1.5">
                          Contact Person Name
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          placeholder="e.g. Jane Doe"
                          className="w-full rounded-xl border border-white/15 bg-black/50 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-[#E8C896] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#9A9A9A] mb-1.5">
                          Work Email Address
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          placeholder="name@company.com"
                          className="w-full rounded-xl border border-white/15 bg-black/50 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-[#E8C896] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#9A9A9A] mb-1.5">
                        Partnership Category / Tier
                      </label>
                      <select
                        value={formData.tier}
                        onChange={(e) =>
                          setFormData({ ...formData, tier: e.target.value })
                        }
                        className="w-full rounded-xl border border-white/15 bg-[#1c1c1c] px-4 py-2.5 text-sm text-white focus:border-[#E8C896] focus:outline-none"
                      >
                        <option value="Title Partner">
                          Title Partner (Exclusive Naming & Stage)
                        </option>
                        <option value="Platinum Partner">
                          Platinum Partner (Tier 1 Co-Branding)
                        </option>
                        <option value="Gold Partner">
                          Gold Partner (Corporate Track & Booth)
                        </option>
                        <option value="Silver Partner">
                          Silver Partner (Technical Sponsor)
                        </option>
                        <option value="Bronze Partner">
                          Bronze Partner (Brand Sponsor)
                        </option>
                        <option value="Printing Partner">
                          Official Printing Partner
                        </option>
                        <option value="Studio Partner">
                          Official Studio Partner
                        </option>
                        <option value="Media Partner">
                          Official Media / Broadcast Partner
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#9A9A9A] mb-1.5">
                        Message / Collaboration Objectives
                      </label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        placeholder="Tell us briefly about your organization's goals for this partnership..."
                        className="w-full rounded-xl border border-white/15 bg-black/50 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-[#E8C896] focus:outline-none resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#B8894F] to-[#E8C896] py-3 text-sm font-bold uppercase tracking-wider text-[#0C0C0C] shadow-lg hover:brightness-110 transition-all cursor-pointer"
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
