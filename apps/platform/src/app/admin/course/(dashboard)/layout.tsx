import { Header } from '@/components/header';
import React, { ReactNode } from 'react';
import MultipartUploadProvider from '@/providers/MultipartUploadProvider';
import LoginDialogProvider from '@/providers/LoginDialogProvider';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col">
      <LoginDialogProvider>
        <Header />
        <div className="flex w-full flex-1">
          <MultipartUploadProvider>{children}</MultipartUploadProvider>
        </div>
      </LoginDialogProvider>
    </div>
  );
}
