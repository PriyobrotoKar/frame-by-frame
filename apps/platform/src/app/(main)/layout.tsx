import Header from '@/components/Header';
import Sidebar from '@/components/sidebar/Sidebar';
import React from 'react';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-svh">
      <Sidebar />
      <div className="flex h-svh flex-1 flex-col gap-3">
        <Header />
        <div className="overflow-auto px-8">{children}</div>
      </div>
    </div>
  );
}
