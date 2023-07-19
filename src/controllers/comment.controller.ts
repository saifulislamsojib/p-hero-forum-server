import { createComment, deleteComment, updateComment } from '@/services/comment.service';
import IComment from '@/types/comment';
import { RequestHandler } from 'express';

export const createCommentHandler: RequestHandler = async (req, res) => {
  try {
    const post = await createComment(req.body.comment);
    res.status(201).json({ post, message: 'Comment posted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    console.log(error);
  }
};

export const deleteCommentHandler: RequestHandler = async (req, res) => {
  const { _id } = req.auth!;
  try {
    const { deletedCount } = await deleteComment(req.params.id, _id);
    res.status(201).json({
      message: deletedCount ? 'Comment deleted successfully!' : 'Comment not deleted',
      deletedCount,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    console.log(error);
  }
};

export const updateCommentHandler: RequestHandler = async (req, res) => {
  const { _id } = req.auth!;
  try {
    const { text }: Partial<IComment> = req.body.post;
    const post = await updateComment(req.params.id, { text }, _id);
    res.status(201).json({ post, message: 'Post updated successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    console.log(error);
  }
};
