import {Entity, Column, ManyToOne, OneToMany, JoinColumn} from 'typeorm';
import {User} from './userEntity';
import {Like} from './ootdLikeEntity';
import {Comment} from './ootdCommentEntity';
import {BaseEntity} from '../base/baseEntity';

@Entity('Posts')
export class Post extends BaseEntity {
  @ManyToOne(() => User, user => user.posts)
  @JoinColumn({name: 'userId'})
  user!: User;

  @Column()
  userId!: number;

  @Column()
  content!: string;

  @Column({default: false})
  isRepresentative!: boolean;

  @OneToMany(() => Like, like => like.post)
  likes?: Like[];

  @OneToMany(() => Comment, comment => comment.post)
  comments?: Comment[];
}

