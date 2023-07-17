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
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    unique: true,
    validate: [(val: string) => /\S+@\S+\.\S+/.test(val), 'Valid email is required'],
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    unique: true,
    validate: [
      (val: string) => val.trim().length === 11 && /[0-9]/.test(val),
      'Valid phone number is required',
    ],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minLength: [6, 'Password is required minimum 6 characters'],
  },
});

const User = model<Auth>('user', authModel);

export default User;
