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
    //유효성검사 제대로하면 null일 필요 없음
    //유효성 검사 다른 데로 따로 빼기 (서비스 안의 함수로)
    const {commentId} = request;
    const comment = await this.commentRepository.findOne({where: {id: commentId}});

    if (!comment) {
      return null;
    }

    comment.status = false;
    comment.deletedAt = dayjs(); //ec2로 가면 이렇게 dayjs 쓰는 거 안될수도

    return await this.commentRepository.save(comment);
  }
}

