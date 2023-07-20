import { createComment, deleteComment, updateComment } from '@/services/comment.service';
import { updatePost } from '@/services/post.service';
import IComment from '@/types/comment';
import { RequestHandler } from 'express';

export const createCommentHandler: RequestHandler = async (req, res) => {
  const { _id, role } = req.auth!;
  const comment = req.body;
  comment.sender = _id;
  try {
    const commentIncrease = updatePost(comment.post, {
      $inc: { commentsCount: 1 },
      $set: { commentedByAdmin: role === 'admin' },
    });
    const [createdComment] = await Promise.all([createComment(comment), commentIncrease]);

    res.status(201).json({ comment: createdComment, message: 'Comment posted successfully!' });
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
