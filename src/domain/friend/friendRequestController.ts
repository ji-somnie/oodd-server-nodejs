import {Request, Response, Router} from 'express';
import {FriendRequestService} from './friendRequestService';
import {FriendRequestRequest} from './dto/request';
import {FriendRequestResponse} from './dto/response';
import {BaseResponse} from '../../base/baseResponse';
import {UserService} from '../user/userService';
import {HTTP_OK, INTERNAL_SERVER_ERROR, INVALID_USER} from '../../variables/httpCode';

const friendRequestService = new FriendRequestService();
const userService = new UserService();
const router = Router();

router.post('/friend-requests', async (req: Request, res: Response) => {
  try {
    const {requester, receiver, message}: FriendRequestRequest = req.body;

    // 유효성 검사
    const requesterExists = await userService.getUserByID(requester.id);
    const receiverExists = await userService.getUserByID(receiver.id);

    if (!requesterExists || !receiverExists) {
      //throw new Error('Invalid user IDs');
      console.error('Invalid User');
      res.status(400).json({
        isSuccess: false,
        code: INVALID_USER.code,
        message: INVALID_USER.message,
      });
    }

    const friendRequest = await friendRequestService.createFriendRequest({
      requesterExists,
      receiverExists,
      message,
      //requestStatus,
    });

    const response: BaseResponse<FriendRequestResponse> = {
      isSuccess: true,
      code: HTTP_OK.code,
      message: HTTP_OK.message,
      result: {
        id: friendRequest.id,
        requesterId: friendRequest.requesterId,
        targetId: friendRequest.targetId,
        isRejected: friendRequest.isRejected,
        isAccepted: friendRequest.isAccepted,
        requestedAt: friendRequest.requestedAt,
        acceptedAt: friendRequest.acceptedAt,
        createdAt: friendRequest.createdAt,
        status: friendRequest.status,
        updatedAt: friendRequest.updatedAt,
        deletedAt: friendRequest.deletedAt,
      },
    };

    res.status(200).json(response);
  } catch (error: any) {
    console.error('Create Friend Request Error:', error);
    res.status(500).json({
      isSuccess: false,
      code: INTERNAL_SERVER_ERROR.code,
      message: INTERNAL_SERVER_ERROR.message,
    });
  }
});

export default router;
