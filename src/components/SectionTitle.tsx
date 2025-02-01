interface SectionTitleProps {
  title: string;
  subtitle: string;
}

export default function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div className="max-w-screen-md mx-auto text-center space-y-8">
      <p className="text-xl tracking-widest text-primary">{subtitle}</p>
      <h2 className="text-display">{title}</h2>
    </div>
  );
}
