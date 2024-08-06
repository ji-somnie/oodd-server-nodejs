import {Repository} from 'typeorm';
import {myDataBase} from '../../data-source';
import {UserRelationship} from '../../entities/userRelationshipEntity';
import {FriendRequestRequest} from './dto/request';

export class FriendRequestService {
  private friendRepository: Repository<UserRelationship> = myDataBase.getRepository(UserRelationship);

  async createFriendRequest(requestDTO: FriendRequestRequest): Promise<UserRelationship> {
    const {requester, receiver} = requestDTO;
    const friendRequest = this.friendRepository.create({
      requester: requester,
      receiver: receiver,
      //requestStatus: 'friend',
      status: 'activated',
    });
    return this.friendRepository.save(friendRequest);
  }
}
