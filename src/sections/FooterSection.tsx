import { useEffect, useRef, forwardRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Handshake, ArrowUp } from 'lucide-react';
import {
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from 'react-icons/fa6';
import { cn } from '@/lib/utils';

// Register ScrollTrigger safely in browser environment
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* =========================================================================
   EXPOSITION MAGAZINE FOOTER CONFIGURATION
   ========================================================================= */

export interface FooterSectionProps {
  tagline?: string;
  addressLines?: string[];
  contactEmail?: string;
  copyrightText?: string;
  creditText?: string;
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
];

// -------------------------------------------------------------------------
// ZERO-DEPENDENCY GSAP 3D MAGNETIC BUTTON PRIMITIVE
// -------------------------------------------------------------------------
export type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: React.ElementType;
  };

export const MagneticButton = forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as: Component = 'button', ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (typeof window === 'undefined') return;
      const element = localRef.current;
      if (!element) return;

      const ctx = gsap.context(() => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = element.getBoundingClientRect();
          const h = rect.width / 2;
          const w = rect.height / 2;
          const x = e.clientX - rect.left - h;
          const y = e.clientY - rect.top - w;

          gsap.to(element, {
            x: x * 0.35,
            y: y * 0.35,
            rotationX: -y * 0.12,
            rotationY: x * 0.12,
            scale: 1.04,
            ease: 'power2.out',
            duration: 0.35,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(element, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            ease: 'elastic.out(1, 0.35)',
            duration: 1.1,
          });
        };

        element.addEventListener('mousemove', handleMouseMove as any);
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
          element.removeEventListener('mousemove', handleMouseMove as any);
          element.removeEventListener('mouseleave', handleMouseLeave);
        };
      }, element);

      return () => ctx.revert();
    }, []);

    return (
      <Component
        ref={(node: HTMLElement) => {
          (localRef as any).current = node;
          if (typeof forwardedRef === 'function') forwardedRef(node);
          else if (forwardedRef) (forwardedRef as any).current = node;
        }}
        className={cn('cursor-pointer inline-flex items-center justify-center', className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
MagneticButton.displayName = 'MagneticButton';

// -------------------------------------------------------------------------
// SYMPOSIUM MARQUEE TICKER ITEMS
// -------------------------------------------------------------------------
const SymposiumMarqueeTrack = () => (
  <div className="flex items-center space-x-10 px-4">
    <span>EXPOSITION 21ST EDITION</span> <span className="text-[#B8894F]">✦</span>
    <span>PREMIER TECH SYMPOSIUM & MAGAZINE</span> <span className="text-[#E8C896]">✦</span>
    <span>DEPARTMENT OF INDUSTRIAL MANAGEMENT</span> <span className="text-[#B8894F]">✦</span>
    <span>FACULTY OF SCIENCE · UNIVERSITY OF KELANIYA</span> <span className="text-[#E8C896]">✦</span>
    <span>TECH EVENT HUB & KEYNOTE SESSIONS</span> <span className="text-[#B8894F]">✦</span>
  </div>
);

export default function FooterSection({
  tagline = 'The premier technology & management symposium and publication of University of Kelaniya.',
  addressLines = [
    'Department of Industrial Management (MIT)',
    'Faculty of Science, University of Kelaniya',
    'Kelaniya 11600, Sri Lanka',
  ],
  contactEmail = 'exposition@kln.ac.lk',
  copyrightText = '© Exposition. All Rights Reserved 2026',
  creditText = 'Faculty of Science, University of Kelaniya',
}: FooterSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const footerRef = useRef<HTMLElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      if (giantTextRef.current) {
        gsap.fromTo(
          giantTextRef.current,
          { y: '5vh', scale: 0.88, opacity: 0 },
          {
            y: '0vh',
            scale: 1,
            opacity: 1,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 85%',
              end: 'bottom bottom',
              scrub: 1,
            },
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-[#050505] text-[#9A9A9A] overflow-hidden select-none"
    >
      {/* Ambient Breathing Gold Aurora Glow & Background Tech Grid */}
      <div className="footer-aurora absolute left-1/2 top-1/2 h-[50vh] w-[75vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] blur-[90px] pointer-events-none z-0" />
      <div className="footer-bg-grid absolute inset-0 z-0 pointer-events-none" />

      {/* Giant Parallax Background Outlined Text */}
      <div
        ref={giantTextRef}
        className="footer-giant-bg-text absolute -bottom-[1vh] left-1/2 -translate-x-1/2 w-screen text-center whitespace-nowrap z-0 pointer-events-none select-none"
      >
        EXPOSITION
      </div>

      {/* ================= 1. STRAIGHT MARQUEE STRIP ================= */}
      <div className="relative z-10 w-full overflow-hidden border-y border-[#B8894F]/20 bg-[#0C0C0C]/80 backdrop-blur-md py-2.5 shadow-xl">
        <div className="flex w-max animate-footer-scroll-marquee text-[0.68rem] md:text-xs font-mono font-bold tracking-[0.25em] text-[#B8894F] uppercase">
          <SymposiumMarqueeTrack />
          <SymposiumMarqueeTrack />
        </div>
      </div>

      {/* ================= 2. TOP HEADER SECTION (PARTNERSHIP CTA) ================= */}
      <div className="relative z-10 w-full border-b border-neutral-800/80">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 mx-auto max-w-7xl px-[5%] py-4 sm:py-5 flex items-center justify-center will-change-transform"
        >
          <MagneticButton
            as="a"
            href="#partners"
            className="btn-metallic-gold-shine group gap-2.5 rounded-full px-7 sm:px-9 py-3 sm:py-3.5 text-xs font-semibold uppercase tracking-widest transition-all shadow-[0_0_25px_rgba(184,137,79,0.3)] hover:shadow-[0_0_35px_rgba(184,137,79,0.5)] shrink-0"
          >
            <span>Explore Partnership Opportunities</span>
            <Handshake className="size-4 transition-transform duration-200 group-hover:scale-110" />
          </MagneticButton>
        </motion.div>
      </div>

      {/* ================= 3. MAIN FOOTER CONTENT ================= */}
      <div className="relative z-10 mx-auto max-w-7xl px-[5%] pt-6 sm:pt-8 pb-5 space-y-6 sm:space-y-7">
        {/* 2-Column Responsive Layout: Contact on Left, Brand on Right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-start justify-between">
          {/* LEFT COLUMN: Contact Us & Social Icons */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-3 will-change-transform max-w-md"
          >
            <h3 className="text-[0.7rem] font-mono uppercase tracking-[0.25em] text-[#E8C896] font-semibold">
              CONTACT US
            </h3>
            <div className="text-xs sm:text-sm text-[#9A9A9A] space-y-1 font-light leading-relaxed">
              {addressLines.map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>
            <p className="pt-0.5">
              <a
                href={`mailto:${contactEmail}`}
                className="text-xs sm:text-sm text-white hover:text-[#E8C896] transition-colors"
              >
                {contactEmail}
              </a>
            </p>

            {/* Social Media Links with 3D Magnetic Effect & Glass Pill styling */}
            <div className="pt-1.5 flex items-center gap-2.5 flex-wrap">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <MagneticButton
                    as="a"
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.name}
                    aria-label={social.name}
                    className="size-8.5 rounded-full footer-glass-pill text-[#9A9A9A] hover:text-white hover:border-[#E8C896] transition-all p-2"
                  >
                    <Icon className="size-3.5" />
                  </MagneticButton>
                );
              })}
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Brand Logo & Tagline */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-2.5 md:flex md:flex-col md:items-end md:text-right will-change-transform"
          >
            <div className="flex items-center md:justify-end">
              <img
                src="/ExpoLogo.png"
                alt="Exposition Logo"
                className="h-auto w-[160px] sm:w-[200px] md:w-[220px] select-none drop-shadow-[0_0_20px_rgba(184,137,79,0.25)]"
                draggable={false}
              />
            </div>

            {/* Subtitle / Tagline below logo */}
            <p className="text-xs sm:text-sm md:text-base text-[#9A9A9A] font-light max-w-md leading-relaxed md:text-right">
              {tagline}
            </p>
          </motion.div>
        </div>

        {/* ================= 4. NAVIGATION LINKS BAR ================= */}
        {/* DESKTOP VIEW: 1 Single Horizontal Row */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="hidden md:flex border-y border-neutral-800/90 py-3 justify-between items-center text-xs font-mono tracking-widest text-[#9A9A9A] overflow-x-auto will-change-transform"
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

        {/* MOBILE VIEW: 2-Column Grid */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="grid md:hidden grid-cols-2 gap-y-3 gap-x-6 border-y border-neutral-800/90 py-4 text-xs font-mono tracking-widest text-[#9A9A9A] will-change-transform"
        >
          <div className="space-y-2.5">
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
          <div className="space-y-2.5">
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

        {/* ================= 5. BASELINE COPYRIGHT ROW & BACK-TO-TOP ================= */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[0.72rem] text-[#9A9A9A] font-light pt-0.5 will-change-transform"
        >
          <p>{copyrightText}</p>

          <div className="flex items-center gap-3">
            <p className="text-[#9A9A9A] font-mono text-[0.7rem]">{creditText}</p>
            <span className="text-neutral-700 hidden sm:inline">•</span>
            
            {/* Magnetic Back-to-Top Button */}
            <MagneticButton
              as="button"
              onClick={scrollToTop}
              title="Back to top"
              aria-label="Back to top"
              className="size-8 rounded-full footer-glass-pill text-[#9A9A9A] hover:text-[#E8C896] group ml-1"
            >
              <ArrowUp className="size-3.5 transform group-hover:-translate-y-0.5 transition-transform duration-300" />
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

