import AdminCourseSidebar from '@/components/sidebar/AdminCourseSidebar';
import React, { ReactNode } from 'react';

export default function AdminContentLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex flex-1">
      <AdminCourseSidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
}
