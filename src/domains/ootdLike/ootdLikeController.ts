import {Request, Response, Router} from 'express';
import {OotdLikeService} from './ootdLikeService';
import {OotdLikeRequest} from './dtos/request';
import {OotdLikeResponse} from './dtos/response';
import {BaseResponse} from '../../base/baseResponse';
import {UserService} from '../user/userService';
import {validatePostById} from '../../validationTest/validatePost';
import {HTTP_OK, HTTP_INTERNAL_SERVER_ERROR, NOT_FOUND_USER, NOT_FOUND_POST} from '../../variables/httpCode';

const likeService = new OotdLikeService();
const userService = new UserService();
const router = Router();

router.put('/:postId/like', async (req: Request, res: Response) => {
  // 출력값 추가
  console.log(`Received PUT request for /posts/${req.params.postId}/like`);
  console.log('Request body:', req.body);
  try {
    const postId: number = parseInt(req.params.postId);
    const {userId}: OotdLikeRequest = req.body;

    // User 유효성 검사
    const userExists = await userService.getUserByUserId(userId);
    if (!userExists) {
      return res.status(404).json({
        isSuccess: false,
        code: NOT_FOUND_USER.code,
        message: NOT_FOUND_USER.message,
      });
    }

    // Post 유효성 검사
    const postExists = await validatePostById(postId);
    if (!postExists) {
      return res.status(404).json({
        isSuccess: false,
        code: NOT_FOUND_POST.code,
        message: NOT_FOUND_POST.message,
      });
    }

    const like = await likeService.toggleLike({userId, postId});

    const response: BaseResponse<OotdLikeResponse | null> = {
      isSuccess: true,
      code: HTTP_OK.code,
      message: HTTP_OK.message,
      result: like
        ? {
            id: like.id,
            userId: like.user?.id,
            postId: like.post?.id,
            createdAt: like.createdAt,
            status: like.status,
            updatedAt: like.updatedAt,
            deletedAt: like.deletedAt,
          }
        : null,
    };

    res.status(200).json(response);
  } catch (error: any) {
    console.error('Like Error:', error);
    res.status(500).json({
      isSuccess: false,
      code: HTTP_INTERNAL_SERVER_ERROR.code,
      message: HTTP_INTERNAL_SERVER_ERROR.message,
    });
  }
});

export default router;
