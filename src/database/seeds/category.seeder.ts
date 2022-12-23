import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Category } from '@db/entities/category.entity';
import { generateImage } from '@utils/generate-img';

export default class CategorySeeder implements Seeder {
  async run(dataSource: DataSource) {
    const repository = dataSource.getRepository(Category);
    await repository.save([
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
}
