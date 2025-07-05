'use client';

import { createSession, Session } from '@/lib/session';
import { useSession } from '@/providers/SessionProvider';
import { User } from '@frame-by-frame/db';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthSucessPage() {
  const { setData } = useSession();
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
      role,
      access_token,
      refresh_token,
    }: User & { access_token: string; refresh_token: string } =
      JSON.parse(data);

    const session: Session = {
      user: {
        id,
        email,
        name,
        role,
        image: profilePic ?? undefined,
      },
      accessToken: access_token,
      refreshToken: refresh_token,
    };

    createSession(session).then(() => {
      setData(session);

      if (redirectUrl) {
        router.replace(redirectUrl);
      }

      // If no redirect is provided, redirect to the home page
      router.replace('/');
    });
  }, [data, redirectUrl, setData, router]);

  return <div>Login successfull. Redirecting....</div>;
}
