import myDataBase from '../../data-source';
import {User} from '../../entities/userEntity';
import {Repository} from 'typeorm';

export class UserService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = myDataBase.getRepository(User);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async createUser(name: string, email: string): Promise<User> {
    const user = this.userRepository.create({name, email});
    return this.userRepository.save(user);
  }

  async getUserByUserId(userId: number): Promise<User | null> {
    return await this.userRepository.findOne({where: {id: userId}});
  }
}
