import { ShinyButton } from './ui/shiny-button';

type ContactButtonProps = {
  className?: string;
  label?: string;
  onClick?: () => void;
};

export default function ContactButton({
  className = '',
  label = 'Contact Us',
  onClick,
}: ContactButtonProps) {
  return (
    <ShinyButton className={className} onClick={onClick}>
      {label}
    </ShinyButton>
  );
}
