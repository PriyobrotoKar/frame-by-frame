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
  const session = await encodeSession(payload);
  const cookieStore = await cookies();
  cookieStore.set('session', session, cookieOptions);
};

export const getSession = async (): Promise<Session | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get('session')?.value;
  if (!token) return null;

  return decodeSession(token);
};
