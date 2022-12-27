import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Category } from '@db/entities/category.entity';
import { Product } from '@db/entities/product.entity';
import { generateImage } from '@utils/generate-img';

export default class ProductsSeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager) {
    const categoryRepo = dataSource.getRepository(Category);
    const categories = await categoryRepo.find();

    const promises = categories.map((category) => {
      const productFactory = factoryManager.get(Product);
      return productFactory.saveMany(40, {
        category,
        images: JSON.stringify([
          generateImage(category.keyLoremSpace),
          generateImage(category.keyLoremSpace),
          generateImage(category.keyLoremSpace),
        ]),
      });
    });
    await Promise.all(promises);
  }
}
