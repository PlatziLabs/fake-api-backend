import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { CategoriesService } from '../categories/categories.service';
import { FilterProductsDto } from '../../dto/product.dto';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService, CategoriesService],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Test the service getAll', () => {
    it('should return all the products', () => {
      const filters = new FilterProductsDto();
      const productsAll = service.getAll(filters);

      const newFilters = new FilterProductsDto();
      const productsFiltered = service.getAll(newFilters);

      expect(productsFiltered).toStrictEqual(productsAll);

      const products = service.getAll(newFilters);
      expect(products).toStrictEqual(productsAll);
    });
  });
});
