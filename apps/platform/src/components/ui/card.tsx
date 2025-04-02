import { PropsWithChildren } from 'react';

function Card({ children }: PropsWithChildren) {
  return <div className="bg-card space-y-5 rounded-2xl p-4">{children}</div>;
}

Card.Content = function CardContent({ children }: PropsWithChildren) {
  return <div className="space-y-4">{children}</div>;
};

Card.Header = function CardHeader({ children }: PropsWithChildren) {
  return <div className="space-y-2">{children}</div>;
};

Card.Title = function CardTitle({ children }: PropsWithChildren) {
  return <h2 className="text-body-semibold">{children}</h2>;
};

Card.Subtitle = function CardSubtitle({ children }: PropsWithChildren) {
  return <h3 className="text-md text-muted-foreground">{children}</h3>;
};

Card.Info = function CardInfo({ children }: PropsWithChildren) {
  return (
    <span className="text-md text-muted-foreground inline-flex items-center gap-2">
      {children}
    </span>
  );
};

Card.Footer = function CardFooter({ children }: PropsWithChildren) {
  return <div className="space-y-3">{children}</div>;
};

export default Card;
