export interface DeleteCommentResponse {
  id: number;
  userId: number;
  postId: number;
  content: string;
  status: 'deactivated' | 'activated';
  updatedAt: Date;
  deletedAt: Date;
}
