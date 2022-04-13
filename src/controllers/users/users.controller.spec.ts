import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from '../../services/users/users.service';
import { USERS_MOCK } from '../../../test/mocks/users/users.mock';
import { CreateUserDto } from '../../dto/user.dto';
import { User } from '../../models/user.model';
import { USER_MOCK } from '../../../test/mocks/users/user.mock';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call getAll service', () => {
    const data = controller.getAll({});
    expect(data.length).toEqual(USERS_MOCK.length);
  });

  it('should create user', () => {
    const dto: CreateUserDto = new CreateUserDto();
    const expectedData: User = USER_MOCK;

    dto.email = expectedData.email;
    dto.role = expectedData.role;
    dto.name = expectedData.name;
    dto.password = expectedData.password;

    const data = controller.create(dto);

    expect(data.email).toEqual(expectedData.email);
    expect(data.name).toEqual(expectedData.name);
    expect(data.password).toEqual(expectedData.password);
    expect(data.role).toEqual(expectedData.role);
  });
});
