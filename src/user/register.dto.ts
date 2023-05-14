import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsInt, Min, Max, IsString, MaxLength, IsNotEmpty, ValidateNested, IsObject, IsArray, IsNumber } from 'class-validator';
import { ObjectId } from 'mongoose';
import { AvailableTypes } from 'src/reports/reports.dto';

export class RegisterSingleDTO {
    @MaxLength(200)
    @ApiProperty()
    email: string

    @ApiProperty()
    birthdate: Date
    
    @ApiProperty()
    firstName: string

    @ApiProperty()
    lastName: string
    
    @ApiProperty()
    middleName: string

    @ApiProperty()
    sex: string
  
    @ApiProperty({ example: [{
      title: 'Имя',
      value: 'Никита',
      type: 'string',
      id: 'objectid'
    }] })
    @IsArray()
    report: {
      title: string
      value: string
      id: ObjectId
      type: AvailableTypes
    }[]

    @IsNumber()
    @ApiProperty({ example: 1 })
    reportVersion: number
}
export class FindDTO {
    @MaxLength(200)
    @ApiProperty()
    @IsOptional()
    email: string

    @ApiProperty()
    @IsOptional()
    birthdate: Date
    
    @ApiProperty()
    @IsOptional()
    firstName: string

    @ApiProperty()
    @IsOptional()
    lastName: string
    
    @ApiProperty()
    @IsOptional()
    middleName: string

    @ApiProperty()
    @IsOptional()
    sex: string
  
    @ApiProperty({ example: [{
      title: 'Имя',
      value: 'Никита',
      type: 'string',
      id: 'objectid'
    }] })
    @IsArray()
    @IsOptional()
    report: {
      title: string
      value: string
      id: ObjectId
      type: AvailableTypes
    }[]

    @IsNumber()
    @ApiProperty({ example: 1 })
    @IsOptional()
    reportVersion: number
}

export class RegisterDTO {
  @ApiProperty({
    example: [{
      email: 'qwe@qwe.ru',
      birthdate: new Date(),
      firstName: 'Nikita',
      lastName: 'Aplin',
      middleName: "Alexandrovich",
      sex: 'male',
      report: [
        {
          title: 'Зрение',
          type: 'double',
          id: 'objectId',
          value: -3.5
        },
        {
          title: 'COVID',
          type: 'boolean',
          id: 'objectId',
          value: true
        },
        {
          title: 'Кол-во посещений',
          type: 'int',
          id: 'objectId',
          value: 4
        },
        {
          title: 'Рецепты на',
          type: 'string',
          id: 'objectId',
          value: 'Лекарство 1, Лекарство 2'
        },
        {
          title: 'Дата последнего посещения',
          type: 'date',
          id: 'objectId',
          value: new Date()
        },
      ],
      reportVersion: 1,
      createdAt: new Date(),
    }]
  })
  users: RegisterSingleDTO[];
}
