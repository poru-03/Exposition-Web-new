import React from 'react';
import { cn } from "@/lib/utils";

// Define the type for a single social media item
export interface SocialItem {
  href: string;
  ariaLabel: string;
  tooltip: string;
  svgUrl?: string;
  icon?: React.ReactNode;
  color: string;
}

// Define the props for the SocialTooltip component
export interface SocialTooltipProps extends React.HTMLAttributes<HTMLUListElement> {
  items: SocialItem[];
  iconSizeClass?: string;
  containerSizeClass?: string;
  iconColorClass?: string;
  borderClass?: string;
}

const SocialTooltip = React.forwardRef<HTMLUListElement, SocialTooltipProps>(
  (
    {
      className,
      items,
      iconSizeClass,
      containerSizeClass,
      iconColorClass,
      borderClass,
      ...props
    },
    ref
  ) => {
    const baseIconStyles =
      "relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#181818] overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-[0_0_25px_rgba(184,137,79,0.5)]";
    const baseSvgStyles =
      "relative z-10 transition-colors duration-300 ease-in-out";
    const baseFilledStyles =
      "absolute bottom-0 left-0 w-full h-0 transition-all duration-300 ease-in-out group-hover:h-full bg-gradient-to-r from-[#B8894F] to-[#E8C896]";

    return (
      <ul
        ref={ref}
        className={cn("flex items-center justify-center gap-3 sm:gap-3.5", className)}
        {...props}
      >
        {items.map((item, index) => (
          <li key={index} className="relative group">
            <a
              href={item.href}
              aria-label={item.ariaLabel}
              className={cn(
                baseIconStyles,
                borderClass ?? "border border-[#B8894F]/40 hover:border-[#E8C896]",
                containerSizeClass
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={cn(baseFilledStyles)} />
              {item.svgUrl ? (
                <img
                  src={item.svgUrl}
                  alt={item.ariaLabel}
                  className={cn(
                    baseSvgStyles,
                    iconColorClass ?? "text-white group-hover:text-[#0C0C0C]",
                    iconSizeClass ?? "w-5 h-5"
                  )}
                />
              ) : (
                <div
                  className={cn(
                    baseSvgStyles,
                    iconColorClass ?? "text-white group-hover:text-[#0C0C0C]",
                    iconSizeClass ?? "w-5 h-5",
                    "flex items-center justify-center"
                  )}
                >
                  {item.icon}
                </div>
              )}
            </a>
          </li>
        ))}
      </ul>
    );
  }
);

SocialTooltip.displayName = "SocialTooltip";

export { SocialTooltip };
