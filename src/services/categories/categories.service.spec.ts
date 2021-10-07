import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { CategoriesService } from './categories.service';
import { UpdateCategoryDto } from '../../dto/category.dto';
import { DataSetModule, DataSetService } from '@app/data-set';
import { CreateCategoryDto } from '../../dto/category.dto';

describe(`Inspect ${CategoriesService.name} class`, () => {
  let service: CategoriesService;
  let dataSet: DataSetService<CreateCategoryDto>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DataSetModule],
      providers: [CategoriesService],
    }).compile();

    dataSet = module.get<DataSetService<CreateCategoryDto>>(DataSetService);
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
    const mock = jest.spyOn(dataSet, 'find').mockImplementationOnce(() => {
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

  describe('Test the service to update a category', () => {
    it('should return a category updated', () => {
      const categoryId = 1;
      const categoryDto = new UpdateCategoryDto();
      categoryDto.name = 'mockName';

      const categoryUpdated = service.updateCategory(categoryId, categoryDto);
      const category = service.getCategory(categoryUpdated.id);

      expect(categoryUpdated).toBe(category);
    });

    it('should return a category not found', () => {
      const t = () => {
        throw new NotFoundException('Category not found');
      };

      expect(t).toThrow(NotFoundException);
      expect(t).toThrow('Category not found');
    });
  });
});
