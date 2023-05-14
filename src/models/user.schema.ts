import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  birthdate: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  middleName: { type: String },
  sex: { type: String },
  report: { type: Array, },
  reportVersion: Number,
  createdAt: Date
});

// UserSchema.pre('save', async function (next) {
//   try {
//     if (!this.isModified('password')) {
//       return next();
//     }
//     const hashed = await bcrypt.hash(this['password'], 10);
//     this['password'] = hashed;
//     return next();
//   } catch (err) {
//     return next(err);
//   }
// });
