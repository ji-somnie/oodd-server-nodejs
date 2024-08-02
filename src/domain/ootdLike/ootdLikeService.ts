// src/domain/ootdLike/ootdLikeService.ts
import {Repository} from 'typeorm';
import {myDataBase} from '../../data-source';
import {Like} from '../../entities/ootdLikeEntity';

export class OotdLikeService {
  private ootdLikeRepository: Repository<Like>;

  constructor() {
    this.ootdLikeRepository = myDataBase.getRepository(Like);
  }

  async getLikesByPostId(postId: number): Promise<Like[]> {
    return this.ootdLikeRepository.find({where: {postId, status: true}});
  }
}
