import { Resolver, Query, Args, ID, Mutation } from '@nestjs/graphql';
import {
  CreateUserDto,
  UpdateUserDto,
  FilterUsersDto,
  ValidateUserDto,
} from '@dtos/user.dto';
import { UsersService } from '@services/users.service';
import { User } from '@db/entities/user.entity';

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => [User])
  users(@Args() params: FilterUsersDto) {
    return this.usersService.getAll(params);
  }

  @Query(() => User)
  user(@Args('id', { type: () => ID }) id: string) {
    return this.usersService.findById(+id);
  }

  @Mutation(() => User)
  addUser(@Args('data') dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Mutation(() => User)
  updateUser(
    @Args('id', { type: () => ID }) id: number,
    @Args('changes') changes: UpdateUserDto,
  ) {
    return this.usersService.update(id, changes);
  }

  @Mutation(() => Boolean)
  deleteUser(@Args('id', { type: () => ID }) id: string) {
    return this.usersService.delete(+id);
  }

  @Query(() => Boolean)
  async isAvailable(@Args() data: ValidateUserDto) {
    const { isAvailable } = await this.usersService.isAvailable(data);
    return isAvailable;
  }
}
