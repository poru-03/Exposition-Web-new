type ContactButtonProps = {
  className?: string;
  label?: string;
};

export default function ContactButton({
  className = '',
  label = 'Contact Me',
}: ContactButtonProps) {
  return (
    <button
      type="button"
      className={`rounded-full border border-[#B8894F]/60 bg-[#141414]/90 px-8 py-3 text-xs font-semibold uppercase tracking-widest text-[#E8C896] shadow-[0_0_20px_rgba(184,137,79,0.25)] transition-all duration-200 hover:bg-gradient-to-r hover:from-[#B8894F] hover:to-[#E8C896] hover:text-[#0C0C0C] hover:scale-[1.03] active:scale-[0.98] sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base ${className}`}
    >
      {label}
    </button>
  );
}
