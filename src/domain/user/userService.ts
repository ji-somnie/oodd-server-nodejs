import { getRepository } from 'typeorm';
import { User } from './entities/userEntity'; // 올바른 경로로 수정

export class UserService {
  private userRepository = getRepository(User);

  async getAllUsers() {
    return await this.userRepository.find();
  }

  async createUser(name: string, email: string) {
    const user = new User();
    user.username = name;
    user.email = email;
    return await this.userRepository.save(user);
  }

  async getUserById(id: number) {
    return await this.userRepository.findOne({ where: { id }, relations: ['posts'] });
  }
}


