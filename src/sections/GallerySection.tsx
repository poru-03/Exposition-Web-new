import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Lightbox from 'yet-another-react-lightbox';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import FadeIn from '../components/FadeIn';

export type GalleryItem = {
  id: string;
  src: string;
  name: string;
  description: string;
  accentColor: string;
};

type SlotPosition = {
  top: number;
  left: number;
  width: number;
  height: number;
  z: number;
};

// TODO: Replace these placeholder photos and descriptions with real assets from past Exposition editions.
export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'opening-keynote',
    name: 'Opening Keynote',
    description:
      'The symposium opens with a keynote that sets the tone for the weekend — ideas, ambition, and a packed hall.',
    src: '/resources/gallery/opening-keynote.png',
    accentColor: '#E8C896',
  },
  {
    id: 'hackathon-finals',
    name: 'Hackathon Finals',
    description:
      'Teams present under lights and a ticking clock. Finals night is loud, crowded, and the most competitive hour of the event.',
    src: '/resources/gallery/hackathon-finals.png',
    accentColor: '#6EA8FF',
  },
  {
    id: 'innovation-expo',
    name: 'Innovation Expo Floor',
    description:
      'Prototypes, demos, and booth conversations across the expo floor — the densest stretch of the weekend.',
    src: '/resources/gallery/innovation-expo-floor.png',
    accentColor: '#C4A574',
  },
  {
    id: 'award-night',
    name: 'Award Night',
    description:
      'Winners take the stage as the house lights drop. A gold-hour close to the competitive tracks.',
    src: '/resources/gallery/award-night.png',
    accentColor: '#F0C14B',
  },
  {
    id: 'student-showcase',
    name: 'Student Showcase',
    description:
      'Student builders walk visitors through projects they shipped in a single edition — raw, unfinished, and proud.',
    src: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=900&auto=format&fit=crop',
    accentColor: '#7EC8E3',
  },
  {
    id: 'closing-ceremony',
    name: 'Closing Ceremony',
    description:
      'A last gathering before the hall empties. Speeches, applause, and the official close of the edition.',
    src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=900&auto=format&fit=crop',
    accentColor: '#D4AF77',
  },
  {
    id: 'panel-discussion',
    name: 'Panel Discussion',
    description:
      'Founders, researchers, and operators on one stage — unscripted answers to the questions the hallway was already asking.',
    src: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=900&auto=format&fit=crop',
    accentColor: '#9B7EDE',
  },
  {
    id: 'workshop-lab',
    name: 'Workshop Lab',
    description:
      'Hands-on sessions where attendees leave with a working build, not just notes. Laptops open, mentors circulating.',
    src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=900&auto=format&fit=crop',
    accentColor: '#4ECDC4',
  },
  {
    id: 'networking-night',
    name: 'Networking Night',
    description:
      'The unofficial highlight: conversations that start at a booth and continue well after the program ends.',
    src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=900&auto=format&fit=crop',
    accentColor: '#E07A5F',
  },
  {
    id: 'after-hours',
    name: 'Campus After Hours',
    description:
      'The campus after dark — music, leftover lanyards, and the last people still talking about what they saw.',
    src: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=900&auto=format&fit=crop',
    accentColor: '#A78BFA',
  },
];

const FRONT_SET = GALLERY_ITEMS.slice(0, 5);
const BACK_SET = GALLERY_ITEMS.slice(5, 10);

const MD_QUERY = '(min-width: 768px)';

const SLOT_POSITIONS: SlotPosition[] = [
  { top: 4, left: 3, width: 31, height: 54, z: 2 },
  { top: 0, left: 29, width: 26, height: 42, z: 4 },
  { top: 6, left: 52, width: 30, height: 50, z: 1 },
  { top: 52, left: 24, width: 32, height: 46, z: 5 },
  { top: 54, left: 64, width: 33, height: 44, z: 3 },
];

