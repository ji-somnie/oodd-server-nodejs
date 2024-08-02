import { myDataBase } from '../../data-source'; 
import { User } from './entities/userEntity'; 

export const userRepository = myDataBase.getRepository(User).extend({
  findOneWithPosts(id: number) {
    return this.findOne({
      where: { id },
      relations: ['posts'],
    });
  },
});
