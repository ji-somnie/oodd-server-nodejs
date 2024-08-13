import {Repository} from 'typeorm';
import {myDataBase} from '../data-source';
import {Comment} from '../entities/ootdCommentEntity';

export const commentRepository: Repository<Comment> = myDataBase.getRepository(Comment); //그냥 이걸 코드 안에 쓰기
