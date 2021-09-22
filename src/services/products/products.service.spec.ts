import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { FilterProductsDto } from '../../dto/product.dto';
describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be return array with the products that contains the keyword input', () => {
    const filterAllProduct = new FilterProductsDto();
    const allProduct = service.getAll(filterAllProduct);
    const numRandom = Math.floor(Math.random() * (allProduct.length + 1));
    const productRandom = allProduct[numRandom];
    const filterProductByTitle = new FilterProductsDto();
    filterProductByTitle.query = productRandom.title;
    const productFilterByName = service.getAll(filterProductByTitle);

    expect(productFilterByName.length).toBeGreaterThan(0);
  });
});
