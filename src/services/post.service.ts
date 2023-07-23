import Post from '@/models/post.model';
import IPost from '@/types/post';
import { FilterQuery, SortOrder, UpdateQuery } from 'mongoose';

export const createPost = (post: Omit<IPost, '_id'>) => new Post(post).save();

export const deletePost = (_id: string, userId?: string) => {
  const query = userId ? { _id, author: userId } : { _id };
  return Post.deleteOne(query);
};

const defaultSort: { [key: string]: SortOrder | { $meta: 'textScore' } } = {
  priority: 1,
  commentsCount: -1,
  upvote: -1,
  createdAt: -1,
};

const searchSort: { [key: string]: SortOrder | { $meta: 'textScore' } } = {
  createdAt: -1,
};

type GetPostProps = {
  search: string;
  userId: string;
  limit?: number;
  skip?: number;
  sort?: { [key: string]: SortOrder | { $meta: 'textScore' } } | null;
  populate?: [string | string[], string] | null;
  select?: string;
};

export const getPosts = ({
  search,
  userId,
  limit,
  skip,
  sort,
  populate,
  select = '-commentedByAdmin -authorRole',
}: GetPostProps) => {
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
  const result = Post.find(query).select(select);
  if (sort !== null) {
    const newSort = sort || search ? searchSort : defaultSort;
    result.sort(newSort);
  }
  if (limit) {
    result.limit(limit);
  }
  if (skip) {
    result.skip(skip);
  }
  if (populate !== null) {
    const newPopulate = populate || ['author', '-password'];
    return result.populate(...newPopulate);
  }
  return result;
};

export const updatePost = (_id: string, update: UpdateQuery<IPost>, userId?: string) => {
  const query = userId ? { _id, author: userId } : { _id };
  return Post.findOneAndUpdate(query, update, {
    new: true,
    runValidators: true,
  });
};

export const updatePostStatus = (_id: string, status: IPost['status'], userId?: string) => {
  const query = userId ? { _id, author: userId } : { _id };
  return Post.findByIdAndUpdate(query, { status }, { runValidators: true });
};
