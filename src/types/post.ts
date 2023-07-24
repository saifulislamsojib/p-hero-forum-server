import { ObjectId } from 'mongoose';

type ImagesOrVideo = {
  asset_id: string;
  width: `${number}` | number;
  height: `${number}` | number;
  src: string;
  format: string;
  resource_type: string;
  blurDataURL?: string;
};

interface IPost {
  _id: string;
  postBody: string;
  tags: string[];
  category: string;
  imagesOrVideos: ImagesOrVideo[];
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
  note?: string;
}

export default IPost;
