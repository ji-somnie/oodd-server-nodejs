import {Repository} from 'typeorm';
import {commentRepository} from '../../repositories/ootdCommentRepository';
import {Comment} from '../../entities/ootdCommentEntity';
import {CommentDeleteRequest} from './dto/request';
import dayjs from 'dayjs';

export class CommentService {
  private commentRepository: Repository<Comment>;

  constructor() {
    this.commentRepository = commentRepository;
  }

  async deleteComment(request: CommentDeleteRequest): Promise<Comment | null> {
    const {commentId} = request;
    const comment = await this.commentRepository.findOne({where: {id: commentId}});

    if (!comment) {
      return null;
    }

    comment.status = false;
    comment.deletedAt = dayjs();

    return await this.commentRepository.save(comment);
  }
}
