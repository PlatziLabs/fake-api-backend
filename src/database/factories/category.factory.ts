import { setSeederFactory } from 'typeorm-extension';
import { Category } from '@db/entities/category.entity';
import { generateImage } from '@utils/generate-img';
import { OptionsTypeImg } from '@models/type-img';

export default setSeederFactory(Category, (faker) => {
  const category = new Category();
  category.name = faker.commerce.department();
  category.image = generateImage('face');
  category.keyLoremSpace = faker.helpers.arrayElement(OptionsTypeImg);
  return category;
});
