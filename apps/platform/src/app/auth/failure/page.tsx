'use client';

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function AuthFailurePage() {
  const params = useSearchParams();
  const router = useRouter();
  const error = params.get('error');

  useEffect(() => {
    if (!error) {
      router.replace('/');
      return;
    }

    toast.error(error);
    router.replace('/');
  }, [error, router]);

  return <div>Login Failed. Redirecting....</div>;
}
