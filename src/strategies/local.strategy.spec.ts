import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

import { AuthService } from '../services/auth/auth.service';
import { LocalStrategy } from './local.strategy';
import { Role } from '../models/user.model';
import { UsersService } from '../services/users/users.service';

describe('Local Strategy', () => {
  let localStrategy: LocalStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'my-cat',
          signOptions: { expiresIn: '1h' },
        }),
      ],
      providers: [AuthService, LocalStrategy, UsersService],
    }).compile();

    localStrategy = module.get<LocalStrategy>(LocalStrategy);
  });

  it('should be defined', () => {
    expect(localStrategy).toBeDefined();
  });

  it('should validate a user authorized', async () => {
    const dataExpected = {
      id: 1,
      email: 'john@mail.com',
      name: 'Jhon',
      password: 'changeme',
      role: Role.customer,
    };

    const userName = 'john@mail.com';
    const password = 'changeme';

    const expected = await localStrategy.validate(userName, password);
    expect(expected).toStrictEqual(dataExpected);
  });

  it(`shouldn't validate user`, async () => {
    const userName = undefined;
    const password = undefined;

    expect(
      async () => await localStrategy.validate(userName, password),
    ).rejects.toThrow(UnauthorizedException);
  });
});
