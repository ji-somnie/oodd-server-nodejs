// userRepository.ts
import { UserEntity } from '../entities/userEntity';

export class UserRepository {
  async findUserByName(name: string): Promise<UserEntity | null> {
    // 사용자 이름으로 유저를 찾는 로직
    return null; // 실제 로직에 맞게 구현 필요
  }
}
