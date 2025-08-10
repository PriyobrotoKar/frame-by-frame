import { jwtExtractor } from '@/common/utils';
import { JwtPayload } from '@/types/jwt.payload';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { Inject, Injectable } from '@nestjs/common';
import refreshJwtConfig from '../config/refresh-jwt.config';
import { type ConfigType } from '@nestjs/config';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'refresh-jwt',
) {
  constructor(
    @Inject(refreshJwtConfig.KEY)
    refreshJwtConfiguration: ConfigType<typeof refreshJwtConfig>,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: (req) => jwtExtractor(req, 'refresh_token'),
      ignoreExpiration: false,
      secretOrKey: refreshJwtConfiguration.secret,
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: JwtPayload): Promise<JwtPayload> {
    const refreshToken = jwtExtractor(request, 'refresh_token');
    return this.authService.validateRefreshToken(refreshToken, payload);
  }
}
