import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import { Payload } from '../../models/user.model';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  validateUser(username: string, pass: string) {
    const user = this.usersService.findByEmail(username);
    if (user && user.password === pass) {
      delete user.password;
      const { ...result } = user;
      return result;
    }
    return null;
  }

  generateJWT(user) {
    const payload: Payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
