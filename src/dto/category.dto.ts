import { IsString, IsNotEmpty, IsUrl } from 'class-validator';
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
