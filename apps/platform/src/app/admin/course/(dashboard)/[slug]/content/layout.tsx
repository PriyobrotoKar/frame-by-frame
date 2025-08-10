import AdminCourseSidebar from '@/components/sidebar/AdminCourseSidebar';
import React, { ReactNode } from 'react';
import MultipartUploadProvider from '@/providers/MultipartUploadProvider';

export default function AdminContentLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ slug: string }>;
}) {
  return (
    <div className="flex flex-1">
      <MultipartUploadProvider>
        <AdminCourseSidebar params={params} />
        <div className="wrapper flex-1 p-8">{children}</div>
      </MultipartUploadProvider>
    </div>
  );
}
