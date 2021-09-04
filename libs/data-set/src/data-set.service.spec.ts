import { Test, TestingModule } from '@nestjs/testing';
import { DataSetService } from './data-set.service';

interface ICategoryModel {
  name: string;
}

describe('DataSetService', () => {
  let service: DataSetService<ICategoryModel>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataSetService],
    }).compile();

    service = module.get<DataSetService<ICategoryModel>>(DataSetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return data', () => {
    const fixture = { id: 1, name: 'new category' };
    service.fill([fixture]);
    const expected = service.get();
    expect(expected).toStrictEqual([fixture]);
  });

  it('should return data first', () => {
    const fixture = { id: 1, name: 'new category' };
    service.fill([fixture]);
    const expected = service.first();
    expect(expected).toStrictEqual(fixture);
  });

  it('should return null in first method', () => {
    const expected = service.first();
    expect(expected).toBeNull();
  });

  it('should return created data', () => {
    const name = 'new Category 2';
    const fixture = { id: 1, name };
    const expected = service.create({ name });
    expect(expected).toStrictEqual(fixture);
  });

  it('should filter and then get first', () => {
    const fixture = [
      { id: 1, name: 'new category' },
      { id: 2, name: 'new cat' },
      { id: 3, name: 'cat' },
    ];
    service.fill(fixture);
    const expected = service.filter('id', 2).first();
    expect(expected).toStrictEqual(fixture[1]);

  });
});
