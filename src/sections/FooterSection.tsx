import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import {
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaXTwitter,
  FaWhatsapp,
} from 'react-icons/fa6';

/* =========================================================================
   EXPOSITION MAGAZINE FOOTER CONFIGURATION (MATCHING DESKTOP & MOBILE DESIGNS)
   ========================================================================= */

export interface FooterSectionProps {
  topHeading?: string;
  ctaText?: string;
  ctaLink?: string;
  brandSuffix?: string;
  tagline?: string;
  addressLines?: string[];
  contactEmail?: string;
  copyrightText?: string;
  creditText?: string;
  showBadge?: boolean;
}

export const DEFAULT_NAV_LINKS = [
  { name: 'ABOUT', href: '#about' },
  { name: 'TIMELINE', href: '#timeline' },
  { name: 'EVENTS', href: '#techevent-hub' },
  { name: 'SPEAKERS', href: '#keynote-speakers' },
  { name: 'INTERVIEWS', href: '#interviews' },
  { name: 'REVIEWS', href: '#reviews' },
  { name: 'PARTNERS', href: '#partners' },
  { name: 'TEAM', href: '#team' },
  { name: 'FAQ', href: '#faq' },
  { name: 'PRIVACY', href: '#privacy' },
  { name: 'TERMS', href: '#terms' },
];

export const SOCIAL_LINKS = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/exposition-magazine/',
    icon: FaLinkedinIn,
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/Exposition.uok/',
    icon: FaFacebookF,
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/exposition_magazine/',
    icon: FaInstagram,
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/@expositionmagazine',
    icon: FaYoutube,
  },
  {
    name: 'X (Twitter)',
    href: 'https://x.com/exposition_uok',
    icon: FaXTwitter,
  },
  {
    name: 'WhatsApp',
    href: 'https://wa.me/94771234560',
    icon: FaWhatsapp,
  },
];

