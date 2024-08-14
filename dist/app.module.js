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
exports.io = exports.httpServer = exports.app = exports.startServer = void 0;
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("./domains/user/userController"));
const postController_1 = __importDefault(require("./domains/post/postController"));
const ootdController_1 = __importDefault(require("./domains/ootd/ootdController"));
const authController_1 = __importDefault(require("./domains/auth/authController"));
const blockController_1 = __importDefault(require("./domains/block/blockController"));
const ootdLikeController_1 = __importDefault(require("./domains/ootdLike/ootdLikeController"));
const ootdCommentController_1 = __importDefault(require("./domains/ootdComment/ootdCommentController"));
const http_1 = require("http");
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
const chatRoomController_1 = __importDefault(require("./domains/chatRoom/chatRoomController"));
const chatRoomService_1 = require("./domains/chatRoom/chatRoomService");
const chatMessageService_1 = require("./domains/chatMessage/chatMessageService");
const userService_1 = require("./domains/user/userService");
const data_source_1 = require("./data-source");
const authMiddleware_1 = require("./middlewares/authMiddleware");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const userRelationshipController_1 = __importDefault(require("./domains/userRelationship/userRelationshipController"));
const userInterestController_1 = __importDefault(require("./domains/userInterest/userInterestController"));
const chatRoomService = new chatRoomService_1.ChatRoomService();
const chatMessageService = new chatMessageService_1.ChatMessageService();
const userService = new userService_1.UserService();
const app = (0, express_1.default)();
exports.app = app;
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use('/auth', authController_1.default); //소셜 로그인 처리는 인증 없이 바로
app.use('/users', userController_1.default, userInterestController_1.default);
app.use('/block', blockController_1.default); //테스트용
app.use('/posts', ootdLikeController_1.default, ootdCommentController_1.default, postController_1.default);
app.use((0, cors_1.default)({
    origin: ['https://oodd.today', 'https://dev.oodd.today', 'http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true,
}));
// JWT 인증이 필요한 라우트 (개별적으로 하나씩)
app.use('/ootd', authMiddleware_1.authenticateJWT, ootdController_1.default);
app.use('/chat-rooms', authMiddleware_1.authenticateJWT, chatRoomController_1.default);
app.use('/user-relationships', authMiddleware_1.authenticateJWT, userRelationshipController_1.default);
//app.use("/block", authenticateJWT, blockRouter);
const httpServer = (0, http_1.createServer)(app);
exports.httpServer = httpServer;
const io = new socket_io_1.Server(httpServer);
exports.io = io;
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, data_source_1.initializeDatabase)();
        console.log('Database has been initialized!');
        io.on('connect', socket => {
            console.log('connected!!!');
            /* 채팅방 입장: 해당 채팅방의 모든 메세지 가져오기 */
            socket.on('enterChatRoom', (roomId) => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    if (!roomId) {
                        throw new Error('Required fields are missing.');
                    }
                    // room 찾아오기
                    const room = yield chatRoomService.getChatRoomById(roomId);
                    if (!room)
                        throw new Error('Room not found.');
                    // room 들어가기
                    socket.join(roomId.toString());
                    console.log(`Entered room ${roomId}!`);
                    /* 해당 방의 모든 메세지 클라이언트로 전송 */
                    const allMessages = yield chatMessageService.getChatMessagesByChatRoom(room);
                    socket.emit('AllMessages', allMessages);
                }
                catch (error) {
                    console.error('채팅방 입장 중 에러 발생', error);
                    socket.emit('enterChatRoomError', '채팅방 입장 중 에러 발생');
                }
            }));
            /* 메세지 받고 주기 */
            socket.on('message', (roomId, fromUserId, toUserId, message) => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    if (!roomId || !fromUserId || !toUserId || !message) {
                        throw new Error('Required fields are missing.');
                    }
                    socket.join(roomId.toString());
                    console.log(`Entered in ${roomId}!`);
                    // room 찾아오기
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
exports.startServer = startServer;
