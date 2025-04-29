import { Response } from 'express';

export const setCookie = (
  res: Response,
  tokens: { access_token: string; refresh_token: string },
) => {
  const { access_token, refresh_token } = tokens;

  res.cookie('access_token', access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day
  });

  res.cookie('refresh_token', refresh_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
  });

  return res;
};
