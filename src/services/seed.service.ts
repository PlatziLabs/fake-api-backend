import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';

import { Category } from '@db/entities/category.entity';
import { Product } from '@db/entities/product.entity';
import { User } from '@db/entities/user.entity';
import { Role } from '@models/roles';
import { generateAvatar } from '@utils/generate-img';
import { CATEGORIES } from '@utils/images';

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
    const categoriesData = CATEGORIES.map((item) => ({
      id: item.id,
      name: item.name,
      image: item.image,
    }));
    const categoriesRta = await categoriesRepo.save(categoriesData);

    // -------- Products --------

    const productsData: Array<Partial<Product>> = [];
    CATEGORIES.forEach((category) => {
      category.products.forEach((images) => {
        const categoryEntity = categoriesRta.find(
          (item) => item.id === category.id,
        );
        productsData.push({
          title: faker.commerce.productName(),
          price: parseInt(faker.commerce.price(), 10),
          description: faker.commerce.productDescription(),
          category: categoryEntity,
          images: JSON.stringify(images),
        });
      });
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
}
