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
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@models/roles';
import { Field, InputType, ArgsType } from '@nestjs/graphql';

@InputType()
export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @Field()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Field()
  name: string;

  @ApiProperty()
  @IsAlphanumeric()
  @IsNotEmpty()
  @Field()
  password: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Role)
  @Field(() => Role)
  role: Role;

  @ApiProperty()
  @IsUrl()
  @IsNotEmpty()
  @Field()
  avatar: string;
}

@InputType()
export class UpdateUserDto {
  @ApiProperty()
  @IsEmail()
  @IsOptional()
  @Field({ nullable: true })
  email: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  name: string;

  @ApiProperty()
  @IsAlphanumeric()
  @IsOptional()
  @Field()
  password: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Role)
  @Field(() => Role, { nullable: true })
  role: Role;

  @ApiProperty()
  @IsUrl()
  @IsOptional()
  @Field({ nullable: true })
  avatar: string;
}

@ArgsType()
export class ValidateUserDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @Field()
  email: string;
}

@ArgsType()
export class FilterUsersDto {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @Field({ nullable: true })
  limit?: number;
}
