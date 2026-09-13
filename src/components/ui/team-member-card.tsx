import * as React from "react";
import { Mail, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";

// Custom SVG component for WhatsApp (matching lucide icon size & style)
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
    </svg>
  );
}

export interface TeamMemberSocials {
  mail?: string;
  email?: string;
  linkedin?: string;
  whatsapp?: string;
  twitter?: string;
  instagram?: string;
}

export interface TeamMemberCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl?: string;
  image?: string;
  name: string;
  position: string;
  socials: TeamMemberSocials;
  themeColor?: string; // HSL value string, default: "43 74% 66%" (warm gold)
  isActive?: boolean; // Controls whether card photo is full color (e.g. centered in carousel)
}

const TeamMemberCard = React.forwardRef<HTMLDivElement, TeamMemberCardProps>(
  (
    {
      className,
      name,
      position,
      imageUrl,
      image,
      socials,
      themeColor = "43 74% 66%",
      isActive = false,
      ...props
    },
    ref
  ) => {
    const photoUrl = imageUrl || image || "";
    const emailLink = socials.mail || socials.email;

    return (
      <div
        ref={ref}
        style={{
          // @ts-ignore - CSS custom property for themed HSL color
          "--gold-color": themeColor,
        } as React.CSSProperties}
        className={cn(
          "group relative w-full aspect-[3/4] max-w-[320px] rounded-2xl overflow-hidden shadow-xl select-none cursor-pointer border border-white/10 bg-[#121212] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(212,175,55,0.25)]",
          className
        )}
        {...props}
      >
        {/* 1. Full-Bleed Photo (Grayscale -> Color when Active or Hovered + Scale on Hover) */}
        <div
          className={cn(
            "absolute inset-0 w-full h-full bg-cover bg-top filter transition-all duration-700 ease-in-out group-hover:scale-110",
            isActive
              ? "grayscale-0 contrast-100"
              : "grayscale contrast-110 group-hover:grayscale-0 group-hover:contrast-100"
          )}
          style={{ backgroundImage: `url("${encodeURI(photoUrl)}")` }}
        >
          <img
            src={photoUrl}
            alt={name}
            className="w-full h-full object-cover object-top opacity-0"
          />
        </div>

        {/* 2. Default State Dark Gradient Overlay at Bottom (~25% height) */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 ease-in-out group-hover:opacity-0"
          style={{
            background: `linear-gradient(to top, rgba(0, 0, 0, 0.95), rgba(0, 0, 0, 0.5) 25%, transparent 50%)`,
          }}
        />

        {/* 3. Semi-Transparent Golden Gradient Overlay (Increased height to ~58% reveal) */}
        <div
          className="absolute inset-x-0 bottom-0 h-[58%] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out pointer-events-none group-hover:pointer-events-auto"
          style={{
            background: `linear-gradient(to top, hsl(var(--gold-color) / 0.88), hsl(var(--gold-color) / 0.55) 45%, transparent 100%)`,
          }}
        />

        {/* 4. Name, Position & Staggered Social Icons Container */}
        <div className="relative z-10 h-full p-6 flex flex-col justify-end items-center text-center pointer-events-none">
          <div className="w-full flex flex-col items-center justify-center transition-transform duration-400 ease-out group-hover:-translate-y-2">
            {/* Member Name */}
            <h3 className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-white group-hover:text-neutral-950 transition-colors duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] group-hover:drop-shadow-none line-clamp-1 w-full text-center">
              {name}
            </h3>

            {/* Member Position */}
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#E8C896] group-hover:text-neutral-900 transition-colors duration-300 mt-1 line-clamp-1 w-full text-center drop-shadow">
              {position}
            </p>

            {/* Social Icons Row (Black circular icon buttons, fade in + slide up staggered) */}
            <div className="mt-4 flex items-center justify-center gap-2.5">
              {/* Mail / Email Icon (Delay 100ms) */}
              {emailLink && (
                <a
                  href={`mailto:${emailLink}`}
                  aria-label="Email"
                  className="size-8 rounded-full bg-neutral-950 text-white flex items-center justify-center shadow-md 
                             opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0
                             transition-all duration-300 ease-out delay-100
                             hover:bg-black hover:scale-110 active:scale-95 pointer-events-none group-hover:pointer-events-auto"
                >
                  <Mail className="size-4 text-white" />
                </a>
              )}

              {/* LinkedIn Icon (Delay 200ms) */}
              {socials.linkedin && (
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="size-8 rounded-full bg-neutral-950 text-white flex items-center justify-center shadow-md 
                             opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0
                             transition-all duration-300 ease-out delay-200
                             hover:bg-black hover:scale-110 active:scale-95 pointer-events-none group-hover:pointer-events-auto"
                >
                  <Linkedin className="size-4 text-white" />
                </a>
              )}

              {/* WhatsApp Icon (Delay 300ms) */}
              {socials.whatsapp && (
                <a
                  href={socials.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="size-8 rounded-full bg-neutral-950 text-white flex items-center justify-center shadow-md 
                             opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0
                             transition-all duration-300 ease-out delay-300
                             hover:bg-black hover:scale-110 active:scale-95 pointer-events-none group-hover:pointer-events-auto"
                >
                  <WhatsAppIcon className="size-4 text-white" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
);
TeamMemberCard.displayName = "TeamMemberCard";

export { TeamMemberCard };
