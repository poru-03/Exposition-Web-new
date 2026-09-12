import { useState, useMemo } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import ScrollReveal from '../components/ScrollReveal';

export type GalleryItem = {
  id: string;
  src: string;
  title: string;
  subtitle: string;
  description: string;
};

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'opening-keynote',
    title: 'Opening Keynote',
    subtitle: 'Main Stage',
    description: 'The symposium opens with a keynote that sets the tone for the weekend — ideas, ambition, and a packed hall.',
    src: '/resources/gallery/opening-keynote.png',
  },
  {
    id: 'hackathon-finals',
    title: 'Hackathon Finals',
    subtitle: 'Innovation Hub',
    description: 'Teams present under lights and a ticking clock. Finals night is loud, crowded, and the most competitive hour.',
    src: '/resources/gallery/hackathon-finals.png',
  },
  {
    id: 'innovation-expo',
    title: 'Innovation Expo Floor',
    subtitle: 'Tech Arena',
    description: 'Prototypes, demos, and booth conversations across the expo floor — the densest stretch of the weekend.',
    src: '/resources/gallery/innovation-expo-floor.png',
  },
  {
    id: 'award-night',
    title: 'Award Night',
    subtitle: 'Grand Finale',
    description: 'Winners take the stage as the house lights drop. A gold-hour close to the competitive tracks.',
    src: '/resources/gallery/award-night.png',
  },
  {
    id: 'student-showcase',
    title: 'Student Showcase',
    subtitle: 'Exposition Floor',
    description: 'Student builders walk visitors through projects they shipped in a single edition — raw and visionary.',
    src: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=900&auto=format&fit=crop',
  },
  {
    id: 'closing-ceremony',
    title: 'Closing Ceremony',
    subtitle: 'Main Stage',
    description: 'A last gathering before the hall empties. Speeches, applause, and the official close of the edition.',
    src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=900&auto=format&fit=crop',
  },
  {
    id: 'panel-discussion',
    title: 'Panel Discussion',
    subtitle: 'IPN Conclave',
    description: 'Founders, researchers, and operators on one stage — unscripted answers to essential tech & management questions.',
    src: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=900&auto=format&fit=crop',
  },
  {
    id: 'workshop-lab',
    title: 'Workshop Lab',
    subtitle: 'Hands-on Labs',
    description: 'Hands-on sessions where attendees leave with a working build. Laptops open, mentors circulating.',
    src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=900&auto=format&fit=crop',
  },
  {
    id: 'networking-night',
    title: 'Networking Night',
    subtitle: 'Executive Lounge',
    description: 'The unofficial highlight: conversations that start at a booth and continue well after the program ends.',
    src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=900&auto=format&fit=crop',
  },
  {
    id: 'after-hours',
    title: 'Campus After Hours',
    subtitle: 'Night Socials',
    description: 'The campus after dark — music, leftover lanyards, and the last people still talking about what they saw.',
    src: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=900&auto=format&fit=crop',
  },
];

