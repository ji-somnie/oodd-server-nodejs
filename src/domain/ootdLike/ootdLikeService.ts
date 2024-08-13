// src/domain/ootdLike/ootdLikeService.ts
import {Repository} from 'typeorm';
import {myDataBase} from '../../data-source';
import {Like} from '../../entities/ootdLikeEntity';
import {OotdLikeRequest} from './dto/request';

export class OotdLikeService {
  private ootdLikeRepository: Repository<Like>;

  constructor() {
    this.ootdLikeRepository = myDataBase.getRepository(Like);
  }

  async checkLike(requestDTO: OotdLikeRequest): Promise<boolean> {
    const {userId, postId} = requestDTO;

    const existingLike = await this.ootdLikeRepository.findOne({
      where: {userId, postId},
    });

    return !!existingLike; // 좋아요가 존재하면 true, 아니면 false
  }
}
