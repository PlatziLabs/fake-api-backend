export enum Role {
  admin = 'admin',
  customer = 'customer',
}

export class User {
  id: number;
  email: string;
  password: string;
  name: string;
  role: Role;
  avatar: string;
}

export interface Payload {
  sub: number;
  username?: string;
  email?: string;
  userId?: number;
}
