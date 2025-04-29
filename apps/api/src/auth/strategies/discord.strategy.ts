import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-discord';
import discordConfig from '../config/discord.config';
import { Inject } from '@nestjs/common';
import { type ConfigType } from '@nestjs/config';

export class DiscordStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(discordConfig.KEY)
    private discordConfiguration: ConfigType<typeof discordConfig>,
  ) {
    super({
      clientID: discordConfiguration.clientId,
      clientSecret: discordConfiguration.clientSecret,
      callbackURL: discordConfiguration.callbackUrl,
      scope: ['identify', 'email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: unknown) {
    console.log('Discord profile:', profile);
    return profile;
  }
}
