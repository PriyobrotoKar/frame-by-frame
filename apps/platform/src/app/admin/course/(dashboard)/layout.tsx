import { Header } from '@/components/header';
import React, { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <div className="wrapper flex w-full flex-1">{children}</div>
    </div>
  );
}
