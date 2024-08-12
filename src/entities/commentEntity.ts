import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './userEntity';
import { Post } from './postEntity';
import { BaseEntity } from '../base/baseEntity';

@Entity()
export class Comment extends BaseEntity {
  
  @Column('text')
  content!: string;

  @ManyToOne(() => User, user => user.comments)
  user!: User;

  @ManyToOne(() => Post, post => post.comments)
  post!: Post;
}
