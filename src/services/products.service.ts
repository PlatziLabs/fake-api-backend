import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository,
  MoreThanOrEqual,
  LessThanOrEqual,
  FindManyOptions,
  Like,
  And,
  Not,
} from 'typeorm';

import { Product } from '@db/entities/product.entity';
import { Category } from '@db/entities/category.entity';
import { CreateProductDto } from '@dtos/product.dto';
import { UpdateProductDto } from '@dtos/product.dto';
import { FilterProductsDto } from '@dtos/product.dto';
import { generateSlug } from '@utils/slug';

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
    if (price && !price_min && !price_max) {
      options.where = {
        price,
      };
    }

    if (!price && price_min && price_max) {
      options.where = {
        price: And(MoreThanOrEqual(price_min), LessThanOrEqual(price_max)),
      };
    }

    const { title } = params;
    if (title) {
      options.where = {
        ...options.where,
        title: Like(`%${title}%`),
      };
    }

    const { categoryId } = params;
    if (categoryId) {
      options.where = {
        ...options.where,
        category: { id: categoryId },
      };
    }

    const { categorySlug } = params;
    if (categorySlug) {
      options.where = {
        ...options.where,
        category: { slug: categorySlug },
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

  async getRelatedProducts(id: number) {
    const product = await this.findById(id);

    return this.productsRepo.find({
      relations: ['category'],
      where: {
        category: { id: product.category.id },
        id: Not(id),
      },
    });
  }

  findBySlug(slug: string) {
    return this.productsRepo.findOneOrFail({
      relations: ['category'],
      where: { slug },
    });
  }

  async getRelatedProductsBySlug(slug: string) {
    const product = await this.findBySlug(slug);
    return this.getRelatedProducts(product.id);
  }

  async update(id: Product['id'], changes: UpdateProductDto) {
    const product = await this.findById(id);
    const images = changes.images.join(',') || product.images;
    const slug = changes?.title ? generateSlug(changes.title) : product.slug;
    this.productsRepo.merge(product, {
      ...changes,
      images,
      slug,
    });
    return this.productsRepo.save(product);
  }

  async create(dto: CreateProductDto) {
    const { categoryId, ...data } = dto;
    const category = await this.categoryRepo.findOneByOrFail({
      id: categoryId,
    });
    const newProduct = this.productsRepo.create({
      ...data,
      images: data.images.join(','),
      slug: generateSlug(data.title),
    });
    newProduct.category = category;
    return this.productsRepo.save(newProduct);
  }

  async delete(id: number) {
    const product = await this.findById(id);
    await this.productsRepo.delete({ id: product.id });
    return true;
  }

  getRaw() {
    return this.productsRepo.query('SELECT * FROM product');
  }
}
