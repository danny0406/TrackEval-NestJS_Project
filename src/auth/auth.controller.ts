import { Body, Controller, Get, Post, Request, HttpCode, HttpStatus } from '@nestjs/common';

import { Public } from '../decorators/public.decorator'

import { AuthService } from './auth.service';
import { SignInAuthDto } from './dto/signIn-auth.dto';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Public()
  @Post('login')
  async signIn(@Body() signInDto: SignInAuthDto) {
    return this.authService.signIn(signInDto);
  }
  
  @Get('profile')
  getProfile(@Request() req : any) {
    return req.user;
  }
}