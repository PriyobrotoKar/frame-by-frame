'use client';

import { createSession } from '@/lib/session';
import { User } from '@frame-by-frame/db';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthSucessPage() {
  const params = useSearchParams();
  const router = useRouter();
  const data = params.get('data');
  const redirectUrl = params.get('redirect');

  useEffect(() => {
    if (!data) {
      router.push('/');
      return;
    }

    const {
      id,
      email,
      name,
      profilePic,
      access_token,
      refresh_token,
    }: User & { access_token: string; refresh_token: string } =
      JSON.parse(data);

    createSession({
      user: {
        id,
        email,
        name,
        image: profilePic ?? undefined,
      },
      accessToken: access_token,
      refreshToken: refresh_token,
    }).then(() => {
      if (redirectUrl) {
        router.replace(redirectUrl);
      }

      // If no redirect is provided, redirect to the home page
      router.replace('/');
    });
  }, [data, redirectUrl, router]);

  return <div>Login successfull. Redirecting....</div>;
}
