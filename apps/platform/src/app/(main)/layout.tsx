import { Header } from '@/components/header';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="space-y-10">
      <Header />
      <div className="wrapper">{children}</div>
    </div>
  );
}
