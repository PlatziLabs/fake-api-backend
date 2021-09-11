import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { User } from '../../models/user.model';
import { Role } from '../../models/user.model';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;

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
    jwtService = new JwtService({ secretOrPrivateKey: 'my-cat' });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate token', () => {
    const user = { email: 'rivera.armando997@gmail', id: 31 };
    const userCalled = { email: 'rivera.armando997@gmail', sub: 31 };

    const jwtRef = jest.spyOn(service['jwtService'], 'sign');
    const data = service.generateJWT(user);

    expect(jwtRef).toBeCalledWith(userCalled);
    expect(data).toBeDefined();
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
    jest.spyOn(service['usersService'], 'findByEmail').mockReturnValue(user);
    const dataExpected = { ...user };
    delete dataExpected.password;
    const data = service.validateUser(userName, password);

    expect(data).toEqual(dataExpected);
  });

  it('shouldnt validate user', () => {
    const userName = 'Armando';
    const password = '123456';
    jest.spyOn(service['usersService'], 'findByEmail').mockReturnValue(null);
    const data = service.validateUser(userName, password);

    expect(data).toBeNull();
  });
});
