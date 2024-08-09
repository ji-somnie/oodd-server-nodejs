import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import { initializeDatabase } from './data-source';


import userRouter from './domains/user/userController';
import postRouter from './domains/ootd/postController';
import ootdRouter from './domains/ootd/ootdController';
import chatRoomRouter from './domains/chatRoom/chatRoomController';
import { ChatRoomService } from './domains/chatRoom/chatRoomService';
import { ChatMessageService } from './domains/chatMessage/chatMessageService';
import { UserService } from './domains/user/userService';

// 서비스 인스턴스 생성
const chatRoomService = new ChatRoomService();
const chatMessageService = new ChatMessageService();
const userService = new UserService();

const app = express();
app.use(express.json());

// CORS 설정
app.use(
  cors({
    origin: ['https://oodd.today', 'https://dev.oodd.today', 'http://localhost:3000', process.env.CALLBACK_URL || ''],
    credentials: true,
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
    exposedHeaders: ['set-cookie'],
  }),
);

// 라우터 설정
app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/ootds', ootdRouter);
app.use('/chat-rooms', chatRoomRouter);

// HTTP 서버 생성
const httpServer = createServer(app);

// Socket.io 설정
const io = new Server(httpServer, {
  cors: {
    origin: true,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  },
});

// 서버 시작
const startServer = async () => {
  try {
    await initializeDatabase();
    console.log('Database has been initialized!');

    io.on('connect', socket => {
      console.log('connected!!!');

      // 채팅방 입장
      socket.on('enterChatRoom', async (roomId: number) => {
        try {
          if (!roomId) {
            throw new Error('Required fields are missing.');
          }

          const room = await chatRoomService.getChatRoomById(roomId);
          if (!room) throw new Error('Room not found.');

          socket.join(roomId.toString());
          console.log(`Entered room ${roomId}!`);

          const allMessages = await chatMessageService.getChatMessagesByChatRoom(room);
          socket.emit('AllMessages', allMessages);
        } catch (error) {
          console.error('채팅방 입장 중 에러 발생', error);
          socket.emit('enterChatRoomError', '채팅방 입장 중 에러 발생');
        }
      });

      // 메세지 처리
      socket.on('message', async (roomId: number, fromUserId: number, toUserId: number, message: string) => {
        try {
          if (!roomId || !fromUserId || !toUserId || !message) {
            throw new Error('Required fields are missing.');
          }

          socket.join(roomId.toString());
          console.log(`Entered in ${roomId}!`);

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

export { app, httpServer, io };
