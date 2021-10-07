import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from '../../services/products/products.service';
import { CategoriesService } from '../../services/categories/categories.service';
import { FilterProductsDto } from '../../dto/product.dto';
import { DataSetModule } from '@app/data-set';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DataSetModule],
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
          typeImg: 'https://placeimg.com/640/480/any',
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

  it(`call ${ProductsController.name}.getProduct()`, () => {
    const mockProduct = {
      id: 1,
      title: 'Gorgeous Rubber Shoes',
      price: 803,
      description:
        'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J',
      category: {
        id: 4,
        name: 'Toys',
        typeImg: 'https://placeimg.com/640/480/any',
      },
      images: [
        'https://placeimg.com/640/480/any?r=0.4303855365201734',
        'https://placeimg.com/640/480/any?r=0.37952742592490796',
        'https://placeimg.com/640/480/any?r=0.6533577033687712',
      ],
    };

    jest.spyOn(service, 'getProduct').mockImplementation(() => mockProduct);
    const response = controller.getProduct(mockProduct.id);

    expect(response).toBe(mockProduct);
    expect(service.getProduct).toBeCalled();
    expect(service.getProduct).toHaveBeenCalledTimes(1);
  });

  it(`call ${ProductsController.name}.create()`, () => {
    const mockProductToCreate = {
      title: 'Gorgeous Rubber Shoes',
      price: 803,
      description:
        'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J',
      categoryId: 2,
      images: [
        'https://placeimg.com/640/480/any?r=0.4303855365201734',
        'https://placeimg.com/640/480/any?r=0.37952742592490796',
        'https://placeimg.com/640/480/any?r=0.6533577033687712',
      ],
    };

    const mockProductCreated = {
      id: 1,
      title: 'Gorgeous Rubber Shoes',
      price: 803,
      description:
        'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J',
      category: {
        id: 4,
        name: 'Toys',
        typeImg: 'https://placeimg.com/640/480/any',
      },
      images: [
        'https://placeimg.com/640/480/any?r=0.4303855365201734',
        'https://placeimg.com/640/480/any?r=0.37952742592490796',
        'https://placeimg.com/640/480/any?r=0.6533577033687712',
      ],
    };

    jest.spyOn(service, 'create').mockImplementation(() => mockProductCreated);
    const response = controller.create(mockProductToCreate);

    expect(response).toBe(mockProductCreated);
    expect(service.create).toBeCalled();
    expect(service.create).toHaveBeenCalledTimes(1);
  });

  it(`call ${ProductsController.name}.update()`, () => {
    const productToUpdate = {
      title: 'Gorgeous Rubber Shoes',
      price: 800,
      description:
        'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J',
      categoryId: 4,
      images: [
        'https://placeimg.com/640/480/any?r=0.4303855365201734',
        'https://placeimg.com/640/480/any?r=0.37952742592490796',
        'https://placeimg.com/640/480/any?r=0.6533577033687712',
      ],
    };

    const productUpdated = {
      id: 1,
      title: 'Gorgeous Rubber Shoes',
      price: 800,
      description:
        'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J',
      category: {
        id: 4,
        name: 'Toys',
        typeImg: 'https://placeimg.com/640/480/any',
      },
      images: [
        'https://placeimg.com/640/480/any?r=0.4303855365201734',
        'https://placeimg.com/640/480/any?r=0.37952742592490796',
        'https://placeimg.com/640/480/any?r=0.6533577033687712',
      ],
      categoryId: 4,
    };

    jest.spyOn(service, 'update').mockImplementation(() => productUpdated);
    const response = controller.update(productUpdated.id, productToUpdate);

    expect(response).toBe(productUpdated);
    expect(service.update).toBeCalled();
    expect(service.update).toHaveBeenCalledTimes(1);
  });

  it(`call ${ProductsController.name}.delete()`, () => {
    const idProductToDelete = 1;
    const mockDeleteResponse = { rta: true };

    jest.spyOn(service, 'delete').mockImplementation(() => mockDeleteResponse);
    const response = controller.delete(idProductToDelete);

    expect(response).toBe(mockDeleteResponse);
    expect(service.delete).toBeCalled();
    expect(service.delete).toHaveBeenCalledTimes(1);
  });
});
