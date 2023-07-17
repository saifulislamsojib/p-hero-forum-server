import { Auth } from '@/types/auth';
import { model, Schema } from 'mongoose';

const authModel = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    trim: true,
    required: [true, 'Email is required'],
    lowercase: true,
    unique: true,
    validate: [(val: string) => /\S+@\S+\.\S+/.test(val), 'Valid email is required'],
  },
  batch: {
    type: String,
    trim: true,
    required: [true, 'batch is required'],
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minLength: [6, 'Password is required minimum 6 characters'],
  },
});

const User = model<Auth>('user', authModel);

export default User;
