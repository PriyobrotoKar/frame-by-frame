'use server';

import { refreshToken } from '@/features/auth/actions/refreshToken';
import { Role } from '@frame-by-frame/db';
import { jwtVerify, SignJWT, type JWTPayload } from 'jose';
import { JWTExpired } from 'jose/errors';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  image?: string;
}

export interface Session extends JWTPayload {
  user: User;
  accessToken: string;
  refreshToken: string;
}

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '30s';
const ENCODED_KEY = new TextEncoder().encode(JWT_SECRET);
const REFRESH_JWT_EXPIRES_IN = parseInt(
  process.env.REFRESH_JWT_EXPIRES_IN ?? '7d',
);

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  expires: new Date(Date.now() + REFRESH_JWT_EXPIRES_IN * 24 * 60 * 60 * 1000),
  sameSite: 'lax' as const,
};

const encodeSession = async (payload: Session): Promise<string> => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRES_IN)
    .sign(ENCODED_KEY);
};

const decodeSession = async (token: string): Promise<Session | null> => {
  try {
    const { payload } = await jwtVerify<Session>(token, ENCODED_KEY, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch {
    return null;
  }
};

export const createSession = async (payload: Session): Promise<void> => {
  const cookieStore = await cookies();
  const session = await encodeSession(payload);

  cookieStore.set('session', session, cookieOptions);
};

export const getSession = async (
  request?: NextRequest,
): Promise<Session | null> => {
  const cookieStore = request?.cookies || (await cookies());
  const token = cookieStore.get('session')?.value;
  if (!token) return null;

  return decodeSession(token);
};

export const removeSession = async (): Promise<void> => {
  const cookieStore = await cookies();
  cookieStore.delete('session');
  redirect('/');
};

//TODO: Add the logic for refreshing the session
export const updateSession = async (
  request?: NextRequest,
  user?: Partial<User>,
): Promise<NextResponse | undefined> => {
  console.log('Updating session...', !!request);
  try {
    const session = request
      ? request.cookies.get('session')?.value
      : (await cookies()).get('session')?.value;

    if (!session) {
      return;
    }

    const { payload } = await jwtVerify<Session>(session, ENCODED_KEY, {
      algorithms: ['HS256'],
    });

    payload.user = { ...payload.user, ...user };

    if (!request) {
      await createSession(payload);
    }
  } catch (error) {
    if (error instanceof JWTExpired) {
      const payload = error.payload as Session;
      return handleExiredSession(payload, request);
    }
  }
};

const handleExiredSession = async (
  expiredSession: Session,
  request?: NextRequest,
): Promise<NextResponse | undefined> => {
  try {
    console.log('Session expired, refreshing token...');
    const refreshTokenRes = await refreshToken(expiredSession.refreshToken);
    const newSessionPayload: Session = {
      ...expiredSession,
      accessToken: refreshTokenRes.access_token,
      refreshToken: refreshTokenRes.refresh_token,
    };

    console.log('New session payload:', newSessionPayload);

    const newSession = await encodeSession(newSessionPayload);

    if (request) {
      console.log('Redirecting with new session...');
      const res = NextResponse.next();
      res.cookies.set('session', newSession, cookieOptions);
      return res;
    }

    (await cookies()).set('session', newSession, cookieOptions);
  } catch (error) {
    console.error('Error refreshing session:', error);
    const res = NextResponse.next();
    res.cookies.delete('session');
  }
};
