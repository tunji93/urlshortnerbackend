import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './loclal-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  signIn(@Request() req, @Body() loginAuthDto: LoginAuthDto) {
    return this.authService.generateUserToken(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getUserProfile(@Request() req) {
    return req.user;
  }
}
