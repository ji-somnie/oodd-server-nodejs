import dayjs from 'dayjs';

export class OotdLikeResponse {
  id!: number;
  userId!: number;
  postId!: number;
  status!: 'deactivated' | 'activated';
  createdAt!: dayjs.Dayjs;
  updatedAt?: dayjs.Dayjs;
  deletedAt?: dayjs.Dayjs;
}
