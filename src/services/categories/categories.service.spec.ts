import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';
import { DataSetModule, DataSetService } from '@app/data-set';
import { CreateCategorytDto } from '../../dto/category.dto';
import { NotFoundException } from '@nestjs/common';

describe(`Inspect ${CategoriesService.name} class`, () => {
  let service: CategoriesService;
  let dataSet: DataSetService<CreateCategorytDto>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DataSetModule],
      providers: [CategoriesService],
    }).compile();

    dataSet = module.get<DataSetService<CreateCategorytDto>>(DataSetService);
    service = module.get<CategoriesService>(CategoriesService);
  });

  it(`created ${CategoriesService.name} should be defined`, () => {
    expect(service).toBeDefined();
  });
  it(`get all categories`, () => {
    const fixture = [{ id: 10, name: 'name', typeImg: 'typeImg' }];
    const mock = jest.spyOn(dataSet, 'get').mockReturnValueOnce(fixture);

    const actual = service.getAll();
    expect(actual).toStrictEqual(fixture);
    expect(mock).toHaveBeenCalledWith();
  });
  it(`get a category by id`, () => {
    const fixture = { id: 10, name: 'name', typeImg: 'typeImg' };
    const mock = jest.spyOn(dataSet, 'filter').mockImplementationOnce(() => {
      const dssFixture = new DataSetService<CreateCategorytDto>();
      dssFixture.fill([fixture], 10);
      return dssFixture;
    });

    const actual = service.getCategory(10);
    expect(actual).toStrictEqual(fixture);
    expect(mock).toHaveBeenCalledWith({ id: 10 });
  });
  it(`category not found`, () => {
    expect(() => service.getCategory(-10)).toThrow(NotFoundException);
  });
  it(`create a category`, () => {
    const fixture = { name: 'Hello World', typeImg: 'TheWorld' };
    const mock = jest
      .spyOn(dataSet, 'create')
      .mockReturnValueOnce({ id: 0, ...fixture });
    const actual = service.create(fixture);
    expect(actual).toStrictEqual({ id: 0, ...fixture });
    expect(mock).toHaveBeenCalledWith(fixture);
  });
});
