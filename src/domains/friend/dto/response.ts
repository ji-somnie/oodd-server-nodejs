import dayjs from 'dayjs';

export interface FriendRequestResponse {
  id: number;
  requesterId: number;
  targetId: number;
  isRejected: boolean;
  isAccepted: boolean;
  requestedAt: dayjs.Dayjs;
  acceptedAt?: dayjs.Dayjs | null;
  status: 'deactivated' | 'activated';
  createdAt: dayjs.Dayjs;
  updatedAt: dayjs.Dayjs;
  deletedAt: dayjs.Dayjs;
}
