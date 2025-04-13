import { ActivitySidebar } from '@/components/sidebar/ActivitySidebar';
import React from 'react';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex h-full gap-8">
      <div className="mr-[19.25rem] flex-1">{children}</div>
      <ActivitySidebar />
    </div>
  );
}
