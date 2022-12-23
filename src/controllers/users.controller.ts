import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UsersService } from '@services/users.service';
import { CreateUserDto, ValidateUserDto } from '@dtos/user.dto';
import { FilterUsersDto } from '@dtos/user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  getAll(@Query() params: FilterUsersDto) {
    return this.usersService.getAll(params);
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getUser(id);
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
