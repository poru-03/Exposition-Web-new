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
  isActive?: boolean;
  imageStyle?: React.CSSProperties;
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
      imageStyle,
      ...props
    },
    ref
  ) => {
    const photoUrl = imageUrl || image || "";
    const emailLink = socials.mail || socials.email;
    const [imgSrc, setImgSrc] = React.useState(photoUrl);
    const [hasError, setHasError] = React.useState(false);

    React.useEffect(() => {
      setImgSrc(photoUrl);
      setHasError(false);
    }, [photoUrl]);

    const handleImageError = () => {
      if (imgSrc.endsWith('.webp')) {
        setImgSrc(imgSrc.replace(/\.webp$/, '.png'));
        return;
      }
      if (imgSrc.includes('New folder (2)')) {
        const filename = imgSrc.split('/').pop()?.toLowerCase();
        if (filename) {
          setImgSrc(`/resources/team/members/${filename}`);
          return;
        }
      }
      setHasError(true);
    };

    // Get initials for fallback monogram
    const initials = name
      .split(" ")
      .map((part) => part[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase();

    return (
      <div
        ref={ref}
        style={{
          // @ts-ignore - CSS custom property for themed HSL color
          "--gold-color": themeColor,
        } as React.CSSProperties}
        className={cn(
          "group relative w-full aspect-[3/4] max-w-[320px] rounded-2xl overflow-hidden shadow-xl select-none cursor-pointer border border-white/10 bg-[#121212] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#E8C896]/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.85)]",
          className
        )}
        {...props}
      >
        {/* 1. Full-Bleed Photo with natural realistic color correction & normal blend mode */}
        <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#121212] flex items-center justify-center">
          {!hasError && imgSrc ? (
            <img
              src={imgSrc}
              alt={name}
              loading="lazy"
              decoding="async"
              onError={handleImageError}
              className="w-full h-full object-cover object-[center_top] transition-transform duration-500 ease-out group-hover:scale-105"
              style={{
                opacity: 1,
                mixBlendMode: "normal",
                filter: "brightness(0.95) contrast(1.08) saturate(1.05)",
                ...imageStyle,
              }}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#1c1813] to-[#0d0d0d] p-6 text-center">
              <div className="w-20 h-20 rounded-full border border-[#E8C896]/40 bg-[#161410] flex items-center justify-center shadow-lg mb-3">
                <span className="font-serif text-2xl font-bold text-[#E8C896] tracking-wider">
                  {initials}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* 2. Dark Gradient Overlay at Bottom (transparent to rgba(0,0,0,.65)) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to top, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0.35) 32%, transparent 65%)",
          }}
        />

        {/* 3. Name, Role & Social Icons Container */}
        <div className="relative z-10 h-full p-4 sm:p-5 md:p-6 flex flex-col justify-end items-center text-center pointer-events-none">
          <div className="w-full flex flex-col items-center justify-end min-h-[4.25rem] sm:min-h-[4.75rem] transition-transform duration-300 ease-out group-hover:-translate-y-2">
            {/* Full Name: no truncation, wraps onto second line naturally */}
            <h3 className="text-base sm:text-lg md:text-xl font-extrabold uppercase tracking-tight text-white leading-tight w-full text-center whitespace-normal [overflow-wrap:anywhere] break-words drop-shadow-[0_2px_5px_rgba(0,0,0,0.95)]">
              {name}
            </h3>

            {/* Role Label */}
            <p className="text-[11px] sm:text-xs md:text-sm font-bold uppercase tracking-wider text-[#E8C896] mt-1.5 w-full text-center whitespace-normal [overflow-wrap:anywhere] break-words drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)]">
              {position}
            </p>

            {/* Social Icons Row */}
            <div className="mt-3 flex items-center justify-center gap-2">
              {/* Mail / Email Icon */}
              {emailLink && (
                <a
                  href={`mailto:${emailLink}`}
                  aria-label="Email"
                  className="size-7 sm:size-8 rounded-full bg-neutral-900/90 border border-white/20 text-white flex items-center justify-center shadow-md 
                             opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0
                             transition-all duration-300 ease-out delay-75
                             hover:bg-[#E8C896] hover:text-black hover:scale-110 active:scale-95 pointer-events-none group-hover:pointer-events-auto"
                >
                  <Mail className="size-3.5 sm:size-4 text-inherit" />
                </a>
              )}

              {/* LinkedIn Icon */}
              {socials.linkedin && (
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="size-7 sm:size-8 rounded-full bg-neutral-900/90 border border-white/20 text-white flex items-center justify-center shadow-md 
                             opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0
                             transition-all duration-300 ease-out delay-150
                             hover:bg-[#E8C896] hover:text-black hover:scale-110 active:scale-95 pointer-events-none group-hover:pointer-events-auto"
                >
                  <Linkedin className="size-3.5 sm:size-4 text-inherit" />
                </a>
              )}

              {/* WhatsApp Icon */}
              {socials.whatsapp && (
                <a
                  href={socials.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="size-7 sm:size-8 rounded-full bg-neutral-900/90 border border-white/20 text-white flex items-center justify-center shadow-md 
                             opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0
                             transition-all duration-300 ease-out delay-200
                             hover:bg-[#E8C896] hover:text-black hover:scale-110 active:scale-95 pointer-events-none group-hover:pointer-events-auto"
                >
                  <WhatsAppIcon className="size-3.5 sm:size-4 text-inherit" />
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
