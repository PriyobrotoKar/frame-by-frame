import {
  Controller,
  Get,
  Logger,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleAuth } from './guards/google.guard';
import { type Response, type Request } from 'express';
import { Profile as GoogleProfile } from 'passport-google-oauth20';
import { Profile as DiscordProfile } from 'passport-discord';

import { setCookie } from '@/common/utils';
import { DiscordAuth } from './guards/discord.guard';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(GoogleAuth)
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(GoogleAuth)
  async googleAuthCallback(
    @Req() req: Request,
    @Res() res: Response,
    @Query('state') state: string,
  ) {
    try {
      // Decode the state parameter to get the original URL
      const json: string = Buffer.from(state, 'base64').toString('utf-8');
      const { path } = JSON.parse(json);

      const { access_token, refresh_token, user } =
        await this.authService.handleGoogleLogin(req.user as GoogleProfile);

      setCookie(res, { access_token, refresh_token });

      return this.redirect(
        '/auth/success',
        { data: JSON.stringify(user), redirect: path },
        res,
      );
    } catch (error) {
      if (error instanceof Error) {
        return this.redirect('/auth/failure', { error: error.message }, res);
      }
    }
  }

  @Get('discord')
  @UseGuards(DiscordAuth)
  async discordAuth() {}

  @Get('discord/callback')
  @UseGuards(DiscordAuth)
  async discordAuthCallback(
    @Req() req: Request,
    @Res() res: Response,
    @Query('state') state: string,
  ) {
    try {
      // Decode the state parameter to get the original URL
      const json: string = Buffer.from(state, 'base64').toString('utf-8');
      const { path } = JSON.parse(json);

      const { access_token, refresh_token, user } =
        await this.authService.handleDiscordLogin(req.user as DiscordProfile);

      setCookie(res, { access_token, refresh_token });

      return this.redirect(
        '/auth/success',
        { data: JSON.stringify(user), redirect: path },
        res,
      );
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(error);
        return this.redirect('/auth/failure', { error: error.message }, res);
      }
    }
  }

  private async redirect(
    path: string,
    params: Record<string, string>,
    res: Response,
  ) {
    const redirectUrl = new URL(path, 'http://localhost:3000');
    Object.entries(params).forEach(([key, value]) => {
      if (!value) return;
      redirectUrl.searchParams.set(key, value);
    });
    return res.status(302).redirect(redirectUrl.toString());
  }
}
