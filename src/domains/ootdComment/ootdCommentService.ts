import {Repository} from 'typeorm';
import {commentRepository} from '../../repositories/ootdCommentRepository';
import {Comment} from '../../entities/ootdCommentEntity';
import {CommentGetRequest} from './dto/request';
import {CommentResponse} from './dto/response';
import dayjs from 'dayjs';

export class CommentService {
  private commentRepository: Repository<Comment>;

  constructor() {
    this.commentRepository = commentRepository;
  }

  async getComments(request: CommentGetRequest): Promise<CommentResponse[]> {
    //이름수정 (Fetch 노노)
    const {postId} = request;
    const comments = await this.commentRepository.find({
      where: {postId, status: true}, //id: postId로 명시
      order: {createdAt: 'DESC'},
    });

    return comments.map(comment => ({
      id: comment.id,
      userId: comment.userId,
      postId: comment.postId,
      content: comment.content,
      status: comment.status,
      createdAt: dayjs(comment.createdAt),
      updatedAt: comment.updatedAt ? dayjs(comment.updatedAt) : undefined,
      deletedAt: comment.deletedAt ? dayjs(comment.deletedAt) : undefined,
    }));
  }
}
