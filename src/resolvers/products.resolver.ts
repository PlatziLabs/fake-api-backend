import { Resolver, Query, Args, ID, Mutation } from '@nestjs/graphql';
import { FilterProductsDto, CreateProductDto } from '@dtos/product.dto';
import { ProductsService } from '../services/products.service';

interface CreateProductDtov2 {
  title: string;
  price: number;
  description: string;
}

@Resolver()
export class ProductsResolver {
  constructor(private productsService: ProductsService) {}

  @Query('products')
  getAll() {
    const dto = new FilterProductsDto();
    return this.productsService.getAll(dto);
  }

  @Query('product')
  getProduct(@Args('id', { type: () => ID }) id: string) {
    return this.productsService.getProduct(+id);
  }

  @Mutation('product')
  create(@Args('dto') product: CreateProductDtov2) {
    const dto = new CreateProductDto();
    dto.title = product.title;
    dto.description = product.description;
    dto.price = product.price;
    dto.images = [];
    dto.categoryId = 1;
    return this.productsService.create(dto);
  }
}
