import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateCategorytDto } from '../../dto/category.dto';
import { DataSetService } from '@app/data-set';

@Injectable()
export class CategoriesService {
  constructor(private categories: DataSetService<CreateCategorytDto>) {
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
    const category = this.categories.filter({ id }).first();
    if (category) {
      return category;
    }
    throw new NotFoundException();
  }

  create(body: CreateCategorytDto) {
    return this.categories.create(body);
  }
}
