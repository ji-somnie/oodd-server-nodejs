export interface DeleteCommentResponse {
  id: number;
  userId: number;
  postId: number;
  content: string;
  status: 'deactivated' | 'activated';
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
