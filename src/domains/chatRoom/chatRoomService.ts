import myDataBase from '../../data-source';
import {User} from '../../entities/userEntity';
import {Brackets, FindOptionsWhere, Repository} from 'typeorm';
import {ChatRoom} from '../../entities/chatRoomEntity';
import dayjs from 'dayjs';
import {ChatMessage} from '../../entities/chatMessageEntity';
import {ChatRoomsDto, ChatRoomsQueryDto} from './dto/dto';
import {UserRelationship} from '../../entities/userRelationshipEntity';

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

  async getChatRoomsByUser(user: User): Promise<ChatRoomsDto[]> {
    // 모든 활성 채팅방을 가져옵니다
    const userId = user.id;

    const chatRooms = await this.chatRoomRepository
      .createQueryBuilder('chatRoom')
      .select([
        'chatRoom.id',
        'chatRoom.createdAt',
        'toUser.id',
        'toUser.nickname',
        'toUser.profilePictureUrl',
        'toUser.name',
        'fromUser.id',
        'fromUser.nickname',
        'fromUser.profilePictureUrl',
        'fromUser.name',
        'latestMessage.id AS latestMessageId',
        'latestMessage.createdAt AS latestMessageCreatedAt',
        'latestMessage.content AS latestMessageContent',
        'latestMessage.toUserReadAt AS latestMessageToUserReadAt',
      ])
      .leftJoin('chatRoom.toUser', 'toUser') // toUser 관계 로드
      .leftJoin('chatRoom.fromUser', 'fromUser') // fromUser 관계 로드
      .leftJoin(
        subQuery => {
          return subQuery
            .select('chatMessage.chatRoomId')
            .addSelect('MAX(chatMessage.createdAt)', 'latestMessageCreatedAt')
            .from(ChatMessage, 'chatMessage')
            .groupBy('chatMessage.chatRoomId');
        },
        'latestMessages',
        'latestMessages.chatRoomId = chatRoom.id',
      )
      .leftJoin(
        ChatMessage,
        'latestMessage',
        'latestMessage.chatRoomId = chatRoom.id AND latestMessage.createdAt = latestMessages.latestMessageCreatedAt',
      )
      .where('chatRoom.status = :status', {status: 'activated'})
      .andWhere(
        new Brackets(qb => {
          qb.where('chatRoom.fromUserId = :userId', {userId})
            .andWhere('chatRoom.fromUserLeavedAt IS NULL')
            .orWhere('chatRoom.toUserId = :userId', {userId})
            .andWhere('chatRoom.toUserLeavedAt IS NULL');
        }),
      )
      .orderBy('chatRoom.createdAt', 'DESC')
      .getRawAndEntities(); // Raw 결과와 엔티티 결과를 동시에 가져옵니다.

    const rawData = chatRooms.raw;
    console.log(rawData);
    // 각 채팅방의 최신 메시지를 찾습니다
    return rawData.map((chatRoom: ChatRoomsQueryDto) => {
      const isCurrentUserToUser = chatRoom.toUser_id === user.id;

      return {
        id: chatRoom.chatRoom_id,
        createdAt: chatRoom.chatRoom_createdAt,
        opponent: {
          id: isCurrentUserToUser ? chatRoom.fromUser_id : chatRoom.toUser_id,
          nickname: isCurrentUserToUser ? chatRoom.fromUser_nickname : chatRoom.toUser_nickname,
          profilePictureUrl: isCurrentUserToUser
            ? chatRoom.fromUser_profilePictureUrl
            : chatRoom.toUser_profilePictureUrl,
          name: isCurrentUserToUser ? chatRoom.fromUser_name : chatRoom.toUser_name,
        },
        latestMessage: {
          id: chatRoom.latestMessageId ?? null,
          createdAt: chatRoom.latestMessageCreatedAt ?? null,
          content: chatRoom.latestMessageContent ?? null,
          toUserReadAt: chatRoom.latestMessageToUserReadAt ?? null,
        },
      };
    });
  }

  async getChatRoomById(id: number): Promise<ChatRoom | null> {
    return this.chatRoomRepository.findOne({
      where: {id: id, status: 'activated'},
      relations: ['fromUser', 'toUser'],
    });
  }

  async getChatRoomByUserRelationship(userRelationship: UserRelationship): Promise<ChatRoom | null> {
    return this.chatRoomRepository.findOne({
      where: [{fromUser: userRelationship.requester, toUser: userRelationship.target, status: 'activated'}],
      relations: ['fromUser', 'toUser'],
    });
  }

  async createChatRoom(fromUser: User, toUser: User): Promise<ChatRoom> {
    const chatRoom = this.chatRoomRepository.create({
      fromUser,
      toUser,
      status: 'activated',
      createdAt: dayjs().toDate(),
      updatedAt: dayjs().toDate(),
    });
    return this.chatRoomRepository.save(chatRoom);
  }

  async deleteChatRoom(chatRoom: ChatRoom, user: User): Promise<boolean> {
    if (chatRoom.fromUser.id === user.id) chatRoom.fromUserLeavedAt = dayjs().toDate();
    else if (chatRoom.toUser.id === user.id) chatRoom.toUserLeavedAt = dayjs().toDate();

    if (chatRoom.fromUserLeavedAt && chatRoom.toUserLeavedAt) {
      chatRoom.status = 'deactivated';
      chatRoom.deletedAt = dayjs().toDate();
    }

    await this.chatRoomRepository.save(chatRoom);
    return true;
  }

  async deleteChatRoomByUserRelationshipRejected(userRelationship: UserRelationship): Promise<void> {
    const chatRoom = await this.getChatRoomByUserRelationship(userRelationship);

    if (!chatRoom) return;

    chatRoom.status = 'deactivated';
    chatRoom.deletedAt = dayjs().toDate();

    await this.chatRoomRepository.save(chatRoom);
  }
}
