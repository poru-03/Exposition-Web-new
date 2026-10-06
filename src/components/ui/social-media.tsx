import React from "react";
import { cn } from "@/lib/utils";

// Define the type for a single social media item
export interface SocialItem {
  href: string;
  ariaLabel: string;
  tooltip: string;
  svgUrl?: string; // Optional external SVG URL
  icon?: React.ReactNode; // Optional React Icon component
  color: string; // Color for customization & hover fill
}

// Define the props for the SocialTooltip component
export interface SocialTooltipProps extends React.HTMLAttributes<HTMLUListElement> {
  items: SocialItem[];
  containerSizeClass?: string;
  iconSizeClass?: string;
  iconColorClass?: string;
  borderClass?: string;
  tooltipPosition?: 'top' | 'bottom';
  tooltipTextColorClass?: string;
}

const SocialTooltip = React.forwardRef<HTMLUListElement, SocialTooltipProps>(
  (
    {
      className,
      items,
      containerSizeClass = "w-10 h-10 sm:w-11 sm:h-11",
      iconSizeClass = "w-5 h-5",
      iconColorClass = "text-foreground group-hover:text-white",
      borderClass = "border border-white/10",
      tooltipPosition = "bottom",
      tooltipTextColorClass = "text-white",
      ...props
    },
    ref
  ) => {
    // Base styles for the component
    const baseIconStyles =
      "relative flex items-center justify-center rounded-full bg-background overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-lg group-hover:scale-105";
    const baseSvgStyles =
      "relative z-10 transition-colors duration-300 ease-in-out";
    const baseFilledStyles =
      "absolute bottom-0 left-0 w-full h-0 transition-all duration-300 ease-in-out group-hover:h-full";
    const baseTooltipStyles =
      "absolute left-1/2 -translate-x-1/2 px-2.5 py-1 text-xs whitespace-nowrap rounded-md opacity-0 invisible transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:visible pointer-events-none z-50 shadow-md font-sans font-medium tracking-normal";

    return (
      <ul
        ref={ref}
        className={cn("flex items-center justify-center gap-3 sm:gap-4", className)}
        {...props}
      >
        {items.map((item, index) => (
          <li key={index} className="relative group flex items-center justify-center">
            <a
              href={item.href}
              aria-label={item.ariaLabel}
              className={cn(baseIconStyles, containerSizeClass, borderClass)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                className={cn(baseFilledStyles)}
                style={{ backgroundColor: item.color }}
              />
              {item.svgUrl ? (
                <img
                  src={item.svgUrl}
                  alt={item.ariaLabel}
                  className={cn(baseSvgStyles, iconColorClass, iconSizeClass)}
                />
              ) : (
                <div
                  className={cn(
                    baseSvgStyles,
                    iconColorClass,
                    iconSizeClass,
                    "flex items-center justify-center"
                  )}
                >
                  {item.icon}
                </div>
              )}
            </a>
            <div
              className={cn(
                baseTooltipStyles,
                tooltipTextColorClass,
                tooltipPosition === "top"
                  ? "bottom-full mb-2 group-hover:mb-2.5"
                  : "top-full mt-2 group-hover:mt-2.5"
              )}
              style={{ backgroundColor: item.color }}
            >
              {item.tooltip}
              <div
                className={cn(
                  "absolute left-1/2 -translate-x-1/2 size-1.5 rotate-45",
                  tooltipPosition === "top" ? "-bottom-0.5" : "-top-0.5"
                )}
                style={{ backgroundColor: item.color }}
              />
            </div>
          </li>
        ))}
      </ul>
    );
  }
);

SocialTooltip.displayName = "SocialTooltip";

export { SocialTooltip };

export default SocialTooltip;
