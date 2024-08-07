import {myDataBase} from '../../data-source';
import {User} from '../../entities/userEntity';
import {Repository} from 'typeorm';
import {ChatRoom} from '../../entities/chatRoomEntity';
import {ChatMessage} from '../../entities/chatMessageEntity';

export class ChatRoomService {
  private chatRoomRepository: Repository<ChatRoom>;

  constructor() {
    this.chatRoomRepository = myDataBase.getRepository(ChatRoom);
  }

  async getChatRoomsByToUser(user: User): Promise<ChatRoom[]> {
    return this.chatRoomRepository.find({
      where: {toUser: user, status: 'activated'},
      relations: ['fromUser', 'toUser'],
      order: {createdAt: 'DESC'},
    });
  }

  async getChatRoomsByFromUser(user: User): Promise<ChatRoom[]> {
    return this.chatRoomRepository.find({
      where: {fromUser: user, status: 'activated'},
      relations: ['fromUser', 'toUser'],
      order: {createdAt: 'DESC'},
    });
  }

  async getChatRoomsByUser(user: User): Promise<ChatRoom[]> {
    // 모든 활성 채팅방을 가져옵니다
    const chatRooms = await this.chatRoomRepository.find({
      where: [
        {toUser: user, status: 'activated'},
        {fromUser: user, status: 'activated'},
      ],
      relations: ['toUser', 'fromUser', 'chatMessages'],
      order: {
        createdAt: 'DESC',
      },
    });

    // 각 채팅방의 최신 메시지를 찾습니다
    return chatRooms.map(chatRoom => {
      const isCurrentUserToUser = chatRoom.toUser === user;
      const latestMessage = chatRoom.chatMessages.reduce((latest, message) => {
        return message.createdAt > latest.createdAt ? message : latest;
      }, chatRoom.chatMessages[0]);

      return {
        ...chatRoom,
        latestMessage,
        opponent: isCurrentUserToUser ? chatRoom.fromUser : chatRoom.toUser,
      };
    });
  }

  async createChatRoom(fromUser: User, toUser: User): Promise<ChatRoom> {
    const chatRoom = this.chatRoomRepository.create({fromUser, toUser});
    return this.chatRoomRepository.save(chatRoom);
  }

  async deleteChatRoom(chatRoom: ChatRoom): Promise<boolean> {
    chatRoom.status = 'deactivated';
    await this.chatRoomRepository.save(chatRoom);
    return true;
  }
}
