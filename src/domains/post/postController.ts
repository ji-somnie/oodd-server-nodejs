import {Router, Request, Response} from 'express';
import {PostService} from './postService';
import {PostRequestDto} from './dtos/postRequest.dto';
import {
  HTTP_OK,
  HTTP_BAD_REQUEST,
  HTTP_INTERNAL_SERVER_ERROR,
  NO_PARAMETER,
  NOT_FOUND_USER,
  NO_AUTHORIZATION,
  NOT_FOUND_POST,
} from '../../variables/httpCode';
import {BaseResponse} from '../../base/baseResponse';
import {User} from '../../entities/userEntity';
import {UserService} from '../user/userService';
import { authenticateJWT } from '../../middlewares/authMiddleware';

const router = Router();
const postService = new PostService();
const userService = new UserService();

// // 토큰 검증 대신 일단 하드코딩
// const tempUserId = 6;
// const userId = tempUserId;

// 게시물 업로드
router.post('/', authenticateJWT, async (req: Request, res: Response): Promise<void> => {
  try {
    const postRequestDto: PostRequestDto = req.body;

    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: NOT_FOUND_USER});
      return;
    }
    const newPostResponse = await postService.createPost(userId, postRequestDto);

    if (newPostResponse.isSuccess) {
      res.status(201).json(newPostResponse);
    }
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      res.status(400).json({message: HTTP_BAD_REQUEST.message});
    } else {
      res.status(500).json({message: HTTP_INTERNAL_SERVER_ERROR.message});
    }
  }
});

// 게시물 삭제
router.delete('/:postId', authenticateJWT, async (req: Request, res: Response): Promise<void> => {
  try {
    const postId = parseInt(req.params.postId, 10);
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: NOT_FOUND_USER.message});
      return;
    }

    const deletePostResponse = await postService.deletePost(userId, postId);

    if (deletePostResponse.isSuccess) {
      res.status(201).json(deletePostResponse);
    }
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      res.status(400).json({message: HTTP_BAD_REQUEST.message});
    } else {
      res.status(500).json({message: HTTP_INTERNAL_SERVER_ERROR.message});
    }
  }
});

// 대표 OOTD 지정
router.patch('/:postId/isRepresentative/:userId', async (req: Request, res: Response): Promise<void> => {
  try {
    const postId = parseInt(req.params.postId, 10);
    const userId = parseInt(req.params.userId, 10);

    if (!postId || !userId) {
      res.status(400).json(new BaseResponse(false, NO_PARAMETER.code, NO_PARAMETER.message));
      return;
    }

    // 유저 확인 후 채팅방에 있는 지 체크 필요 (코드 작성 전)
    const user: User | null = await userService.getUserByUserId(userId);
    if (!user) {
      res.status(404).json(new BaseResponse(false, NOT_FOUND_USER.code, NOT_FOUND_USER.message));
      return;
    }

    const post = await postService.getPostById(postId);
    if (!post) {
      res.status(404).json(new BaseResponse(false, NOT_FOUND_POST.code, NOT_FOUND_POST.message));
      return;
    }

    if (post.user.id !== userId) {
      res.status(401).json(new BaseResponse(false, NO_AUTHORIZATION.code, NO_AUTHORIZATION.message));
      return;
    }

    await postService.updatePostIsRepresentative(post);
    res.status(201).json(new BaseResponse(true, HTTP_OK.code, HTTP_OK.message));
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      res.status(400).json({message: HTTP_BAD_REQUEST.message});
    } else {
      res.status(500).json({message: HTTP_INTERNAL_SERVER_ERROR.message});
    }
  }
});

export default router;
