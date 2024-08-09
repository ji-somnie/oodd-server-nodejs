// src/domain/user/userRepository.ts

import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '../../entities/userEntity'; // 새로운 경로로 수정

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
    // 사용자 관련 쿼리 메서드 추가 가능
}
