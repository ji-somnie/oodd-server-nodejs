import {Repository} from 'typeorm';
import {myDataBase} from '../data-source';
import {Comment} from '../entities/ootdCommentEntity';

export const commentRepository: Repository<Comment> = myDataBase.getRepository(Comment);
