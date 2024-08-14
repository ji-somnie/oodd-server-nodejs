import {Router, Request, Response} from 'express';
import {User} from '../../entities/userEntity';
import {authenticateJWT} from '../../middlewares/authMiddleware';
import {UserRelationshipService} from './userRelationshipSerice';
import {BaseResponse} from '../../base/baseResponse';
import {UserRelationship} from '../../entities/userRelationshipEntity';
import {
  ALREADY_REQUESTED,
  CANNOT_REQUEST_MYSELF,
  HTTP_OK,
  NO_AUTHORIZATION,
  NO_BODY_DATA,
  NO_PARAMETER,
  NOT_FOUND_USER,
  NOT_FOUND_USER_RELATIONSHIP,
  NOT_PENDING_REQUEST,
} from '../../variables/httpCode';
import {PostUserRelationshipRequest} from './dto/userRelationshipRequest';
import {UserService} from '../user/userService';
import {ChatRoom} from '../../entities/chatRoomEntity';
import {ChatRoomService} from '../chatRoom/chatRoomService';

const userRelationshipRouter = Router();
const userRelationshipService = new UserRelationshipService();
const userService = new UserService();
const chatRoomService = new ChatRoomService();

// // 매칭 신청 리스트 조회
// userRelationshipRouter.get('/', async (req: Request, res: Response): Promise<void> => {
//   const user = req.user as User;

//   console.log(user);

//   const userRelationships = await userRelationshipService.getUserRelationshipsByUser(user);
//   console.log(userRelationships);

//   res.status(200).json(new BaseResponse<UserRelationship>(true, HTTP_OK.code, HTTP_OK.message, userRelationships));
//   return;
// });

// 매칭 신청
userRelationshipRouter.post('/', async (req: Request, res: Response): Promise<void> => {
  const user = req.user as User;
  const body: PostUserRelationshipRequest = req.body;

  if (!body.requesterId || !body.targetId || !body.message) {
    res.status(400).json(new BaseResponse(false, NO_BODY_DATA.code, NO_BODY_DATA.message));
    return;
  }

  if (user.id !== body.requesterId) {
    res.status(401).json(new BaseResponse(false, NO_AUTHORIZATION.code, NO_AUTHORIZATION.message));
    return;
  }

  const target = await userService.getUserByUserId(body.targetId);

  if (!target) {
    res.status(404).json(new BaseResponse(false, NOT_FOUND_USER.code, NOT_FOUND_USER.message));
    return;
  }

  if (user.id === target.id) {
    res.status(401).json(new BaseResponse(false, CANNOT_REQUEST_MYSELF.code, CANNOT_REQUEST_MYSELF.message));
    return;
  }

  if (await userRelationshipService.isAlreadyRequested(user, target)) {
    res.status(400).json(new BaseResponse(false, ALREADY_REQUESTED.code, ALREADY_REQUESTED.message));
    return;
  }

  const userRelationship = await userRelationshipService.createRelationship(user, target, body.message);

  res.status(201).json(new BaseResponse<UserRelationship>(true, HTTP_OK.code, HTTP_OK.message, userRelationship));
  return;
});

// // 매칭 신청 수락 및 취소
// userRelationshipRouter.patch('/:userRelationshipId', async (req: Request, res: Response): Promise<void> => {
//   const user = req.user as User;
//   const userRelationshipId = Number.parseInt(req.params.userRelationshipId);
//   const requestStatus: 'rejected' | 'accepted' = req.body.requestStatus;

//   if (requestStatus !== 'rejected' && requestStatus !== 'accepted') {
//     res.status(400).json(new BaseResponse(false, NO_PARAMETER.code, NO_PARAMETER.message));
//     return;
//   }

//   if (!userRelationshipId || !requestStatus) {
//     res.status(400).json(new BaseResponse(false, NO_PARAMETER.code, NO_PARAMETER.message));
//     return;
//   }

//   const userRelationship = await userRelationshipService.getUserRelationshipById(userRelationshipId);

//   console.log(userRelationship);

//   if (!userRelationship) {
//     res
//       .status(404)
//       .json(new BaseResponse(false, NOT_FOUND_USER_RELATIONSHIP.code, NOT_FOUND_USER_RELATIONSHIP.message));
//     return;
//   }

//   if (userRelationship.requestStatus !== 'pending') {
//     res.status(400).json(new BaseResponse(false, NOT_PENDING_REQUEST.code, NOT_PENDING_REQUEST.message));
//     return;
//   }

//   if (user.id !== userRelationship.target.id) {
//     res.status(401).json(new BaseResponse(false, NO_AUTHORIZATION.code, NO_AUTHORIZATION.message));
//     return;
//   }

//   await userRelationshipService.patchRequestStatus(userRelationship, requestStatus);

//   const chatRoom = await chatRoomService.getChatRoomByUserRelationship(userRelationship);

//   res.status(201).json(new BaseResponse<ChatRoom>(true, HTTP_OK.code, HTTP_OK.message, chatRoom));
//   return;
// });

export default userRelationshipRouter;
