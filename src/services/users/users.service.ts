import { Injectable } from '@nestjs/common';

import { User } from './../../models/user.model';
import { CreateUserDto } from './../../dto/user.dto';

@Injectable()
export class UsersService {
  private currentId = 2;
  private users: User[] = [
    {
      id: 1,
      email: 'john@mail.com',
      password: 'changeme',
      name: 'Jhon',
    },
    {
      id: 2,
      email: 'maria@mail.com',
      password: '12345',
      name: 'Maria',
    },
  ];

  findByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }

  getUser(id: number) {
    return this.users.find((user) => user.id === id);
  }

  getAll() {
    return this.users;
  }

  create(dto: CreateUserDto) {
    this.currentId = this.currentId + 1;
    const newUser = {
      ...dto,
      id: this.currentId,
    };
    this.users.push(newUser);
    return newUser;
  }
}
