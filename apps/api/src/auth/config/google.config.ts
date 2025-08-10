import { registerAs } from '@nestjs/config';

export default registerAs('GoogleConfig', () => ({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackUrl: process.env.BACKEND_URL + '/api/auth/google/callback',
}));
