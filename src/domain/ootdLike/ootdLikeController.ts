import {Request, Response, Router} from 'express';
import {OotdLikeService} from './ootdLikeService';
import {OotdLikeResponse} from './dto/response';
import {BaseResponse} from '../../base/baseResponse';
import {HTTP_OK} from '../../variables/httpCode';

const likeService = new OotdLikeService();
const router = Router();

router.get('/likes/:postId', async (req: Request, res: Response) => {
  //type 추가
  try {
    const postId: number = parseInt(req.params.postId);
    const likes = await likeService.getLikesByPostId(postId);

    const responses = likes.map(like => {
      //헷갈리지 않게 복수형으로 이름 변경
      const likeResponse = new OotdLikeResponse();
      likeResponse.id = like.id;
      likeResponse.userId = like.userId; //userId만 가면 안되고 다른 유저 정보들도 (프로필 사진, 아이디 등)
      likeResponse.postId = like.postId; //유효성 검사 해야 함
      likeResponse.status = like.status;
      likeResponse.createdAt = like.createdAt;
      likeResponse.updatedAt = like.updatedAt;
      likeResponse.deletedAt = like.deletedAt;
      return likeResponse; //baseResponse랑 묶어서 return 해야 함
    });

    const baseResponse = new BaseResponse<OotdLikeResponse[]>();
    baseResponse.isSuccess = true;
    baseResponse.code = HTTP_OK.code;
    baseResponse.message = HTTP_OK.message;
    baseResponse.result = responses;

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