function TorchlightGalleryTile({
  src,
  alt,
  title,
  subtitle,
  onClick,
  aspectClass = 'aspect-[16/9]',
  borderClass = 'border-white/10',
}: {
  src: string;
  alt: string;
  title: string;
  subtitle: string;
  onClick: () => void;
  aspectClass?: string;
  borderClass?: string;
}) {
  const [pos, setPos] = useState({ x: 50, y: 50, isHovered: false });

  const handleMove = (clientX: number, clientY: number, currentTarget: HTMLElement) => {
    const rect = currentTarget.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    setPos({ x, y, isHovered: true });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleMove(e.clientX, e.clientY, e.currentTarget);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLButtonElement>) => {
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX, e.touches[0].clientY, e.currentTarget);
    }
  };

  const handleLeave = () => {
    setPos((prev) => ({ ...prev, isHovered: false }));
  };

  return (
    <button
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleLeave}
      onTouchStart={handleTouchMove}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleLeave}
      className={`group relative w-full ${aspectClass} rounded-xl overflow-hidden border ${borderClass} bg-[#161514] text-left cursor-pointer transition-all duration-500 hover:border-[#c9a25f] shadow-lg`}
    >
      {/* Base Layer: Black & White Grayscale Image */}
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover filter grayscale contrast-125 brightness-90 transition-transform duration-700 group-hover:scale-105"
      />

      {/* Top Layer: Extra Vibrant Color Image clipped with circular Spotlight Torchlight Mask */}
      <img
        src={src}
        alt={`${alt} color`}
        className="absolute inset-0 w-full h-full object-cover filter saturate-[1.65] brightness-110 contrast-110 transition-opacity duration-300 pointer-events-none group-hover:scale-105"
        style={{
          opacity: pos.isHovered ? 1 : 0,
          clipPath: pos.isHovered
            ? `circle(135px at ${pos.x}% ${pos.y}%)`
            : 'circle(0px at 50% 50%)',
          transition: 'clip-path 0.04s ease-out, opacity 0.3s ease',
        }}
      />

      {/* Radial Gold Glow Ring around Spotlight Circle */}
      {pos.isHovered && (
        <div
          className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 145px at ${pos.x}% ${pos.y}%, rgba(232, 200, 150, 0.35) 0%, rgba(201, 162, 95, 0.15) 70%, transparent 100%)`,
          }}
        />
      )}

      {/* Overlay Vignette Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none z-10" />

      {/* Title & Metadata Box */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-20 pointer-events-none">
        <div>
          <span className="text-[0.6rem] font-mono font-bold uppercase text-[#c9a25f]">
            ▷ {subtitle}
          </span>
          <h5 className="text-xs sm:text-sm font-extrabold uppercase text-white truncate">
            {title}
          </h5>
        </div>
      </div>
    </button>
  );
}

export default function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const slides = useMemo(
    () =>
      GALLERY_ITEMS.map((item) => ({
        src: item.src,
        alt: item.title,
        title: item.title,
        description: item.description,
      })),
    [],
  );

  return (
    <section
      id="gallery"
      className="relative z-10 min-h-screen w-full bg-[#0C0C0C] py-16 sm:py-24 md:py-28 overflow-hidden px-[5%] sm:px-[6%] lg:px-[7%]"
    >
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#c9a25f]/5 blur-[160px] pointer-events-none rounded-full" />

      {/* Decorative Thin Gold Connecting Lines across section (Matching architectural reference) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-[#c9a25f]/20 stroke-[1] z-0" aria-hidden="true">
        <line x1="5%" y1="12%" x2="95%" y2="12%" />
        <line x1="10%" y1="35%" x2="90%" y2="35%" strokeDasharray="4 4" />
        <line x1="38%" y1="12%" x2="52%" y2="28%" />
        <line x1="68%" y1="35%" x2="88%" y2="78%" />
      </svg>

      {/* Main Architectural Collage Layout Grid Container */}
      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Desktop Asymmetric Architectural Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">

          {/* ================= LEFT COLUMN: BIG TITLE BLOCK & HUGE HORIZONTAL PHOTO (lg:col-span-5) ================= */}
          <div className="lg:col-span-5 flex flex-col space-y-6">

            {/* Top Left Title Block (Matching HANYOS PRODUCTION & REAL ESTATE PRODUCTS style) */}
            <ScrollReveal className="flex flex-col space-y-2 pt-2">
              <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-[#c9a25f]">
                EXPOSITION ARCHIVE GALLERY
              </span>
              <div className="w-12 h-[2px] bg-[#c9a25f]/60 my-1" />
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-[#c9a25f] leading-[0.9]">
                EXPOSITION<br />
                <span className="text-white">HERITAGE</span>
              </h2>
            </ScrollReveal>

            {/* Photo 1: Large Wide Panoramic Tile */}
            <ScrollReveal delay={0.1}>
              <TorchlightGalleryTile
                src={GALLERY_ITEMS[0].src}
                alt={GALLERY_ITEMS[0].title}
                title={GALLERY_ITEMS[0].title}
                subtitle={GALLERY_ITEMS[0].subtitle}
                onClick={() => setLightboxIndex(0)}
                aspectClass="aspect-[16/9]"
                borderClass="border-[#c9a25f]/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
              />
            </ScrollReveal>

            {/* Row with Photo 2 + Solid Gold Accent Block */}
            <div className="grid grid-cols-12 gap-4">
              <ScrollReveal delay={0.15} className="col-span-8">
                <TorchlightGalleryTile
                  src={GALLERY_ITEMS[1].src}
                  alt={GALLERY_ITEMS[1].title}
                  title={GALLERY_ITEMS[1].title}
                  subtitle={GALLERY_ITEMS[1].subtitle}
                  onClick={() => setLightboxIndex(1)}
                  aspectClass="aspect-[4/3]"
                />
              </ScrollReveal>

              {/* Architectural Gold Accent Box */}
              <ScrollReveal delay={0.2} className="col-span-4 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#c9a25f]/30 via-[#b8894f]/20 to-[#0c0c0c] border border-[#c9a25f]/40 p-4 shadow-lg">
                <div className="text-center space-y-1">
                  <span className="text-2xl sm:text-3xl font-black text-[#c9a25f] block">10+</span>
                  <span className="text-[0.6rem] font-mono font-bold uppercase tracking-widest text-white/80">EDITIONS</span>
                </div>
              </ScrollReveal>
            </div>

          </div>

          {/* ================= MIDDLE COLUMN: TALL VERTICAL TILES & DIAMOND GEOMETRY (lg:col-span-4) ================= */}
          <div className="lg:col-span-4 flex flex-col space-y-6 sm:mt-10 lg:mt-0">

            {/* Top Middle: Medium Landscape Tile */}
            <ScrollReveal delay={0.2}>
              <TorchlightGalleryTile
                src={GALLERY_ITEMS[2].src}
                alt={GALLERY_ITEMS[2].title}
                title={GALLERY_ITEMS[2].title}
                subtitle={GALLERY_ITEMS[2].subtitle}
                onClick={() => setLightboxIndex(2)}
                aspectClass="aspect-[16/10]"
              />
            </ScrollReveal>

            {/* Middle: Tall Portrait Tile (Key Showcase) */}
            <ScrollReveal delay={0.25}>
              <TorchlightGalleryTile
                src={GALLERY_ITEMS[3].src}
                alt={GALLERY_ITEMS[3].title}
                title={GALLERY_ITEMS[3].title}
                subtitle={GALLERY_ITEMS[3].subtitle}
                onClick={() => setLightboxIndex(3)}
                aspectClass="aspect-[3/4] sm:aspect-[4/5]"
                borderClass="border-[#c9a25f]/40 shadow-[0_25px_60px_rgba(0,0,0,0.9)]"
              />
            </ScrollReveal>

            {/* Bottom Middle: Photo 4 */}
            <ScrollReveal delay={0.3}>
              <TorchlightGalleryTile
                src={GALLERY_ITEMS[4].src}
                alt={GALLERY_ITEMS[4].title}
                title={GALLERY_ITEMS[4].title}
                subtitle={GALLERY_ITEMS[4].subtitle}
                onClick={() => setLightboxIndex(4)}
                aspectClass="aspect-[16/9]"
              />
            </ScrollReveal>

          </div>

          {/* ================= RIGHT COLUMN: STACKED GRID TILES & GOLD ACCENT CARD (lg:col-span-3) ================= */}
          <div className="lg:col-span-3 flex flex-col space-y-5">

            {/* Top Right Portrait Tile */}
            <ScrollReveal delay={0.35}>
              <TorchlightGalleryTile
                src={GALLERY_ITEMS[5].src}
                alt={GALLERY_ITEMS[5].title}
                title={GALLERY_ITEMS[5].title}
                subtitle={GALLERY_ITEMS[5].subtitle}
                onClick={() => setLightboxIndex(5)}
                aspectClass="aspect-[3/4]"
              />
            </ScrollReveal>

            {/* Middle Right Landscape Tile */}
            <ScrollReveal delay={0.4}>
              <TorchlightGalleryTile
                src={GALLERY_ITEMS[6].src}
                alt={GALLERY_ITEMS[6].title}
                title={GALLERY_ITEMS[6].title}
                subtitle={GALLERY_ITEMS[6].subtitle}
                onClick={() => setLightboxIndex(6)}
                aspectClass="aspect-[16/10]"
              />
            </ScrollReveal>

            {/* Bottom Right Tile + Accent Card Grid */}
            <div className="grid grid-cols-2 gap-3">
              <ScrollReveal delay={0.45}>
                <TorchlightGalleryTile
                  src={GALLERY_ITEMS[7].src}
                  alt={GALLERY_ITEMS[7].title}
                  title={GALLERY_ITEMS[7].title}
                  subtitle={GALLERY_ITEMS[7].subtitle}
                  onClick={() => setLightboxIndex(7)}
                  aspectClass="aspect-square"
                />
              </ScrollReveal>

              {/* Accent Brown/Gold Solid Card matching top-right of image */}
              <ScrollReveal delay={0.5} className="w-full aspect-square rounded-xl bg-[#b8894f]/25 border border-[#c9a25f]/30 flex flex-col justify-center items-center p-3 text-center">
                <span className="text-xs font-mono text-[#c9a25f] font-bold">EXPOSITION</span>
                <span className="text-[0.6rem] font-mono uppercase text-white/70 tracking-widest mt-1">MOMENTS</span>
              </ScrollReveal>
            </div>

          </div>

        </div>

      </div>

      {/* Lightbox Component */}
      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={Math.max(0, lightboxIndex)}
        slides={slides}
        plugins={[Captions]}
        captions={{ descriptionTextAlign: 'start', descriptionMaxLines: 6 }}
        controller={{ closeOnBackdropClick: true }}
        styles={{
          container: { backgroundColor: 'rgba(12, 12, 12, 0.95)' },
          captionsTitle: {
            color: '#E8C896',
            fontFamily: 'Kanit, sans-serif',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          },
          captionsDescription: {
            color: '#D8D8D8',
            fontFamily: 'Kanit, sans-serif',
          },
        }}
      />
    </section>
  );
}

