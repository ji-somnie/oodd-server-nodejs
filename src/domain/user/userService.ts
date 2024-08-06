import {Repository} from 'typeorm';
import {User} from '../../entities/userEntity';
import {myDataBase} from '../../data-source';

export class UserService {
  private userRepository: Repository<User> = myDataBase.getRepository(User);

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async createUser(name: string, email: string): Promise<User> {
    const user = this.userRepository.create({name, email});
    return this.userRepository.save(user);
  }

  //유저 유효성 검사
  async getUserByID(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({id, status: 'activated', joinStatus: 'activated'});
  }
}
