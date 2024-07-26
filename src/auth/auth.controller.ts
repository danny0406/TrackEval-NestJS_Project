import { Body, Controller, Get, Post, Request, HttpCode, HttpStatus } from '@nestjs/common';

import { Public } from '../decorators/public.decorator'

import { AuthService } from './auth.service';
import { SignInAuthDto } from './dto/signIn-auth.dto';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Public()
  @Post('login')
  async signIn(@Body() signInDto: SignInAuthDto) {
    return await this.authService.signIn(signInDto);
  }

  @Public()
  @Post('register')
  async register(@Body() user: CreateUserDto) {
    return this.userService.create(user);
  }
  
  @Get('profile')
  getProfile(@Request() req : any) {
    return req.user;
  }
}