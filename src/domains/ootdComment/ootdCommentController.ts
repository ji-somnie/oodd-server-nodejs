import {Request, Response, Router} from 'express';
import {UserService} from '../user/userService';
import {PostService} from '../post/postService';
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
} from '../../variables/httpCode';
import {authenticateJWT} from '../../middlewares/authMiddleware';

const commentService = new CommentService();
const userService = new UserService();
const postService = new PostService();
const router = Router();

router.post('/:postId/comment', authenticateJWT, async (req: Request, res: Response) => {
  try {
    const postId = parseInt(req.params.postId);
    const userId = (req.user as any).id;
    const {content}: CommentRequest = req.body;

    if (!userId) {
      return res.status(401).json({
        isSuccess: false,
        code: NO_AUTHORIZATION.code,
        message: NO_AUTHORIZATION.message,
      });
    }

    //user 유효성
    const userExists = await userService.getUserByUserId(userId);
    if (!userExists) {
      return res.status(404).json({
        isSuccess: false,
        code: NOT_FOUND_USER.code,
        message: NOT_FOUND_USER.message,
      });
    }

    //post 유효성
    const postExists = await postService.getPostById(postId);
    if (!postExists) {
      return res.status(404).json({
        isSuccess: false,
        code: NOT_FOUND_POST.code,
        message: NOT_FOUND_POST.message,
      });
    }

    const comment = await commentService.createComment({userId, postId, content});

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
