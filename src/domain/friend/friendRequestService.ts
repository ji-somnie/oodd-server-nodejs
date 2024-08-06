import {Repository} from 'typeorm';
import {myDataBase} from '../../data-source';
import {FriendRequest} from '../../entities/friendRequestEntity';
import {FriendRequest} from './dto/request';
import {FriendRequestResponse} from './dto/response';
import dayjs from 'dayjs';

export class FriendRequestService {
  private friendRequestRepository: Repository<FriendRequest> = myDataBase.getRepository(Friend);

  constructor() {
    this.friendRequestRepository = friendRequestRepository;
  }

  async createFriendRequest(requestDTO: FriendRequest): Promise<FriendRequestResponse> {
    const {requesterId, receiverId} = requestDTO;
    const newFriendRequest = this.friendRequestRepository.create({requesterId, receiverId});
    await this.friendRequestRepository.save(newFriendRequest);

    return {
      id: newFriendRequest.id,
      requesterId: newFriendRequest.requesterId,
      receiverId: newFriendRequest.receiverId,
      status: newFriendRequest.status,
      createdAt: dayjs(newFriendRequest.createdAt),
      updatedAt: newFriendRequest.updatedAt ? dayjs(newFriendRequest.updatedAt) : undefined,
    };
  }
}
