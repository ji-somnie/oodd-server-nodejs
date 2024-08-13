import {Repository} from 'typeorm';
import {Comment} from '../../entities/commentEntity';
import {CommentDeleteRequest} from './dtos/request';
import dayjs from 'dayjs';
import myDataBase from '../../data-source';

export class CommentService {
  private commentRepository: Repository<Comment> = myDataBase.getRepository(Comment);

  async createComment(request: CommentRequest): Promise<Comment> {
    const {userId, postId, content} = request;
    const now = dayjs().toDate();
    const newComment = this.commentRepository.create({
      user: {id: userId},
      post: {id: postId},
      content,
      status: 'activated',
      createdAt: now,
      updatedAt: now,
    });
    return await this.commentRepository.save(newComment);
  }

  async getCommentById(commentId: number): Promise<Comment | null> {
    return this.commentRepository.findOne({where: {id: commentId, status: 'activated'}});
  }

  async deleteComment(request: CommentDeleteRequest): Promise<Comment> {
    const {commentId} = request;
    const comment = await this.getCommentById(commentId);

    if (!comment) {
      throw new Error('Comment not found');
    }

    comment.status = 'deactivated';
    comment.deletedAt = new Date();

    return await this.commentRepository.save(comment);
  }
}
