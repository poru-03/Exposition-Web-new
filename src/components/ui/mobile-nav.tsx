import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Home,
  Info,
  Clock,
  Zap,
  Mic,
  Video,
  Image as ImageIcon,
  Star,
  Handshake,
  Users,
  HelpCircle,
  LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
}

export const ALL_MOBILE_NAV_ITEMS: NavItem[] = [
  { id: 'hero', label: 'Home', href: '#hero', icon: Home },
  { id: 'about', label: 'About', href: '#about', icon: Info },
  { id: 'timeline', label: 'Timeline', href: '#timeline', icon: Clock },
  { id: 'techevent-hub', label: 'Events', href: '#techevent-hub', icon: Zap },
  { id: 'keynote-speakers', label: 'Speakers', href: '#keynote-speakers', icon: Mic },
  { id: 'interviews', label: 'Interviews', href: '#interviews', icon: Video },
  { id: 'gallery', label: 'Gallery', href: '#gallery', icon: ImageIcon },
  { id: 'reviews', label: 'Reviews', href: '#reviews', icon: Star },
  { id: 'partners', label: 'Partners', href: '#partners', icon: Handshake },
  { id: 'team', label: 'Team', href: '#team', icon: Users },
  { id: 'faq', label: 'FAQ', href: '#faq', icon: HelpCircle },
];

export interface MobileNavProps {
  items?: NavItem[];
  className?: string;
  onCenterClick?: () => void;
}

export function MobileNav({
  items = ALL_MOBILE_NAV_ITEMS,
  className,
  onCenterClick,
}: MobileNavProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState('#hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const navContainerRef = useRef<HTMLDivElement>(null);

  // Track active section and scroll state; auto-close menu on scroll
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          setIsScrolled(scrollY > 100);

          // Auto-close menu when scrolling
          if (scrollY > 50) {
            setIsExpanded(false);
          }

          const sectionIds = items.map((item) => item.href.replace('#', ''));
          let current = '#hero';

          for (const id of sectionIds) {
            const el = document.getElementById(id);
            if (el) {
              const top = el.offsetTop - 180;
              const height = el.offsetHeight;
              if (scrollY >= top && scrollY < top + height) {
                current = `#${id}`;
                break;
              }
            }
          }

          if (current !== activeSection) {
            setActiveSection(current);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [items, activeSection]);

  // Click outside listener to auto-close menu
  useEffect(() => {
    const handleClickOutside = (e: Event) => {
      if (
        navContainerRef.current &&
        !navContainerRef.current.contains(e.target as Node)
      ) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isExpanded]);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
    if (onCenterClick) {
      onCenterClick();
    }
  };

  const handleNavClick = (href: string) => {
    setIsExpanded(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      if ((window as any).__lenis) {
        (window as any).__lenis.scrollTo(el, { offset: 0, duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else if (href === '#hero') {
      if ((window as any).__lenis) {
        (window as any).__lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Backdrop overlay when expanded on mobile */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsExpanded(false)}
            className="fixed inset-0 z-[95] md:hidden bg-black/40 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      <div
        ref={navContainerRef}
        className={cn(
          'fixed left-0 top-1/2 -translate-y-1/2 z-[100] md:hidden pointer-events-none flex items-center',
          className
        )}
      >
        <div className="relative pointer-events-auto flex items-center">
          {/* SIDE PLUS TOGGLE BUTTON (Tucks to left edge showing half circle when scrolled down) */}
          <motion.button
            type="button"
            onClick={toggleExpand}
            animate={{
              x: isExpanded ? 0 : isScrolled ? -22 : 0,
              scale: isExpanded ? 1 : 0.95,
            }}
            whileHover={{ x: 0 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className={cn(
              'relative z-20 w-11 h-11 rounded-r-2xl sm:rounded-full bg-gradient-to-tr from-[#B8894F] to-[#E8C896] text-zinc-950 flex items-center justify-center shadow-[0_4px_25px_rgba(232,200,150,0.4)] border border-white/20 active:scale-90 cursor-pointer shrink-0 ml-0',
              !isExpanded && isScrolled && 'pl-4 shadow-[5px_0_20px_rgba(0,0,0,0.8)]'
            )}
            aria-label={isExpanded ? 'Collapse navigation menu' : 'Expand navigation menu'}
            aria-expanded={isExpanded}
          >
            <motion.div
              animate={{ rotate: isExpanded ? 45 : 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <Plus className="w-5 h-5 stroke-[2.8]" />
            </motion.div>
          </motion.button>

          {/* EXPANDABLE VERTICAL SECTION LIST WITH ICONS & NAMES BELOW */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, x: -40, scale: 0.9 }}
                animate={{ opacity: 1, x: 8, scale: 1 }}
                exit={{ opacity: 0, x: -40, scale: 0.9 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center gap-1.5 py-3 px-1.5 rounded-2xl bg-[#101010]/95 backdrop-blur-2xl border border-white/15 shadow-[0_15px_45px_rgba(0,0,0,0.95)] max-h-[82vh] overflow-y-auto no-scrollbar ml-1"
              >
                {items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.href;

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.href)}
                      className={cn(
                        'flex flex-col items-center justify-center p-1.5 rounded-xl transition-all duration-300 w-12 cursor-pointer active:scale-95 shrink-0',
                        isActive
                          ? 'bg-gradient-to-b from-[#F5E6C8] to-[#c9a25f] text-black font-black shadow-[0_0_15px_rgba(232,200,150,0.5)] scale-105'
                          : 'text-zinc-400 hover:text-white hover:bg-white/10'
                      )}
                    >
                      <Icon className="w-3.5 h-3.5 stroke-[2.2] shrink-0" />
                      <span className="text-[7.5px] font-bold uppercase tracking-tighter leading-none mt-1 truncate max-w-full text-center">
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

export default MobileNav;

