import Post from '@/models/post.model';
import IPost from '@/types/post';
import subDay from 'date-fns/subDays';
import { FilterQuery, SortOrder, UpdateQuery } from 'mongoose';

export const createPost = (post: Omit<IPost, '_id'>) => new Post(post).save();

export const deletePost = (_id: string, userId?: string) => {
  const query = userId ? { _id, author: userId } : { _id };
  return Post.deleteOne(query);
};

type GetPostProps = {
  search?: string;
  userId?: string;
  limit?: number;
  skip?: number;
  sort?: { [key: string]: SortOrder | { $meta: 'textScore' } } | null;
  populate?: [string | string[], string] | null;
  select?: string;
  filter?: {
    status?: string;
    batch?: string;
    tag?: string;
    days?: string;
    startDay?: string;
    endDay?: string;
    problemCategory?: string;
  };
};

const defaultSort: GetPostProps['sort'] = {
  priority: 1,
  commentsCount: -1,
  upvote: -1,
  createdAt: -1,
};

const searchSort: GetPostProps['sort'] = {
  createdAt: -1,
};

export const getPosts = ({
  search,
  userId,
  limit,
  skip,
  sort,
  populate,
  select = '-commentedByAdmin -authorRole -authorBatch',
  filter,
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

  if (filter) {
    if (filter.endDay && filter.startDay) {
      query.createdAt = {
        $gt: new Date(filter.startDay),
        $lt: new Date(filter.endDay),
      };
    }
    if (filter.days) {
      const [day] = filter.days.split(' ');
      query.createdAt = {
        $gt: subDay(new Date(), +day),
        $lt: new Date(),
      };
      console.log(day);
    }
    console.log(filter);
    if (filter.status) {
      query.status = filter.status;
    }
    if (filter.tag) {
      query.tags = {
        $in: filter.tag,
      };
    }
    if (filter.problemCategory) {
      query.category = filter.problemCategory;
    }
    if (filter.batch) {
      query.authorBatch = filter.batch;
    }
    console.log(query);
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
