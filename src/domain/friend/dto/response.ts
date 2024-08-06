import dayjs from 'dayjs';

export interface FriendRequestResponse {
  id: number;
  requesterId: number;
  receiverId: number;
  matchStatus: 'pending' | 'accepted' | 'rejected';
  createdAt: dayjs.Dayjs;
  updatedAt: dayjs.Dayjs;
}
