import { Document, Types } from 'mongoose';

export interface Reports extends Document {
  report: {
    title: String,
    value: String,
    id: Types.ObjectId,
    type: String,
  }[],
  reportVersion: Number,
}
