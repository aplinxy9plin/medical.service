import { IsOptional, IsString, IsDate, IsArray, ValidateNested, IsNumber } from 'class-validator';

class ReportDto {
  @IsString()
  title: string;

  @IsString()
  value: string;

  @IsString()
  id: string;

  @IsString()
  type: string;
}

export class SearchDto {
  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsDate()
  birthdate?: Date;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  middleName?: string;

  @IsOptional()
  @IsString()
  sex?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  report?: ReportDto[];

  @IsOptional()
  @IsNumber()
  reportVersion?: number;
}