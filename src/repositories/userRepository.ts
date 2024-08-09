import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '../entities/userEntity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {}
