import Post from '@/models/post.model';
import IPost from '@/types/post';
import { UpdateQuery } from 'mongoose';

export const createPost = (post: Omit<IPost, '_id'>) => new Post(post).save();
export const deletePost = (_id: string, userId: string) => Post.deleteOne({ _id, author: userId });
export const updatePost = (_id: string, update: UpdateQuery<IPost>, userId?: string) => {
  const query = userId ? { _id, author: userId } : { _id };
  return Post.findOneAndUpdate(query, update, { runValidators: true });
};
export const updatePostStatus = (_id: string, status: IPost['status'], userId?: string) => {
  const query = userId ? { _id, author: userId } : { _id };
  return Post.findByIdAndUpdate(query, { status }, { runValidators: true });
};
