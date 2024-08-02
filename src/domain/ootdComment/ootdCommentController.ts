import {Request, Response, Router} from 'express';
import {CommentService} from './ootdCommentService';
import {CommentDeleteRequest} from './dto/request';
import {BaseResponse} from '../../base/baseResponse';
import {HTTP_OK} from '../../variables/httpCode';

const commentService = new CommentService();
const router = Router();

router.put('/comments/delete', async (req: Request, res: Response) => {
  try {
    const {commentId}: CommentDeleteRequest = req.body;
    const comment = await commentService.deleteComment({commentId});

    if (!comment) {
      const response: BaseResponse<null> = {
        isSuccess: false,
        code: HTTP_OK.code,
        message: HTTP_OK.message,
      };
      res.status(HTTP_OK.code).json(response);
    } else {
      const response: BaseResponse<null> = {
        isSuccess: true,
        code: HTTP_OK.code,
        message: HTTP_OK.message,
      };
      res.status(HTTP_OK.code).json(response);
    }
  } catch (error: any) {
    console.error('Comment Deletion Error:', error);
    const response: BaseResponse<null> = {
      isSuccess: false,
      code: 500,
      message: error.message,
    };
    res.status(500).json(response);
  }
});

export default router;
