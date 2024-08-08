import {Router, Request, Response} from 'express';
import {HTTP_OK, NOT_FOUND_USER} from '../../variables/httpCode';
import {ChatRoomService} from './chatRoomService';
import {UserService} from '../user/userService';
import {BaseResponse} from '../../base/baseResponse';
import {User} from '../../entities/userEntity';

const chatRoomRouter = Router();
const chatRoomService = new ChatRoomService();
const userService = new UserService();

// 채팅방 조회
chatRoomRouter.get('/', async (req: Request, res: Response): Promise<void> => {
  const user: User | null = await userService.getUserByUserId(2);

  if (!user) {
    res.status(404).json(new BaseResponse(false, NOT_FOUND_USER.code, NOT_FOUND_USER.message));
    return;
  } else {
    const response = await chatRoomService.getChatRoomsByUser(user);
    res.status(200).json(new BaseResponse(true, HTTP_OK.code, HTTP_OK.message, response));
  }
});

export default chatRoomRouter;
