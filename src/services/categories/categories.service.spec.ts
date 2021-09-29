import { Test, TestingModule } from '@nestjs/testing';

import { CategoriesService } from './categories.service';
import { UpdateCategoryDto } from '../../dto/category.dto';

describe('CategoriesService', () => {
  let service: CategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriesService],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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
  });
});
