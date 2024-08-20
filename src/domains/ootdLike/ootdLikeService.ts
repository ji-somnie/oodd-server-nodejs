import {Repository} from 'typeorm';
import myDataBase from '../../data-source';
import {Like} from '../../entities/likeEntity';
import {OotdLikeRequest} from './dtos/request';
import {validatedUser, getBlockStatus} from '../../validationTest/validateUser';
import dayjs from 'dayjs';

export class OotdLikeService {
  private ootdLikeRepository: Repository<Like> = myDataBase.getRepository(Like);

  async getLikesByPostId(postId: number, userId: number, isAuthor: boolean): Promise<Like[]> {
    let likes: Like[];
    if (isAuthor) {
      return this.ootdLikeRepository.find({
        where: {
          post: {id: postId},
          status: 'activated',
        },
        relations: ['user', 'post'],
      });
    } else {
      const userLike = await this.ootdLikeRepository.findOne({
        where: {
          post: {id: postId},
          user: {id: userId},
        },
        relations: ['user', 'post'],
      });
      likes = userLike ? [userLike] : [];
    }

    // 차단된 사용자와 삭제된 계정 필터링
    const filteredLikes = await Promise.all(
      likes.map(async like => {
        if (like.user && like.user.id) {
          const blockStatus = await getBlockStatus(userId, like.user.id);
          const likeUser = await validatedUser(like.user.id);
          if (blockStatus === 'blocked' || !likeUser) {
            return null;
          }
        } else {
          return null;
        }
        return like;
      }),
    );

    return filteredLikes.filter((like): like is Like => like !== null);
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
