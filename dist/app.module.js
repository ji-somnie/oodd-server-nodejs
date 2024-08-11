"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = exports.httpServer = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
const data_source_1 = require("./data-source");
const userController_1 = __importDefault(require("./domains/user/userController"));
const postController_1 = __importDefault(require("./domains/ootd/postController"));
const chatRoomController_1 = __importDefault(require("./domains/chatRoom/chatRoomController"));
const chatRoomService_1 = require("./domains/chatRoom/chatRoomService");
const chatMessageService_1 = require("./domains/chatMessage/chatMessageService");
const userService_1 = require("./domains/user/userService");
// 서비스 인스턴스 생성
const chatRoomService = new chatRoomService_1.ChatRoomService();
const chatMessageService = new chatMessageService_1.ChatMessageService();
const userService = new userService_1.UserService();
const app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.json());
// CORS 설정
app.use((0, cors_1.default)({
    origin: ['https://oodd.today', 'https://dev.oodd.today', 'http://localhost:3000', process.env.CALLBACK_URL || ''],
    credentials: true,
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
    exposedHeaders: ['set-cookie'],
}));
// 라우터 설정
app.use('/users', userController_1.default);
app.use('/posts', postController_1.default);
// app.use('/ootds', ootdRouter);
app.use('/chat-rooms', chatRoomController_1.default);
// HTTP 서버 생성
const httpServer = (0, http_1.createServer)(app);
exports.httpServer = httpServer;
// Socket.io 설정
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: true,
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    },
});
exports.io = io;
// 서버 시작
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, data_source_1.initializeDatabase)();
        console.log('Database has been initialized!');
        io.on('connect', socket => {
            console.log('connected!!!');
            // 채팅방 입장
            socket.on('enterChatRoom', (roomId) => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    if (!roomId) {
                        throw new Error('Required fields are missing.');
                    }
                    const room = yield chatRoomService.getChatRoomById(roomId);
                    if (!room)
                        throw new Error('Room not found.');
                    socket.join(roomId.toString());
                    console.log(`Entered room ${roomId}!`);
                    const allMessages = yield chatMessageService.getChatMessagesByChatRoom(room);
                    socket.emit('AllMessages', allMessages);
                }
                catch (error) {
                    console.error('채팅방 입장 중 에러 발생', error);
                    socket.emit('enterChatRoomError', '채팅방 입장 중 에러 발생');
                }
            }));
            // 메세지 처리
            socket.on('message', (roomId, fromUserId, toUserId, message) => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    if (!roomId || !fromUserId || !toUserId || !message) {
                        throw new Error('Required fields are missing.');
                    }
                    socket.join(roomId.toString());
                    console.log(`Entered in ${roomId}!`);
                    const room = yield chatRoomService.getChatRoomById(roomId);
                    if (!room)
                        throw new Error('Room not found.');
                    const fromUser = yield userService.getUserByUserId(fromUserId);
                    const toUser = yield userService.getUserByUserId(toUserId);
                    if (!fromUser || !toUser)
                        throw new Error('User not found.');
                    yield chatMessageService.saveMessage(room, fromUser, toUser, message);
                    const latestMessage = yield chatMessageService.getLatestMessage(room);
                    io.to(roomId.toString()).emit('latestMessage', latestMessage);
                }
                catch (error) {
                    console.error('메세지 처리 중 오류 발생', error);
                    socket.emit('messageError', '메세지 처리 중 오류 발생');
                }
            }));
        });
    }
    catch (error) {
        console.error('Error during DataBase initialization:', error);
    }
});
startServer();
