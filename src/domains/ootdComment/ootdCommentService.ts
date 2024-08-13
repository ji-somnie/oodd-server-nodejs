import {Repository} from 'typeorm';
import {Comment} from '../../entities/commentEntity';
import {CommentRequest} from './dtos/request';
import {myDataBase} from '../../data-source';

export class CommentService {
  private commentRepository: Repository<Comment> = myDataBase.getRepository(Comment);

  async createComment(request: CommentRequest): Promise<Comment> {
    const {userId, postId, content} = request;
    const now = new Date();
    const newComment = this.commentRepository.create({
      user: {id: userId},
      post: {id: postId},
      content,
      createdAt: now,
      updatedAt: now,
    });
    return await this.commentRepository.save(newComment);
  }
}
