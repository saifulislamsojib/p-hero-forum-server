import Comment from '@/models/comment.model';
import IComment from '@/types/comment';
import { UpdateQuery } from 'mongoose';

export const createComment = (comment: Omit<IComment, '_id'>) => new Comment(comment).save();
export const deleteComment = (_id: string, userId: string) =>
  Comment.deleteOne({ _id, author: userId });

export const updateComment = (_id: string, update: UpdateQuery<IComment>, userId: string) => {
  const query = { _id, author: userId };
  return Comment.findOneAndUpdate(query, update, { runValidators: true });
};
