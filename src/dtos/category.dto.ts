import {
  IsString,
  IsNotEmpty,
  IsUrl,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Field, InputType, ArgsType } from '@nestjs/graphql';

@InputType()
export class CreateCategoryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Field()
  name: string;

  @ApiProperty()
  @IsUrl()
  @IsNotEmpty()
  @Field()
  image: string;
}

@InputType()
export class UpdateCategoryDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  name: string;

  @ApiProperty()
  @IsUrl()
  @IsOptional()
  @Field({ nullable: true })
  image: string;
}

@ArgsType()
export class FilterCategoriesDto {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  limit?: number;
}
