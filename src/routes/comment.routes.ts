import {
  createCommentHandler,
  deleteCommentHandler,
  updateCommentHandler,
} from '@/controllers/comment.controller';
import authCheck from '@/middleware/auth.middleware';
import { Router } from 'express';

const commentRoute = Router();

commentRoute.post('/', authCheck, createCommentHandler);
commentRoute.delete('/', authCheck, deleteCommentHandler);
commentRoute.patch('/', authCheck, updateCommentHandler);

export default commentRoute;
