import {Request, Response, Router} from 'express';
import {UserInterestService} from './userInterestService';
import {UserInterestRequest} from './dtos/request';
import {UserInterestResponse} from './dtos/response';
import {BaseResponse} from '../../base/baseResponse';
import {
  HTTP_OK,
  HTTP_INTERNAL_SERVER_ERROR,
  NOT_FOUND_USER,
  CANNOT_REQUEST_MYSELF,
  NO_AUTHORIZATION,
  BLOCKED_USER,
} from '../../variables/httpCode';
import {validatedUser, getBlockStatus} from '../../validationTest/validateUser';
import {authenticateJWT} from '../../middlewares/authMiddleware';

const userInterestService = new UserInterestService();
const router = Router();

router.patch('/interest', authenticateJWT, async (req: Request, res: Response) => {
  try {
    const {userId, friendId}: UserInterestRequest = req.body;
    const tokenUser = req.user as any;

    // 토큰 사용자 검증
    if (tokenUser.id !== userId) {
      return res.status(403).json({
        isSuccess: false,
        code: NO_AUTHORIZATION.code,
        message: NO_AUTHORIZATION.message,
      });
    }

    // userId와 friendId의 유효성 검사
    const userExists = await validatedUser(userId);
    const friendExists = await validatedUser(friendId);

    if (!userId || !friendId || !userExists || !friendExists) {
      return res.status(400).json({
        isSuccess: false,
        code: NOT_FOUND_USER.code,
        message: NOT_FOUND_USER.message,
      });
    }

    //나에게 요청할 경우
    if (userId === friendId) {
      return res.status(400).json({
        isSuccess: false,
        code: CANNOT_REQUEST_MYSELF.code,
        message: CANNOT_REQUEST_MYSELF.message,
      });
    }

    // 차단 여부 확인
    const blockStatus = await getBlockStatus(userId, friendId);
    if (blockStatus === 'blocked') {
      return res.status(400).json({
        isSuccess: false,
        code: BLOCKED_USER.code,
        message: BLOCKED_USER.message,
      });
    }

    const interest = await userInterestService.interestStatus({userId, friendId});

    const response: BaseResponse<UserInterestResponse> = {
      isSuccess: true,
      code: HTTP_OK.code,
      message: HTTP_OK.message,
      result: {
        userId: interest.userId,
        friendId: interest.friendId,
        status: interest.status,
        createdAt: interest.createdAt,
        updatedAt: interest.updatedAt,
        deletedAt: interest.deletedAt,
      },
    };

    res.status(200).json(response);
  } catch (error: any) {
    console.error('User Interest Action Error:', error);
    const response: BaseResponse<null> = {
      isSuccess: false,
      code: HTTP_INTERNAL_SERVER_ERROR.code,
      message: HTTP_INTERNAL_SERVER_ERROR.message,
    };
    res.status(500).json(response);
  }
});

export default router;
