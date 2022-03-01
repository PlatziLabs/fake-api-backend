import { Injectable } from '@nestjs/common';

import { User, Role } from './../../models/user.model';
import { CreateUserDto, ValidateUserDto } from './../../dto/user.dto';

@Injectable()
export class UsersService {
  private currentId = 3;
  private users: User[] = [
    {
      id: 1,
      email: 'john@mail.com',
      password: 'changeme',
      name: 'Jhon',
      role: Role.customer,
    },
    {
      id: 2,
      email: 'maria@mail.com',
      password: '12345',
      name: 'Maria',
      role: Role.customer,
    },
    {
      id: 3,
      email: 'admin@mail.com',
      password: 'admin123',
      name: 'Admin',
      role: Role.admin,
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

  isAvailable(dto: ValidateUserDto) {
    let isAvailable = false;
    if (dto.email) {
      isAvailable = this.findByEmail(dto.email) === undefined;
    }
    return { isAvailable };
  }

  create(dto: CreateUserDto) {
    this.currentId = this.currentId + 1;
    const newUser: User = {
      ...dto,
      id: this.currentId,
      role: this.getRole(dto.role),
    };
    this.users.push(newUser);
    return newUser;
  }

  getRole(role: string) {
    switch (role) {
      case 'customer':
        return Role.customer;
      case 'admin':
        return Role.admin;
      default:
        return Role.customer;
    }
  }
}
