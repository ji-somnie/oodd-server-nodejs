export interface CommentRequest {
  userId: number;
  postId: number;
  content: string;
}

export interface CommentDeleteRequest {
  commentId: number;
}
