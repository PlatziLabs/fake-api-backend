import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from '@db/entities/product.entity';
import { CreateProductDto } from '@dtos/product.dto';
import { UpdateProductDto } from '../dtos/product.dto';
import { FilterProductsDto } from '../dtos/product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepo: Repository<Product>,
  ) {}

  generateProducts() {
    // const products: Product[] = [];
    // const size = 200;
    // for (let index = 0; index < size; index++) {
    //   this.currentId = index + 1;
    //   const category = faker.helpers.arrayElement(this.categories);
    //   products.push({
    //     id: this.currentId,
    //     title: faker.commerce.productName(),
    //     price: parseInt(faker.commerce.price(), 10),
    //     description: faker.commerce.productDescription(),
    //     category: plainToClass(Category, category),
    //     images: [
    //       generateImage(category.keyLoremSpace),
    //       generateImage(category.keyLoremSpace),
    //       generateImage(category.keyLoremSpace),
    //     ],
    //   });
    // }
    // this.products = plainToClass(Product, products);
  }

  byCategory(categoryId: number, params: FilterProductsDto) {
    // if (this.products.length === 0) {
    //   this.generateProducts();
    // }
    // if (params?.limit > 0 && params?.offset >= 0) {
    //   const end = params.offset + params?.limit;
    //   return this.products
    //     .filter((item) => item.category.id === categoryId)
    //     .slice(params.offset, end);
    // }
    // return this.products.filter((item) => item.category.id === categoryId);
  }

  getAll(params: FilterProductsDto) {
    // if (this.products.length === 0) {
    //   this.generateProducts();
    // }

    // let productsWithParams = [...this.products];
    // const { price } = params;
    // if (price) {
    //   productsWithParams = productsWithParams.filter(
    //     (item) => item.price === price,
    //   );
    // }

    // const { price_min, price_max } = params;
    // if (price_min && price_max && !price) {
    //   productsWithParams = productsWithParams.filter(
    //     (item) => item.price >= price_min && item.price <= price_max,
    //   );
    // }

    // const { query } = params;
    // if (query) {
    //   const expression = new RegExp(query, 'i');
    //   productsWithParams = productsWithParams.filter((product) => {
    //     if (expression.test(product.title)) {
    //       return product;
    //     }
    //   });
    // }
    // const { limit, offset } = params;
    // if (limit > 0 && offset >= 0) {
    //   const end = offset + limit;
    //   productsWithParams = productsWithParams.slice(offset, end);
    // }
    // return productsWithParams;
  }

  getProduct(id: number) {
    return this.productsRepo.findOneByOrFail({ id });
  }

  update(id: number, changes: UpdateProductDto) {
    // const productIndex = this.products.findIndex((item) => item.id === id);
    // if (productIndex === -1) {
    //   throw new NotFoundException('Product not found');
    // }
    // this.products[productIndex] = {
    //   ...this.products[productIndex],
    //   ...changes,
    // };
    // return this.products[productIndex];
  }

  delete(id: number) {
    // const productIndex = this.products.findIndex((item) => item.id === id);
    // if (productIndex === -1) {
    //   throw new NotFoundException('Product not found');
    // }
    // this.products.splice(productIndex, 1);
    // return { rta: true };
  }

  create(body: CreateProductDto) {
    // const { categoryId, ...data } = body;
    // const categoryIndex = this.categories.findIndex(
    //   (item) => item.id === categoryId,
    // );
    // if (categoryIndex === -1) {
    //   throw new NotFoundException('Category not found');
    // }
    // this.currentId = this.currentId + 1;
    // const newProduct = {
    //   ...data,
    //   category: this.categories[categoryIndex],
    //   id: this.currentId,
    // };
    // this.products.push(newProduct);
    // return newProduct;
  }
}
