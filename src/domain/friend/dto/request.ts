import {User} from '../../../entities/userEntity';

export interface FriendRequestRequest {
  requester: User;
  receiver: User;
  message: string;
  //requestStatus: 'friend' | 'matching';
}
