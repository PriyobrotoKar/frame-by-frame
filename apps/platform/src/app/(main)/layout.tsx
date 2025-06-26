import { Header } from '@/components/header';
import LoginDialogProvider from '@/providers/LoginDialogProvider';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="space-y-10">
      <LoginDialogProvider>
        <Header className="wrapper" />
        <div className="wrapper">{children}</div>
      </LoginDialogProvider>
    </div>
  );
}
