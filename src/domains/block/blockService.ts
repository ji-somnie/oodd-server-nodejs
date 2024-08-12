import { User } from '../../entities/userEntity';
import { Block } from '../../entities/blockEntity';
import myDataBase from '../../data-source';

export class BlockService {
  // Repositories를 데이터베이스에서 직접 가져옴
  private blockRepository = myDataBase.getRepository(Block);
  private userRepository = myDataBase.getRepository(User);

  // 차단/차단 해제 메서드
  async toggleBlock(userId: number, friendId: number): Promise<string | undefined> {
    const requester = await this.userRepository.findOne({ where: { id: userId } });
    const target = await this.userRepository.findOne({ where: { id: friendId } });

    if (!requester || !target) {
      throw new Error('User not found');
    }

    let block = await this.blockRepository.findOne({
      where: { requester, target }
    });

    if (!block) {
      // Block 관계가 없을 경우 새로 생성
      block = new Block();
      block.requester = requester;
      block.target = target;
      block.status = 'blocked';
      block.updatedAt = new Date();
      await this.blockRepository.save(block);
      return 'User blocked successfully.';
    }

    if (block.status === 'blocked') {
      // 차단 해제
      block.status = 'unblocked';
      block.updatedAt = new Date();
      await this.blockRepository.save(block);
      return 'User unblocked successfully.';
    } else {
      // 차단
      block.status = 'blocked';
      block.updatedAt = new Date();
      await this.blockRepository.save(block);
      return 'User blocked successfully.';
    }
  }
}
