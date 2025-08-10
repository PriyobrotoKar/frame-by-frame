import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import googleConfig from './config/google.config';
import { GoogleStrategy } from './strategies/google.strategy';
import { JwtModule } from '@nestjs/jwt';
import refreshJwtConfig from './config/refresh-jwt.config';
import jwtConfig from './config/jwt.config';
import discordConfig from './config/discord.config';
import { DiscordStrategy } from './strategies/discord.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RefreshJwtStrategy } from './strategies/refresh-jwt.srategy';

@Module({
  imports: [
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(refreshJwtConfig),
    ConfigModule.forFeature(googleConfig),
    ConfigModule.forFeature(discordConfig),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    GoogleStrategy,
    DiscordStrategy,
    JwtStrategy,
    RefreshJwtStrategy,
  ],
})
export class AuthModule {}
