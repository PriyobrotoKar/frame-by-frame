import { google } from 'googleapis';

const keys = JSON.parse(process.env.CREDS!);

const auth = new google.auth.GoogleAuth({
  credentials: keys,
  scopes: [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/calendar.events',
  ],
  clientOptions: {
    subject: 'mail@domicon.co',
  },
});

export default auth;
