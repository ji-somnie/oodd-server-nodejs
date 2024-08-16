import myDataBase from '../../data-source';
import {Repository, getRepository} from 'typeorm';
import {UserRelationship} from '../../entities/userRelationshipEntity';
import {User} from '../../entities/userEntity';
import dayjs from 'dayjs';
import {ChatRoomService} from '../chatRoom/chatRoomService';
import {ChatMessageService} from '../chatMessage/chatMessageService';
import {PostService} from '../post/postService';

export class UserRelationshipService {
  private userRelationshipRepository: Repository<UserRelationship>;

  private chatRoomService = new ChatRoomService();
  private chatMessageService = new ChatMessageService();
  private postService = new PostService();

  constructor() {
    this.userRelationshipRepository = myDataBase.getRepository(UserRelationship);
  }

  async getUserRelationshipsByUser(toUser: User): Promise<UserRelationship[]> {
    const userRelationships = await this.userRelationshipRepository.find({
      where: {target: toUser, requestStatus: 'pending', status: 'activated'},
      relations: ['target', 'requester'],
    });

    // 각 UserRelationship의 requester에 대해 대표 게시물 추가
    for (const relationship of userRelationships) {
      const requester = relationship.requester;

      // 대표 게시물 조회
      const representativePost = await this.postService.getRepresentativePost(requester);

      // 대표 게시물이 없으면 최신 게시물 조회
      if (!representativePost) {
        const latestPost = await this.postService.getLastestPost(requester);
        requester['representativePost'] = latestPost;
      } else {
        requester['representativePost'] = representativePost;
      }
    }

    return userRelationships;
  }

  async getUserRelationshipById(userRelationshipId: number): Promise<UserRelationship | null> {
    return this.userRelationshipRepository.findOne({
      where: {id: userRelationshipId, status: 'activated'},
      relations: ['target', 'requester'],
    });
  }

  async patchRequestStatus(userRelationship: UserRelationship, requestStatus: 'rejected' | 'accepted'): Promise<void> {
    const queryRunner = myDataBase.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      if (requestStatus === 'rejected') {
        userRelationship.requestStatus = 'rejected';
        userRelationship.status = 'deactivated';
        userRelationship.rejectedAt = dayjs().toDate();

        await this.chatRoomService.deleteChatRoomByUserRelationshipRejected(userRelationship);
      } else {
        userRelationship.requestStatus = 'accepted';
        userRelationship.acceptedAt = dayjs().toDate();
      }
      userRelationship.updatedAt = dayjs().toDate();

      await queryRunner.manager.save(userRelationship);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new Error('queryRunner Error');
    } finally {
      await queryRunner.release();
    }
  }

  async createRelationship(requester: User, target: User, message: string): Promise<UserRelationship> {
    const queryRunner = myDataBase.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const userRelationship = this.userRelationshipRepository.create();
      userRelationship.requester = requester;
      userRelationship.target = target;
      userRelationship.message = message;
      userRelationship.requestStatus = 'pending';
      userRelationship.createdAt = dayjs().toDate();
      userRelationship.updatedAt = dayjs().toDate();
      userRelationship.status = 'activated';

      await queryRunner.manager.save(userRelationship);

      const chatRoom = await this.chatRoomService.createChatRoom(requester, target);

      await this.chatMessageService.saveMessage(chatRoom, requester, target, message);

      await queryRunner.commitTransaction();

      return userRelationship;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new Error('queryRunner Error'); // 오류 재발생
    } finally {
      await queryRunner.release();
    }
  }

  async isAlreadyRequested(requester: User, target: User): Promise<boolean> {
    const userRelationship = await this.userRelationshipRepository.findOne({
      where: [
        {requester: requester, target: target, status: 'activated'},
        {requester: target, target: requester, status: 'activated'},
      ],
    });

    return !!userRelationship;
  }
}
