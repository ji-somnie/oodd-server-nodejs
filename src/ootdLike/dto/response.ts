export class OotdLikeResponseDTO {
  id: number;
  userId: number;
  postId: number;
  createdAt: Date; //status, updatedAt, deletedAt은?

  constructor(id: number, userId: number, postId: number, createdAt: Date) {
    this.id = id;
    this.userId = userId;
    this.postId = postId;
    this.createdAt = createdAt;
  }
}
