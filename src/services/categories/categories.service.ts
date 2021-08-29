import { Injectable } from '@nestjs/common';

import { Category } from '../../models/category.model';
import { CreateCategorytDto } from '../../dto/category.dto';

@Injectable()
export class CategoriesService {
  private currentId = 5;
  private categories: Category[] = [
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
  ];

  getAll() {
    return this.categories;
  }

  getCategory(id: number) {
    const category = this.categories.find((item) => item.id === id);
    if (category) {
      return category;
    }
    return null;
  }

  create(body: CreateCategorytDto) {
    const { ...data } = body;

    this.currentId = this.currentId + 1;
    const newCategory = {
      ...data,
      id: this.currentId,
    };
    this.categories.push(newCategory);
    return newCategory;
  }
}
