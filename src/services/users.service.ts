import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto, FilterUsersDto, ValidateUserDto } from '@dtos/user.dto';
import { User } from '@db/entities/user.entity';
import { Role } from '@models/roles';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  findByEmail(email: User['email']) {
    return this.usersRepo.findOneBy({ email });
  }

  getUser(id: User['id']) {
    return this.usersRepo.findOneByOrFail({ id });
  }

  getAll(params: FilterUsersDto) {
    const { limit } = params;
    if (limit) {
      return this.usersRepo.find({ take: limit });
    }
    return this.usersRepo.find();
  }

  async isAvailable(dto: ValidateUserDto) {
    let isAvailable = false;
    if (dto.email) {
      isAvailable = (await this.findByEmail(dto.email)) === undefined;
    }
    return { isAvailable };
  }

  create(dto: CreateUserDto) {
    const newUser = this.usersRepo.create(dto);
    newUser.role = dto.role ?? Role.customer;
    return this.usersRepo.save(newUser);
  }
}
