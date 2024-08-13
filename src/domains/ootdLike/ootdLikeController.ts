import {Request, Response, Router} from 'express';
import {OotdLikeService} from './ootdLikeService';
import {OotdLikeResponse} from './dtos/response';
import {BaseResponse} from '../../base/baseResponse';
import {UserService} from '../user/userService';
import {validatePostById} from '../../validationTest/validatePost';
import {
  HTTP_OK,
  HTTP_INTERNAL_SERVER_ERROR,
  NOT_FOUND_POST,
  NO_AUTHORIZATION,
  INVALID_POST_ID,
  DATABASE_ERROR,
} from '../../variables/httpCode';
import {authenticateJWT} from '../../middlewares/authMiddleware';

const likeService = new OotdLikeService();
const userService = new UserService();
const router = Router();

//좋아요 누르기/취소
router.put('/:postId/like', authenticateJWT, async (req: Request, res: Response) => {
  console.log(`Received PUT request for /posts/${req.params.postId}/like`);
  console.log('Request body:', req.body);

  const postId: number = parseInt(req.params.postId);
  const tokenUser = req.user as any;

  try {
    if (isNaN(postId)) {
      return res.status(400).json({
        isSuccess: false,
        code: INVALID_POST_ID.code,
        message: INVALID_POST_ID.message,
        result: {postId: null, userId: null},
      });
    }

    // kakaoId로 사용자 찾기
    const user = await userService.findUserByKakaoId(tokenUser.kakaoId);

    if (!user) {
      return res.status(401).json({
        isSuccess: false,
        code: NO_AUTHORIZATION.code,
        message: NO_AUTHORIZATION.message,
        result: {postId, userId: null},
      });
    }

    // Post 유효성 검사
    const postExists = await validatePostById(postId);
    if (!postExists) {
      return res.status(404).json({
        isSuccess: false,
        code: NOT_FOUND_POST.code,
        message: NOT_FOUND_POST.message,
        result: {postId, userId: user.id},
      });
    }

    const like = await likeService.toggleLike({userId: user.id, postId});

    const response: BaseResponse<OotdLikeResponse> = {
      isSuccess: true,
      code: HTTP_OK.code,
      message: HTTP_OK.message,
      result: {
        id: like.id,
        userId: user.id,
        postId: postId,
        createdAt: like.createdAt,
        status: like.status,
        updatedAt: like.updatedAt,
        deletedAt: like.deletedAt,
        user: {
          id: user.id,
          nickname: user.nickname,
          profilePictureUrl: user.profilePictureUrl,
        },
      },
    };

    return res.status(200).json(response);
  } catch (error: any) {
    console.error('Like Error:', error);
    const errorResponse = {
      isSuccess: false,
      code: error.name === 'QueryFailedError' ? DATABASE_ERROR.code : HTTP_INTERNAL_SERVER_ERROR.code,
      message: error.name === 'QueryFailedError' ? DATABASE_ERROR.message : HTTP_INTERNAL_SERVER_ERROR.message,
      result: {postId, userId: tokenUser ? tokenUser.id : null},
    };
    return res.status(500).json(errorResponse);
  }
});

//좋아요 조회
router.get('/:postId/like', async (req: Request, res: Response) => {
  const {postId} = req.params;
  const numericPostId = parseInt(postId, 10); // postId를 숫자로 변환

  try {
    // Post 유효성 검사
    const postExists = await validatePostById(numericPostId);
    if (!postExists) {
      return res.status(404).json({
        isSuccess: false,
        code: INVALID_POST_ID.code,
        message: INVALID_POST_ID.message,
      });
    }

    // post ID로 likes 가져오기
    const likes = await likeService.getLikesByPostId(numericPostId);

    const response: BaseResponse<{totalLikes: number; likes: OotdLikeResponse[]}> = {
      isSuccess: true,
      code: HTTP_OK.code,
      message: HTTP_OK.message,
      result: {
        totalLikes: likes.length,
        likes: likes.map(like => ({
          id: like.id,
          userId: like.user?.id,
          postId: like.post?.id,
          status: like.status,
          createdAt: like.createdAt,
          updatedAt: like.updatedAt,
          user: {
            id: like.user?.id,
            nickname: like.user?.nickname,
            profilePictureUrl: like.user?.profilePictureUrl,
          },
        })),
      },
    };

    res.status(200).json(response);
  } catch (error: any) {
    console.error('Like Fetch Error:', error);
    res.status(500).json({
      isSuccess: false,
      code: HTTP_INTERNAL_SERVER_ERROR.code,
      message: HTTP_INTERNAL_SERVER_ERROR.message,
    });
  }
});

export default router;
