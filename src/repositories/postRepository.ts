import { Repository } from 'typeorm';
import { myDataBase } from '../data-source';
import { Post } from '../entities/postEntity';

export class PostRepository extends Repository<Post> {
  constructor() {
    super(Post, myDataBase.manager);
  }
}
