import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download,
  FileText,
  X,
  CheckCircle2,
  Send,
  Sparkles,
  Layers,
  Crown,
  Medal,
  Award,
  Shield,
  ArrowUpRight,
} from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import { Marquee } from '@/components/ui/3d-testimonails';

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

export const ALL_PARTNERS = [...ROW1_PARTNERS, ...ROW2_PARTNERS];

function getTierBadgeStyles(tier: PartnerTier) {
  switch (tier) {
    case 'Platinum':
      return 'border-white/30 text-white bg-white/10 shadow-[0_0_12px_rgba(255,255,255,0.12)] group-hover:border-white/60 group-hover:bg-white/15';
    case 'Gold':
      return 'border-[#B8894F]/40 text-[#E8C896] bg-[#B8894F]/10 shadow-[0_0_12px_rgba(184,137,79,0.15)] group-hover:border-[#B8894F]/70 group-hover:bg-[#B8894F]/20';
    case 'Silver':
      return 'border-white/20 text-[#D8D8D8] bg-white/5 shadow-[0_0_12px_rgba(216,216,216,0.1)] group-hover:border-white/40 group-hover:bg-white/10';
    case 'Bronze':
      return 'border-[#B8894F]/30 text-[#B8894F] bg-[#B8894F]/5 shadow-[0_0_12px_rgba(184,137,79,0.1)] group-hover:border-[#B8894F]/50 group-hover:bg-[#B8894F]/15';
  }
}

function getTierIcon(tier: PartnerTier) {
  switch (tier) {
    case 'Platinum':
      return <Crown className="size-3 text-white" />;
    case 'Gold':
      return <Medal className="size-3 text-[#E8C896]" />;
    case 'Silver':
      return <Award className="size-3 text-[#D8D8D8]" />;
    case 'Bronze':
      return <Shield className="size-3 text-[#B8894F]" />;
  }
}

