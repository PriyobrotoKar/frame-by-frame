import { Header } from '@/components/header';
import React, { ReactNode } from 'react';
import LoginDialogProvider from '@/providers/LoginDialogProvider';

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-svh flex-col">
      <LoginDialogProvider>
        <Header />
        <div className="flex w-full flex-1">{children}</div>
      </LoginDialogProvider>
    </div>
  );
}
