import {Repository} from 'typeorm';
import myDataBase from '../../data-source';
import {Like} from '../../entities/likeEntity';
import {OotdLikeRequest} from './dtos/request';
import dayjs from 'dayjs';

export class OotdLikeService {
  private ootdLikeRepository: Repository<Like> = myDataBase.getRepository(Like);

  async getLikesByPostId(postId: number): Promise<Like[]> {
    return this.ootdLikeRepository.find({
      where: {
        post: {id: postId},
        status: 'activated',
      },
      relations: ['user', 'post'], // 'user' 관계 로드
    });
  }

  async toggleLike(requestDTO: OotdLikeRequest): Promise<Like> {
    const {userId, postId} = requestDTO;

    const existingLike = await this.ootdLikeRepository.findOne({where: {user: {id: userId}, post: {id: postId}}});

    const now = dayjs().toDate();

    if (existingLike) {
      // 좋아요가 존재하는 경우
      if (existingLike.status === 'deactivated') {
        // 1. 'deactivated'인 경우: 'activated'로 변경
        existingLike.status = 'activated';
        existingLike.deletedAt = null;
      } else {
        // 2. 'activated'인 경우: 'deactivated'로 변경
        existingLike.status = 'deactivated';
        existingLike.deletedAt = now;
      }
      existingLike.updatedAt = now;
      await this.ootdLikeRepository.save(existingLike);
      return existingLike;
    }

    // 3. 존재하지 않을 경우 새로 생성
    const newLike = this.ootdLikeRepository.create({
      user: {id: userId},
      post: {id: postId},
      status: 'activated',
      createdAt: now,
      updatedAt: now,
    });
    await this.ootdLikeRepository.save(newLike);
    return newLike;
  }
}