export function VerticalPartnerCard({
  partner,
  onSelect,
}: {
  partner: Partner;
  onSelect?: (partner: Partner) => void;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div
      onClick={() => onSelect?.(partner)}
      className="group relative w-[175px] sm:w-[200px] md:w-[220px] h-[85px] sm:h-[95px] rounded-xl overflow-hidden bg-white border border-slate-150 shadow-[0_4px_15px_rgba(0,0,0,0.15)] p-4 flex items-center justify-center transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.25)] hover:border-indigo-400/50 shrink-0 select-none cursor-pointer will-change-transform"
      style={{ contain: 'paint layout', transform: 'translateZ(0)' }}
    >
      {/* Top Subtle Tier Accent Line */}
      <div 
        className="absolute top-0 inset-x-0 h-1 opacity-80 group-hover:h-1.5 transition-all duration-300"
        style={{ backgroundColor: partner.accentColor }}
      />

      {/* Center Brand Logo / Name Display on Crisp White Card */}
      <div className="relative w-full h-full flex items-center justify-center p-1">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 rounded-lg bg-slate-100 animate-pulse" />
        )}

        {imageError ? (
          <span className="text-sm font-black text-slate-800 uppercase tracking-wide truncate px-2">
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

      {/* Subtle corner arrow hint on hover */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <ArrowUpRight className="size-3.5 text-slate-400" />
      </div>
    </div>
  );
}

export default function PartnersSection() {
  const [activeTab, setActiveTab] = useState<'stream' | PartnerTier | 'all'>('stream');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
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
      setFormData({ company: '', name: '', email: '', tier: 'Gold Partner', message: '' });
    }, 2500);
  };

  const handleDownloadGuide = () => {
    // Generate a lightweight blob for immediate download
    const prospectusText = `EXPOSITION 2025 - CORPORATE PARTNERSHIP PROSPECTUS\n\n` +
      `Thank you for your interest in partnering with Exposition 2025.\n\n` +
      `PARTNERSHIP TIERS & BENEFITS:\n` +
      `1. PLATINUM PARTNER ($10,000+ / Exclusive Tier)\n` +
      `   - Keynote main-stage brand prominence\n` +
      `   - Prime booth location & TechEvent Hub naming rights\n` +
      `   - Direct recruitment access to top university engineering talent\n` +
      `   - Full 2-page feature in the Exposition Magazine\n\n` +
      `2. GOLD PARTNER ($5,000+)\n` +
      `   - Track sponsorship & dedicated panel seat\n` +
      `   - Premium booth installation in exhibition pavilion\n` +
      `   - 1-page feature in the Exposition Magazine\n\n` +
      `3. SILVER PARTNER ($2,500+)\n` +
      `   - Technical workshop host & digital platform branding\n` +
      `   - Career fair VIP access\n\n` +
      `4. BRONZE PARTNER ($1,000+)\n` +
      `   - Brand presence in print & digital channels\n` +
      `   - VIP delegate passes\n\n` +
      `CONTACT: exposition@kln.ac.lk | Department of Industrial Management, University of Kelaniya.`;

    const blob = new Blob([prospectusText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Exposition_Partnership_Prospectus_2025.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const filteredPartners =
    activeTab === 'stream' || activeTab === 'all'
      ? ALL_PARTNERS
      : ALL_PARTNERS.filter((p) => p.tier === activeTab);

  return (
    <section
      id="partners"
      className="relative z-10 bg-transparent px-[5%] py-14 sm:py-20 md:py-24 overflow-hidden w-full"
    >
      {/* Section Header */}
      <ScrollReveal className="flex flex-col items-center justify-center text-center mb-8 sm:mb-10 px-[5%] max-w-5xl mx-auto">
        <h2
          className="hero-heading section-title text-center font-black uppercase leading-none tracking-tight"
          style={{ fontSize: 'clamp(2.4rem, 5.5vw, 76px)' }}
        >
          Our Partners
        </h2>

        {/* CTA Buttons: Download Partnership Guide & Become a Partner */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={handleDownloadGuide}
            className="inline-flex items-center gap-2 rounded-full border border-[#B8894F]/50 bg-[#181818]/90 px-6 py-2.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#E8C896] shadow-xl backdrop-blur-md hover:bg-[#B8894F]/15 hover:border-[#E8C896] transition-all duration-300 active:scale-95"
          >
            <Download className="h-4 w-4" />
            <span>Download Partnership Guide</span>
          </button>

          <button
            onClick={() => setIsFormOpen(true)}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#B8894F] to-[#E8C896] px-7 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0C0C0C] shadow-[0_0_25px_rgba(184,137,79,0.35)] hover:shadow-[0_0_35px_rgba(184,137,79,0.5)] hover:scale-105 transition-all duration-300 active:scale-95"
          >
            <FileText className="h-4 w-4" />
            <span>Become a Partner</span>
          </button>
        </div>

        {/* View Mode & Tier Filter Tabs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-full border border-white/15 bg-black/60 backdrop-blur-lg">
          <button
            onClick={() => setActiveTab('stream')}
            className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 ${activeTab === 'stream'
              ? 'bg-gradient-to-r from-[#B8894F] to-[#E8C896] text-black shadow-md'
              : 'text-[#9A9A9A] hover:text-white hover:bg-white/5'
              }`}
          >
            <Layers className="size-3.5" />
            <span>Live Stream</span>
          </button>

          <button
            onClick={() => setActiveTab('Platinum')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 ${activeTab === 'Platinum'
              ? 'bg-white text-black shadow-md'
              : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
          >
            <Crown className="size-3" />
            <span>Platinum (4)</span>
          </button>

          <button
            onClick={() => setActiveTab('Gold')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 ${activeTab === 'Gold'
              ? 'bg-gradient-to-r from-[#B8894F] to-[#E8C896] text-black shadow-md'
              : 'text-[#E8C896]/80 hover:text-[#E8C896] hover:bg-white/5'
              }`}
          >
            <Medal className="size-3" />
            <span>Gold (4)</span>
          </button>

          <button
            onClick={() => setActiveTab('Silver')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 ${activeTab === 'Silver'
              ? 'bg-[#D8D8D8] text-black shadow-md'
              : 'text-[#D8D8D8]/70 hover:text-white hover:bg-white/5'
              }`}
          >
            <Award className="size-3" />
            <span>Silver (4)</span>
          </button>

          <button
            onClick={() => setActiveTab('Bronze')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 ${activeTab === 'Bronze'
              ? 'bg-[#B8894F] text-black shadow-md'
              : 'text-[#B8894F]/80 hover:text-[#E8C896] hover:bg-white/5'
              }`}
          >
            <Shield className="size-3" />
            <span>Bronze (3)</span>
          </button>

          <button
            onClick={() => setActiveTab('all')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 ${activeTab === 'all'
              ? 'bg-white text-black shadow-md'
              : 'text-[#9A9A9A] hover:text-white hover:bg-white/5'
              }`}
          >
            <span>All Grid (15)</span>
          </button>
        </div>
      </ScrollReveal>

      {/* ================= SECTION CONTENT: DUAL-ROW MARQUEE STREAM OR FILTERED GRID ================= */}
      {activeTab === 'stream' ? (
        <div className="relative w-full overflow-hidden space-y-6 pt-2">
          {/* Subheader info bar */}
          <div className="flex items-center justify-between px-[5%] max-w-7xl mx-auto mb-1">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#9A9A9A] flex items-center gap-2">
              <span className="size-2 rounded-full bg-[#E8C896] animate-pulse" />
              Strategic Network ({ALL_PARTNERS.length} Partners)
            </span>
            <span className="text-[0.68rem] font-mono text-[#9A9A9A]/60 uppercase tracking-wider hidden sm:inline-block">
              Hover card to pause stream • Click for details
            </span>
          </div>

          {/* Row 1: Flows Left smoothly (Platinum & Gold) */}
          <div className="relative w-full overflow-hidden">
            <Marquee
              pauseOnHover
              repeat={3}
              className="[--duration:30s] [--gap:1.5rem] py-1"
            >
              {ROW1_PARTNERS.map((partner) => (
                <VerticalPartnerCard
                  key={partner.id}
                  partner={partner}
                  onSelect={(p) => setSelectedPartner(p)}
                />
              ))}
            </Marquee>

            {/* Side Fade Vignettes */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-32 bg-gradient-to-r from-[#0C0C0C] via-[#0C0C0C]/80 to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-32 bg-gradient-to-l from-[#0C0C0C] via-[#0C0C0C]/80 to-transparent z-10" />
          </div>

          {/* Row 2: Flows Right (Reverse) smoothly (Silver & Bronze) */}
          <div className="relative w-full overflow-hidden">
            <Marquee
              reverse
              pauseOnHover
              repeat={3}
              className="[--duration:34s] [--gap:1.5rem] py-1"
            >
              {ROW2_PARTNERS.map((partner) => (
                <VerticalPartnerCard
                  key={partner.id}
                  partner={partner}
                  onSelect={(p) => setSelectedPartner(p)}
                />
              ))}
            </Marquee>

            {/* Side Fade Vignettes */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-32 bg-gradient-to-r from-[#0C0C0C] via-[#0C0C0C]/80 to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-32 bg-gradient-to-l from-[#0C0C0C] via-[#0C0C0C]/80 to-transparent z-10" />
          </div>
        </div>
      ) : (
        /* Filtered Grid View */
        <div className="max-w-7xl mx-auto px-[5%]">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 justify-items-center">
            {filteredPartners.map((partner) => (
              <VerticalPartnerCard
                key={partner.id}
                partner={partner}
                onSelect={(p) => setSelectedPartner(p)}
              />
            ))}
          </div>
        </div>
      )}

      {/* ================= PARTNER DETAILS MODAL ================= */}
      <AnimatePresence>
        {selectedPartner && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPartner(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative z-10 w-full max-w-md rounded-3xl border border-white/20 bg-[#161616] p-6 sm:p-8 shadow-2xl text-center space-y-4"
            >
              <button
                onClick={() => setSelectedPartner(null)}
                className="absolute right-4 top-4 size-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all"
              >
                <X className="size-4" />
              </button>

              <div className="mx-auto size-24 rounded-full border-2 border-white/30 p-1 bg-white/5 overflow-hidden flex items-center justify-center shadow-lg">
                <img
                  src={selectedPartner.image}
                  alt={selectedPartner.name}
                  className="w-full h-full object-cover object-center rounded-full"
                />
              </div>

              <div>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider ${getTierBadgeStyles(
                    selectedPartner.tier,
                  )}`}
                >
                  {getTierIcon(selectedPartner.tier)}
                  <span>{selectedPartner.tier} Partner</span>
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-2">
                  {selectedPartner.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#E8C896] font-mono mt-0.5">
                  {selectedPartner.category}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[#9A9A9A] leading-relaxed border-t border-white/10 pt-3 font-light">
                Official corporate partner collaborating with Exposition 2025 to foster tech
                leadership, industry knowledge exchange, and student innovation across Sri Lanka.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setSelectedPartner(null);
                    setIsFormOpen(true);
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#B8894F] to-[#E8C896] py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0C0C0C] shadow-lg hover:brightness-110 transition-all"
                >
                  <Sparkles className="size-4" />
                  <span>Explore Partnership Opportunities</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
                  <div className="size-16 rounded-full bg-[#B8894F]/20 border border-[#B8894F]/40 text-[#E8C896] flex items-center justify-center">
                    <CheckCircle2 className="size-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Partnership Request Received!</h3>
                  <p className="text-sm text-[#9A9A9A] max-w-md font-light">
                    Thank you for applying to partner with Exposition. Our corporate relations team will review your details and contact you within 24 hours.
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-6 space-y-1">
                    <div className="flex items-center gap-2 text-[#E8C896] text-xs font-semibold uppercase tracking-wider">
                      <Sparkles className="size-3.5" />
                      Collaborate With Exposition 2025
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white">Partner Application</h3>
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
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
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
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                        onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
                        className="w-full rounded-xl border border-white/15 bg-[#1c1c1c] px-4 py-2.5 text-sm text-white focus:border-[#E8C896] focus:outline-none"
                      >
                        <option value="Platinum Partner">Platinum Partner (Tier 1 Co-Branding)</option>
                        <option value="Gold Partner">Gold Partner (Corporate Track & Booth)</option>
                        <option value="Silver Partner">Silver Partner (Technical Sponsor)</option>
                        <option value="Bronze Partner">Bronze Partner (Brand Partner)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#9A9A9A] mb-1.5">
                        Message / Collaboration Objectives
                      </label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us briefly about your organization's goals for this partnership..."
                        className="w-full rounded-xl border border-white/15 bg-black/50 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-[#E8C896] focus:outline-none resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#B8894F] to-[#E8C896] py-3 text-sm font-bold uppercase tracking-wider text-[#0C0C0C] shadow-lg hover:brightness-110 transition-all"
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
