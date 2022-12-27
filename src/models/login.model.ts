import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Login ' })
export class Login {
  @Field()
  access_token: string;

  @Field()
  refresh_token: string;
}
