import { jwtVerify, SignJWT } from 'jose';
import { v4 as uuidv4 } from 'uuid';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createActionSecret() {
  const key = process.env.NEXT_PUBLIC_ACTION_KEY;

  if (!key) {
    throw new Error('NEXT_PUBLIC_ACTION_KEY is not defined');
  }

  const secret = new SignJWT({ id: uuidv4() })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('15s')
    .sign(new TextEncoder().encode(key));

  return secret;
}

export async function verifyActionSecret(secret: string) {
  const key = process.env.NEXT_PUBLIC_ACTION_KEY;

  if (!key) {
    throw new Error('NEXT_PUBLIC_ACTION_KEY is not defined');
  }

  try {
    const { payload } = await jwtVerify<{ id: string }>(
      secret,
      new TextEncoder().encode(key),
      {
        algorithms: ['HS256'],
      },
    );
    return payload;
  } catch {
    throw new Error('Invalid action secret');
  }
}
