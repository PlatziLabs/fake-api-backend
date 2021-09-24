import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { CreateUserDto } from '../../dto/user.dto';
import { Role } from '../../models/user.model';

const mockUsers = [
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

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Test service getAll', () => {
    it('should return all the users', () => {
      const users = service.getAll();

      expect(users[0].id).toStrictEqual(mockUsers[0].id);
      expect(users[1].id).toStrictEqual(mockUsers[1].id);
      expect(users[2].id).toStrictEqual(mockUsers[2].id);
    });
  });

  // describe('Test service create', () => {
  //   it('Should return the product created', () => {
  //     const userDto = new CreateUserDto();
  //   });
  // });

  describe('Test service findByEmail', () => {
    it('Should return the user searched by email', () => {
      const email = 'john@mail.com';
      const user = service.findByEmail(email);

      expect(user.email).toBe(email);
    });
  });

  describe('Test service getUser', () => {
    it('Should return the user searched by id', () => {
      const id = 1;
      const user = service.getUser(id);

      expect(user.id).toBe(id);
    });
  });

  describe('Test service getRole', () => {
    it('Should return the role of the user', () => {
      const role = 'customer';
      const responseRole = service.getRole(role);

      expect(responseRole).toBe(role);
    });
  });
});
