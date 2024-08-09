import {Entity, Column, ManyToOne, JoinColumn} from 'typeorm';
import {User} from './userEntity';
import {Post} from './postEntity';
import {BaseEntity} from '../base/baseEntity';

@Entity('Comments')
export class Comment extends BaseEntity {
  @ManyToOne(() => User, user => user.comments)
  @JoinColumn({name: 'userId'})
  user!: User;

  @ManyToOne(() => Post, post => post.comments)
  @JoinColumn({name: 'postId'})
  post!: Post;

  @Column()
  userId!: number;

  @Column()
  postId!: number;

  @Column()
  content!: string;
}
