export interface CommentResponse {
  id: number;
  userId: number;
  postId: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
