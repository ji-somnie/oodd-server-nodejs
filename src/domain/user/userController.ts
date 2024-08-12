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


