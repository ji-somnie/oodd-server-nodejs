import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { User } from './user.entity';

export const userRepository: Repository<User> = AppDataSource.getRepository(User);
