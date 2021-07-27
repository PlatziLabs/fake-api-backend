import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsOptional,
  IsArray,
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
  images: string[];
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
}
