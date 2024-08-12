import myDataBase from '../../data-source';
import {Repository} from 'typeorm';
import {ChatRoom} from '../../entities/chatRoomEntity';
import {UserRelationship} from '../../entities/userRelationshipEntity';

export class UserRelationshipService {
  private userRelationshipRepository: Repository<UserRelationship>;

  constructor() {
    this.userRelationshipRepository = myDataBase.getRepository(UserRelationship);
  }
}
