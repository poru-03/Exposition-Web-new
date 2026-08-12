"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export interface TestimonialCardProps {
  className?: string;
  avatar?: string;
  username?: string;
  handle?: string;
  content?: string;
  date?: string;
  verified?: boolean;
  likes?: number;
  retweets?: number;
  tweetUrl?: string;
  onHover?: () => void;
  onLeave?: () => void;
  isActive?: boolean;
  onTap?: () => void;
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function VerifiedBadge() {
  return (
    <svg
      className="size-4 text-[#E8C896]"
      viewBox="0 0 22 22"
      fill="currentColor"
    >
      <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" />
    </svg>
  );
}

export function TestimonialCard({
  className,
  avatar,
  username = "PEPE",
  handle = "@PEPE_bigbrother",
  content = "This is amazing! 🔥 Absolutely loving what the team is building here. Can't wait to see what comes next!",
  date = "Jan 5, 2026",
  verified = true,
  likes = 142,
  retweets = 23,
  tweetUrl,
  onHover,
  onLeave,
  isActive,
  onTap,
}: TestimonialCardProps) {
  const handleClick = (e: React.MouseEvent | React.TouchEvent) => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouchDevice) {
      if (!isActive) {
        e.preventDefault();
        onTap?.();
      }
    }
  };

  return (
    <a
      href={tweetUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={cn(
        "relative flex h-auto min-h-[140px] sm:min-h-[170px] w-[260px] sm:w-[360px] -skew-y-[8deg] select-none flex-col rounded-2xl border border-white/15 bg-[#141414]/95 backdrop-blur-md px-3.5 sm:px-4 py-3 sm:py-3.5 transition-all duration-500 hover:border-[#B8894F]/60 hover:bg-[#1a1a1a] shadow-[0_20px_50px_rgba(0,0,0,0.85)] cursor-pointer text-left",
        isActive && "ring-2 ring-[#E8C896]/60 border-[#B8894F]",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-start gap-2.5 sm:gap-3 mb-2">
        <div className="size-9 sm:size-11 rounded-full bg-gradient-to-br from-[#B8894F] to-[#E8C896] p-[2px] overflow-hidden shrink-0">
          <div className="w-full h-full rounded-full overflow-hidden bg-[#181818] flex items-center justify-center">
            {avatar ? (
              <img src={avatar} alt={username} className="w-full h-full object-cover" />
            ) : (
              <span className="text-sm">🎙️</span>
            )}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <span className="font-bold text-white truncate text-xs sm:text-sm">{username}</span>
            {verified && <VerifiedBadge />}
          </div>
          <span className="text-[#9A9A9A] text-[10px] sm:text-xs block truncate">{handle}</span>
        </div>
        <TwitterIcon className="size-3.5 sm:size-4 text-[#9A9A9A] shrink-0" />
      </div>

      {/* Content */}
      <p className="text-[#D8D8D8] text-xs sm:text-[13px] leading-relaxed mb-2.5 line-clamp-3">
        {content}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between text-[#9A9A9A] text-[10px] sm:text-xs mt-auto pt-2 border-t border-white/5">
        <span>{date}</span>
        <div className="flex items-center gap-3.5">
          <div className="flex items-center gap-1 hover:text-[#E8C896] transition-colors">
            <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span>{likes}</span>
          </div>
          <div className="flex items-center gap-1 hover:text-[#E8C896] transition-colors">
            <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
            <span>{retweets}</span>
          </div>
        </div>
      </div>
    </a>
  );
}

export interface TestimonialsProps {
  cards?: TestimonialCardProps[];
  className?: string;
}

export default function Testimonials({ cards, className }: TestimonialsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const getCardClassName = (index: number, baseClassName: string) => {
    const focusedIndex = hoveredIndex ?? activeIndex;
    
    if (focusedIndex === 0 && index === 1) {
      return baseClassName + " !translate-y-16 sm:!translate-y-24 !translate-x-10 sm:!translate-x-16";
    }
    if (focusedIndex === 0 && index === 2) {
      return baseClassName + " !translate-y-24 sm:!translate-y-36 !translate-x-18 sm:!translate-x-28";
    }
    if (focusedIndex === 1 && index === 2) {
      return baseClassName + " !translate-y-20 sm:!translate-y-32 !translate-x-18 sm:!translate-x-28";
    }
    return baseClassName;
  };

  const handleTap = (index: number) => {
    if (activeIndex === index) {
      return;
    }
    setActiveIndex(index);
  };

  const defaultCards: TestimonialCardProps[] = [
    {
      className:
        "[grid-area:stack] hover:-translate-y-6 before:absolute before:w-[100%] before:outline-1 before:rounded-2xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-[#0C0C0C]/60 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-500 hover:grayscale-0 before:left-0 before:top-0",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
      username: "Sarah Chen",
      handle: "@sarahchen_tech",
      content: "Exposition's executive dialogues provided unparalleled clarity on spatial AI and modern systems architecture. Outstanding symposium!",
      date: "Jan 3, 2026",
      verified: true,
      likes: 142,
      retweets: 28,
      tweetUrl: "https://x.com",
    },
    {
      className:
        "[grid-area:stack] translate-x-6 sm:translate-x-10 translate-y-5 sm:translate-y-8 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-2xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-[#0C0C0C]/60 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-500 hover:grayscale-0 before:left-0 before:top-0",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
      username: "Mike Johnson",
      handle: "@mikej_dev",
      content: "The keynote talks and leadership interviews set a new standard for technology journalism in Sri Lanka. 21st Edition is next level.",
      date: "Jan 2, 2026",
      verified: true,
      likes: 98,
      retweets: 15,
      tweetUrl: "https://x.com",
    },
    {
      className: "[grid-area:stack] translate-x-12 sm:translate-x-20 translate-y-10 sm:translate-y-16 hover:translate-y-6 sm:hover:translate-y-8",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
      username: "Alex Rivera",
      handle: "@alexrivera_ai",
      content: "The perspectives shared on digital ecosystems and entrepreneurial growth are invaluable. Can't wait for the upcoming print magazine release!",
      date: "Jan 1, 2026",
      verified: true,
      likes: 256,
      retweets: 42,
      tweetUrl: "https://x.com",
    },
  ];

  const displayCards = cards || defaultCards;

  return (
    <div className={cn("grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700 py-6", className)}>
      {displayCards.map((cardProps, index) => (
        <TestimonialCard
          key={index}
          {...cardProps}
          className={getCardClassName(index, cardProps.className || "")}
          onHover={() => setHoveredIndex(index)}
          onLeave={() => setHoveredIndex(null)}
          isActive={activeIndex === index}
          onTap={() => handleTap(index)}
        />
      ))}
    </div>
  );
}

export function Component() {
  return (
    <div className="flex min-h-[400px] w-full items-center justify-center bg-transparent p-4">
      <Testimonials />
    </div>
  );
}
