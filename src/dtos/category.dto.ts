import {
  IsString,
  IsNotEmpty,
  IsUrl,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsUrl()
  @IsNotEmpty()
  image: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}

export class FilterCategoriesDto {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  limit?: number;
}
