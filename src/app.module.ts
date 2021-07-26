import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products/products.controller';
import { OrdersController } from './controllers/orders/orders.controller';
import { UsersController } from './controllers/users/users.controller';
import { AuthController } from './controllers/auth/auth.controller';
import { CategoriesController } from './controllers/categories/categories.controller';
import { ProductsService } from './services/products/products.service';
import { CategoriesService } from './services/categories/categories.service';

@Module({
  imports: [],
  controllers: [
    ProductsController,
    OrdersController,
    UsersController,
    AuthController,
    CategoriesController,
  ],
  providers: [ProductsService, CategoriesService],
})
export class AppModule {}
