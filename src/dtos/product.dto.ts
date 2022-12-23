import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsOptional,
  IsArray,
  Min,
  ValidateIf,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsPositive()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  images: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class FilterProductsDto {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  limit: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  offset: number;

  @IsOptional()
  price: number;

  @IsOptional()
  @Min(0)
  price_min: number;

  @ValidateIf((params) => params.minPrice)
  @IsPositive()
  price_max: number;

  @IsOptional()
  @IsString()
  query: string;
}
