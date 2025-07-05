import AdminSettingsSidebar from '@/components/sidebar/AdminSettingsSidebar';
import MultipartUploadProvider from '@/providers/MultipartUploadProvider';
import React, { ReactNode } from 'react';

export default async function AdminSettingsLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className="flex flex-1">
      <AdminSettingsSidebar slug={slug} />
      <div className="flex-1 p-8">
        <MultipartUploadProvider>{children}</MultipartUploadProvider>
      </div>
    </div>
  );
}
