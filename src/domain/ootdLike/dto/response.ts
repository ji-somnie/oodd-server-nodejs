//src/domain/ootdLike/dto/response.ts
import dayjs from 'dayjs';

export class OotdLikeResponse {
  id!: number;
  userId!: number;
  postId!: number;
  status!: boolean;
  createdAt!: dayjs.Dayjs;
  updatedAt?: dayjs.Dayjs;
  deletedAt?: dayjs.Dayjs;
}
