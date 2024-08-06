export interface FriendRequestRequest {
  requesterId: number;
  targetId: number;
  message: string;
  requestStatus: 'friend' | 'matching';
}
