import {Request, Response, Router} from 'express';
import {FriendRequestService} from './friendRequestService';
import {FriendRequestActionRequest} from './dto/request';
import {BaseResponse} from '../../base/baseResponse';
import {HTTP_OK, INTERNAL_SERVER_ERROR, INVALID_FRIEND_REQUEST} from '../../variables/httpCode';

const friendRequestService = new FriendRequestService();
const router = Router();

router.put('/action', async (req: Request, res: Response) => {
  try {
    const {userId, friendRequestId, action}: FriendRequestActionRequest = req.body;

    // friend request 유효성 검사
    const friendRequestExists = await friendRequestService.getFriendRequestById(friendRequestId);
    if (!friendRequestExists) {
      return res.status(400).json({
        isSuccess: false,
        code: INVALID_FRIEND_REQUEST.code,
        message: INVALID_FRIEND_REQUEST.message,
      });
    }

    const friendRequest = await friendRequestService.handleFriendRequestAction({userId, friendRequestId, action});

    const response: BaseResponse<FriendRequestActionResponse> = {
      isSuccess: true,
      code: HTTP_OK.code,
      message: HTTP_OK.message,
      result: {
        userId: friendRequest.userId,
        friendId: friendRequest.friendId,
        status: action === 'accept' ? 'accepted' : 'rejected',
        createdAt: friendRequest.createdAt,
        updatedAt: friendRequest.updatedAt,
      },
    };

    res.status(200).json(response);
  } catch (error: any) {
    console.error('Friend Request Action Error:', error);
    const response: BaseResponse<null> = {
      isSuccess: false,
      code: INTERNAL_SERVER_ERROR.code,
      message: error.message,
    };
    res.status(500).json(response);
  }
});

export default router;
