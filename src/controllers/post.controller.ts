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
  const { _id, role, batch } = req.auth!;
  const postFromBody: IPost = req.body;
  postFromBody.author = _id;
  postFromBody.authorRole = role;
  postFromBody.authorBatch = batch;

  try {
    const post = await createPost(postFromBody);
    res.status(201).json({ post, message: 'Posted the status successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    console.log(error);
  }
};

export const deletePostHandler: RequestHandler = async (req, res) => {
  const { _id, role } = req.auth!;
  try {
    const { deletedCount } = await deletePost(req.params.id, role === 'admin' ? undefined : _id);
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
    res.status(201).json({
      isUpdated: !!post,
      message: post ? 'Post updated successfully!' : 'Post not updated successfully!',
    });
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
    const { tags, category, priority, note, status }: Partial<IPost> = req.body;
    const post = await updatePost(req.params.id, {
      tags,
      category,
      priority,
      note,
      status,
    });
    res.status(201).json({
      isUpdated: !!post,
      message: post ? 'Post updated successfully!' : 'Post not updated successfully!',
    });
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
  const { category, status, batch, tag, days, startDay, endDay, problemCategory } = req.query;
  const { _id } = req.auth!;
  try {
    const posts = await getPosts({
      search: category as string,
      userId: _id,
      filter: {
        status,
        batch,
        tag,
        days,
        startDay,
        endDay,
        problemCategory,
      } as Record<string, string>,
    });
    res.status(201).json({ posts });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    console.log(error);
  }
};
export const getTrendingPostsHandler: RequestHandler = async (req, res) => {
  try {
    const posts = await getPosts({
      limit: 5,
      select: '-imagesOrVideos -commentOff -commentOffBy -commentedByAdmin -note -authorBatch',
    });
    res.status(201).json({ posts });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    console.log(error);
  }
};

export const getPostsCount: RequestHandler = async (req, res) => {
  const { _id } = req.auth!;
  try {
    const posts = await getPosts({
      search: 'my-post',
      userId: _id,
      select: '_id status',
      sort: null,
      populate: null,
    });
    const allPostCount = posts.length;
    const resolvedPostCount = posts.filter((post) => post.status === 'resolved').length;
    const unresolvedPostCount = posts.filter((post) => post.status === 'unresolved').length;
    const rejectedPostCount = posts.filter((post) => post.status === 'rejected').length;

    res.status(201).json({
      allPostCount,
      resolvedPostCount,
      unresolvedPostCount,
      rejectedPostCount,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    console.log(error);
  }
};
