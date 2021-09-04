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

  it('should return all data', () => {
    const fixture = [
      { id: 1, name: 'new category' },
      { id: 2, name: 'new cat' },
      { id: 3, name: 'new' },
    ];
    service.fill(fixture);
    const expected = service.get();
    expect(expected).toStrictEqual(fixture);
  });

  it('should return first element', () => {
    const fixture = [
      { id: 1, name: 'new category' },
      { id: 2, name: 'new cat' },
    ];
    service.fill(fixture);
    const expected = service.first();
    expect(expected).toStrictEqual(fixture[0]);
  });

  it('should return null getting first element', () => {
    const expected = service.first();
    expect(expected).toBeNull();
  });

  it('create dataset should return created data', () => {
    const name = 'new Category 2';
    const fixture = { id: 1, name };
    const expected = service.create({ name });
    expect(expected).toStrictEqual(fixture);
  });

  it('when filter should get first match', () => {
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
