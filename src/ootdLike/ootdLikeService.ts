import {Repository} from 'typeorm';
import {myDataBase} from '../data-source';
import {Like} from '../entities/ootdLikeEntity';
import {OotdLikeRequestDTO} from './dto/request';

export class OotdLikeService {
  private ootdLikeRepository: Repository<Like>;

  constructor() {
    this.ootdLikeRepository = myDataBase.getRepository(Like);
  }

  async toggleLike(requestDTO: OotdLikeRequestDTO): Promise<Like | null> {
    const {userId, postId} = requestDTO;

    const existingLike = await this.ootdLikeRepository.findOneBy({userId, postId});

    if (existingLike) {
      await this.ootdLikeRepository.remove(existingLike);
      return null;
    }

    const newLike = this.ootdLikeRepository.create({userId, postId});
    await this.ootdLikeRepository.save(newLike);
    return newLike;
  }
}
