import { Injectable } from '@nestjs/common';
import * as faker from 'faker';

import { Product } from '../../models/product.model';
import { Category } from '../../models/category.model';
import { CreateProductDto } from '../../dto/product.dto';
import { UpdateProductDto } from '../../dto/product.dto';
import { FilterProductsDto } from '../../dto/product.dto';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class ProductsService {
  private products: Product[] = [];
  private currentId = 0;
  categories: Category[] = [];

  constructor(private categoriesService: CategoriesService) {
    this.categories = this.categoriesService.getAll();
    this.generateProducts();
  }

  generateProducts() {
    const size = 50;
    for (let index = 0; index < size; index++) {
      this.currentId = index + 1;
      this.products.push({
        id: this.currentId,
        title: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        description: faker.commerce.productDescription(),
        category: faker.helpers.randomize(this.categories),
        image: faker.helpers.randomize([
          'https://placeimg.com/640/480/tech',
          'https://placeimg.com/640/480/people',
        ]),
      });
    }
  }

  getAll(params: FilterProductsDto) {
    console.log(params);
    if (params?.limit && params?.offset) {
      const end = params.offset + params?.limit;
      return this.products.slice(params.offset, end);
    }
    return this.products;
  }

  getProduct(id: number) {
    const product = this.products.find((item) => item.id === id);
    if (product) {
      return product;
    }
    return null;
  }

  update(id: number, changes: UpdateProductDto) {
    const productIndex = this.products.findIndex((item) => item.id === id);
    if (productIndex !== -1) {
      this.products[productIndex] = {
        ...this.products[productIndex],
        ...changes,
      };
      return this.products[productIndex];
    }
    return null;
  }

  delete(id: number) {
    const productIndex = this.products.findIndex((item) => item.id === id);
    if (productIndex !== -1) {
      this.products.splice(productIndex, 1);
      return true;
    }
    return null;
  }

  create(data: CreateProductDto) {
    const categoryIndex = this.categories.findIndex(
      (item) => item.id === data.categoryId,
    );
    this.currentId = this.currentId + 1;
    const newProduct = {
      ...data,
      category: this.categories[categoryIndex],
      id: this.currentId,
    };
    this.products.push(newProduct);
    return newProduct;
  }
}
