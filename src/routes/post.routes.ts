import {
  createPostHandler,
  deletePostHandler,
  increasePostUpvoteHandler,
  updatePostCommentOffHandler,
  updatePostForAdminHandler,
  updatePostHandler,
  updatePostStatusHandler,
} from '@/controllers/post.controller';
import authCheck from '@/middleware/auth.middleware';
import { Router } from 'express';

const postRoutes = Router();

postRoutes.post('/', authCheck, createPostHandler);
postRoutes.delete('/:id', authCheck, deletePostHandler);
postRoutes.patch('/:id', authCheck, updatePostHandler);
postRoutes.patch('/status/:id', authCheck, updatePostStatusHandler);
postRoutes.patch('/commentOff/:id', authCheck, updatePostCommentOffHandler);
postRoutes.patch('/updateByAdmin/:id', authCheck, updatePostForAdminHandler);
postRoutes.patch('/upvote/:id', authCheck, increasePostUpvoteHandler);

export default postRoutes;
