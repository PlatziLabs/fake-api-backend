import { registerEnumType } from '@nestjs/graphql';

export enum Role {
  admin = 'admin',
  customer = 'customer',
}

registerEnumType(Role, { name: 'Role' });
