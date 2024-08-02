import { Request, Response } from 'express';
import { UserService } from './userService';

const userService = new UserService();

export const getUserById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const user = await userService.getUserById(id);

  if (user) {
    if (req.user && req.user.id === user.id) {
      // 본인 정보 조회
      res.json({
        userId: user.id,
        username: user.username,
        email: user.email,
        nickname: user.nickname,
        posts: user.posts.map((post: any) => ({
          id: post.id,
          title: post.title,
          content: post.content
        }))
      });
    } else {
      // 타인 정보 조회
      res.json({
        nickname: user.nickname,
        bio: "User's bio", // 예시로 사용한 bio
        posts: user.posts.map((post: any) => ({
          id: post.id,
          title: post.title,
          content: post.content
        }))
      });
    }
  } else {
    res.status(404).send({ message: 'User not found' });
  }
};

export const getUserPosts = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id, 10);
  const posts = await userService.getUserPosts(userId);

  if (posts) {
    res.json(posts.map((post: any) => ({
      id: post.id,
      title: post.title,
      content: post.content
    })));
  } else {
    res.status(404).send({ message: 'Posts not found' });
  }
};

export const createUserPost = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id, 10);
  const { title, content } = req.body;
  const post = await userService.createUserPost(userId, title, content);

  if (post) {
    res.json({
      id: post.id,
      title: post.title,
      content: post.content
    });
  } else {
    res.status(400).send({ message: 'Unable to create post' });
  }
};

export const getPostById = async (req: Request, res: Response) => {
  const postId = parseInt(req.params.postId, 10);
  const post = await userService.getPostById(postId);

  if (post) {
    res.json({
      id: post.id,
      title: post.title,
      content: post.content
    });
  } else {
    res.status(404).send({ message: 'Post not found' });
  }
};
