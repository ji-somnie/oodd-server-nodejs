import {Request, Response, Router} from 'express';
import {CommentService} from './ootdCommentService';
import {UserService} from '../user/userService';
import {BaseResponse} from '../../base/baseResponse';
import {HTTP_OK, INTERNAL_SERVER_ERROR, INVALID_COMMENT} from '../../variables/httpCode';

const commentService = new CommentService();
const userService = new UserService();
const router = Router();

router.get('/:postId', async (req: Request, res: Response) => {
  try {
    const postId: number = parseInt(req.params.postId);

    // 댓글 조회
    const comments = await commentService.getCommentsByPostId(postId);

    if (comments.length === 0) {
      const response: BaseResponse<null> = {
        isSuccess: false,
        code: INVALID_COMMENT.code,
        message: 'No comments found',
      };
      return res.status(400).json(response);
    }

    // 댓글과 유저 정보를 동시에 반환
    const response: BaseResponse<any[]> = {
      isSuccess: true,
      code: HTTP_OK.code,
      message: HTTP_OK.message,
      result: await Promise.all(
        comments.map(async comment => {
          const user = await userService.getUserByID(comment.userId);
          return {
            comment: {
              id: comment.id,
              postId: comment.postId,
              content: comment.content,
              status: comment.status,
              createdAt: comment.createdAt,
              updatedAt: comment.updatedAt,
              deletedAt: comment.deletedAt,
            },
            user: {
              id: user?.id,
              nickname: user?.nickname,
              profilePictureUrl: user?.profilePictureUrl,
            },
          };
        }),
      ),
    };

    res.status(200).json(response);
  } catch (error: any) {
    console.error('Comment Fetch Error:', error);
    const response: BaseResponse<null> = {
      isSuccess: false,
      code: INTERNAL_SERVER_ERROR.code,
      message: error.message,
    };
    res.status(500).json(response);
  }
});

export default router;
