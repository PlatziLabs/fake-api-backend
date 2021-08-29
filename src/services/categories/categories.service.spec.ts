import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';

const fictureCategories = [
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
];

describe(`Inspect ${CategoriesService.name} class`, () => {
  let service: CategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriesService],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
  });

  it(`created ${CategoriesService.name} should be defined`, () => {
    expect(service).toBeDefined();
  });
  it(`call ${CategoriesService.name}.getAll() should be successfully`, () => {
    const actual = service.getAll();
    expect(actual).toStrictEqual(fictureCategories);
  });
  it(`call ${CategoriesService.name}.getCategory() should be successfully`, () => {
    const actual = service.getCategory(3);
    expect(actual).toStrictEqual(fictureCategories[2]);
  });
  it(`call ${CategoriesService.name}.getCategory() should be unsuccessfully`, () => {
    const actual = service.getCategory(-1);
    expect(actual).toBeNull();
  });
  it(`call ${CategoriesService.name}.create() should be successfully`, () => {
    const data = { name: 'Hello World', typeImg: 'TheWorld' };
    const actual = service.create(data);
    expect(actual).toStrictEqual(
      Object.assign({}, data, { id: fictureCategories.length + 1 }),
    );
  });
});
