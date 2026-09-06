import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface MobileNavProps {
  items: NavItem[];
  className?: string;
  onCenterClick?: () => void;
}

export function MobileNav({
  items,
  className,
  onCenterClick,
}: MobileNavProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState('#hero');

  // Track active section on scroll
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
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
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Split items array into left and right groups around the center plus button
  const half = Math.ceil(items.length / 2);
  const leftItems = items.slice(0, half);
  const rightItems = items.slice(half);

  return (
    <div className={cn('fixed bottom-5 left-1/2 -translate-x-1/2 z-50 md:hidden pointer-events-none max-w-[96vw]', className)}>
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
        className="pointer-events-auto relative flex items-center justify-center bg-zinc-900/95 border border-white/15 backdrop-blur-xl rounded-full p-1.5 shadow-[0_15px_40px_rgba(0,0,0,0.9)] overflow-hidden"
      >
        <div className="flex items-center justify-center">
          {/* Left Navigation Icons (4 Icons) */}
          <AnimatePresence>
            {isExpanded && (
              <div className="flex items-center gap-0.5 sm:gap-1 pr-1">
                {leftItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.href;
                  return (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: 20, scale: 0.6 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 20, scale: 0.6 }}
                      transition={{
                        duration: 0.25,
                        delay: (leftItems.length - 1 - index) * 0.03,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      onClick={() => handleNavClick(item.href)}
                      className={cn(
                        'w-8 h-8 sm:w-9 sm:h-9 p-1.5 flex items-center justify-center rounded-full transition-all cursor-pointer active:scale-95 shrink-0',
                        isActive
                          ? 'text-[#E8C896] bg-[#B8894F]/20 border border-[#B8894F]/40 shadow-sm'
                          : 'text-white/70 hover:text-white hover:bg-white/5 border border-transparent'
                      )}
                      aria-label={item.label}
                      title={item.label}
                    >
                      <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2]" />
                    </motion.button>
                  );
                })}
              </div>
            )}
          </AnimatePresence>

          {/* Center Circular "+" Action Toggle Button */}
          <button
            type="button"
            onClick={toggleExpand}
            className="relative z-10 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-[#B8894F] to-[#E8C896] text-zinc-950 flex items-center justify-center shadow-lg transition-transform duration-300 active:scale-95 cursor-pointer shrink-0"
            aria-label={isExpanded ? 'Collapse navigation menu' : 'Expand navigation menu'}
            aria-expanded={isExpanded}
          >
            <motion.div
              animate={{ rotate: isExpanded ? 45 : 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <Plus className="w-5 h-5 stroke-[2.8]" />
            </motion.div>
          </button>

          {/* Right Navigation Icons (4 Icons) */}
          <AnimatePresence>
            {isExpanded && (
              <div className="flex items-center gap-0.5 sm:gap-1 pl-1">
                {rightItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.href;
                  return (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: -20, scale: 0.6 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -20, scale: 0.6 }}
                      transition={{
                        duration: 0.25,
                        delay: index * 0.03,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      onClick={() => handleNavClick(item.href)}
                      className={cn(
                        'w-8 h-8 sm:w-9 sm:h-9 p-1.5 flex items-center justify-center rounded-full transition-all cursor-pointer active:scale-95 shrink-0',
                        isActive
                          ? 'text-[#E8C896] bg-[#B8894F]/20 border border-[#B8894F]/40 shadow-sm'
                          : 'text-white/70 hover:text-white hover:bg-white/5 border border-transparent'
                      )}
                      aria-label={item.label}
                      title={item.label}
                    >
                      <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2]" />
                    </motion.button>
                  );
                })}
              </div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

export default MobileNav;

