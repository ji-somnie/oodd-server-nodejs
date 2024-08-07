import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base/baseEntity';
import { User } from './userEntity';
import { Post } from './postEntity';

@Entity('Comment')
export class Comment extends BaseEntity {
  @ManyToOne(() => Post, post => post.comments)
  post!: Post;

//   @ManyToOne(() => User, user => user.comments)
//   user!: User;

  @Column('text')
  content!: string;
}
