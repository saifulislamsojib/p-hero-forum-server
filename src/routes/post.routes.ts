import {
  createPostHandler,
  deletePostHandler,
  getAllPosts,
  getPostsCount,
  getTrendingPostsHandler,
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
postRoutes.get('/', authCheck, getAllPosts);
postRoutes.get('/counts', authCheck, getPostsCount);
postRoutes.get('/trending', authCheck, getTrendingPostsHandler);
postRoutes.delete('/:id', authCheck, deletePostHandler);
postRoutes.patch('/status/:id', authCheck, updatePostStatusHandler);
postRoutes.patch('/commentOff/:id', authCheck, updatePostCommentOffHandler);
postRoutes.patch('/updateByAdmin/:id', authCheck, updatePostForAdminHandler);
postRoutes.patch('/upvote/:id', authCheck, increasePostUpvoteHandler);
postRoutes.patch('/:id', authCheck, updatePostHandler);

export default postRoutes;
