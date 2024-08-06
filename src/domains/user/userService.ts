/*
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
*/

//테스트를 위한 하드코딩
import {User} from '../../entities/userEntity';
import dayjs from 'dayjs';

export class UserService {
  private users: User[] = [
    {
      id: 1,
      name: 'User1',
      email: 'user1@example.com',
      status: 'activated',
      joinStatus: 'activated',
      nickname: 'UserOne',
      phoneNumber: '1234567890',
      createdAt: dayjs(),
      updatedAt: dayjs(),
      deletedAt: dayjs(),
    },
    {
      id: 2,
      name: 'User2',
      email: 'user2@example.com',
      status: 'activated',
      joinStatus: 'activated',
      nickname: 'UserTwo',
      phoneNumber: '0987654321',
      createdAt: dayjs(),
      updatedAt: dayjs(),
      deletedAt: dayjs(),
    },
  ];

  async getAllUsers(): Promise<User[]> {
    return this.users;
  }

  async createUser(name: string, email: string): Promise<User> {
    const id = this.users.length + 1;
    const user: User = {
      id,
      name,
      email,
      status: 'activated',
      joinStatus: 'activated',
      nickname: `User${id}`,
      phoneNumber: `000000000${id}`,
      createdAt: dayjs(),
      updatedAt: dayjs(),
      deletedAt: dayjs(),
    };
    this.users.push(user);
    return user;
  }

  async getUserByID(id: number): Promise<User | null> {
    return this.users.find(user => user.id === id) || null;
  }
}
