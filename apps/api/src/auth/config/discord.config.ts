import { registerAs } from '@nestjs/config';

export default registerAs('DiscordConfig', () => ({
  clientId: process.env.DISCORD_CLIENT_ID,
  clientSecret: process.env.DISCORD_CLIENT_SECRET,
  callbackUrl: process.env.BACKEND_URL + '/api/auth/discord/callback',
}));
