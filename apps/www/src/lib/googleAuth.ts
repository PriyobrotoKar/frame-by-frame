import { GoogleAuth } from 'google-auth-library';

const keys = JSON.parse(process.env.CREDS!);

const auth = new GoogleAuth({
  credentials: keys,
  scopes: [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/calendar',
  ],
});

export default auth;
