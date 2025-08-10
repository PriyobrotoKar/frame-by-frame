import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthProvider, db, Prisma, Role } from '@frame-by-frame/db';
import { JwtService } from '@nestjs/jwt';
import { ConfigService, type ConfigType } from '@nestjs/config';
import refreshJwtConfig from './config/refresh-jwt.config';
import { Profile as GoogleProfile } from 'passport-google-oauth20';
import { Profile as DiscordProfile } from 'passport-discord';
import { JwtPayload } from '@/types/jwt.payload';
import { hash, verify } from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
    @Inject(refreshJwtConfig.KEY)
    private readonly refreshJwtConfiguration: ConfigType<
      typeof refreshJwtConfig
    >,
  ) {}

  async validateRefreshToken(refreshToken: string, payload: JwtPayload) {
    // check if any user exists
    const user = await db.user.findUnique({
      where: {
        id: payload.id,
        email: payload.email,
      },
    });

    if (!user || !user.refreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    // check if the refresh tokens match
    const isMatch = await verify(user.refreshToken, refreshToken);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    // if valid, return the user
    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }

  async refreshToken(user: JwtPayload) {
    // Generate new JWT tokens for the user
    const tokens = await this.generateTokens(user.email, user.id, user.role);

    // Update the user's refresh token in the database
    const hashedRefreshToken = await hash(tokens.refresh_token);
    await db.user.update({
      where: { id: user.id },
      data: {
        refreshToken: hashedRefreshToken,
      },
    });

    return tokens;
  }

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
      // Check if the user is an Admin or not
      const isAdmin = this.config
        .get('ADMIN_EMAILS')
        .split(',')
        .includes(profile.emails[0].value);

      user = await db.user.create({
        data: {
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id,
          profilePic: profile.photos[0].value,
          authProvider: AuthProvider.GOOGLE,
          role: isAdmin ? Role.ADMIN : Role.USER,
        },
      });
    } else {
      // If the user exists, update their profile information in case it has changed
      user = await db.user.update({
        where: { id: user.id },
        data: {
          name: profile.displayName,
          email: profile.emails[0].value,
          profilePic: profile.photos[0].value,
        },
      });
    }

    // Generate JWT tokens for the user
    const tokens = await this.generateTokens(
      profile.emails[0].value,
      user.id,
      user.role,
    );

    // Update the user's refresh token in the database
    const hashedRefreshToken = await hash(tokens.refresh_token);
    await db.user.update({
      where: { id: user.id },
      data: {
        refreshToken: hashedRefreshToken,
      },
    });

    return {
      ...tokens,
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
      // Check if the user is an Admin or not
      const isAdmin = this.config
        .get('ADMIN_EMAILS')
        .split(',')
        .includes(profile.emails[0].value);

      user = await db.user.create({
        data: {
          name: profile.global_name ?? profile.username,
          email: profile.email,
          profilePic: `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`,
          authProvider: AuthProvider.DISCORD,
          discordId: profile.id,
          role: isAdmin ? Role.ADMIN : Role.USER,
        },
      });
    } else {
      // If the user exists, update their profile information in case it has changed
      user = await db.user.update({
        where: { id: user.id },
        data: {
          name: profile.global_name ?? profile.username,
          email: profile.email,
          profilePic: `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`,
        },
      });
    }

    // Generate JWT tokens for the user
    const tokens = await this.generateTokens(profile.email, user.id, user.role);

    // Update the user's refresh token in the database
    const hashedRefreshToken = await hash(tokens.refresh_token);
    await db.user.update({
      where: { id: user.id },
      data: {
        refreshToken: hashedRefreshToken,
      },
    });

    return {
      ...tokens,
      user,
    };
  }

  async logout(user: JwtPayload) {
    // Invalidate the user's refresh token by setting it to null
    await db.user.update({
      where: { id: user.id },
      data: {
        refreshToken: null,
      },
    });

    return { message: 'Logged out successfully' };
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

  private async generateTokens(email: string, id: string, role: Role) {
    const access_token = await this.jwtService.signAsync({
      email,
      id,
      role,
    });

    const refresh_token = await this.jwtService.signAsync(
      {
        email,
        id,
        role,
      },
      this.refreshJwtConfiguration,
    );

    return { access_token, refresh_token };
  }
}
