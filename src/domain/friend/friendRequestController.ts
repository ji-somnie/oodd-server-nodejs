import {Request, Response, Router} from 'express';
import {FriendRequestService} from './friendRequestService';
import {FriendRequestDTO} from './dto/request';
import {BaseResponse} from '../../base/baseResponse';
import {HTTP_OK} from '../../variables/httpCode';
import {FriendRequestResponseDTO} from './dto/response';

const friendRequestService = new FriendRequestService();
const router = Router();

router.post('/friend-requests', async (req: Request, res: Response) => {
  try {
    const {requesterId, receiverId}: FriendRequestDTO = req.body;
    const friendRequest = await friendRequestService.createFriendRequest({requesterId, receiverId});

    const response: BaseResponse<FriendRequestResponseDTO> = {
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
