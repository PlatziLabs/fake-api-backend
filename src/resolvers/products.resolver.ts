import { Resolver, Query, Args, ID, Mutation } from '@nestjs/graphql';
import {
  FilterProductsDto,
  CreateProductDto,
  UpdateProductDto,
} from '@dtos/product.dto';
import { Product } from '@db/entities/product.entity';
import { ProductsService } from '@services/products.service';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private productsService: ProductsService) {}

  @Query(() => [Product])
  products(@Args() params: FilterProductsDto) {
    return this.productsService.getAll(params);
  }

  @Query(() => Product)
  product(@Args('id', { type: () => ID }) id: string) {
    return this.productsService.findById(+id);
  }

  @Mutation(() => Product)
  addProduct(@Args('data') dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  @Mutation(() => Product)
  updateProduct(
    @Args('id', { type: () => ID }) id: number,
    @Args('changes') changes: UpdateProductDto,
  ) {
    return this.productsService.update(id, changes);
  }

  @Mutation(() => Boolean)
  deleteProduct(@Args('id', { type: () => ID }) id: number) {
    return this.productsService.delete(id);
  }
}
