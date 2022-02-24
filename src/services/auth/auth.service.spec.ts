import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { User } from '../../models/user.model';
import { Role } from '../../models/user.model';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'my-cat',
          signOptions: { expiresIn: '1h' },
        }),
      ],
      providers: [AuthService, UsersService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate token', () => {
    const user: User = {
      email: 'rivera.armando997@gmail',
      id: 31,
      name: 'nico',
      role: Role.admin,
      password: '12',
    };
    const userCalled = { email: 'rivera.armando997@gmail', sub: '31' };

    const responseToken = 'my-fake-token';
    jest.spyOn(jwtService, 'sign').mockImplementation(() => responseToken);
    const data = service.generateJWT(user);

    expect(jwtService.sign).toBeCalledWith(userCalled);
    expect(data.access_token).toBeDefined();
  });

  it('should validate user', () => {
    const userName = 'Armando';
    const password = '123456';
    const user: User = {
      email: 'rivera.armando997@gmail',
      id: 31,
      name: userName,
      password,
      role: Role.admin,
    };
    jest.spyOn(usersService, 'findByEmail').mockReturnValue(user);
    const dataExpected = { ...user };
    const data = service.validateUser(userName, password);

    expect(data).toEqual(dataExpected);
  });

  it('shouldnt validate user', () => {
    const userName = 'Armando';
    const password = '123456';
    jest.spyOn(usersService, 'findByEmail').mockReturnValue(null);
    const data = service.validateUser(userName, password);

    expect(data).toBeNull();
  });
});
