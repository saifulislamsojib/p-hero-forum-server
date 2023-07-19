import IComment from '@/types/comment';
import { model, Schema, Types } from 'mongoose';

const commentModel = new Schema<IComment>(
  {
    text: {
      type: String,
      trim: true,
      required: [true, 'Comment text is required'],
    },
    post: {
      type: Types.ObjectId,
      ref: 'post',
      required: [true, 'Post id is required'],
    },
    sender: {
      type: Types.ObjectId,
      ref: 'user',
      required: [true, 'Sender id is required'],
    },
    mainCommentId: String,
  },
  { timestamps: true },
);

const Comment = model<IComment>('comment', commentModel);

export default Comment;
