import Header from '@/components/Header';
import { ActivitySidebar } from '@/components/sidebar/ActivitySidebar';
import Sidebar from '@/components/sidebar/Sidebar';
import React from 'react';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-svh">
      <Sidebar />
      <div className="flex flex-1 flex-col gap-3">
        <Header />
        <div className="flex h-full">
          <div className="flex-1 px-8">{children}</div>
          <div className="pb-5 pr-5">
            <ActivitySidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
