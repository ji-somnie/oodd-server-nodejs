import {Repository} from 'typeorm';
import {Post} from '../../entities/postEntity';
import {myDataBase} from '../../data-source';

export class PostService {
  private postRepository: Repository<Post> = myDataBase.getRepository(Post);

  //post 유효성 검사
  async getPostByID(id: number): Promise<Post | null> {
    return this.postRepository.findOneBy({id, status: 'activated'});
  }
}
