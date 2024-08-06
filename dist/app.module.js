"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("./domains/user/userController"));
const http_1 = require("http");
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ['https://oodd.today', 'https://dev.oodd.today', 'http://localhost:3000', process.env.CALLBACK_URL || ''],
    credentials: true,
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
    exposedHeaders: ['set-cookie'],
}));
app.use('/users', userController_1.default);
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: true,
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    },
});
// /* socket.io 연결 */
// io.on('connect', socket => {
//   console.log('connected!!!');
//   /* 채팅방 입장: 해당 채팅방의 모든 메세지 가져오기 */
//   socket.on('enterChatRoom', async (member_email: string) => {
//     try {
//       console.log(member_email);
//       if (!member_email) {
//         throw new Error('Required fields are missing.');
//       }
//       // roomId 찾아오기
//       const roomId = await getRoomId(member_email);
//       console.log('foundRoomId:', roomId);
//       if (!roomId) {
//         console.log('Room not found. Returning empty array.');
//         socket.emit('AllMessages', null);
//         return;
//       }
//       socket.join(roomId);
//       console.log(`Entered room ${roomId}!`);
//       /* 해당 방의 모든 메세지 클라이언트로 전송 */
//       const allMessages = await getAllMessages(roomId);
//       socket.emit('AllMessages', allMessages);
//     } catch (error) {
//       console.error('채팅방 입장 중 에러 발생', error);
//       socket.emit('enterChatRoomError', '채팅방 입장 중 에러 발생');
//     }
//   });
//   /* 채팅방 생성하기 */
//   socket.on('createChatRoom', async (member_email: string) => {
//     try {
//       const newRoomId = await createChatRoom(member_email);
//       const roomId = newRoomId;
//       socket.join(roomId);
//       console.log(`Entered in ${roomId}!`);
//     } catch (error) {
//       console.error('채팅방 생성 중 에러 발생', error);
//       socket.emit('createChatRoomError', '채팅방 생성 중 에러 발생');
//     }
//   });
//   /* 메세지 받고 주기 */
//   socket.on('message', async (member_email: string, sender_email: string, message: string) => {
//     try {
//       if (!member_email || !sender_email || !message) {
//         throw new Error('Required fields are missing.');
//       }
//       let roomId;
//       if (sender_email === member_email) {
//         roomId = await getRoomId(member_email);
//       } else {
//         const membersMessages = await getMembersMessages(member_email);
//         roomId = (membersMessages as RowDataPacket)[0].room_id;
//       }
//       socket.join(roomId);
//       console.log(`Entered in ${roomId}!`);
//       await saveMessages(roomId, sender_email, message);
//       const latestMessage = await getLatestMessage(roomId);
//       io.to(roomId).emit('latestMessage', latestMessage);
//     } catch (error) {
//       console.error('메세지 처리 중 오류 발생', error);
//       socket.emit('messageError', '메세지 처리 중 오류 발생');
//     }
//   });
// });
exports.default = app;
