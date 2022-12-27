import { setSeederFactory } from 'typeorm-extension';
import { Product } from '@db/entities/product.entity';

export default setSeederFactory(Product, (faker) => {
  const product = new Product();
  product.title = faker.commerce.productName();
  product.price = parseInt(faker.commerce.price(), 10);
  product.description = faker.commerce.productDescription();
  return product;
});
