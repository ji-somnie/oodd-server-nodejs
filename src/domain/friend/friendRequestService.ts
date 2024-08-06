import {Repository} from 'typeorm';
import {myDataBase} from '../../data-source';
import {UserRelationship} from '../../entities/userRelationshipEntity';
import {FriendRequestRequest} from './dto/request';

export class FriendRequestService {
  private friendRepository: Repository<UserRelationship> = myDataBase.getRepository(UserRelationship);

  async createFriendRequest(requestDTO: FriendRequestRequest): Promise<UserRelationship> {
    const {requesterId, targetId} = requestDTO;
    const friendRequest = this.friendRepository.create({
      requesterId,
      targetId,
      requestStatus: 'friend',
      status: 'activated',
    });
    return this.friendRepository.save(friendRequest);
  }
}
