import { Injectable } from '@nestjs/common';

import { Category } from '../../models/category.model';

@Injectable()
export class CategoriesService {
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
}
