import {Request, Response, Router} from 'express';
import {CommentService} from './ootdCommentService';
import {CommentRequest} from './dto/request';
import {CommentResponse} from './dto/response';
import {BaseResponse} from '../../base/baseResponse';
import {HTTP_OK} from '../../variables/httpCode';
import dayjs from 'dayjs';

const commentService = new CommentService();
const router = Router();

router.post('/comments', async (req: Request, res: Response) => {
  try {
    const {userId, postId, content}: CommentRequest = req.body;
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
    const baseResponse = new BaseResponse<null>();
    baseResponse.isSuccess = false;
    baseResponse.code = 500;
    baseResponse.message = error.message;

    res.status(500).json(baseResponse);
  }
});

export default router;
