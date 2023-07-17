import User from '@/models/auth.model';
import { Auth } from '@/types/auth';

export const createUser = (user: Omit<Auth, '_id'>) => new User(user).save();

export const getUserByEmail = (email: string) => User.findOne({ email });

export const getUserById = (id: string) => User.findOne({ id });
