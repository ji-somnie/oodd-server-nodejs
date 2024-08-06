import {Repository} from 'typeorm';
import {friendRequestRepository} from '../../repositories/friendRequestRepository';
import {FriendRequest} from '../../entities/friendRequestEntity';
import {FriendRequestDTO} from './dto/request';
import {FriendRequestResponseDTO} from './dto/response';
import dayjs from 'dayjs';

export class FriendRequestService {
  private friendRequestRepository: Repository<FriendRequest>;

  constructor() {
    this.friendRequestRepository = friendRequestRepository;
  }

  async createFriendRequest(requestDTO: FriendRequestDTO): Promise<FriendRequestResponseDTO> {
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
