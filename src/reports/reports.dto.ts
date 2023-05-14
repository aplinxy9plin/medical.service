import { Document, ObjectId } from "mongoose";
import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, IsObject, IsNotEmpty } from 'class-validator';

export class ReportsCreateDTO {
  @ApiProperty({ example: [{
    title: 'Имя',
    value: 'Никита',
    type: 'string',
    id: 'objectid'
  }] })
  @IsNotEmpty()
  report: {
    title: ''
    id: string
    type: AvailableTypes
  }[]
}

export class ReportsChangeSchemaDTO {
  @ApiProperty({ example: [{
    title: 'Some field',
    type: 'string',
    id: 'objectId'
  }] })
  @IsNotEmpty()
  report: {
    title: ''
    type: AvailableTypes
    id: string
  }[]
}

export class AutocompleteDTO {
  @ApiProperty({ example: 'string' })
  @IsNotEmpty()
  value: string
}

export type AvailableTypes = 'string' | 'int' | 'double' | 'date' | 'boolean'

export interface IReportType extends Document {
  report: {
    title: string
    type: AvailableTypes
    id: ObjectId
  }[]
  reportVersion: number
}
// - _id: ObjectID
// - userId: ObjectID
// - report: {
//   title: 'string'
//   value: 'string'
//   type: 'string'
// }[]
// - reportVersion: number
// - createdAt: Date