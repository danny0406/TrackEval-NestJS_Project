import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { SignInAuthDto } from './dto/signIn-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async signIn(signInAuthDto : SignInAuthDto ) {
    const { password, username } = signInAuthDto;
    const user = await this.userService.findByUsername(username);

    if(!user){
      throw new UnauthorizedException('Invalid username');
    }

    const passwordIsValid = await user.validatePassword(password);

    if(!passwordIsValid){
      throw new UnauthorizedException('Invalid password');
    }
   
    const payload = { id: user.id, username: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload)
    };
  }
}
