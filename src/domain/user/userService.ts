import { getRepository } from 'typeorm';
import { UserEntity } from '../../entities/userEntity';

export class UserService {
  private userRepository = getRepository(UserEntity);

  async getUserById(userId: number): Promise<UserEntity | null> {
    return await this.userRepository.findOne({ where: { id: userId } });
  }
}
