import {Repository} from 'typeorm';
import {Comment} from '../../entities/commentEntity';
import {PostCommentRequest, DeleteCommentRequest} from './dtos/request';
import myDataBase from '../../data-source';
import dayjs from 'dayjs';

export class CommentService {
  private commentRepository: Repository<Comment> = myDataBase.getRepository(Comment);

  //댓글 생성
  async createComment(request: PostCommentRequest): Promise<Comment> {
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

  //댓글 조회
  async getCommentById(commentId: number): Promise<Comment | null> {
    return this.commentRepository.findOne({where: {id: commentId, status: 'activated'}, relations: ['user', 'post']});
  }

  async getCommentsByPostIdAndUserId(postId: number, userId: number): Promise<Comment[]> {
    return this.commentRepository.find({
      where: { 
        post: { id: postId }, 
        user: { id: userId },
        status: 'activated' 
      },
      relations: ['user']
    });
  }

  //댓글 삭제
  async deleteComment(request: DeleteCommentRequest): Promise<Comment> {
    const {commentId} = request;
    const comment = await this.getCommentById(commentId);

    if (!comment) {
      throw new Error('Comment not found');
    }

    /*
    if (comment.status === 'deactivated') {
      throw new Error('Comment already deleted');
    }
    */

    const now = dayjs().toDate();
    comment.status = 'deactivated';
    comment.updatedAt = now;
    comment.deletedAt = now;

    return await this.commentRepository.save(comment);
  }
}