const PARTICLES: Array<{ x: string; y: string; size: number; duration: number; delay: number }> = [
  { x: '6%', y: '18%', size: 3, duration: 8.2, delay: 0 },
  { x: '14%', y: '68%', size: 2, duration: 9.4, delay: 1.1 },
  { x: '22%', y: '10%', size: 4, duration: 7.1, delay: 0.4 },
  { x: '78%', y: '14%', size: 3, duration: 8.8, delay: 1.6 },
  { x: '88%', y: '58%', size: 2, duration: 10.2, delay: 0.7 },
  { x: '93%', y: '28%', size: 3, duration: 7.6, delay: 2.1 },
  { x: '48%', y: '6%', size: 2, duration: 9.0, delay: 0.9 },
  { x: '54%', y: '88%', size: 3, duration: 8.5, delay: 1.4 },
  { x: '9%', y: '44%', size: 2, duration: 11.0, delay: 2.4 },
  { x: '84%', y: '78%', size: 4, duration: 7.8, delay: 0.3 },
];

function useIsDesktop(): boolean {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(MD_QUERY).matches : false,
  );

  useEffect(() => {
    const media = window.matchMedia(MD_QUERY);
    const update = () => setIsDesktop(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return isDesktop;
}

function hexToRgba(hex: string, alpha: number): string {
  const normalized = hex.replace('#', '');
  const full =
    normalized.length === 3
      ? normalized
          .split('')
          .map((char) => `${char}${char}`)
          .join('')
      : normalized;
  const value = Number.parseInt(full, 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function GalleryHeading() {
  return (
    <div className="relative z-10 mx-auto mb-7 flex w-full max-w-[1560px] flex-col items-center px-4 text-center sm:mb-8 md:mb-9 md:px-6">
      <FadeIn
        as="h2"
        delay={0}
        y={40}
        className="hero-heading section-title font-black uppercase leading-none tracking-tight"
        style={{ fontSize: 'clamp(2.4rem, 5.5vw, 76px)' }}
      >
        Gallery
      </FadeIn>
    </div>
  );
}

function AmbientField({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 72% 58% at 50% 42%, rgba(184, 137, 79, 0.16) 0%, transparent 68%)',
        }}
      />
      <div
        className="absolute left-1/2 top-[46%] h-[58%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-[#B8894F]/20"
        style={{ transform: 'translate(-50%, -50%) scaleX(1.12) scaleY(0.72)' }}
      />
      {PARTICLES.map((particle) => (
        <motion.span
          key={`${particle.x}-${particle.y}`}
          className="absolute rounded-full bg-white"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            opacity: 0.16,
          }}
          animate={
            reduceMotion ? { opacity: 0.14 } : { y: [0, -16, 0], opacity: [0.1, 0.26, 0.1] }
          }
          transition={
            reduceMotion
              ? { duration: 0 }
              : {
                  duration: particle.duration,
                  delay: particle.delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }
          }
        />
      ))}
    </div>
  );
}

function TileCaption({ name, attached = true }: { name: string; attached?: boolean }) {
  return (
    <div
      className={
        attached
          ? 'pointer-events-none absolute inset-x-0 bottom-0 z-10 flex h-[25%] items-end bg-gradient-to-t from-black/80 to-transparent px-3 pb-3 sm:px-4 sm:pb-4'
          : 'pointer-events-none flex h-full w-full items-end bg-gradient-to-t from-black/80 to-transparent px-3 pb-3 sm:px-4 sm:pb-4'
      }
    >
      <p
        className="w-full font-black uppercase leading-tight text-[#E8C896]"
        style={{
          fontSize: 'clamp(0.72rem, 1.35vw, 1.05rem)',
          letterSpacing: '0.08em',
          wordSpacing: '0.16em',
        }}
      >
        {name}
      </p>
    </div>
  );
}

function GalleryTile({
  item,
  onOpen,
  reduceMotion,
  showCaption = true,
}: {
  item: GalleryItem;
  onOpen: () => void;
  reduceMotion: boolean;
  showCaption?: boolean;
}) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      className="relative h-full w-full overflow-hidden rounded-xl bg-[#141414] p-0 text-left"
      style={{
        boxShadow: `0 0 0 1px ${item.accentColor}, 0 0 28px 2px ${hexToRgba(item.accentColor, 0.45)}`,
      }}
      whileHover={reduceMotion ? undefined : { y: -4, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      aria-label={`Open ${item.name}`}
    >
      <img
        src={item.src}
        alt={item.name}
        draggable={false}
        className="h-full w-full object-cover"
      />
      {showCaption ? <TileCaption name={item.name} /> : null}
    </motion.button>
  );
}