export default function FooterSection({
  topHeading = 'Get started today',
  ctaText = 'EXPLORE ISSUE 21',
  ctaLink = '#techevent-hub',
  brandSuffix = 'xposition',
  tagline = 'The premier technology & management symposium and publication of University of Kelaniya.',
  addressLines = [
    'Department of Industrial Management (MIT)',
    'Faculty of Science, University of Kelaniya',
    'Kelaniya 11600, Sri Lanka',
  ],
  contactEmail = 'exposition@kln.ac.lk',
  copyrightText = '© Exposition. All Rights Reserved 2026',
  creditText = 'Faculty of Science, University of Kelaniya',
  showBadge = true,
}: FooterSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setEmail('');
    }, 4000);
  };

  return (
    <footer className="relative w-full bg-[#050505] text-[#9A9A9A] overflow-hidden select-none">
      {/* ================= 1. TOP HEADER SECTION WITH BACKGROUND PILLARS ================= */}
      <div className="relative w-full border-b border-neutral-800/80">
        {/* Background Vertical Light Pillars / Glow Effect */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#18140a]/70 via-[#0d0a05]/40 to-transparent" />
          <div className="absolute -top-24 left-1/4 w-[360px] h-[360px] bg-[#B8894F]/10 rounded-full blur-[100px]" />
          <div className="absolute top-0 right-10 w-[240px] h-[240px] bg-[#E8C896]/10 rounded-full blur-[90px]" />
          {/* Subtle Vertical Striped Columns */}
          <div className="absolute inset-0 flex justify-between px-[8%] opacity-20">
            <div className="w-16 h-full bg-gradient-to-b from-[#B8894F]/20 to-transparent" />
            <div className="w-24 h-full bg-gradient-to-b from-[#E8C896]/15 to-transparent" />
            <div className="w-20 h-full bg-gradient-to-b from-[#B8894F]/10 to-transparent" />
            <div className="w-32 h-full bg-gradient-to-b from-[#E8C896]/20 to-transparent" />
          </div>
        </div>

        {/* Top Content Row: 'Get started today' & CTA Button (Smooth Slide-Up) */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 mx-auto max-w-7xl px-[5%] py-10 sm:py-14 md:py-18 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 will-change-transform"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white">
            {topHeading}
          </h2>

          {/* High-Impact Gold CTA Box with Separated Arrow Segment */}
          <a
            href={ctaLink}
            className="group inline-flex items-stretch rounded-none bg-gradient-to-r from-[#B8894F] to-[#E8C896] hover:brightness-110 text-[#0C0C0C] font-mono font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-[0_0_30px_rgba(184,137,79,0.3)] hover:shadow-[0_0_40px_rgba(184,137,79,0.5)] shrink-0 w-full sm:w-auto"
          >
            <span className="px-6 sm:px-8 py-3.5 sm:py-4 flex items-center justify-center flex-1 text-center font-bold">
              {ctaText}
            </span>
            <span className="px-4 sm:px-5 py-3.5 sm:py-4 border-l border-black/25 flex items-center justify-center bg-black/5 group-hover:bg-black/10 transition-colors">
              <ArrowRight className="size-4 sm:size-5 transition-transform duration-200 group-hover:translate-x-1" />
            </span>
          </a>
        </motion.div>
      </div>

      {/* ================= 2. MAIN FOOTER CONTENT ================= */}
      <div className="mx-auto max-w-7xl px-[5%] pt-10 sm:pt-14 md:pt-16 pb-8 space-y-10 sm:space-y-12">
        {/* Giant Brand Row: Gold Bars forming "E" connected directly to "xposition" (Slide-Up) */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-3 will-change-transform"
        >
          <div className="flex items-center flex-wrap">
            <h1
              className="flex items-center text-5xl sm:text-7xl md:text-8xl lg:text-[9.5rem] font-bold tracking-tighter text-white leading-none lowercase"
              style={{
                fontFamily: "'Outfit', 'Kanit', sans-serif",
                letterSpacing: '-0.04em',
              }}
            >
              {/* Stylized "E" formed from gold bars */}
              <span className="inline-flex items-center h-[0.76em] mr-0.5 sm:mr-1 shrink-0 align-baseline">
                <svg
                  viewBox="0 0 74 92"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-full w-auto drop-shadow-[0_0_20px_rgba(184,137,79,0.4)]"
                >
                  <defs>
                    <linearGradient id="goldBarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#B8894F" />
                      <stop offset="100%" stopColor="#E8C896" />
                    </linearGradient>
                  </defs>
                  {/* Vertical Spine Bar */}
                  <rect x="0" y="0" width="16" height="92" rx="2.5" fill="url(#goldBarGrad)" />
                  {/* Top Horizontal Bar */}
                  <rect x="18" y="0" width="56" height="18" rx="2.5" fill="url(#goldBarGrad)" />
                  {/* Middle Horizontal Bar */}
                  <rect x="18" y="37" width="44" height="18" rx="2.5" fill="url(#goldBarGrad)" />
                  {/* Bottom Horizontal Bar */}
                  <rect x="18" y="74" width="56" height="18" rx="2.5" fill="url(#goldBarGrad)" />
                </svg>
              </span>

              {/* Connected rest of the word "xposition" with Gold Gradient */}
              <span className="text-gold-gradient">{brandSuffix}</span>
            </h1>
          </div>

          {/* Subtitle / Tagline below logo */}
          <p className="text-sm sm:text-base md:text-lg text-[#9A9A9A] font-light max-w-md pt-1 leading-relaxed">
            {tagline}
          </p>
        </motion.div>

        {/* Info Grid: CONTACT US | BADGE SEAL | STAY UP TO DATE (Staggered Slide-Up) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 items-start pt-2">
          {/* CONTACT US */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-4 space-y-3 will-change-transform"
          >
            <h3 className="text-[0.7rem] font-mono uppercase tracking-[0.25em] text-[#9A9A9A] font-semibold">
              CONTACT US
            </h3>
            <div className="text-xs sm:text-sm text-[#9A9A9A] space-y-1 font-light leading-relaxed">
              {addressLines.map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>
            <p className="pt-1">
              <a
                href={`mailto:${contactEmail}`}
                className="text-xs sm:text-sm text-white hover:text-[#E8C896] transition-colors"
              >
                {contactEmail}
              </a>
            </p>

            {/* Social Media Links in Contact Column */}
            <div className="pt-2 flex items-center gap-2 flex-wrap">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.name}
                    aria-label={social.name}
                    className="size-8 rounded-full border border-neutral-800 bg-[#0d0d0d] text-[#9A9A9A] hover:text-white hover:border-[#B8894F] hover:bg-[#B8894F]/10 flex items-center justify-center transition-all"
                  >
                    <Icon className="size-3.5" />
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* CENTER CIRCULAR SEAL / BADGE */}
          {showBadge && (
            <motion.div
              initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.88, y: shouldReduceMotion ? 0 : 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="md:col-span-3 flex justify-start md:justify-center items-center py-2 will-change-transform"
            >
              <div className="relative size-20 sm:size-24 rounded-full border border-[#B8894F]/30 bg-gradient-to-br from-[#1c1c1c] to-[#0d0d0d] flex flex-col items-center justify-center p-2 text-center shadow-lg group hover:border-[#E8C896]/60 transition-colors">
                <div className="absolute inset-1 rounded-full border border-dashed border-[#B8894F]/30" />
                <span className="text-[0.62rem] sm:text-[0.7rem] font-mono font-bold tracking-widest text-white uppercase block leading-tight">
                  UOK
                </span>
                <span className="text-[0.55rem] sm:text-[0.6rem] font-mono text-[#E8C896] font-bold tracking-wider uppercase block">
                  MIT
                </span>
                <span className="text-[0.45rem] font-mono text-[#9A9A9A] uppercase tracking-tighter block mt-0.5">
                  FACULTY OF SCIENCE
                </span>
              </div>
            </motion.div>
          )}

          {/* STAY UP TO DATE NEWSLETTER */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-5 space-y-3 will-change-transform"
          >
            <h3 className="text-[0.7rem] font-mono uppercase tracking-[0.25em] text-[#9A9A9A] font-semibold">
              STAY UP TO DATE
            </h3>
            <form onSubmit={handleSubmit} className="relative flex items-stretch">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="w-full bg-[#0d0d0d] border border-neutral-700 text-xs sm:text-sm text-white px-4 py-3 focus:outline-none focus:border-[#E8C896] transition-colors placeholder:text-neutral-600"
              />
              <button
                type="submit"
                disabled={isSubmitted}
                className="bg-gradient-to-r from-[#B8894F] to-[#E8C896] hover:brightness-110 text-[#0C0C0C] font-mono font-bold text-xs uppercase px-5 sm:px-6 py-3 shrink-0 transition-all flex items-center justify-center gap-1.5"
              >
                {isSubmitted ? (
                  <>
                    <Check className="size-3.5 text-emerald-950 font-bold" />
                    <span>DONE</span>
                  </>
                ) : (
                  <span>SUBMIT</span>
                )}
              </button>
            </form>
          </motion.div>
        </div>

        {/* ================= 3. NAVIGATION LINKS BAR (Smooth Slide-Up) ================= */}
        {/* DESKTOP VIEW: 1 Single Horizontal Row */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.75, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="hidden md:flex border-y border-neutral-800/90 py-4 justify-between items-center text-xs font-mono tracking-widest text-[#9A9A9A] overflow-x-auto will-change-transform"
        >
          {DEFAULT_NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-[#E8C896] transition-colors whitespace-nowrap px-1"
            >
              {link.name}
            </a>
          ))}
        </motion.div>

        {/* MOBILE VIEW: 2-Column Grid (Exact layout from Image 2) */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.75, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="grid md:hidden grid-cols-2 gap-y-4 gap-x-6 border-y border-neutral-800/90 py-5 text-xs font-mono tracking-widest text-[#9A9A9A] will-change-transform"
        >
          <div className="space-y-3.5">
            <a href="#about" className="block hover:text-[#E8C896] transition-colors">
              ABOUT
            </a>
            <a href="#techevent-hub" className="block hover:text-[#E8C896] transition-colors">
              EVENTS
            </a>
            <a href="#interviews" className="block hover:text-[#E8C896] transition-colors">
              INTERVIEWS
            </a>
            <a href="#partners" className="block hover:text-[#E8C896] transition-colors">
              PARTNERS
            </a>
            <a href="#privacy" className="block hover:text-[#E8C896] transition-colors">
              PRIVACY
            </a>
          </div>
          <div className="space-y-3.5">
            <a href="#timeline" className="block hover:text-[#E8C896] transition-colors">
              TIMELINE
            </a>
            <a href="#keynote-speakers" className="block hover:text-[#E8C896] transition-colors">
              SPEAKERS
            </a>
            <a href="#reviews" className="block hover:text-[#E8C896] transition-colors">
              REVIEWS
            </a>
            <a href="#team" className="block hover:text-[#E8C896] transition-colors">
              TEAM
            </a>
            <a href="#terms" className="block hover:text-[#E8C896] transition-colors">
              TERMS
            </a>
          </div>
        </motion.div>

        {/* ================= 4. BASELINE COPYRIGHT ROW & SOCIAL ICONS (Smooth Slide-Up) ================= */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[0.72rem] text-[#9A9A9A] font-light pt-1 will-change-transform"
        >
          <p>{copyrightText}</p>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={`bottom-${social.name}`}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.name}
                    aria-label={social.name}
                    className="text-[#9A9A9A] hover:text-[#E8C896] transition-colors"
                  >
                    <Icon className="size-3.5" />
                  </a>
                );
              })}
            </div>
            <span className="text-neutral-700 hidden sm:inline">•</span>
            <p className="text-[#9A9A9A] font-mono text-[0.7rem]">{creditText}</p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
