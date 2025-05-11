import { jwtExtractor } from '@/common/utils';
import { JwtPayload } from '@/types/jwt.payload';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: (req) => jwtExtractor(req, 'access_token'),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload): Promise<JwtPayload> {
    console.log('JWT payload', payload);
    return { id: payload.id, email: payload.email, role: payload.role };
  }
}
