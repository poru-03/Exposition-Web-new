# Jack — 3D Creator

A single-page dark-theme portfolio landing page for a 3D creator, built with React, TypeScript, Tailwind CSS and Framer Motion.

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
```

Other scripts:

```bash
npm run build     # typecheck + production build into dist/
npm run preview   # serve the production build
npm run typecheck # types only
```

## Stack

| Package | Version |
| --- | --- |
| react / react-dom | ^18.3.1 |
| framer-motion | ^12.38.0 |
| lucide-react | ^0.344.0 |
| tailwindcss | ^3.4.1 |
| vite + typescript | ^5.x |

Kanit (weights 300–900) is loaded from Google Fonts in `index.html`.

## Structure

```
src/
  App.tsx                     section order: Hero → Marquee → About → Services → Projects
  index.css                   global reset, #0C0C0C background, .hero-heading gradient
  components/
    AnimatedText.tsx          character-by-character scroll reveal (0.2 → 1 opacity)
    ContactButton.tsx         gradient pill CTA
    FadeIn.tsx                whileInView fade/slide wrapper, once per element
    LiveProjectButton.tsx     ghost outline pill
    Magnet.tsx                cursor-following magnetic transform
  sections/
    HeroSection.tsx           navbar, oversized gradient heading, magnetic portrait
    MarqueeSection.tsx        two scroll-linked image rows moving in opposite directions
    AboutSection.tsx          corner 3D decorations + scroll-revealed copy
    ServicesSection.tsx       white panel, five numbered services
    ProjectsSection.tsx       sticky card stack scaled by scroll progress
```

## Notes on behaviour

- **Marquee** is driven by page scroll, not a CSS animation. The offset is
  `(scrollY - sectionTop + innerHeight) * 0.3`; row one translates right by
  `offset - 200`, row two left by the same amount. Each row's images are tripled and the
  track is pre-shifted by one set (`-33.3333%`) so no edge ever runs empty.
- **Project cards** stack via `position: sticky` inside `h-[85vh]` containers. Card *i*
  scales toward `1 - (total - 1 - i) * 0.03` as the section scrolls, and is nudged down by
  `i * 28px` so earlier cards peek out from behind.
- **AnimatedText** keeps an invisible copy of every character in the text flow and overlays
  an animated copy, so scroll-driven opacity never affects layout. Characters are grouped
  per word so lines break only at spaces, and the paragraph carries an `aria-label` with the
  full sentence.
- **Magnet** listens on `window` for `mousemove` (passive) and stays pointer-events-neutral,
  so the hero portrait never intercepts clicks on the contact button behind it.

Responsive from ~360px up to ultra-wide using Tailwind's default breakpoints plus `clamp()`
for fluid type.
