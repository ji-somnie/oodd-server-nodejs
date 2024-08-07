import {Repository} from 'typeorm';
import {FriendRequestActionRequest} from './dto/request';
import {myDataBase} from '../../data-source';
import {UserRelationship} from '../../entities/userRelationshipEntity';
import dayjs from 'dayjs';

export class FriendRequestService {
  private friendRequestRepository: Repository<UserRelationship> = myDataBase.getRepository(UserRelationship);

  async getFriendRequestById(friendRequestId: number): Promise<UserRelationship | null> {
    return this.friendRequestRepository.findOne({where: {id: friendRequestId}});
  }

  async handleFriendRequestAction(request: FriendRequestActionRequest): Promise<UserRelationship> {
    const {friendRequestId, action} = request;
    const friendRequest = await this.friendRequestRepository.findOne({where: {id: friendRequestId}});

    if (!friendRequest) {
      throw new Error('Friend request not found');
    }

    if (action === 'accept') {
      friendRequest.isAccepted = true;
    } else {
      friendRequest.isRejected = true;
    }

    friendRequest.updatedAt = new dayjs.Dayjs();

    return this.friendRequestRepository.save(friendRequest);
  }
}
