import {Repository} from 'typeorm';
import {Comment} from '../../entities/ootdCommentEntity';
import {CommentRequest} from './dto/request';
import {myDataBase} from '../../data-source';

export class CommentService {
  private commentRepository: Repository<Comment>;

  constructor() {
    this.commentRepository = myDataBase.getRepository(Comment);
  }

  async createComment(request: CommentRequest): Promise<Comment> {
    const {userId, postId, content} = request;
    const newComment = this.commentRepository.create({userId, postId, content});
    return await this.commentRepository.save(newComment);
  }
}
