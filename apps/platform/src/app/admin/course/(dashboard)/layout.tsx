import { Header } from '@/components/header';
import React, { ReactNode } from 'react';
import MultipartUploadProvider from '@/providers/MultipartUploadProvider';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <div className="wrapper flex w-full flex-1">
        <MultipartUploadProvider>{children}</MultipartUploadProvider>
      </div>
    </div>
  );
}
