import {Request, Response, Router} from 'express';
import {OotdLikeService} from './ootdLikeService';
import {OotdLikeListResponse, OotdLikeResponse} from './dtos/response';
import {BaseResponse} from '../../base/baseResponse';
import {UserService} from '../user/userService';
import {validatePostById} from '../../validationTest/validatePost';
import {validatedUser} from '../../validationTest/validateUser';
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
const router = Router();

//좋아요 누르기/취소
router.patch('/:postId/like', authenticateJWT, async (req: Request, res: Response) => {
  const postId: number = parseInt(req.params.postId);
  const tokenUser = req.user as any;

  try {
    if (isNaN(postId)) {
      return res.status(400).json({
        isSuccess: false,
        code: INVALID_POST_ID.code,
        message: INVALID_POST_ID.message,
      });
    }

    // 유저 유효성 검사
    const validUser = await validatedUser(tokenUser.id);
    if (!validUser) {
      return res.status(401).json({
        isSuccess: false,
        code: NO_AUTHORIZATION.code,
        message: NO_AUTHORIZATION.message,
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

    const like = await likeService.toggleLike({userId: tokenUser.id, postId});

    const response: BaseResponse<OotdLikeResponse> = {
      isSuccess: true,
      code: HTTP_OK.code,
      message: HTTP_OK.message,
      result: {
        id: like.id,
        userId: tokenUser.id,
        postId: postId,
        createdAt: like.createdAt,
        status: like.status,
        updatedAt: like.updatedAt,
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
router.get('/:postId/like', authenticateJWT, async (req: Request, res: Response) => {
  const {postId} = req.params;
  const numericPostId = parseInt(postId, 10); // postId를 숫자로 변환
  const tokenUser = req.user as any;

  try {
    // Post 유효성 검사
    const postExists = await validatePostById(numericPostId);
    if (!postExists || !postExists.user) {
      return res.status(404).json({
        isSuccess: false,
        code: INVALID_POST_ID.code,
        message: INVALID_POST_ID.message,
      });
    }

    // 유저 유효성 검사
    if (!validatedUser(tokenUser.id)) {
      return res.status(401).json({
        isSuccess: false,
        code: NO_AUTHORIZATION.code,
        message: NO_AUTHORIZATION.message,
      });
    }

    const isAuthor = postExists.user.id === tokenUser.id;
    // post ID로 likes 가져오기
    const likes = await likeService.getLikesByPostId(numericPostId, tokenUser.id, isAuthor);

    const response: BaseResponse<OotdLikeListResponse> = {
      isSuccess: true,
      code: HTTP_OK.code,
      message: HTTP_OK.message,
      result: {
        totalLikes: isAuthor ? likes.length : undefined,
        likes: isAuthor
          ? likes.map(like => ({
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
            }))
          : [],
        isLiked: likes.some(like => like.user?.id === tokenUser.id && like.status === 'activated'),
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
