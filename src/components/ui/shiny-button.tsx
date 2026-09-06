import type React from "react"

export interface ShinyButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

export function ShinyButton({ children, onClick, className = "" }: ShinyButtonProps) {
  return (
    <>
      <style>{`
        @property --gradient-angle {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }

        @property --gradient-angle-offset {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }

        @property --gradient-percent {
          syntax: "<percentage>";
          initial-value: 5%;
          inherits: false;
        }

        @property --gradient-shine {
          syntax: "<color>";
          initial-value: #E8C896;
          inherits: false;
        }

        .shiny-cta {
          --shiny-cta-bg: #0C0C0C;
          --shiny-cta-bg-subtle: #1a1818;
          --shiny-cta-fg: #c9a25f;
          --shiny-cta-highlight: #c9a25f;
          --shiny-cta-highlight-subtle: #e8c896;
          --duration: 2.2s;
          --shadow-size: 2px;
          
          isolation: isolate;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          outline-offset: 4px;
          padding: 0.85rem 2.25rem;
          font-family: inherit;
          font-size: 0.875rem;
          line-height: 1.2;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          border: 1.5px solid transparent;
          border-radius: 360px;
          color: var(--shiny-cta-fg);
          background: linear-gradient(var(--shiny-cta-bg), var(--shiny-cta-bg)) padding-box,
            conic-gradient(
              from calc(var(--gradient-angle) - var(--gradient-angle-offset)),
              transparent,
              var(--shiny-cta-highlight) var(--gradient-percent),
              #e8c896 calc(var(--gradient-percent) * 1.5),
              var(--shiny-cta-highlight) calc(var(--gradient-percent) * 2.5),
              transparent calc(var(--gradient-percent) * 3.5)
            ) border-box;
          box-shadow: 0 0 20px rgba(201, 162, 95, 0.3), inset 0 0 0 1px var(--shiny-cta-bg-subtle);
          transition: background 0.25s ease-out, box-shadow 0.25s ease-out, color 0.25s ease-out, transform 0.25s ease-out;
          animation: gradient-angle var(--duration) linear infinite;
        }

        .shiny-cta::before,
        .shiny-cta::after,
        .shiny-cta span::before {
          content: "";
          pointer-events: none;
          position: absolute;
          inset-inline-start: 50%;
          inset-block-start: 50%;
          translate: -50% -50%;
          z-index: -1;
        }

        .shiny-cta:active {
          translate: 0 1px;
        }

        /* Dots pattern */
        .shiny-cta::before {
          --size: calc(100% - var(--shadow-size) * 3);
          --position: 2px;
          --space: calc(var(--position) * 2);
          width: var(--size);
          height: var(--size);
          background: radial-gradient(
            circle at var(--position) var(--position),
            rgba(201, 162, 95, 0.8) calc(var(--position) / 4),
            transparent 0
          ) padding-box;
          background-size: var(--space) var(--space);
          background-repeat: space;
          mask-image: conic-gradient(
            from calc(var(--gradient-angle) + 45deg),
            black,
            transparent 10% 90%,
            black
          );
          border-radius: inherit;
          opacity: 0.4;
          z-index: -1;
          animation: gradient-angle var(--duration) linear infinite;
        }

        /* Inner shimmer */
        .shiny-cta::after {
          width: 100%;
          aspect-ratio: 1;
          background: linear-gradient(
            -50deg,
            transparent,
            var(--shiny-cta-highlight),
            transparent
          );
          mask-image: radial-gradient(circle at bottom, transparent 40%, black);
          opacity: 0.6;
          animation: shimmer var(--duration) linear infinite;
        }

        .shiny-cta span {
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .shiny-cta span::before {
          --size: calc(100% + 1rem);
          width: var(--size);
          height: var(--size);
          box-shadow: inset 0 -1ex 2rem 4px var(--shiny-cta-highlight);
          opacity: 0;
          transition: opacity 0.25s ease-out;
          animation: calc(var(--duration) * 1.5) breathe linear infinite;
        }

        .shiny-cta:is(:hover, :focus-visible) {
          --gradient-percent: 22%;
          --gradient-angle-offset: 95deg;
          --shiny-cta-highlight: #d4af66;
          background: linear-gradient(#181510, #181510) padding-box,
            conic-gradient(
              from calc(var(--gradient-angle) - var(--gradient-angle-offset)),
              transparent,
              #d4af66 var(--gradient-percent),
              #f5d78e calc(var(--gradient-percent) * 1.5),
              #d4af66 calc(var(--gradient-percent) * 2.5),
              transparent calc(var(--gradient-percent) * 3.5)
            ) border-box;
          color: #FFFFFF;
          box-shadow: 0 0 35px rgba(212, 175, 102, 0.65), inset 0 0 0 1px rgba(212, 175, 102, 0.7);
        }

        .shiny-cta:is(:hover, :focus-visible) span::before {
          opacity: 1;
        }

        @keyframes gradient-angle {
          to {
            --gradient-angle: 360deg;
          }
        }

        @keyframes shimmer {
          to {
            rotate: 360deg;
          }
        }

        @keyframes breathe {
          from, to {
            scale: 1;
          }
          50% {
            scale: 1.2;
          }
        }
      `}</style>

      <button className={`shiny-cta ${className}`} onClick={onClick}>
        <span>{children}</span>
      </button>
    </>
  )
}
