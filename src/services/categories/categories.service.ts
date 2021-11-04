import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateCategoryDto } from 'src/dto/category.dto';

import { CreateCategoryDto } from '../../dto/category.dto';
import { DataSetService } from '@app/data-set';
import { Category } from './../../models/category.model';

@Injectable()
export class CategoriesService {
  constructor(private categories: DataSetService<Category>) {
    categories.fill([
      {
        id: 1,
        name: 'Clothes',
        image: `https://placeimg.com/640/480/any?r=${Math.random()}`,
      },
      {
        id: 2,
        name: 'Electronics',
        image: `https://placeimg.com/640/480/any?r=${Math.random()}`,
      },
      {
        id: 3,
        name: 'Furniture',
        image: `https://placeimg.com/640/480/any?r=${Math.random()}`,
      },
      {
        id: 4,
        name: 'Toys',
        image: `https://placeimg.com/640/480/any?r=${Math.random()}`,
      },
      {
        id: 5,
        name: 'Others',
        image: `https://placeimg.com/640/480/any?r=${Math.random()}`,
      },
    ]);
  }

  getAll() {
    return this.categories.get();
  }

  getCategory(id: number) {
    const category = this.categories.find({ id }).first();
    if (category) {
      return category;
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

    return category;
  }
}
