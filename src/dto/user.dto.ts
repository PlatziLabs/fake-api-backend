import {
  IsString,
  IsNotEmpty,
  IsAlphanumeric,
  IsEmail,
  IsOptional,
  IsUrl,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsAlphanumeric()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  role: string;

  @ApiProperty()
  @IsUrl()
  @IsNotEmpty()
  avatar: string;
}

export class ValidateUserDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class FilterUsersDto {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  limit?: number;
}
