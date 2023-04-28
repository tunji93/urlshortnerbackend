import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    console.log('bring');
    super({
      usernameField: 'email',
    });
  }

  async validate(
    username: string,
    password: string,
  ): Promise<User | undefined> {
    console.log('man');
    const user = await this.authService.validateUserCredentials(
      username,
      password,
    );
    if (!user)
      throw new HttpException(
        'Invalid Email Or Password',
        HttpStatus.BAD_REQUEST,
      );
    return user;
  }
}
