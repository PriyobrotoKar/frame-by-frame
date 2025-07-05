'use client';
import { Button } from '@/components/ui/button';
import { IconArrowLeft } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex h-svh flex-col items-center justify-center gap-4">
      <div className="flex items-center gap-4">
        <div className="text-lg">404</div>
        <div>Page not found</div>
      </div>
      <Button onClick={router.back} variant={'link'}>
        <IconArrowLeft /> Go Back
      </Button>
    </div>
  );
}
