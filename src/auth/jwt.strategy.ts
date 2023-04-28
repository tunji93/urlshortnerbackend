import { Injectable, UnauthorizedException } from '@nestjs/common';

import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from 'src/config/config.service';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { JwtPayload } from './dto/jwt-payload.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.env.JWT_SECRET,
    });
  }

  validate(payload: JwtPayload): any {
    return {
      email: payload.sub,
      id: payload.id,
      firstname: payload.firstName,
      lastname: payload.lastName,
    };
  }
}
