import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUserCredentials(
    email: string,
    password: string,
  ): Promise<User> {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new HttpException(
        'Invalid Email Or Password',
        HttpStatus.BAD_REQUEST,
      );
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new HttpException(
        'Invalid Email Or Password',
        HttpStatus.BAD_REQUEST,
      );
    }

    return user;
  }

  async generateUserToken(user: User) {
    return {
      access_token: this.jwtService.sign({
        firstName: user.firstname,
        sub: user.email,
        lastName: user.lastname,
        id: user.id,
      }),
    };
  }
}
