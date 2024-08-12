// src/repositories/userRepository.ts

import { Repository } from 'typeorm';
import  myDataBase  from '../data-source';
import  UserEntity  from '../entities/userEntity';

export const userRepository: Repository<UserEntity> = myDataBase.getRepository(UserEntity);

