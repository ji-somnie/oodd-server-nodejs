import {Request, Response, Router} from 'express';
import {UserService} from '../user/userService';
import {CommentService} from './ootdCommentService';
import {CommentRequest} from './dtos/request';
import {CommentResponse} from './dtos/response';
import {BaseResponse} from '../../base/baseResponse';
import {
  HTTP_OK,
  HTTP_INTERNAL_SERVER_ERROR,
  NOT_FOUND_USER,
  NOT_FOUND_POST,
  NO_AUTHORIZATION,
  INVALID_CONTENT,
} from '../../variables/httpCode';
import {authenticateJWT} from '../../middlewares/authMiddleware';
import {validatePostById} from '../../validationTest/validatePost';

const commentService = new CommentService();
const userService = new UserService();
const router = Router();

router.post('/:postId/comment', authenticateJWT, async (req: Request, res: Response) => {
  try {
    const postId: number = parseInt(req.params.postId);
    const {username, kakaoId, googleId, email} = req.user as any;
    const {userId, content}: CommentRequest = req.body;

    console.log('User info:', {username, kakaoId, googleId, email});

    let finalUserId: number | undefined = userId;

    if (kakaoId) {
      const user = await userService.findUserByKakaoId(kakaoId);
      finalUserId = user?.id;
    } /*else if (googleId) {
      const user = await userService.findUserByGoogleId(googleId);
      finalUserId = user?.id; */
    } catch (error) {
      return res.status(401).json({
        isSuccess: false,
        code: NO_AUTHORIZATION.code,
        message: NO_AUTHORIZATION.message,
      });
    }

    if (!finalUserId) {
      return res.status(404).json({
        isSuccess: false,
        code: NOT_FOUND_USER.code,
        message: NOT_FOUND_USER.message,
      });
    }

    // userId가 주어지지 않았거나, 주어진 userId가 토큰의 사용자 ID와 다를 경우
    if (userId !== undefined && userId !== tokenUserId) {
      return res.status(401).json({
        isSuccess: false,
        code: NO_AUTHORIZATION.code,
        message: NO_AUTHORIZATION.message,
      });
    }

    // user 유효성 검사
    const userExists = await userService.getUserByUserId(finalUserId);
    if (!userExists) {
      return res.status(404).json({
        isSuccess: false,
        code: NOT_FOUND_USER.code,
        message: NOT_FOUND_USER.message,
      });
    }

    // post 유효성 검사
    const postExists = await validatePostById(postId);
    if (!postExists) {
      return res.status(404).json({
        isSuccess: false,
        code: NOT_FOUND_POST.code,
        message: NOT_FOUND_POST.message,
      });
    }

    // content 유효성 검사
    if (!content || content.trim() === '' || content.length > 500) {
      return res.status(400).json({
        isSuccess: false,
        code: INVALID_CONTENT.code,
        message: INVALID_CONTENT.message,
      });
    }

    // 댓글 생성
    const comment = await commentService.createComment({userId: finalUserId, postId, content});

    // 응답 생성
    const response: BaseResponse<CommentResponse> = {
      isSuccess: true,
      code: HTTP_OK.code,
      message: HTTP_OK.message,
      result: {
        id: comment.id,
        userId: comment.user.id,
        postId: comment.post.id,
        content: comment.content,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    };

    res.status(201).json(response);
  } catch (error: any) {
    console.error('Comment Creation Error:', error);
    res.status(500).json({
      isSuccess: false,
      code: HTTP_INTERNAL_SERVER_ERROR.code,
      message: HTTP_INTERNAL_SERVER_ERROR.message,
    });
  }
});

export default router;
