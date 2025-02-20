import {
  IsString,
  IsNotEmpty,
  IsUrl,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Field, InputType, ArgsType } from '@nestjs/graphql';
import { IsModerated } from '@decorators/moderation.decorator';

@InputType()
export class CreateCategoryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Field()
  @IsModerated()
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
  @IsModerated()
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
