import {Entity, Column, ManyToOne, JoinColumn} from 'typeorm';
import {User} from './userEntity';
import {Post} from './postEntity';
import {BaseEntity} from '../base/baseEntity';

@Entity('Likes')
export class Like extends BaseEntity {
  @ManyToOne(() => User, user => user.likes)
  @JoinColumn({name: 'userId'})
  user!: User;

  @ManyToOne(() => Post, post => post.likes)
  @JoinColumn({name: 'postId'})
  post!: Post;

  @Column()
  userId!: number;

  @Column()
  postId!: number;
}
