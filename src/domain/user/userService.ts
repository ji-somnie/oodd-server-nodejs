// userService.ts
import { UserEntity } from '../../entities/userEntity';

export class UserService {
  async getUserById(id: number): Promise<UserEntity | null> {
 
    return {
      id,
      username: `User_${id}`,
      nickname: `Nickname_${id}`,
      email: `user${id}@example.com`,
      bio: `This is bio for user ${id}`,
      posts: [],
      sentRequests: [],
      receivedRequests: [],
      notifications: []
    } as UserEntity;
  }
}
