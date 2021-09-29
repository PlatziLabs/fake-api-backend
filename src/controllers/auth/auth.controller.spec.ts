import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';
import { Request } from 'express';
import { AuthController } from './auth.controller';
import { AuthService } from '../../services/auth/auth.service';
import { UsersService } from '../../services/users/users.service';
import { Role, User } from '../../models/user.model';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, UsersService],
      imports: [
        JwtModule.register({
          secret: 'my-cat',
          signOptions: { expiresIn: '1h' },
        }),
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should login a user', () => {
    const user = { email: 'mock@email.com', id: 1 };
    const request = { user } as unknown as Request;
    const returnValue = { access_token: 'mockJsonWebToken' };
    const mock = jest
      .spyOn(authService, 'generateJWT')
      .mockReturnValueOnce(returnValue);
    const mockInput = [user];

    const expected = controller.login(request);

    expect(expected).toStrictEqual(returnValue);
    expect(mock).toHaveBeenCalledWith(...mockInput);
  });

  it('should return the profile', () => {
    const user: User = {
      id: 1,
      email: 'mock@mail.com',
      password: 'thePassword',
      name: 'theName',
      role: Role.customer,
    };
    const request = { user: { userId: user.id } } as unknown as Request;
    const mock = jest.spyOn(usersService, 'getUser').mockReturnValueOnce(user);
    const mockInput = [user.id];

    const expected = controller.profile(request);

    expect(expected).toStrictEqual(user);
    expect(mock).toHaveBeenCalledWith(...mockInput);
  });

  it('should not return the profile', () => {
    const request = {} as unknown as Request;
    const mock = jest
      .spyOn(usersService, 'getUser')
      .mockReturnValueOnce(undefined);
    const mockInput = [undefined];

    const expected = controller.profile(request);

    expect(expected).toStrictEqual(undefined);
    expect(mock).toHaveBeenCalledWith(...mockInput);
  });
});
