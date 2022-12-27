import { Resolver, Query, Args, ID, Mutation } from '@nestjs/graphql';
import {
  CreateCategoryDto,
  FilterCategoriesDto,
  UpdateCategoryDto,
} from '@dtos/category.dto';
import { CategoriesService } from '@services/categories.service';
import { Category } from '@db/entities/category.entity';

@Resolver(() => Category)
export class CategoriesResolver {
  constructor(private categoriesService: CategoriesService) {}

  @Query(() => [Category])
  categories(@Args() params: FilterCategoriesDto) {
    return this.categoriesService.getAll(params);
  }

  @Query(() => Category)
  category(@Args('id', { type: () => ID }) id: string) {
    return this.categoriesService.findById(+id);
  }

  @Mutation(() => Category)
  addCategory(@Args('data') dto: CreateCategoryDto) {
    return this.categoriesService.create(dto);
  }

  @Mutation(() => Category)
  updateCategory(
    @Args('id', { type: () => ID }) id: number,
    @Args('changes') changes: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, changes);
  }

  @Mutation(() => Boolean)
  deleteCategory(@Args('id', { type: () => ID }) id: number) {
    return this.categoriesService.delete(id);
  }
}
