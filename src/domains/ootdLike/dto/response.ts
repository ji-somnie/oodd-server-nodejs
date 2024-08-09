import dayjs from 'dayjs';

export interface OotdLikeGetResponse {
  id: number;
  userId: number;
  postId: number;
  status: 'deactivated' | 'activated';
  createdAt: dayjs.Dayjs;
  updatedAt?: dayjs.Dayjs;
  deletedAt?: dayjs.Dayjs;
}
