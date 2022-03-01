import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UsersService } from './../../services/users/users.service';
import { CreateUserDto, ValidateUserDto } from './../../dto/user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  getAll() {
    return this.usersService.getAll();
  }

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Post('is-available')
  isAvailable(@Body() dto: ValidateUserDto) {
    return this.usersService.isAvailable(dto);
  }
}
