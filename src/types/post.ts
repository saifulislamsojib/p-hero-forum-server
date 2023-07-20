import { ObjectId } from 'mongoose';

interface IPost {
  _id: string;
  postBody: string;
  tags: string[];
  category: string;
  imagesOrVideos: string[];
  status: 'new' | 'resolved' | 'under investigation' | 'unresolved' | 'rejected';
  commentOff: boolean;
  commentOffBy?: 'me' | 'admin';
  createdAt: string;
  updatedAt: string;
  author: string | ObjectId;
  authorRole: 'user' | 'admin';
  upvote: number;
  commentsCount: number;
  commentedByAdmin: boolean;
  priority: 'High' | 'Medium' | 'Low';
}

export default IPost;
