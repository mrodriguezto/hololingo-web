import mongoose, { Schema, model, Model } from 'mongoose';
import { IUser } from 'interfaces';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    issuer: { type: String, required: true, default: 'admin-platform' },
    score: { type: Number, required: true, default: 0 },
    role: {
      type: String,
      enum: {
        values: ['admin', 'user'],
        message: '{VALUE} is not a valid role',
        default: 'user',
        required: true,
      },
    },
  },
  {
    timestamps: true,
    collection: 'app_user',
    versionKey: false,
  },
);

const User: Model<IUser> = mongoose.models.User || model('User', userSchema);

export default User;
