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
  BLOCKED_USER,
} from '../../variables/httpCode';
import {validatedUser, getBlockStatus} from '../../validationTest/validateUser';
import {authenticateJWT} from '../../middlewares/authMiddleware';

const userInterestService = new UserInterestService();
const router = Router();

// 관심 친구 상태 조회
router.get('/', authenticateJWT, async (req: Request, res: Response) => {
  try {
    const userId = (req.user as any).id;
    const userExists = await validatedUser(userId);

    // 유저 유효성 검사
    if (!userExists) {
      console.log('User not found:', userId);
      return res.status(400).json({
        isSuccess: false,
        code: NOT_FOUND_USER.code,
        message: NOT_FOUND_USER.message,
      });
    }

    const interestFriends = await userInterestService.getInterestFriendList(userId);

    // 관심친구가 없을 경우
    if (interestFriends.length === 0) {
      return res.status(200).json({
        isSuccess: true,
        code: HTTP_OK.code,
        message: 'No interest friends found',
        result: [],
      });
    }

    const response: BaseResponse<UserInterestResponse[]> = {
      isSuccess: true,
      code: HTTP_OK.code,
      message: HTTP_OK.message,
      result: interestFriends.map(interest => ({
        userId: interest.userId,
        friendId: interest.friendId,
        status: interest.status,
        createdAt: interest.createdAt,
        updatedAt: interest.updatedAt,
        deletedAt: interest.deletedAt,
        nickname: interest.receiver.nickname,
        profilePictureUrl: interest.receiver.profilePictureUrl,
      })),
    };

    res.status(200).json(response);
  } catch (error: any) {
    console.error('Get Interest Friend List Error:', error);
    const response: BaseResponse<null> = {
      isSuccess: false,
      code: HTTP_INTERNAL_SERVER_ERROR.code,
      message: HTTP_INTERNAL_SERVER_ERROR.message,
    };
    res.status(500).json(response);
  }
});

// 관심 친구 상태 변경
router.patch('/', authenticateJWT, async (req: Request, res: Response) => {
  try {
    const {friendId}: UserInterestRequest = req.body;
    const tokenUser = req.user as any;
    const userId = tokenUser.id;

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

    // 스스로에게 요청할 경우
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
