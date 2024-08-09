import {Request, Response, Router} from 'express';
import {OotdLikeService} from './ootdLikeService';
import {OotdLikeGetResponse} from './dto/response';
import {BaseResponse} from '../../base/baseResponse';
import {HTTP_OK, INTERNAL_SERVER_ERROR, INVALID_POST} from '../../variables/httpCode';
import {PostService} from '../post/postService';

const likeService = new OotdLikeService();
const postService = new PostService();
const router = Router();

router.get('/:postId', async (req: Request, res: Response) => {
  const postId: number = parseInt(req.params.postId);
  try {
    //post 유효성 검사
    const postExists = await postService.getPostByID(postId);
    if (!postExists) {
      return res.status(400).json({
        isSuccess: false,
        code: INVALID_POST.code,
        message: INVALID_POST.message,
      });
    }

    const likes = await likeService.getLikesByPostId(postId);

    const response: BaseResponse<OotdLikeGetResponse[]> = {
      isSuccess: true,
      code: HTTP_OK.code,
      message: HTTP_OK.message,
      result: likes.map(like => ({
        id: like.id,
        userId: like.userId,
        postId: like.postId,
        status: like.status,
        createdAt: like.createdAt,
        updatedAt: like.updatedAt,
        deletedAt: like.deletedAt,
      })),
    };

    res.status(200).json(response);
  } catch (error: any) {
    console.error('Like Fetch Error:', error);
    res.status(500).json({
      isSuccess: false,
      code: INTERNAL_SERVER_ERROR.code,
      message: INTERNAL_SERVER_ERROR.message,
    });
  }
});

export default router;
