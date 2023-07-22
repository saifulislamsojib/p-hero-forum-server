import Post from '@/models/post.model';
import IPost from '@/types/post';
import { FilterQuery, UpdateQuery } from 'mongoose';

export const createPost = (post: Omit<IPost, '_id'>) => new Post(post).save();

export const deletePost = (_id: string, userId?: string) => {
  const query = userId ? { _id, author: userId } : { _id };
  return Post.deleteOne(query);
};

export const getPosts = (search: string, userId: string) => {
  const query: FilterQuery<IPost> = {};
  if (search === 'my-post') {
    query.author = userId;
  } else if (search === 'admin-post') {
    query.authorRole = 'admin';
  } else if (search === 'unresolved') {
    query.status = 'unresolved';
  } else if (search === 'not-replied') {
    query.commentedByAdmin = false;
  }
  return Post.find(query).select('-commentedByAdmin -authorRole').populate('author', '-password');
};

export const updatePost = (_id: string, update: UpdateQuery<IPost>, userId?: string) => {
  const query = userId ? { _id, author: userId } : { _id };
  return Post.findOneAndUpdate(query, update, { new: true, runValidators: true });
};

export const updatePostStatus = (_id: string, status: IPost['status'], userId?: string) => {
  const query = userId ? { _id, author: userId } : { _id };
  return Post.findByIdAndUpdate(query, { status }, { runValidators: true });
};
