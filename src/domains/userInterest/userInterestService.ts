import {Repository} from 'typeorm';
import {InterestFriend} from '../../entities/interestFriendEntity';
import {UserInterestRequest} from './dtos/request';
import myDataBase from '../../data-source';
import dayjs from 'dayjs';
import {User} from '../../entities/userEntity';
import {validatedUser, getBlockStatus} from '../../validationTest/validateUser';

export class UserInterestService {
  private userInterestRepository: Repository<InterestFriend> = myDataBase.getRepository(InterestFriend);
  private userRepository: Repository<User> = myDataBase.getRepository(User);

  // 관심 친구 상태 변경
  async interestStatus(request: UserInterestRequest): Promise<InterestFriend> {
    const {userId, friendId} = request;

    const user = await this.userRepository.findOne({where: {id: userId}});
    const friend = await this.userRepository.findOne({where: {id: friendId}});

    if (!user || !friend) {
      throw new Error('User or Friend not found'); //이거 안하면 아래 where이 안됨
    }

    // 관심 친구 기록 찾기
    let interestRecord = await this.userInterestRepository.findOne({
      where: {userId: user.id, friendId: friend.id},
    });

    const now = dayjs().toDate();

    if (!interestRecord) {
      // 기록이 없으면 새로 생성
      interestRecord = this.userInterestRepository.create({
        userId: user.id,
        friendId: friend.id,
        status: 'activated',
        createdAt: now,
        updatedAt: now,
      });
    } else {
      // 기록이 있으면 상태 업데이트 (설정 -> 해제, 해제 -> 설정)
      if (interestRecord.status === 'activated') {
        interestRecord.status = 'deactivated';
        interestRecord.deletedAt = now;
      } else {
        interestRecord.status = 'activated';
        interestRecord.deletedAt = null;
      }
      interestRecord.updatedAt = now;
    }

    return await this.userInterestRepository.save(interestRecord);
  }

  // 관심 친구 조회
  async getInterestFriendList(userId: number): Promise<InterestFriend[]> {
    const interestFriends = await this.userInterestRepository.find({
      where: {
        userId: userId,
        status: 'activated',
      },
      relations: ['receiver'],
      select: {
        userId: true,
        friendId: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
        receiver: {
          id: true,
          nickname: true,
          profilePictureUrl: true,
        },
      },
      order: {
        createdAt: 'DESC',
      },
    });

    // 차단된 사용자와 삭제된 계정 필터링
    const filteredInterestFriends = await Promise.all(
      interestFriends.map(async friend => {
        const blockStatus = await getBlockStatus(userId, friend.friendId);
        const friendUser = await validatedUser(friend.friendId);
        if (blockStatus === 'blocked' || !friendUser) {
          return null;
        }
        return friend;
      }),
    );

    return filteredInterestFriends.filter((friend: InterestFriend | null): friend is InterestFriend => friend !== null);
  }
}
