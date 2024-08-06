import {Request, Response, Router} from 'express';
import {FriendRequestService} from './friendRequestService';
import {FriendRequestRequest} from './dto/request';
import {FriendRequestResponse} from './dto/response';
import {BaseResponse} from '../../base/baseResponse';
import {HTTP_OK} from '../../variables/httpCode';

const friendRequestService = new FriendRequestService();
const router = Router();

router.post('/friend-requests', async (req: Request, res: Response) => {
  try {
    const {requesterId, receiverId}: FriendRequestRequest = req.body;
    const friendRequest = await friendRequestService.createFriendRequest({requesterId, receiverId});

    const response: BaseResponse<FriendRequestResponse> = {
      isSuccess: true,
      code: HTTP_OK.code,
      message: HTTP_OK.message,
      result: friendRequest,
    };

    res.status(HTTP_OK.code).json(response);
  } catch (error: any) {
    console.error('Create Friend Request Error:', error);
    const response: BaseResponse<null> = {
      isSuccess: false,
      code: 500,
      message: error.message,
    };
    res.status(500).json(response);
  }
});

export default router;
