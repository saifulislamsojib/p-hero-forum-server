import IPost from '@/types/post';
import { model, Schema, Types } from 'mongoose';

const postModel = new Schema<IPost>(
  {
    postBody: {
      type: String,
      trim: true,
      required: [true, 'Post details is required'],
    },
    tags: {
      type: [String],
      default: [],
    },
    category: {
      type: String,
      trim: true,
      required: [true, 'Category is required'],
    },
    imagesOrVideos: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ['new', 'resolved', 'under investigation', 'unresolved', 'rejected'],
      default: 'new',
    },
    commentOff: {
      type: Boolean,
      default: true,
    },
    commentOffBy: {
      type: String,
      enum: ['me', 'admin'],
    },
    commentedByAdmin: {
      type: Boolean,
      default: false,
    },
    author: {
      type: Types.ObjectId,
      ref: 'user',
      required: [true, 'Author is required'],
    },
    authorRole: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    upvote: {
      type: Number,
      default: 0,
    },
    commentsCount: {
      type: Number,
      default: 0,
    },
    priority: {
      type: String,
      enum: ['High', 'Medium', 'Low'],
      default: 'Medium',
    },
  },
  { timestamps: true },
);

const Post = model<IPost>('post', postModel);

export default Post;
