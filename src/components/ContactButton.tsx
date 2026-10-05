import { ShinyButton } from './ui/shiny-button';

type ContactButtonProps = {
  className?: string;
  label?: string;
  href?: string;
  onClick?: () => void;
};

export default function ContactButton({
  className = '',
  label = 'Contact Us',
  href = 'https://www.imssa.lk/',
  onClick,
}: ContactButtonProps) {
  const handleClick = () => {
    if (href) {
      window.open(href, '_blank', 'noopener,noreferrer');
    }
    if (onClick) {
      onClick();
    }
  };

  return (
    <ShinyButton className={className} onClick={handleClick}>
      {label}
    </ShinyButton>
  );
}
