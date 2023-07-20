import {
  createPost,
  deletePost,
  getPosts,
  updatePost,
  updatePostStatus,
} from '@/services/post.service';
import IPost from '@/types/post';
import { RequestHandler } from 'express';

export const createPostHandler: RequestHandler = async (req, res) => {
  const { _id, role } = req.auth!;
  const postFromBody: IPost = req.body;
  postFromBody.author = _id;
  postFromBody.authorRole = role;

  try {
    const post = await createPost(postFromBody);
    res.status(201).json({ post, message: 'Posted the status successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    console.log(error);
  }
};

export const deletePostHandler: RequestHandler = async (req, res) => {
  const { _id } = req.auth!;
  try {
    const { deletedCount } = await deletePost(req.params.id, _id);
    res.status(201).json({
      message: deletedCount ? 'Post deleted successfully!' : 'Post not deleted',
      deletedCount,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    console.log(error);
  }
};

export const updatePostHandler: RequestHandler = async (req, res) => {
  const { _id } = req.auth!;
  try {
    const { postBody, tags, category, imagesOrVideos }: Partial<IPost> = req.body;
    const post = await updatePost(
      req.params.id,
      {
        postBody,
        tags,
        category,
        imagesOrVideos,
      },
      _id,
    );
    res.status(201).json({ post, message: 'Post updated successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    console.log(error);
  }
};

export const updatePostStatusHandler: RequestHandler = async (req, res) => {
  const { role, _id } = req.auth!;
  try {
    const { status }: { status: IPost['status'] } = req.body;
    if (role === 'user' && status !== 'resolved') {
      res.status(401).json({ message: 'permission denied' });
      return;
    }
    const post = await updatePostStatus(req.params.id, status, role === 'user' ? _id : undefined);
    res.status(201).json({ post, message: 'Post status updated successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    console.log(error);
  }
};

export const updatePostCommentOffHandler: RequestHandler = async (req, res) => {
  const { _id, role } = req.auth!;
  try {
    const { commentOff } = req.body;
    const updateDoc: Partial<IPost> = commentOff
      ? { commentOff, commentOffBy: role === 'user' ? 'me' : 'admin' }
      : { commentOff };
    const post = await updatePost(req.params.id, updateDoc, role === 'user' ? _id : undefined);
    res.status(201).json({ post, message: 'Post updated successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    console.log(error);
  }
};

export const updatePostForAdminHandler: RequestHandler = async (req, res) => {
  const { role } = req.auth!;
  try {
    if (role === 'user') {
      res.status(401).json({ message: 'permission denied' });
      return;
    }
    const { tags, category, priority }: Partial<IPost> = req.body;
    const post = await updatePost(req.params.id, { tags, category, priority });
    res.status(201).json({ post, message: 'Post updated successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    console.log(error);
  }
};

export const increasePostUpvoteHandler: RequestHandler = async (req, res) => {
  try {
    const post = await updatePost(req.params.id, { $inc: { upvote: 1 } });
    res.status(201).json({ post, message: 'Upvote added successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    console.log(error);
  }
};
export const getAllPosts: RequestHandler = async (req, res) => {
  const { category } = req.query;
  const { _id } = req.auth!;
  try {
    const posts = await getPosts(category as string, _id);
    res.status(201).json({ posts });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    console.log(error);
  }
};
