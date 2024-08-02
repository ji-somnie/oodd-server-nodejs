import { myDataBase } from '../../data-source'; // 올바른 경로로 수정
import { User } from './entities/userEntity'; // 올바른 경로로 수정

export const userRepository = myDataBase.getRepository(User).extend({
  findOneWithPosts(id: number) {
    return this.findOne({
      where: { id },
      relations: ['posts'],
    });
  },
});
