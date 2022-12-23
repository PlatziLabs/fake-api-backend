import { Controller, Post, UseGuards, Req, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { User } from '@db/entities/user.entity';

import { AuthService } from '@services/auth.service';
import { UsersService } from '@services/users.service';
import { Payload } from '@models/payload.model';

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
