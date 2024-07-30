//src/domain/ootdLike/ootdLikeService.ts
import {Repository} from 'typeorm';
import {myDataBase} from '../../data-source';
import {Like} from '../../entities/ootdLikeEntity';
import {OotdLikeRequest} from './dto/request';

export class OotdLikeService {
  private ootdLikeRepository: Repository<Like>;

  constructor() {
    this.ootdLikeRepository = myDataBase.getRepository(Like);
  }

  async toggleLike(requestDTO: OotdLikeRequest): Promise<Like | null> {
    const {userId, postId} = requestDTO;

    const existingLike = await this.ootdLikeRepository.findOneBy({userId, postId});

    if (existingLike) {
      existingLike.status = !existingLike.status;
      await this.ootdLikeRepository.save(existingLike);
      return existingLike;
    }

    const newLike = this.ootdLikeRepository.create({userId, postId, status: true});
    await this.ootdLikeRepository.save(newLike);
    return newLike;
  }
}
