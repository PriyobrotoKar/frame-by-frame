import { Request, Response } from 'express';

export const jwtExtractor = (
  req: Request,
  type: 'access_token' | 'refresh_token',
) => {
  let token = null;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token && req.cookies) {
    token = req.cookies[type];
  }

  return token;
};

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
};

export const setCookies = (
  res: Response,
  tokens: { access_token: string; refresh_token: string },
) => {
  const { access_token, refresh_token } = tokens;

  res.cookie('access_token', access_token, {
    ...cookieOptions,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day
  });

  res.cookie('refresh_token', refresh_token, {
    ...cookieOptions,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
  });

  return res;
};

export const clearCookies = (res: Response) => {
  res.clearCookie('access_token', cookieOptions);
  res.clearCookie('refresh_token', cookieOptions);
};
