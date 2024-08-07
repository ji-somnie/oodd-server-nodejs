export interface FriendRequestActionRequest {
  userId: number;
  friendRequestId: number;
  action: 'accept' | 'reject';
}
