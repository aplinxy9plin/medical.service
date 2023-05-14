import { Document, ObjectId } from "mongoose";
import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, IsObject, isString, IsString, MinLength } from 'class-validator';

export class LoginDTO {
  @ApiProperty({ example: 'qwe@qwe.ru' })
  @IsString()
  email: string

  @ApiProperty({ example: 'string' })
  @IsString()
  @MinLength(6)
  password: string
}
