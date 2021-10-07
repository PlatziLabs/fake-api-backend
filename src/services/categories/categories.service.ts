import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateCategoryDto } from 'src/dto/category.dto';

import { CreateCategoryDto } from '../../dto/category.dto';
import { DataSetService } from '@app/data-set';

@Injectable()
export class CategoriesService {
  constructor(private categories: DataSetService<CreateCategoryDto>) {
    categories.fill([
      {
        id: 1,
        name: 'Clothes',
        typeImg: 'people',
      },
      {
        id: 2,
        name: 'Electronics',
        typeImg: 'tech',
      },
      {
        id: 3,
        name: 'Furniture',
        typeImg: 'arch',
      },
      {
        id: 4,
        name: 'Toys',
        typeImg: 'any',
      },
      {
        id: 5,
        name: 'Others',
        typeImg: 'animals',
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
    return this.categories.create(body);
  }

  updateCategory(id: number, changes: UpdateCategoryDto) {
    const categoryIndex = this.categories.findIndex((item) => item.id === id);
    if (categoryIndex === -1) {
      throw new NotFoundException('Category not found');
    }
    this.categories[categoryIndex] = {
      ...this.categories[categoryIndex],
      ...changes,
    };
    return this.categories[categoryIndex];
  }
}
