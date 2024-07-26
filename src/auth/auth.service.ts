import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { SignInAuthDto } from './dto/signIn-auth.dto';
import { Role } from 'src/enums/role.enum';

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
    let role = Role.Guest;
    if (user.usertype === Role.Teacher) {
      role = Role.Teacher;
    } else if (user.usertype === Role.Student) {
      role = Role.Student;
    }

    const payload = { id: user.id, username: user.username, roles: role };


    return {
      access_token: await this.jwtService.signAsync(payload)
    };
  }
}
