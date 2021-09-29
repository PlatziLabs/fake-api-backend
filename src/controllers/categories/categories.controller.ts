import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Query,
  Body,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CategoriesService } from './../../services/categories/categories.service';
import { ProductsService } from './../../services/products/products.service';
import { FilterProductsDto } from '../../dto/product.dto';
import { UpdateCategoryDto } from '../../dto/category.dto';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
  ) {}

  @Get()
  getAll() {
    return this.categoriesService.getAll();
  }

  @Get(':id/products')
  getProductsByCategory(
    @Param('id', ParseIntPipe) id: number,
    @Query() params: FilterProductsDto,
  ) {
    return this.productsService.byCategory(id, params);
  }

  @Put(':id')
  updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() changes: UpdateCategoryDto,
  ) {
    return this.categoriesService.updateCategory(id, changes);
  }
}
