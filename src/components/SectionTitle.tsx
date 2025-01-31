import { cn } from "@/lib/utils";
import Animate from "./Animate";

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
        "max-w-md md:max-w-screen-md mx-auto text-center space-y-8",
        className,
      )}
    >
      <p className="text-sm-semibold md:text-xl tracking-widest text-primary">
        {subtitle}
      </p>
      <h2 className="text-h1 md:text-display">{title}</h2>
    </Animate>
  );
}
