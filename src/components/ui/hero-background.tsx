export function HeroBackground() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 z-0 bg-cover bg-no-repeat bg-[center_bottom] select-none pointer-events-none bg-[#0a0a0a]"
      style={{
        backgroundImage: "url('/hero/hero-background-v2-all-speakers.jpg')",
      }}
    />
  );
}

export default HeroBackground;
