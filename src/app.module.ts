import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { ProductsController } from './controllers/products/products.controller';
import { OrdersController } from './controllers/orders/orders.controller';
import { UsersController } from './controllers/users/users.controller';
import { AuthController } from './controllers/auth/auth.controller';
import { CategoriesController } from './controllers/categories/categories.controller';
import { ProductsService } from './services/products/products.service';
import { CategoriesService } from './services/categories/categories.service';
import { AuthService } from './services/auth/auth.service';
import { UsersService } from './services/users/users.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'my-cat',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [
    ProductsController,
    OrdersController,
    UsersController,
    AuthController,
    CategoriesController,
  ],
  providers: [
    ProductsService,
    CategoriesService,
    AuthService,
    UsersService,
    LocalStrategy,
    JwtStrategy,
  ],
})
export class AppModule {}
