import { Header } from '@/components/header';
import CourseSidebar from '@/components/sidebar/CourseSidebar';
import React from 'react';

export default function CourseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <CourseSidebar />
      <div className="flex-1">
        <Header showLogo={false} showNavbar={false} />
        <div className="wrapper py-3">{children}</div>
      </div>
    </div>
  );
}
