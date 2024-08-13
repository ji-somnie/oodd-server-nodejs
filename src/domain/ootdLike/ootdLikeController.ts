// src/domain/ootdLike/ootdLikeController.ts
import {Request, Response, Router} from 'express';
import {OotdLikeService} from './ootdLikeService';
import {OotdLikeRequest} from './dto/request';
import {OotdLikeResponse} from './dto/response';
import {BaseResponse} from '../../base/baseResponse';
import {HTTP_OK} from '../../variables/httpCode';

const likeReadService = new OotdLikeService();
const router = Router();

router.get('/likes/:postId', async (req: Request, res: Response) => {
  try {
    const postId: number = parseInt(req.params.postId);
    const likes = await likeReadService.getLikesByPostId(postId);

    const response = likes.map(like => {
      const likeResponse = new OotdLikeResponse();
      likeResponse.id = like.id;
      likeResponse.userId = like.userId;
      likeResponse.postId = like.postId;
      likeResponse.status = like.status;
      likeResponse.createdAt = dayjs(like.createdAt);
      likeResponse.updatedAt = like.updatedAt ? dayjs(like.updatedAt) : undefined;
      likeResponse.deletedAt = like.deletedAt ? dayjs(like.deletedAt) : undefined;
      return likeResponse;
    });

    const baseResponse = new BaseResponse<OotdLikeResponse[]>();
    baseResponse.isSuccess = true;
    baseResponse.code = 200;
    baseResponse.message = 'Success';
    baseResponse.result = response;

    return res.status(200).json(baseResponse);
  } catch (error: any) {
    const baseResponse = new BaseResponse<null>();
    baseResponse.isSuccess = false;
    baseResponse.code = 500;
    baseResponse.message = error.message;

    return res.status(500).json(baseResponse);
  }
});

export default router;
