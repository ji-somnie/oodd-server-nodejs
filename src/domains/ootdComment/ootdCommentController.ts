import {Request, Response, Router} from 'express';
import {CommentService} from './ootdCommentService';
import {CommentRequest} from './dto/request';
import {CommentResponse} from './dto/response';
import {BaseResponse} from '../../base/baseResponse';
import {HTTP_OK, INTERNAL_SERVER_ERROR, INVALID_USER, INVALID_POST} from '../../variables/httpCode';
import dayjs from 'dayjs';
import {UserService} from '../user/userService';
import {PostService} from '../post/postService';

const commentService = new CommentService();
const userService = new UserService();
const postService = new PostService();
const router = Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const {userId, postId, content}: CommentRequest = req.body;

    //user 유효성
    const userExists = await userService.getUserByID(userId);
    if (!userExists) {
      return res.status(400).json({
        isSuccess: false,
        code: INVALID_USER.code,
        message: INVALID_USER.message,
      });
    }

    //post 유효성
    const postExists = await postService.getPostByID(postId);
    if (!postExists) {
      return res.status(400).json({
        isSuccess: false,
        code: INVALID_POST.code,
        message: INVALID_POST.message,
      });
    }

    const comment = await commentService.createComment({userId, postId, content});

    const response: BaseResponse<CommentResponse> = {
      isSuccess: true,
      code: HTTP_OK.code,
      message: HTTP_OK.message,
      result: {
        id: comment.id,
        userId: comment.userId,
        postId: comment.postId,
        content: comment.content,
        createdAt: dayjs(comment.createdAt),
      },
    };

    res.status(201).json(response);
  } catch (error: any) {
    console.error('Comment Creation Error:', error);
    res.status(500).json({
      isSuccess: false,
      code: INTERNAL_SERVER_ERROR.code,
      message: INTERNAL_SERVER_ERROR.message,
    });
  }
});

export default router;
