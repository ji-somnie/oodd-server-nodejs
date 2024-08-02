// src/domain/ootdLike/ootdLikeController.ts
import {Request, Response, Router} from 'express';
import {OotdLikeService} from './ootdLikeService';
import {OotdLikeResponse} from './dto/response';
import {BaseResponse} from '../../base/baseResponse';
import {HTTP_OK} from '../../variables/httpCode';

const likeService = new OotdLikeService();
const router = Router();

router.get('/likes/:postId', async (req: Request, res: Response) => {
  try {
    const postId: number = parseInt(req.params.postId);
    const likes = await likeService.getLikesByPostId(postId);

    const response = likes.map(like => {
      const likeResponse = new OotdLikeResponse();
      likeResponse.id = like.id;
      likeResponse.userId = like.userId;
      likeResponse.postId = like.postId;
      likeResponse.status = like.status;
      likeResponse.createdAt = like.createdAt;
      likeResponse.updatedAt = like.updatedAt;
      likeResponse.deletedAt = like.deletedAt;
      return likeResponse;
    });

    const baseResponse = new BaseResponse<OotdLikeResponse[]>();
    baseResponse.isSuccess = true;
    baseResponse.code = HTTP_OK.code;
    baseResponse.message = HTTP_OK.message;
    baseResponse.result = response;

    res.status(200).json(baseResponse);
  } catch (error: any) {
    console.error('Like Fetch Error:', error);
    const baseResponse = new BaseResponse<null>();
    baseResponse.isSuccess = false;
    baseResponse.code = 500;
    baseResponse.message = error.message;

    res.status(500).json(baseResponse);
  }
});

export default router;
