import {Repository} from 'typeorm';
import {myDataBase} from '../../data-source';
import {UserRelationship} from '../../entities/userRelationshipEntity';
import {FriendRequestRequest} from './dto/request';
import dayjs from 'dayjs';

export class FriendRequestService {
  private friendRepository: Repository<UserRelationship> = myDataBase.getRepository(UserRelationship);

  async createFriendRequest(requestDTO: FriendRequestRequest): Promise<UserRelationship> {
    const {requester, receiver, message} = requestDTO;
    const friendRequest = this.friendRepository.create({
      requester: {id: requester.id},
      receiver: {id: receiver.id},
      message,
      isRejected: false,
      isAccepted: false,
      requestedAt: new dayjs.Dayjs(),
      //requestStatus: 'friend',
      status: 'activated',
    });
    return this.friendRepository.save(friendRequest);
  }
}
