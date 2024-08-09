import { Repository } from 'typeorm';
import { myDataBase } from '../data-source';
import { Post } from '../entities/postEntity';
import { UserRelationship } from '../entities/blockEntity';

export class BlockRepository extends Repository<UserRelationship> {
  constructor() {
    super(UserRelationship, myDataBase.manager);
  }

}