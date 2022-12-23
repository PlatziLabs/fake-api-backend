import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from '@db/entities/product.entity';
import { Category } from '@db/entities/category.entity';
import { CreateProductDto } from '@dtos/product.dto';
import { UpdateProductDto } from '../dtos/product.dto';
import { FilterProductsDto } from '../dtos/product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepo: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
  ) {}

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
    return this.productsRepo.find({
      relations: ['category'],
    });
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

  findById(id: number) {
    return this.productsRepo.findOneOrFail({
      relations: ['category'],
      where: { id },
    });
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

  async create(dto: CreateProductDto) {
    const { categoryId, ...data } = dto;
    const category = await this.categoryRepo.findOneByOrFail({
      id: categoryId,
    });
    const newProduct = this.productsRepo.create({
      ...data,
      images: JSON.stringify(data.images),
    });
    newProduct.category = category;
    return this.productsRepo.save(newProduct);
  }
}
