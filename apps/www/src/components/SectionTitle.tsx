import { cn } from '@/lib/utils';
import Animate from './Animate';

interface SectionTitleProps {
  title: string;
  subtitle: string;
  className?: string;
}

export default function SectionTitle({
  title,
  subtitle,
  className,
}: SectionTitleProps) {
  return (
    <Animate
      className={cn(
        'mx-auto max-w-md space-y-8 text-center md:max-w-screen-md',
        className,
      )}
    >
      <p className="text-sm-semibold text-primary tracking-widest md:text-xl">
        {subtitle}
      </p>
      <h2 className="text-h1 md:text-display text-primary-foreground">
        {title}
      </h2>
    </Animate>
  );
}
