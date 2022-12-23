import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, FindManyOptions, Like } from 'typeorm';

import { Product } from '@db/entities/product.entity';
import { Category } from '@db/entities/category.entity';
import { CreateProductDto } from '@dtos/product.dto';
import { UpdateProductDto } from '@dtos/product.dto';
import { FilterProductsDto } from '@dtos/product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepo: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
  ) {}

  async byCategory(categoryId: number, params: FilterProductsDto) {
    const options: FindManyOptions<Product> = {
      relations: ['category'],
      where: {
        category: { id: categoryId },
      },
    };
    if (params?.limit > 0 && params?.offset >= 0) {
      options.take = params?.limit;
      options.skip = params?.offset;
    }
    return this.productsRepo.find(options);
  }

  getAll(params: FilterProductsDto) {
    const options: FindManyOptions<Product> = {
      relations: ['category'],
    };

    const { price, price_min, price_max } = params;
    if (price && !!price_min && !!price_max) {
      options.where = {
        price,
      };
    }

    if (!!price && price_min && price_max) {
      options.where = {
        price: Between(price_min, price_max),
      };
    }

    const { query } = params;
    if (query) {
      options.where = {
        ...options.where,
        title: Like(query),
      };
    }

    if (params?.limit > 0 && params?.offset >= 0) {
      options.take = params?.limit;
      options.skip = params?.offset;
    }
    return this.productsRepo.find(options);
  }

  findById(id: number) {
    return this.productsRepo.findOneOrFail({
      relations: ['category'],
      where: { id },
    });
  }

  async update(id: number, changes: UpdateProductDto) {
    const product = await this.findById(id);
    this.productsRepo.merge(product, changes);
    return this.productsRepo.save(product);
  }

  async delete(id: number) {
    const product = await this.findById(id);
    return this.productsRepo.delete(product);
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
