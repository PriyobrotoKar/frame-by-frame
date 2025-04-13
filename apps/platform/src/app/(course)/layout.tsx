import Header from '@/components/Header';
import CourseSidebar from '@/components/sidebar/CourseSidebar';
import React from 'react';

export default function CourseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-svh">
      <CourseSidebar />
      <div className="flex flex-1 flex-col gap-3">
        <Header />
        <div className="h-full overflow-auto px-8">{children}</div>
      </div>
    </div>
  );
}
