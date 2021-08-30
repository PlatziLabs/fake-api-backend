import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CategoriesService } from './../../services/categories/categories.service';
import { ProductsService } from './../../services/products/products.service';
import { FilterProductsDto } from '../../dto/product.dto';
import { CreateCategorytDto } from '../../dto/category.dto';

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

  @Post()
  async create(@Body() category: CreateCategorytDto) {
    return await this.categoriesService.create(category);
  }

  @Get(':id/products')
  getProductsByCategory(
    @Param('id', ParseIntPipe) id: number,
    @Query() params: FilterProductsDto,
  ) {
    return this.productsService.byCategory(id, params);
  }
}
