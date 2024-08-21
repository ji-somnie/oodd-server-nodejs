export interface PostCommentRequest {
  userId: number;
  postId: number;
  content: string;
}

export interface DeleteCommentRequest {
  commentId: number;
}
