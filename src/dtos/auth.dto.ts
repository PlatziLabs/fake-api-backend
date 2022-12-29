import { IsAlphanumeric, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
  @ApiProperty()
  @IsString()
  @IsAlphanumeric()
  @IsNotEmpty()
  refreshToken: string;
}
