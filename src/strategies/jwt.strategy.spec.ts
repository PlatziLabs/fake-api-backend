import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { JwtStrategy } from './jwt.strategy';

describe('jwt strategy', () => {
  let jwtStrategy: JwtStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule,
        JwtModule.register({
          secret: 'my-cat',
          signOptions: { expiresIn: '1h' },
        }),
      ],
      providers: [JwtStrategy],
    }).compile();

    jwtStrategy = module.get<JwtStrategy>(JwtStrategy);
  });

  it('should be defined', () => {
    expect(jwtStrategy).toBeDefined();
  });

  it('should validate a user authorized', async () => {
    const payload = {
      sub: '500',
      username: 'UserTest',
    };

    const responseValidated = {
      userId: '500',
      username: 'UserTest',
    };

    const expected = await jwtStrategy.validate(payload);
    expect(expected).toStrictEqual(responseValidated);
  });
});
