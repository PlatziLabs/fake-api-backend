import { Controller, Post, UseGuards, Req, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { User } from '../../models/user.model';

import { AuthService } from '../../services/auth/auth.service';
import { UsersService } from '../../services/users/users.service';
import { Payload } from 'src/models/user.model';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Req() req: Request) {
    const user = req.user as User;
    return this.authService.generateJWT(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  profile(@Req() req: Request) {
    const user = req.user as Payload;
    return this.usersService.getUser(user?.userId);
  }
}
