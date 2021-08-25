import { Injectable } from '@nestjs/common';

import { Category } from '../../models/category.model';

@Injectable()
export class CategoriesService {
  private categories: Category[] = [
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
