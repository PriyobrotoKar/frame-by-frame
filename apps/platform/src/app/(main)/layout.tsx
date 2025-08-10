import Footer from '@/components/Footer';
import { Header } from '@/components/header';
import LoginDialogProvider from '@/providers/LoginDialogProvider';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-svh flex-col gap-10">
      <LoginDialogProvider>
        <Header className="wrapper" />
        <div className="wrapper mb-20">{children}</div>
        <Footer />
      </LoginDialogProvider>
    </div>
  );
}
