import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../base/baseEntity';
import { Post } from './postEntity';
import { Comment } from './commentEntity';

@Entity('User')
export class User extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  nickname!: string;

  @Column()
  phoneNumber!: string;

  @Column()
  profilePictureUrl!: string;

  @Column('text')
  bio!: string;

  @Column('timestamp')
  joinedAt!: Date;

  @OneToMany(() => Post, post => post.user)
  posts!: Post[];

  @OneToMany(() => Comment, comment => comment.user)
  comments!: Comment[];
}
