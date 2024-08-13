export interface OotdLikeResponse {
  id: number;
  userId: number;
  postId: number;
  status: 'deactivated' | 'activated';
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  /*
  user: {
    id: number;
    nickname: string;
    profilePictureUrl?: string;
  }; */
}
