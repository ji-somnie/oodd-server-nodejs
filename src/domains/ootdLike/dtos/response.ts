export interface GetOotdLikeResponse {
  id: number;
  userId: number;
  postId: number;
  status: 'deactivated' | 'activated';
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  user: {
    id: number;
    nickname: string;
    profilePictureUrl?: string;
  };
}

export interface OotdLikeListResponse {
  totalLikes: number | undefined;
  likes: GetOotdLikeResponse[];
  isLiked: boolean;
}

export interface OotdLikeResponse {
  id: number;
  userId: number;
  postId: number;
  status: 'deactivated' | 'activated';
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
