import { ObjectId } from 'mongoose';

interface IComment {
  _id: string;
  text: string;
  post: string | ObjectId;
  sender: string | ObjectId;
  mainCommentId?: string;
}

export default IComment;
