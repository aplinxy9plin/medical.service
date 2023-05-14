import { Types } from "mongoose";

export interface Payload {
  email?: string;
  birthdate?: Date
  firstName?: string
  lastName?: string
  middleName?: string
  sex?: string
  report: {
    title: String,
    value: String,
    id: Types.ObjectId,
    type: String,
  }[],
  reportVersion: Number,
}