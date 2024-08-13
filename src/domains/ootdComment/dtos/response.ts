export interface CommentResponse {
  id: number;
  userId: number;
  postId: number;
  content: string;
  status: 'deactivated' | 'activated';
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export interface GetCommentResponse {
  id: number;
  userId: number;
  postId: number;
  content: string;
  status: 'deactivated' | 'activated';
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  user: {
    id: number;
    nickname: string;
    profilePictureUrl: string;
  };
}
