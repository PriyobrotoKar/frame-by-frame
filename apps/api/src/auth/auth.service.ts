import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { AuthProvider, db, Prisma } from '@frame-by-frame/db';
import { JwtService } from '@nestjs/jwt';
import { type ConfigType } from '@nestjs/config';
import refreshJwtConfig from './config/refresh-jwt.config';
import { Profile as GoogleProfile } from 'passport-google-oauth20';
import { Profile as DiscordProfile } from 'passport-discord';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(refreshJwtConfig.KEY)
    private readonly refreshJwtConfiguration: ConfigType<
      typeof refreshJwtConfig
    >,
  ) {}

  async handleGoogleLogin(profile: GoogleProfile) {
    let user = await this.getUserByOAuthId(profile.id, AuthProvider.GOOGLE);

    // Check if user with the same email exists but with a different provider
    const existingUserByEmail = await this.getUserByEmail(
      profile.emails[0].value,
    );
    if (
      existingUserByEmail &&
      existingUserByEmail.authProvider !== AuthProvider.GOOGLE
    ) {
      throw new BadRequestException(
        'User with this email already exists, please login with the correct provider',
      );
    }

    // Create a new user if it doesn't exist
    if (!user) {
      user = await db.user.create({
        data: {
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id,
          profilePic: profile.photos[0].value,
          authProvider: AuthProvider.GOOGLE,
        },
      });
    }
    // If the user exists, update their profile information in case it has changed
    user = await db.user.update({
      where: { id: user.id },
      data: {
        name: profile.displayName,
        email: profile.emails[0].value,
        profilePic: profile.photos[0].value,
      },
    });

    // Generate JWT tokens for the user
    const access_token = await this.jwtService.signAsync({
      email: profile.emails[0].value,
      id: profile.id,
    });
    const refresh_token = await this.jwtService.signAsync(
      {
        email: profile.emails[0].value,
        id: profile.id,
      },
      this.refreshJwtConfiguration,
    );

    return {
      access_token,
      refresh_token,
      user,
    };
  }

  async handleDiscordLogin(profile: DiscordProfile) {
    let user = await this.getUserByOAuthId(profile.id, AuthProvider.DISCORD);

    // Check if user with the same email exists but with a different provider
    const existingUserByEmail = await this.getUserByEmail(profile.email);
    if (
      existingUserByEmail &&
      existingUserByEmail.authProvider !== AuthProvider.DISCORD
    ) {
      throw new BadRequestException(
        'User with this email already exists, please login with the correct provider',
      );
    }

    // Create a new user if it doesn't exist
    if (!user) {
      user = await db.user.create({
        data: {
          name: profile.global_name ?? profile.username,
          email: profile.email,
          profilePic: `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`,
          authProvider: AuthProvider.DISCORD,
          discordId: profile.id,
        },
      });
    }
    // If the user exists, update their profile information in case it has changed
    user = await db.user.update({
      where: { id: user.id },
      data: {
        name: profile.global_name ?? profile.username,
        email: profile.email,
        profilePic: `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`,
      },
    });

    // Generate JWT tokens for the user
    const tokens = await this.generateTokens(profile.email, user.id);

    return {
      ...tokens,
      user,
    };
  }

  private async getUserByEmail(email: string) {
    // Find the user by email
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  private async getUserByOAuthId(oAuthId: string, provider: AuthProvider) {
    const query: Prisma.UserWhereUniqueInput =
      provider === AuthProvider.GOOGLE
        ? {
            googleId: oAuthId,
          }
        : {
            discordId: oAuthId,
          };

    // Find the user by OAuth ID and provider
    const user = await db.user.findUnique({
      where: query,
    });

    return user;
  }

  private async generateTokens(email: string, id: string) {
    const access_token = await this.jwtService.signAsync({
      email,
      id,
    });

    const refresh_token = await this.jwtService.signAsync(
      {
        email,
        id,
      },
      this.refreshJwtConfiguration,
    );

    return { access_token, refresh_token };
  }
}
