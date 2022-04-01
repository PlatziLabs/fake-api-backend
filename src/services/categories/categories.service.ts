import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateCategoryDto } from 'src/dto/category.dto';
import { plainToClass } from 'class-transformer';

import { CreateCategoryDto } from '../../dto/category.dto';
import { DataSetService } from '@app/data-set';
import { Category } from './../../models/category.model';
import { generateImage } from './../../utils';

@Injectable()
export class CategoriesService {
  constructor(private categories: DataSetService<Category>) {
    categories.fill([
      {
        id: 1,
        name: 'Clothes',
        keyLoremSpace: 'fashion',
        image: generateImage('fashion'),
      },
      {
        id: 2,
        name: 'Electronics',
        keyLoremSpace: 'watch',
        image: generateImage('watch'),
      },
      {
        id: 3,
        name: 'Furniture',
        keyLoremSpace: 'furniture',
        image: generateImage('furniture'),
      },
      {
        id: 4,
        name: 'Shoes',
        keyLoremSpace: 'shoes',
        image: generateImage('shoes'),
      },
      {
        id: 5,
        name: 'Others',
        keyLoremSpace: 'random',
        image: generateImage('random'),
      },
    ]);
  }

  getAll() {
    return plainToClass(Category, this.categories.get());
  }

  getCategories() {
    return this.categories.get();
  }

  getCategory(id: number) {
    const category = this.categories.find({ id }).first();
    if (category) {
      return plainToClass(Category, category);
    }
    throw new NotFoundException();
  }

  create(body: CreateCategoryDto) {
    // TODO: Fix
    const newCategory = body as Category;
    return this.categories.create(newCategory);
  }

  updateCategory(id: number, changes: UpdateCategoryDto) {
    const category = this.categories.update(id, changes);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return plainToClass(Category, category);
  }
}
