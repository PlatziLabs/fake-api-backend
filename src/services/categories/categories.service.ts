import { Injectable } from '@nestjs/common';

import { Category } from '../../models/category.model';

@Injectable()
export class CategoriesService {
  private categories: Category[] = [
    {
      id: 1,
      name: 'Clothes',
    },
    {
      id: 2,
      name: 'Electronics',
    },
    {
      id: 3,
      name: 'Furniture',
    },
    {
      id: 4,
      name: 'Toys',
    },
    {
      id: 5,
      name: 'Others',
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
