import myDataBase from '../../data-source';
import {User} from '../../entities/userEntity';
import {Repository} from 'typeorm';
import {ChatMessage} from '../../entities/chatMessageEntity';
import {ChatRoom} from '../../entities/chatRoomEntity';
import dayjs from 'dayjs';

export class ChatMessageService {
  private chatMessageRepository: Repository<ChatMessage>;

  constructor() {
    this.chatMessageRepository = myDataBase.getRepository(ChatMessage);
  }

  async getChatMessagesByChatRoom(chatRoom: ChatRoom): Promise<ChatMessage[]> {
    return await this.chatMessageRepository.find({
      where: {chatRoom: chatRoom, status: 'activated'},
      relations: ['fromUser', 'toUser'],
      order: {createdAt: 'DESC'},
    });
  }

  async saveMessage(chatRoom: ChatRoom, fromUser: User, toUser: User, message: string): Promise<ChatMessage> {
    const newMessage = await this.chatMessageRepository.create();
    newMessage.chatRoom = chatRoom;
    newMessage.fromUser = fromUser;
    newMessage.toUser = toUser;
    newMessage.content = message;

    return this.chatMessageRepository.save(newMessage);
  }

  async updateIsReadChatMessage(chatRoom: ChatRoom, user: User): Promise<void> {
    await this.chatMessageRepository.update(
      {chatRoom: chatRoom, toUser: user, status: 'activated'},
      {toUserReadAt: dayjs().toDate()},
    );
  }

  async getLatestMessage(chatRoom: ChatRoom): Promise<ChatMessage | null> {
    return await this.chatMessageRepository.findOne({
      where: {chatRoom: chatRoom},
      order: {createdAt: 'DESC'},
    });
  }
}
