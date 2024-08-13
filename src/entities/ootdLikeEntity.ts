import {Entity, ManyToOne, JoinColumn, Unique} from 'typeorm';
import {User} from './userEntity';
import {Post} from './postEntity';
import {BaseEntity} from '../base/baseEntity';

@Entity('Like')
@Unique(['user', 'post']) // 'userId'와 'postId' 대신 'user'와 'post'로 유니크 설정
export class Like extends BaseEntity {
  @ManyToOne(() => User, user => user.likes)
  @JoinColumn({name: 'userId'})
  user!: User;

  @ManyToOne(() => Post, post => post.likes)
  @JoinColumn({name: 'postId'})
  post!: Post;
}
