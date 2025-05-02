'use server';

import { jwtVerify, SignJWT, type JWTPayload } from 'jose';
import { cookies } from 'next/headers';

interface User {
  id: string;
  name: string;
  email: string;
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
  const accessToken = cookieStore.get('access_token')?.value;
  const refreshToken = cookieStore.get('refresh_token')?.value;

  if (!accessToken || !refreshToken) {
    throw new Error('Missing access or refresh token');
  }

  const session = await encodeSession({
    ...payload,
    accessToken,
    refreshToken,
  });

  if (process.env.NODE_ENV === 'production') {
    cookieStore.delete('access_token');
    cookieStore.delete('refresh_token');
  }

  cookieStore.set('session', session, cookieOptions);
};

export const getSession = async (): Promise<Session | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get('session')?.value;
  if (!token) return null;

  return decodeSession(token);
};

export const removeSession = async (): Promise<void> => {
  const cookieStore = await cookies();
  cookieStore.delete('session');
};

//TODO: Add the logic for refreshing the session