function SwapControl({
  showingBackSet,
  onToggle,
}: {
  showingBackSet: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="relative z-20 mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-[#E8C896] transition-colors hover:text-white sm:mt-8 sm:text-sm"
    >
      {showingBackSet ? 'Back to Highlights ↺' : 'View More Photos ↻'}
    </button>
  );
}

function GalleryLightbox({
  items,
  index,
  onClose,
}: {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
}) {
  const slides = useMemo(
    () =>
      items.map((item) => ({
        src: item.src,
        alt: item.name,
        title: item.name,
        description: item.description,
      })),
    [items],
  );

  const handleClose = useCallback(() => {
    window.__lenis?.start();
    onClose();
  }, [onClose]);

  return (
    <Lightbox
      open={index >= 0}
      close={handleClose}
      index={Math.max(0, index)}
      slides={slides}
      plugins={[Captions]}
      captions={{ descriptionTextAlign: 'start', descriptionMaxLines: 6 }}
      controller={{ closeOnBackdropClick: true }}
      styles={{
        container: { backgroundColor: 'rgba(12, 12, 12, 0.94)' },
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
      on={{
        entered: () => {
          window.__lenis?.stop();
        },
      }}
    />
  );
}

function DesktopCollage({
  items,
  showingBackSet,
  reduceMotion,
  onOpen,
}: {
  items: GalleryItem[];
  showingBackSet: boolean;
  reduceMotion: boolean;
  onOpen: (index: number) => void;
}) {
  return (
    <div
      className="relative mx-auto w-full max-w-[1560px] isolate"
      style={{ height: 'min(86vh, 840px)', minHeight: '620px', perspective: '1200px' }}
    >
      {SLOT_POSITIONS.map((slot, slotIndex) => {
        const item = items[slotIndex];
        if (!item) return null;

        return (
          <div
            key={`slot-${slotIndex}`}
            className="absolute"
            style={{
              top: `${slot.top}%`,
              left: `${slot.left}%`,
              width: `${slot.width}%`,
              height: `${slot.height}%`,
              zIndex: slot.z,
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`${showingBackSet ? 'back' : 'front'}-${item.id}`}
                className="h-full w-full"
                initial={
                  reduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, scale: 0.92, rotateY: showingBackSet ? 16 : -16 }
                }
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={
                  reduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, scale: 0.92, rotateY: showingBackSet ? -16 : 16 }
                }
                transition={{
                  duration: reduceMotion ? 0.2 : 0.48,
                  delay: reduceMotion ? 0 : slotIndex * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <GalleryTile
                  item={item}
                  onOpen={() => onOpen(slotIndex)}
                  reduceMotion={reduceMotion}
                  showCaption={false}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        );
      })}
      {SLOT_POSITIONS.map((slot, slotIndex) => {
        const item = items[slotIndex];
        if (!item) return null;

        return (
          <div
            key={`caption-slot-${slotIndex}`}
            className="pointer-events-none absolute"
            style={{
              top: `${slot.top + slot.height * 0.75}%`,
              left: `${slot.left}%`,
              width: `${slot.width}%`,
              height: `${slot.height * 0.25}%`,
              zIndex: 40 + slot.z,
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`${showingBackSet ? 'back' : 'front'}-caption-${item.id}`}
                className="h-full w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: reduceMotion ? 0.2 : 0.35,
                  delay: reduceMotion ? 0 : slotIndex * 0.05,
                }}
              >
                <TileCaption name={item.name} attached={false} />
              </motion.div>
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

function MobileStack({
  showingBackSet,
  reduceMotion,
  onOpen,
}: {
  showingBackSet: boolean;
  reduceMotion: boolean;
  onOpen: (item: GalleryItem, visibleItems: GalleryItem[]) => void;
}) {
  const visibleItems = showingBackSet ? [...FRONT_SET, ...BACK_SET] : FRONT_SET;

  return (
    <div className="mx-auto flex w-full max-w-[560px] flex-col gap-4 px-4">
      <AnimatePresence>
        {visibleItems.map((item, index) => (
          <motion.div
            key={item.id}
            className="aspect-[4/5] w-full"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.4, delay: index >= 5 ? (index - 5) * 0.04 : 0 }}
          >
            <GalleryTile
              item={item}
              onOpen={() => onOpen(item, visibleItems)}
              reduceMotion={reduceMotion}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default function GallerySection() {
  const isDesktop = useIsDesktop();
  const reduceMotion = Boolean(useReducedMotion());
  const sectionRef = useRef<HTMLElement>(null);
  const hasSwappedRef = useRef(false);
  const [showingBackSet, setShowingBackSet] = useState(false);
  const [hasSwapped, setHasSwapped] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [mobileVisible, setMobileVisible] = useState<GalleryItem[]>(FRONT_SET);

  const activeSet = showingBackSet ? BACK_SET : FRONT_SET;
  const lightboxItems = isDesktop ? activeSet : mobileVisible;

  const markSwapped = useCallback(() => {
    if (hasSwappedRef.current) return;
    hasSwappedRef.current = true;
    setHasSwapped(true);
  }, []);

  const toggleSet = useCallback(() => {
    setShowingBackSet((current) => !current);
    markSwapped();
    setLightboxIndex(-1);
    window.__lenis?.start();
  }, [markSwapped]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || isDesktop === false) return undefined;

    let midpointVisible = false;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) {
          midpointVisible = false;
          return;
        }
        const rect = entry.boundingClientRect;
        const mid = rect.top + rect.height / 2;
        midpointVisible = mid > 80 && mid < window.innerHeight - 80;
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    observer.observe(section);

    let lastY = window.__lenis?.scroll ?? window.scrollY;

    const onScroll = () => {
      if (hasSwappedRef.current) return;

      const currentY = window.__lenis?.scroll ?? window.scrollY;
      const delta = currentY - lastY;
      lastY = currentY;
      if (delta <= 8) return;

      const rect = section.getBoundingClientRect();
      const mid = rect.top + rect.height / 2;
      const inMid = mid > 80 && mid < window.innerHeight - 80;
      if (!inMid && !midpointVisible) return;

      hasSwappedRef.current = true;
      setHasSwapped(true);
      setShowingBackSet(true);
      setLightboxIndex(-1);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, [isDesktop]);

  useEffect(() => {
    setMobileVisible(showingBackSet ? [...FRONT_SET, ...BACK_SET] : FRONT_SET);
  }, [showingBackSet]);

  const openDesktop = (index: number) => {
    setLightboxIndex(index);
  };

  const openMobile = (item: GalleryItem, visibleItems: GalleryItem[]) => {
    setMobileVisible(visibleItems);
    const index = visibleItems.findIndex((entry) => entry.id === item.id);
    setLightboxIndex(index);
  };

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative z-10 min-h-screen w-full bg-transparent py-20 md:py-28"
    >
      <AmbientField reduceMotion={reduceMotion} />
      <div className="relative z-10 flex flex-col items-center">
        <GalleryHeading />

        {isDesktop ? (
          <DesktopCollage
            items={activeSet}
            showingBackSet={showingBackSet}
            reduceMotion={reduceMotion}
            onOpen={openDesktop}
          />
        ) : (
          <MobileStack
            showingBackSet={showingBackSet}
            reduceMotion={reduceMotion}
            onOpen={openMobile}
          />
        )}

        <SwapControl showingBackSet={showingBackSet} onToggle={toggleSet} />
      </div>

      <GalleryLightbox
        items={lightboxItems}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(-1)}
      />

      <span className="sr-only">{hasSwapped ? 'Gallery back set available' : 'Gallery front set'}</span>
    </section>
  );
}
