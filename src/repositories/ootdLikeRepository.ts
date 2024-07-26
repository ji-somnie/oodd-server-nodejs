import {Repository} from 'typeorm';
import {myDataBase} from '../data-source';
import {Like} from '../entities/ootdLikeEntity';

export const likeRepository: Repository<Like> = myDataBase.getRepository(Like);
