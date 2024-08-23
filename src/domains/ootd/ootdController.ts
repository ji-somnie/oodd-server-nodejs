import {Router, Request, Response} from 'express';
import {OOTDService} from './ootdService';
import {
  HTTP_OK,
  HTTP_BAD_REQUEST,
  HTTP_INTERNAL_SERVER_ERROR,
  NO_PARAMETER,
  NOT_FOUND_USER,
  NO_AUTHORIZATION,
  NOT_FOUND_POST,
} from '../../variables/httpCode';
import {BaseResponse} from '../../base/baseResponse';
import {User} from '../../entities/userEntity';
import {UserService} from '../user/userService';
import {authenticateJWT} from '../../middlewares/authMiddleware';

const router = Router();
const ootdService = new OOTDService();
const userService = new UserService();

// // 토큰 검증 대신 일단 하드코딩
// const tempUserId = 6;
// const userId = tempUserId;

// OOTD 조회: 스타일 태그에 해당하는 게시물 반환
router.get('/', authenticateJWT, async (req: Request, res: Response): Promise<void> => {
  try {
    let styletags = req.query.styletag as string | string[];

    if (!styletags || styletags.length === 0) {
      res.status(400).json(new BaseResponse(false, HTTP_BAD_REQUEST.code, HTTP_BAD_REQUEST.message));
      return;
    }

    const styletagArray = Array.isArray(styletags) ? styletags : [styletags];

    const userId = req.user!.id;

    const ootdResponse = await ootdService.getOOTD(userId, styletagArray);


    if (ootdResponse.isSuccess) {
      res.status(200).json(ootdResponse);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(new BaseResponse(false, HTTP_INTERNAL_SERVER_ERROR.code, HTTP_INTERNAL_SERVER_ERROR.message));
  }
});

export default router;
