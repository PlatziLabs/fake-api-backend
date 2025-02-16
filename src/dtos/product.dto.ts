import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsOptional,
  IsArray,
  Min,
  ValidateIf,
  IsUrl,
  ArrayMinSize,
} from 'class-validator';
import { Field, InputType, ArgsType, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class CreateProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Field()
  title: string;

  @ApiProperty()
  @IsPositive()
  @IsNotEmpty()
  @Field()
  price: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Field()
  description: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Field()
  categoryId: number;

  @ApiProperty()
  @IsArray()
  @IsUrl({}, { each: true })
  @IsNotEmpty()
  @ArrayMinSize(1)
  @Field(() => [String])
  images: string[];
}

@InputType()
export class UpdateProductDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  title: string;

  @ApiProperty()
  @IsPositive()
  @IsOptional()
  @Field({ nullable: true })
  price: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  description: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @Field({ nullable: true })
  categoryId: number;

  @ApiProperty()
  @IsArray()
  @IsUrl({}, { each: true })
  @IsOptional()
  @ArrayMinSize(1)
  @Field(() => [String], { nullable: true })
  images: string[];
}

@ArgsType()
export class FilterProductsDto {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @Field(() => Int, { nullable: true })
  limit: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @Field(() => Int, { nullable: true })
  offset: number;

  @IsOptional()
  @Field(() => Int, { nullable: true })
  price: number;

  @IsOptional()
  @Min(0)
  @Field(() => Int, { nullable: true })
  price_min: number;

  @ValidateIf((params) => params.minPrice)
  @IsPositive()
  @Field(() => Int, { nullable: true })
  price_max: number;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  title: string;

  @IsOptional()
  @IsNumber()
  @Field({ nullable: true })
  categoryId: number;
}
