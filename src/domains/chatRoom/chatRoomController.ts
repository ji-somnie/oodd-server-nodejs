import {Router, Request, Response} from 'express';
import {
  ALREADY_LEAVED_ROOM,
  HTTP_OK,
  NO_PARAMETER,
  NOT_FOUND_CHAT_ROOM,
  NOT_FOUND_USER,
  NOT_MEMBER_IN_ROOM,
} from '../../variables/httpCode';
import {ChatRoomService} from './chatRoomService';
import {UserService} from '../user/userService';
import {BaseResponse} from '../../base/baseResponse';
import {User} from '../../entities/userEntity';
import {ChatMessageService} from '../chatMessage/chatMessageService';

const chatRoomRouter = Router();
const chatRoomService = new ChatRoomService();
const chatMessageService = new ChatMessageService();
const userService = new UserService();

// 채팅방 조회
chatRoomRouter.get('/:userId', async (req: Request, res: Response): Promise<void> => {
  // 임시 유저 아이디 받기
  const userId = Number.parseInt(req.params.userId);
  // 유저 조회
  const user: User | null = await userService.getUserByUserId(userId);

  if (!user) {
    res.status(404).json(new BaseResponse(false, NOT_FOUND_USER.code, NOT_FOUND_USER.message));
    return;
  } else {
    const response = await chatRoomService.getChatRoomsByUser(user);
    res.status(200).json(new BaseResponse(true, HTTP_OK.code, HTTP_OK.message, response));
  }
});

// 채팅방 읽음 처리
chatRoomRouter.patch('/:chatRoomId/read/:userId', async (req: Request, res: Response): Promise<void> => {
  // 채팅 방 아이디 확인
  const chatRoomId = Number.parseInt(req.params.chatRoomId);
  if (!chatRoomId) {
    res.status(400).json(new BaseResponse(false, NO_PARAMETER.code, NO_PARAMETER.message));
    return;
  }

  // 임시 유저 아이디 받기
  const userId = Number.parseInt(req.params.userId);

  // 유저 확인 후 채팅방에 있는 지 체크 필요 (코드 작성 전)
  const user: User | null = await userService.getUserByUserId(userId);
  if (!user) {
    res.status(404).json(new BaseResponse(false, NOT_FOUND_USER.code, NOT_FOUND_USER.message));
    return;
  }

  // 채팅방 확인
  const chatRoom = await chatRoomService.getChatRoomById(chatRoomId);
  if (!chatRoom) {
    res.status(404).json(new BaseResponse(false, NOT_FOUND_CHAT_ROOM.code, NOT_FOUND_CHAT_ROOM.message));
    return;
  }

  // 채팅방에 해당 유저가 있는지 확인
  if (chatRoom?.toUser.id !== user.id && chatRoom?.fromUser.id !== user.id) {
    res.status(400).json(new BaseResponse(false, NOT_MEMBER_IN_ROOM.code, NOT_MEMBER_IN_ROOM.message));
    return;
  }

  // 채팅방 읽음 처리
  await chatMessageService.updateIsReadChatMessage(chatRoom, user);

  res.status(201).json(new BaseResponse(true, HTTP_OK.code, HTTP_OK.message));
  return;
});

// 채팅방 나가기
chatRoomRouter.patch('/:chatRoomId/leave/:userId', async (req: Request, res: Response): Promise<void> => {
  // 채팅 방 아이디 확인
  const chatRoomId = Number.parseInt(req.params.chatRoomId);
  if (!chatRoomId) {
    res.status(400).json(new BaseResponse(false, NO_PARAMETER.code, NO_PARAMETER.message));
    return;
  }

  // 채팅방 확인
  const chatRoom = await chatRoomService.getChatRoomById(chatRoomId);
  if (!chatRoom) {
    res.status(404).json(new BaseResponse(false, NOT_FOUND_CHAT_ROOM.code, NOT_FOUND_CHAT_ROOM.message));
    return;
  }

  // 임시 유저 아이디 받기
  const userId = Number.parseInt(req.params.userId);

  // 유저 확인 후 채팅방에 있는 지 체크 필요 (코드 작성 전)
  const user: User | null = await userService.getUserByUserId(userId);
  if (!user) {
    res.status(404).json(new BaseResponse(false, NOT_FOUND_USER.code, NOT_FOUND_USER.message));
    return;
  }

  // 채팅방에 해당 유저가 있는지 확인
  if (chatRoom?.toUser.id !== user.id && chatRoom?.fromUser.id !== user.id) {
    res.status(400).json(new BaseResponse(false, NOT_MEMBER_IN_ROOM.code, NOT_MEMBER_IN_ROOM.message));
    return;
  }

  if (
    (chatRoom.fromUserLeavedAt && chatRoom.fromUser.id === user.id) ||
    (chatRoom.toUserLeavedAt && chatRoom.toUser.id === user.id)
  ) {
    res.status(400).json(new BaseResponse(false, ALREADY_LEAVED_ROOM.code, ALREADY_LEAVED_ROOM.message));
    return;
  }

  await chatRoomService.deleteChatRoom(chatRoom, user);

  res.status(201).json(new BaseResponse(true, HTTP_OK.code, HTTP_OK.message));
});
export default chatRoomRouter;
