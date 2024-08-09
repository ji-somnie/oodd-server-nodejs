import express from 'express';
<<<<<<< HEAD
import userRoutes from './domain/user/userRoutes';
import reportRoutes from './domain/report/reportRoutes';
=======
import userRouter from './domains/user/userController';
import postRouter from './domains/ootd/postController';
import ootdRouter from './domains/ootd/ootdController';
import {createServer} from 'http';
import cors from 'cors';
import {Server} from 'socket.io';
import chatRoomRouter from './domains/chatRoom/chatRoomController';
import {ChatRoomService} from './domains/chatRoom/chatRoomService';
import {ChatMessageService} from './domains/chatMessage/chatMessageService';
import {UserService} from './domains/user/userService';
import {initializeDatabase} from './data-source';

const chatRoomService = new ChatRoomService();
const chatMessageService = new ChatMessageService();
const userService = new UserService();
>>>>>>> d68dec8cb7c57e3b78123b4acd1a29bf1277797a

const app = express();
app.use(express.json());
<<<<<<< HEAD

app.use('/users', userRoutes);
app.use('/reports', reportRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
=======
app.use(
  cors({
    origin: ['https://oodd.today', 'https://dev.oodd.today', 'http://localhost:3000', process.env.CALLBACK_URL || ''],
    credentials: true,
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
    exposedHeaders: ['set-cookie'],
  }),
);
>>>>>>> d68dec8cb7c57e3b78123b4acd1a29bf1277797a

app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/ootds', ootdRouter);
app.use('/chat-rooms', chatRoomRouter);
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: true,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  },
});

const startServer = async () => {
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
