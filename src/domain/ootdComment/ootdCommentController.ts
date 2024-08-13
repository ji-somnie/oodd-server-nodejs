import {Request, Response, Router} from 'express';
import {CommentService} from './ootdCommentService';
import {CommentDeleteRequest} from './dto/request';
import {BaseResponse} from '../../base/baseResponse';
import {HTTP_OK} from '../../variables/httpCode';

const commentService = new CommentService();
const router = Router();

router.put('/comments/delete', async (req: Request, res: Response) => {
  //request를 path 안에
  //comment 있는지 유효성 확인
  try {
    const {commentId}: CommentDeleteRequest = req.body;
    const comment = await commentService.deleteComment({commentId});

    if (!comment) {
      //유효성 검사하면 사라질 코드
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
