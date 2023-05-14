import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const ReportsSchema = new mongoose.Schema({
  report: {
    type: Array,
    // title: String,
    // value: String,
    // id: mongoose.Types.ObjectId,
    // type: String,
  },
  reportVersion: Number,
}, {
  timestamps: true
});