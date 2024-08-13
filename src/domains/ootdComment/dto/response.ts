import dayjs from 'dayjs';

export class CommentResponse {
  id!: number;
  userId!: number;
  postId!: number;
  content!: string;
  createdAt!: dayjs.Dayjs;
  updatedAt?: dayjs.Dayjs;
  deletedAt?: dayjs.Dayjs;
}
