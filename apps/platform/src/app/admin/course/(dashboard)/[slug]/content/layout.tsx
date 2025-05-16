import AdminCourseSidebar from '@/components/sidebar/AdminCourseSidebar';
import React, { ReactNode } from 'react';

export default function AdminContentLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ slug: string }>;
}) {
  return (
    <div className="flex flex-1">
      <AdminCourseSidebar params={params} />
      <div className="flex-1 p-8">{children}</div>
    </div>
  );
}
