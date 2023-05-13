import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsInt, Min, Max, IsString, MaxLength } from 'class-validator';

export class RegisterDTO {
  @IsString()
  @MaxLength(200)
  @ApiProperty()
  email: string

  @IsString()
  @MaxLength(200)
  @ApiProperty()
  password: string
}
