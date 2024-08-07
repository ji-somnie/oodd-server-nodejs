import { myDataBase } from '../data-source';
import { User } from '../entities/userEntity';

const userRepository = myDataBase.getRepository(User);

export const validatedUser = async (userId: number): Promise<User | null> => {
  const user = await userRepository.findOne({ where: { id: userId } });
  return user || null;
};
