import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from '../../services/products/products.service';
import { CategoriesService } from '../../services/categories/categories.service';
import { FilterProductsDto } from '../../dto/product.dto';
import { CreateProductDto } from '../../dto/product.dto';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService, CategoriesService],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it(`call ${ProductsController.name}.getAll()`, () => {
    const filters = new FilterProductsDto();
    const mockProducts = [
      {
        id: 21,
        title: 'Fantastic Fresh Chair',
        price: 281,
        description:
          'New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016',
        category: {
          id: 4,
          name: 'Toys',
          typeImg: 'any',
        },
        images: [
          'https://placeimg.com/640/480/any?r=0.7242884047070584',
          'https://placeimg.com/640/480/any?r=0.11714033171988714',
          'https://placeimg.com/640/480/any?r=0.6524001376637891',
        ],
      },
    ];

    jest.spyOn(service, 'getAll').mockImplementation(() => mockProducts);

    const response = controller.getAll(filters);

    expect(response).toBe(mockProducts);
    expect(service.getAll).toBeCalled();
    expect(service.getAll).toHaveBeenCalledTimes(1);
  });
});
