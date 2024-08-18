import express from 'express';

import userRouter from './domains/user/userController';
import postRouter from './domains/post/postController';
import ootdRouter from './domains/ootd/ootdController';
import authRouter from './domains/auth/authController';
import blockRouter from './domains/block/blockController';
import ootdLikeRouter from './domains/ootdLike/ootdLikeController';
import ootdCommentRouter from './domains/ootdComment/ootdCommentController';
import {createServer} from 'http';
import cors from 'cors';
import {Server} from 'socket.io';
import chatRoomRouter from './domains/chatRoom/chatRoomController';
import {ChatRoomService} from './domains/chatRoom/chatRoomService';
import {ChatMessageService} from './domains/chatMessage/chatMessageService';
import {UserService} from './domains/user/userService';
import {initializeDatabase} from './data-source';
import {authenticateJWT} from './middlewares/authMiddleware';
import cookieParser from 'cookie-parser';
import userInterestRouter from './domains/userInterest/userInterestController';

const chatRoomService = new ChatRoomService();
const chatMessageService = new ChatMessageService();
const userService = new UserService();

const app = express();
app.use(cookieParser());

app.use(express.json());

app.use('/auth', authRouter); //소셜 로그인 처리는 인증 없이 바로
app.use('/users', authenticateJWT, userRouter);
app.use('/user-interests', authenticateJWT, userInterestRouter);
app.use('/block', blockRouter); //테스트용
app.use('/posts', authenticateJWT, postRouter, ootdLikeRouter, ootdCommentRouter);

app.use(
  cors({
    origin: ['https://oodd.today', 'https://dev.oodd.today', 'http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true,
  }),
);

// JWT 인증이 필요한 라우트 (개별적으로 하나씩)
app.use('/ootd', authenticateJWT, ootdRouter);
app.use('/chat-rooms', authenticateJWT, chatRoomRouter);
// app.use('/user-relationships', authenticateJWT, userRelationshipRouter);
//app.use("/block", authenticateJWT, blockRouter);

const httpServer = createServer(app);
const io = new Server(httpServer);

export const startServer = async () => {
  try {
    await initializeDatabase();
    console.log('Database has been initialized!');

    io.on('connect', socket => {
      console.log('connected!!!');

      /* 채팅방 입장: 해당 채팅방의 모든 메세지 가져오기 */
      socket.on('enterChatRoom', async (roomId: number) => {
        try {
          if (!roomId) {
            throw new Error('Required fields are missing.');
          }

          // room 찾아오기
          const room = await chatRoomService.getChatRoomById(roomId);
          if (!room) throw new Error('Room not found.');

          // room 들어가기
          socket.join(roomId.toString());
          console.log(`Entered room ${roomId}!`);

          /* 해당 방의 모든 메세지 클라이언트로 전송 */
          const allMessages = await chatMessageService.getChatMessagesByChatRoom(room);
          socket.emit('AllMessages', allMessages);
        } catch (error) {
          console.error('채팅방 입장 중 에러 발생', error);
          socket.emit('enterChatRoomError', '채팅방 입장 중 에러 발생');
        }
      });

      /* 메세지 받고 주기 */
      socket.on('message', async (roomId: number, fromUserId: number, toUserId: number, message: string) => {
        try {
          if (!roomId || !fromUserId || !toUserId || !message) {
            throw new Error('Required fields are missing.');
          }

          socket.join(roomId.toString());
          console.log(`Entered in ${roomId}!`);

          // room 찾아오기
          const room = await chatRoomService.getChatRoomById(roomId);
          if (!room) throw new Error('Room not found.');

          const fromUser = await userService.getUserByUserId(fromUserId);
          const toUser = await userService.getUserByUserId(toUserId);

          if (!fromUser || !toUser) throw new Error('User not found.');

          await chatMessageService.saveMessage(room, fromUser, toUser, message);

          const latestMessage = await chatMessageService.getLatestMessage(room);
          io.to(roomId.toString()).emit('latestMessage', latestMessage);
        } catch (error) {
          console.error('메세지 처리 중 오류 발생', error);
          socket.emit('messageError', '메세지 처리 중 오류 발생');
        }
      });
    });
  } catch (error) {
    console.error('Error during DataBase initialization:', error);
  }
};

startServer();

export {app, httpServer, io};
