import { jwtExtractor } from '@/common/utils';
import { JwtPayload } from '@/types/jwt.payload';
import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import jwtConfig from '../config/jwt.config';
import { type ConfigType } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(jwtConfig.KEY)
    jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {
    super({
      jwtFromRequest: (req) => jwtExtractor(req, 'access_token'),
      ignoreExpiration: false,
      secretOrKey: jwtConfiguration.secret,
    });
  }

  async validate(payload: JwtPayload): Promise<JwtPayload> {
    return { id: payload.id, email: payload.email, role: payload.role };
  }
}
