import {
  IsString,
  IsNotEmpty,
  IsAlphanumeric,
  IsEmail,
  IsOptional,
  IsUrl,
  IsNumber,
  IsEnum,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Role } from '@models/roles';

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
  @IsOptional()
  @IsEnum(Role)
  role: Role;

  @ApiProperty()
  @IsUrl()
  @IsNotEmpty()
  avatar: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

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
