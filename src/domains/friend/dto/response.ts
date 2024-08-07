import dayjs from 'dayjs';

export interface FriendRequestActionResponse {
  userId: number;
  friendId: number;
  requestStatus: 'accepted' | 'rejected';
  createdAt: dayjs.Dayjs;
  updatedAt: dayjs.Dayjs;
}
