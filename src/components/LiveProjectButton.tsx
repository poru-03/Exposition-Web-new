import { ArrowUpRight } from 'lucide-react';

type LiveProjectButtonProps = {
  className?: string;
  label?: string;
};

export default function LiveProjectButton({
  className = '',
  label = 'Live Project',
}: LiveProjectButtonProps) {
  return (
    <button
      type="button"
      className={`inline-flex shrink-0 items-center gap-2 rounded-full border border-[#B8894F]/50 bg-[#141414]/80 px-8 py-3 text-sm font-medium uppercase tracking-widest text-[#E8C896] shadow-[0_0_15px_rgba(184,137,79,0.15)] transition-colors duration-200 hover:bg-[#B8894F]/15 hover:border-[#E8C896] sm:px-10 sm:py-3.5 sm:text-base ${className}`}
    >
      {label}
      <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2} />
    </button>
  );
}
