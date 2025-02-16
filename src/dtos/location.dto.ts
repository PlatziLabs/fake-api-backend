import {
  IsNumber,
  IsOptional,
  IsLatLong,
} from 'class-validator';
import { ArgsType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
@ArgsType()
export class GenerateLocationsDto {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  radius: number = 15;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  size: number = 10;

  @ApiProperty()
  @IsLatLong()
  @IsOptional()
  origin: string = '4.6482784,-74.2726198';
}
