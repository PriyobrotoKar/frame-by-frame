import React, { ReactNode, Suspense } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Suspense>{children}</Suspense>
    </div>
  );
}
