import {
  createCommentHandler,
  deleteCommentHandler,
  getAllCommentsByPostIdHandler,
  updateCommentHandler,
} from '@/controllers/comment.controller';
import authCheck from '@/middleware/auth.middleware';
import { Router } from 'express';

const commentRoute = Router();

commentRoute.post('/', authCheck, createCommentHandler);
commentRoute.get('/:id', authCheck, getAllCommentsByPostIdHandler);
commentRoute.delete('/:id', authCheck, deleteCommentHandler);
commentRoute.patch('/:id', authCheck, updateCommentHandler);

export default commentRoute;
