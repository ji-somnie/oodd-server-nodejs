import {Repository} from 'typeorm';
import {Comment} from '../../entities/ootdCommentEntity';
import {myDataBase} from '../../data-source';
import dayjs from 'dayjs';

export class CommentService {
  private commentRepository: Repository<Comment> = myDataBase.getRepository(Comment);

  async getCommentById(commentId: number): Promise<Comment | null> {
    return this.commentRepository.findOne({where: {id: commentId, status: 'activated'}});
  }

  async getCommentsByPostId(postId: number): Promise<Comment[]> {
    return this.commentRepository.find({where: {postId, status: 'activated'}});
  }
}
