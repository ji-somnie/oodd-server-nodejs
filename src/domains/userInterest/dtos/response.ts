export interface UserInterestResponse {
  userId: number;
  friendId: number;
  status: 'deactivated' | 'activated';
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}
