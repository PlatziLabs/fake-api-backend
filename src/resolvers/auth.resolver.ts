import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { Login } from '@models/login.model';
import { AuthService } from '@services/auth.service';
import { UsersService } from '@services/users.service';
import { UseGuards } from '@nestjs/common';
import { LocalAuthGqlGuard } from '@guards/local-auth-gql.guard';
import { CurrentUserGql } from '@decorators/current-user-gql.decorator';
import { User } from '@db/entities/user.entity';
import { JwtAuthGqlGuard } from '@guards/jwt-auth-gql.guard';
import { Payload } from '@models/payload.model';

@Resolver()
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Mutation(() => Login)
  @UseGuards(LocalAuthGqlGuard)
  login(
    @Args('email', { type: () => String }) email: string,
    @Args('password', { type: () => String }) password: string,
    @CurrentUserGql() user: User,
  ) {
    return {
      access_token: this.authService.generateAccessToken(user),
      refresh_token: this.authService.generateRefreshToken(user),
    };
  }

  @UseGuards(JwtAuthGqlGuard)
  @Query(() => User)
  myProfile(@CurrentUserGql() user: Payload) {
    return this.usersService.findById(user?.userId);
  }

  @Mutation(() => Login)
  refreshToken(
    @Args('refreshToken', { type: () => String }) refreshToken: string,
  ) {
    return this.authService.generateAccessTokenByRefreshToken(refreshToken);
  }
}
