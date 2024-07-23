import { userRepository } from "../../repositories/userRepository";
import { User } from "../../entities/userEntity";

export class UserService {
  async getAllUsers(): Promise<User[]> {
    return userRepository.find();
  }

  async createUser(name: string, email: string): Promise<User> {
    const user = userRepository.create({ name, email });
    return userRepository.save(user);
  }
}
