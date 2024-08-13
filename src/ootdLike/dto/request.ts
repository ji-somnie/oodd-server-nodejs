export class OotdLikeRequestDTO {
  userId: number; //readonly
  postId: number;

  constructor(userId: number, postId: number) {
    this.userId = userId;
    this.postId = postId;
  }
}
