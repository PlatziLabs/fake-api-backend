import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  CreateCategoryDto,
  UpdateCategoryDto,
  FilterCategoriesDto,
} from '@dtos/category.dto';
import { Category } from '@db/entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepo: Repository<Category>,
  ) {}

  // constructor(private categories: DataSetService<Category>) {
  //   categories.fill([
  //     {
  //       id: 1,
  //       name: 'Clothes',
  //       keyLoremSpace: 'fashion',
  //       image: generateImage('fashion'),
  //     },
  //     {
  //       id: 2,
  //       name: 'Electronics',
  //       keyLoremSpace: 'watch',
  //       image: generateImage('watch'),
  //     },
  //     {
  //       id: 3,
  //       name: 'Furniture',
  //       keyLoremSpace: 'furniture',
  //       image: generateImage('furniture'),
  //     },
  //     {
  //       id: 4,
  //       name: 'Shoes',
  //       keyLoremSpace: 'shoes',
  //       image: generateImage('shoes'),
  //     },
  //     {
  //       id: 5,
  //       name: 'Others',
  //       keyLoremSpace: 'random',
  //       image: generateImage('random'),
  //     },
  //   ]);
  // }

  getAll(params: FilterCategoriesDto) {
    const { limit } = params;
    if (limit) {
      return this.categoriesRepo.find({ take: limit });
    }
    return this.categoriesRepo.find();
  }

  findById(id: number) {
    return this.categoriesRepo.findOneByOrFail({ id });
  }

  create(dto: CreateCategoryDto) {
    const newCategory = this.categoriesRepo.create(dto);
    return this.categoriesRepo.save(newCategory);
  }

  async update(id: Category['id'], changes: UpdateCategoryDto) {
    const category = await this.findById(id);
    this.categoriesRepo.merge(category, changes);
    return this.categoriesRepo.save(category);
  }

  async delete(id: Category['id']) {
    const category = await this.findById(id);
    await this.categoriesRepo.delete(category);
    return true;
  }
}
