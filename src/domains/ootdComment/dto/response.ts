import dayjs from 'dayjs';

export class FriendRequestResponseDTO {
  id!: number;
  requesterId!: number;
  receiverId!: number;
  requestStatus!: string; // pending, accepted, rejected
  createdAt!: dayjs.Dayjs;
  updatedAt?: dayjs.Dayjs;
}
