import { UserRepository } from "../../repositories/userRepository";
import { User } from "../../entities/userEntity";

export class UserService {
  async getAllUsers(): Promise<User[]> {
    return UserRepository.find();
  }

  async createUser(name: string, email: string): Promise<User> {
    const user = UserRepository.create({ name, email });
    return UserRepository.save(user);
  }
}
