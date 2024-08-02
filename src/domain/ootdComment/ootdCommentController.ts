import {Request, Response, Router} from 'express';
import {CommentService} from './ootdCommentService';
import {CommentGetRequest} from './dto/request';
import {BaseResponse} from '../../base/baseResponse';
import {HTTP_OK} from '../../variables/httpCode';
import {CommentResponse} from './dto/response';

const commentService = new CommentService();
const router = Router();

router.get('/comments', async (req: Request, res: Response) => {
  try {
    const {postId}: CommentGetRequest = req.query as any;
    const comments = await commentService.fetchComments({postId});

    if (comments.length === 0) {
      const response: BaseResponse<null> = {
        isSuccess: false,
        code: HTTP_OK.code,
        message: HTTP_OK.message,
      };
      res.status(HTTP_OK.code).json(response);
    } else {
      const response: BaseResponse<CommentResponse[]> = {
        isSuccess: true,
        code: HTTP_OK.code,
        message: HTTP_OK.message,
        result: comments,
      };
      res.status(HTTP_OK.code).json(response);
    }
  } catch (error: any) {
    console.error('Fetch Comments Error:', error);
    const response: BaseResponse<null> = {
      isSuccess: false,
      code: 500,
      message: error.message,
    };
    res.status(500).json(response);
  }
});

export default router;
