import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base/baseEntity';
import { User } from './userEntity';
import { Post } from './postEntity';

@Entity('Like')
export class Like extends BaseEntity {
  @ManyToOne(() => Post, post => post.likes)
  post!: Post;

  @ManyToOne(() => User, user => user.comments)
  user!: User;
}
