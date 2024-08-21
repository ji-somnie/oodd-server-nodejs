import {ChatMessage} from '../../../entities/chatMessageEntity';
import {ChatRoom} from '../../../entities/chatRoomEntity';
import {User} from '../../../entities/userEntity';

type UserPreview = Pick<User, 'id' | 'nickname' | 'profilePictureUrl' | 'name'>;

export interface ChatRoomsDto extends Pick<ChatRoom, 'id' | 'createdAt'> {
  id: number;
  createdAt: Date;
  opponent: UserPreview;
  latestMessage: Pick<ChatMessage, 'id' | 'content' | 'createdAt' | 'toUserReadAt'>;
}

export interface ChatRoomsQueryDto {
  chatRoom_id: number;
  chatRoom_createdAt: Date;
  chatRoom_requestStatus: 'pending' | 'accepted' | 'rejected';
  chatRoom_fromUserId: number;
  toUser_id: number;
  toUser_nickname: string;
  toUser_profilePictureUrl: string;
  toUser_name: string;
  fromUser_id: number;
  fromUser_nickname: string;
  fromUser_profilePictureUrl: string;
  fromUser_name: string;
  latestMessageId: number;
  latestMessageCreatedAt: Date;
  latestMessageContent: string;
  latestMessageToUserReadAt: Date;
}
