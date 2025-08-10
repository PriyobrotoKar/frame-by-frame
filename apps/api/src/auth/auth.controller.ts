import {
  Controller,
  Get,
  Logger,
  Post,
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

import { clearCookies, setCookies } from '@/common/utils';
import { DiscordAuth } from './guards/discord.guard';
import Public from '@/decorators/public.decorator';
import CurrentUser from '@/decorators/user.decorator';
import { type JwtPayload } from '@/types/jwt.payload';
import { RefreshAuthGuard } from './guards/refresh-auth.guard';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(RefreshAuthGuard)
  @Post('refresh-token')
  async refreshToken(
    @Res({
      passthrough: true,
    })
    res: Response,
    @CurrentUser() user: JwtPayload,
  ) {
    const { access_token, refresh_token } =
      await this.authService.refreshToken(user);

    setCookies(res, { access_token, refresh_token });

    return {
      access_token,
      refresh_token,
    };
  }

  @Public()
  @Get('google')
  @UseGuards(GoogleAuth)
  async googleAuth() {}

  @Public()
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

      setCookies(res, { access_token, refresh_token });

      return this.redirect(
        '/auth/success',
        {
          data: JSON.stringify({
            ...user,
            access_token,
            refresh_token,
          }),
          redirect: path,
        },
        res,
      );
    } catch (error) {
      if (error instanceof Error) {
        return this.redirect('/auth/failure', { error: error.message }, res);
      }
    }
  }

  @Public()
  @Get('discord')
  @UseGuards(DiscordAuth)
  async discordAuth() {}

  @Public()
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

      setCookies(res, { access_token, refresh_token });

      return this.redirect(
        '/auth/success',
        {
          data: JSON.stringify({
            ...user,
            access_token,
            refresh_token,
          }),
          redirect: path,
        },
        res,
      );
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(error);
        return this.redirect('/auth/failure', { error: error.message }, res);
      }
    }
  }

  @Post('logout')
  async logout(
    @Res({
      passthrough: true,
    })
    res: Response,
    @CurrentUser() user: JwtPayload,
  ) {
    await this.authService.logout(user);

    clearCookies(res);
    return {
      message: 'Logout successful',
    };
  }

  private async redirect(
    path: string,
    params: Record<string, string>,
    res: Response,
  ) {
    const redirectUrl = new URL(path, process.env.FRONTEND_URL);
    Object.entries(params).forEach(([key, value]) => {
      if (!value) return;
      redirectUrl.searchParams.set(key, value);
    });
    return res.status(302).redirect(redirectUrl.toString());
  }
}
