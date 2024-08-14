import {Request, Response, Router} from 'express';
import {CommentService} from './ootdCommentService';
import {CommentRequest} from './dtos/request';
import {CommentResponse} from './dtos/response';
import {BaseResponse} from '../../base/baseResponse';
import {
  HTTP_OK,
  HTTP_INTERNAL_SERVER_ERROR,
  NOT_FOUND_POST,
  NO_AUTHORIZATION,
  INVALID_CONTENT,
} from '../../variables/httpCode';
import {authenticateJWT} from '../../middlewares/authMiddleware';
import {validatePostById} from '../../validationTest/validatePost';

const commentService = new CommentService();
const router = Router();

router.post('/:postId/comment', authenticateJWT, async (req: Request, res: Response) => {
  try {
    const postId: number = parseInt(req.params.postId);
    const user = req.user as any;
    const {content}: CommentRequest = req.body;

    if (!user || !user.id) {
      return res.status(401).json({
        isSuccess: false,
        code: NO_AUTHORIZATION.code,
        message: NO_AUTHORIZATION.message,
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
    const comment = await commentService.createComment({userId: user.id, postId, content});

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
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
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
