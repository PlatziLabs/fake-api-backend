import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from '../../services/categories/categories.service';
import { ProductsService } from '../../services/products/products.service';

describe(`Inspect ${CategoriesController.name} class`, () => {
  let controller: CategoriesController;
  let categoriesService: CategoriesService;
  let productsService: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [CategoriesService, ProductsService],
    }).compile();

    categoriesService = module.get<CategoriesService>(CategoriesService);
    productsService = module.get<ProductsService>(ProductsService);
    controller = module.get<CategoriesController>(CategoriesController);
  });

  it(`creates ${CategoriesController.name} should be defined`, () => {
    expect(controller).toBeDefined();
  });
  it(`call ${CategoriesController.name}.getAll() should be successfully`, () => {
    const result = [{ id: 1, name: 'Laptops', typeImg: 'HP one station' }];
    const mock = jest
      .spyOn(categoriesService, 'getAll')
      .mockReturnValueOnce(result);
    const mockInput = [];
    const actual = controller.getAll();
    expect(actual).toStrictEqual(result);
    expect(mock).toHaveBeenCalledWith(...mockInput);
  });
  it(`call ${CategoriesController.name}.create() should be successfully`, async () => {
    const body = { name: 'bears', typeImg: 'Yogi the bear' };
    const result = Object.assign({}, body, { id: 6 });
    const mock = jest
      .spyOn(categoriesService, 'create')
      .mockResolvedValueOnce(result);
    const mockInput = [body];
    const actual = await controller.create(body);
    expect(actual).toStrictEqual(result);
    expect(mock).toHaveBeenCalledWith(...mockInput);
  });
  it(`call ${CategoriesController.name}.create() should throws error`, async () => {
    const body = { name: 'bears', typeImg: 'Yogi the bear' };
    const mock = jest
      .spyOn(categoriesService, 'create')
      .mockRejectedValueOnce(new Error('MOCK ERROR'));
    const mockInput = [body];
    await expect(controller.create(body)).rejects.toThrow(/MOCK ERROR/gm);
    expect(mock).toHaveBeenCalledWith(...mockInput);
  });
  it(`call ${CategoriesController.name}.getProductsByCategory() should be successfully`, () => {
    const filter = { limit: 1, offset: 0 };
    const result = [
      {
        id: 1,
        title: 'The Title',
        price: 310,
        description: 'The Description',
        category: {
          id: 1,
          name: 'Others',
          typeImg: 'animals',
        },
        images: ['image1', 'image2', 'image3'],
      },
    ];
    const mock = jest
      .spyOn(productsService, 'byCategory')
      .mockReturnValueOnce(result);
    const mockInput = [1, filter];
    const actual = controller.getProductsByCategory(1, filter);
    expect(actual).toStrictEqual(result);
    expect(mock).toHaveBeenCalledWith(...mockInput);
  });
});
