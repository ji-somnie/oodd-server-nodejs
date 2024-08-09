import dayjs from 'dayjs';

export interface CommentDeleteResponse {
  id: number;
  userId: number;
  postId: number;
  content: string;
  status: 'deactivated' | 'activated';
  createdAt: dayjs.Dayjs;
  updatedAt: dayjs.Dayjs;
  deletedAt: dayjs.Dayjs;
  user: {
    id: number;
    nickname: string;
    profilePictureUrl: string;
  };
}
