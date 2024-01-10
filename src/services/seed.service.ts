import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { Category } from '@db/entities/category.entity';
import { Product } from '@db/entities/product.entity';
import { User } from '@db/entities/user.entity';
import { Role } from '@models/roles';
import * as fs from 'fs';

@Injectable()
export class SeedService {
  constructor(@InjectDataSource() private dataSource: DataSource) {}

  async init() {
    await this.dataSource.synchronize(true);

    // -------- REPOS --------

    const usersRepo = this.dataSource.getRepository(User);
    const categoriesRepo = this.dataSource.getRepository(Category);
    const productsRepo = this.dataSource.getRepository(Product);

    // -------- USERS --------

    await usersRepo.save([
      {
        id: 1,
        email: 'john@mail.com',
        password: 'changeme',
        name: 'Jhon',
        role: Role.customer,
        avatar: 'https://i.imgur.com/LDOO4Qs.jpg',
      },
      {
        id: 2,
        email: 'maria@mail.com',
        password: '12345',
        name: 'Maria',
        role: Role.customer,
        avatar: 'https://i.imgur.com/DTfowdu.jpg',
      },
      {
        id: 3,
        email: 'admin@mail.com',
        password: 'admin123',
        name: 'Admin',
        role: Role.admin,
        avatar: 'https://i.imgur.com/yhW6Yw1.jpg',
      },
    ]);

    // -------- CATEGORIES --------
    const categoriesData = this.loadCategoriesJson();
    const categoriesRta = await categoriesRepo.save(categoriesData);

    // -------- Products --------

    const productsData = this.loadProductsJson().map((product) => {
      const categoryEntity = categoriesRta.find(
        (item) => item.id === parseInt(product.category_id, 10),
      );

      return {
        title: product.title,
        price: parseInt(product.price, 10),
        description: product.description,
        images: product.images,
        category: categoryEntity,
      };
    });

    await productsRepo.save(productsData);

    // -------- COUNTERS --------

    const users = await usersRepo.find();
    const categories = await categoriesRepo.find();
    const products = await productsRepo.find();

    return {
      users: users.length,
      categories: categories.length,
      products: products.length,
    };
  }

  loadProductsJson(): any[] {
    const products = JSON.parse(
      fs.readFileSync('src/dataset/products.json', 'utf8'),
    );
    return products;
  }

  loadCategoriesJson(): Category[] {
    const categories = JSON.parse(
      fs.readFileSync('src/dataset/categories.json', 'utf8'),
    );
    return categories;
  }
}
