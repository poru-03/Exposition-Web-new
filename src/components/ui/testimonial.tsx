"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TestimonialProps extends React.HTMLAttributes<HTMLDivElement> {
  companyLogo?: string;
  quote: string;
  authorName: string;
  authorPosition: string;
  authorImage?: string;
  highlightedText?: string;
}

export const Testimonial = React.forwardRef<HTMLDivElement, TestimonialProps>(
  ({ 
    className, 
    companyLogo,
    quote,
    authorName,
    authorPosition,
    authorImage,
    highlightedText,
    ...props 
  }, ref) => {
    const formattedQuote = highlightedText
      ? quote.replace(
          highlightedText,
          `<strong class="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#B8894F] to-[#E8C896]">${highlightedText}</strong>`
        )
      : quote;

    return (
      <div
        ref={ref}
        className={cn("py-4 sm:py-6 w-full", className)}
        {...props}
      >
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
          <div className="flex flex-col items-center text-center">
            {companyLogo && (
              <div className="mb-4 relative h-7 w-28 flex items-center justify-center">
                <img
                  src={companyLogo}
                  alt="Company logo"
                  className="h-full w-full object-contain filter brightness-125"
                />
              </div>
            )}
            <p 
              className="max-w-xl text-balance text-center text-base sm:text-lg md:text-xl text-white font-light leading-relaxed italic"
              dangerouslySetInnerHTML={{ __html: `"${formattedQuote}"` }}
            />
            <h5 className="mt-3.5 font-bold uppercase tracking-tight text-[#E8C896] text-sm sm:text-base">
              {authorName}
            </h5>
            <h6 className="mt-0.5 text-xs font-medium text-[#9A9A9A]">
              {authorPosition}
            </h6>
            {authorImage && (
              <div className="mt-3.5 relative size-12 sm:size-14 rounded-full overflow-hidden border-2 border-[#B8894F]/40 shadow-lg bg-[#181818]">
                <img
                  src={authorImage}
                  alt={authorName}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

Testimonial.displayName = "Testimonial";

export default Testimonial;
