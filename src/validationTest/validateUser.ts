import myDataBase from '../data-source';
import {User} from '../entities/userEntity';
import {Block} from '../entities/blockEntity';

const userRepository = myDataBase.getRepository(User);
const blockRepository = myDataBase.getRepository(Block);

export const validatedUser = async (userId: number): Promise<User | null> => {
  const user = await userRepository.findOne({where: {id: userId, status: 'activated'}});
  return user || null;
};

export const getBlockStatus = async (userId: number, friendId: number): Promise<string> => {
  const requester = await userRepository.findOne({where: {id: userId}});
  const target = await userRepository.findOne({where: {id: friendId}});

  if (!requester || !target) {
    throw new Error('User not found');
  }

  const block = await blockRepository.findOne({
    where: [
      {requester, target},
      {requester: target, target: requester},
    ],
  });

  if (!block) {
    return 'not_blocked';
  }

  return block.status;
};
