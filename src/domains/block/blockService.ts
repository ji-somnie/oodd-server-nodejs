import { BlockRepository } from '../../repositories/blockRepository';
import { UserRepository } from '../../repositories/userRepository';
// import { UserRequestDto } from './dtos/userRequest.dto';
// import { UserResponseDto } from './dtos/userResponse.dto';
import { User } from '../../entities/userEntity';
import { UserRelationship } from '../../entities/blockEntity';


export class BlockService {
  private blockRepository: BlockRepository;
  private userRepository: UserRepository;


  constructor() {
    this.blockRepository = new BlockRepository();
    this.userRepository = new UserRepository();
  }

  async toggleBlock(userId: number, friendId: number): Promise<string | undefined> {

    const requesterId = await this.userRepository.findOne({ where: { id: userId } });
    const targetId = await this.userRepository.findOne({ where: { id: friendId } });

    if (!requesterId || !targetId) {
      throw new Error('User not found');
    }

    let relationship = await this.blockRepository.findOne({
      where: { requesterId, targetId }
    });

    if (!relationship) {
      // 관계가 없을 경우 새로 생성
      relationship = new UserRelationship();

      relationship.requesterId = requesterId;
      relationship.targetId = targetId;
      relationship.status = 'blocked';
      relationship.createdAt = new Date();
      relationship.updatedAt = new Date();
      await this.blockRepository.save(relationship);
      return 'User blocked successfully.';
    }

    if (relationship && relationship.status === 'blocked') {
      //친구 차단 해제
      relationship.status = 'unblocked';
      relationship.updatedAt = new Date();
      await this.blockRepository.save(relationship);
      return 'User unblocked successfully.';
    } else if (relationship) {
      //친구 차단
      relationship.status = 'blocked';
      relationship.updatedAt = new Date();
      await this.blockRepository.save(relationship);
      return 'User blocked successfully.';
    }

  }

}
