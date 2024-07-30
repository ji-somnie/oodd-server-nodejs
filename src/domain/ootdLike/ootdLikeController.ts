//src/domain/ootdLike/ootdLikeController.ts
import {Request, Response, Router} from 'express';
import {OotdLikeService} from './ootdLikeService';
import {OotdLikeRequest} from './dto/request';
import {OotdLikeResponse} from './dto/response';
import {BaseResponse} from '../../base/baseResponse';

const likeService = new OotdLikeService();
const router = Router();

router.put('/toggle', async (req: Request, res: Response) => {
  try {
    const {userId, postId}: OotdLikeRequest = req.body;
    const like = await likeService.toggleLike({userId, postId});

    const response: BaseResponse<OotdLikeResponse | null> = {
      isSuccess: true,
      code: 200,
      message: 'Success',
      result: like
        ? {
            id: like.id,
            userId: like.userId,
            postId: like.postId,
            createdAt: like.createdAt,
            status: like.status,
            updatedAt: like.updatedAt,
            deletedAt: like.deletedAt,
          }
        : null,
    };

    res.status(200).json(response);
  } catch (error: any) {
    res.status(500).json({message: error.message});
  }
});

export default router;
