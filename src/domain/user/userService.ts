// src/domain/user/userService.ts

import { getRepository } from 'typeorm';
import { User } from '../../entities/userEntity'; // 새로운 경로로 수정

export class UserService {
    async getUserById(userId: number): Promise<User | null> {
        const userRepository = getRepository(User);
        const user = await userRepository.findOne({ where: { id: userId } });
        return user || null;
    }
}
