import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import { Payload, User } from '../../models/user.model';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  validateUser(email: string, pass: string) {
    const user = this.usersService.findByEmail(email);
    if (user && user.password === pass) {
      return user;
    }
    return null;
  }

  generateJWT(user: User) {
    const payload: Payload = { email: user.email, sub: user.id.toString() };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
