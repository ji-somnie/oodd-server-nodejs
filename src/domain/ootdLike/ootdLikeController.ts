import {Request, Response, Router} from 'express';
import {OotdLikeService} from './ootdLikeService';
import {OotdLikeRequest} from './dto/request';
import {OotdLikeResponse} from './dto/response';
import {BaseResponse} from '../../base/baseResponse';
import {HTTP_OK} from '../../variables/httpCode';

const likeReadService = new OotdLikeService();
const router = Router();

router.get('/likes/:postId', async (req: Request, res: Response) => {
  //type 추가
  try {
    const postId: number = parseInt(req.params.postId);
    const likes = await likeReadService.getLikesByPostId(postId);

    const responses = likes.map(like => {
      //헷갈리지 않게 복수형으로 이름 변경
      const likeResponse = new OotdLikeResponse();
      likeResponse.id = like.id;
      likeResponse.userId = like.userId; //userId만 가면 안되고 다른 유저 정보들도 (프로필 사진, 아이디 등)
      likeResponse.postId = like.postId; //유효성 검사 해야 함
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

