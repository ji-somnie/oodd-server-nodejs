import {Router, Request, Response} from 'express';
import {
  ALREADY_LEAVED_ROOM,
  HTTP_OK,
  NO_PARAMETER,
  NOT_FOUND_CHAT_ROOM,
  NOT_FOUND_USER,
  NOT_MEMBER_IN_ROOM,
} from '../../variables/httpCode';
import {BaseResponse} from '../../base/baseResponse';
import {User} from '../../entities/userEntity';
import {authenticateJWT} from '../../middlewares/authMiddleware';
import {UserRelationshipService} from './userRelationshipSerice';

const userRelationshipRouter = Router();
const chatRoomService = new UserRelationshipService();

// 매칭 신청 리스트 조회
userRelationshipRouter.get('/', authenticateJWT, async (req: Request, res: Response): Promise<void> => {
  const user = req.user as User;
});

export default userRelationshipRouter;
