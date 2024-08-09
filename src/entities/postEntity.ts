<<<<<<< HEAD
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserEntity } from './userEntity';

@Entity()
export class PostEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  content!: string;

  @ManyToOne(() => UserEntity, (user) => user.posts)
  user!: UserEntity;
=======
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from './userEntity';
import { Like } from './likeEntity';
import { Comment } from './commentEntity';
import { PostStyletag } from './postStyletagEntity';
import { Clothing } from './clothingEntity';
import { Image } from './imageEntity';
import { BaseEntity } from '../base/baseEntity';

@Entity('Post')
export class Post extends BaseEntity{
  
  @ManyToOne(() => User, user => user.posts)
  user!: User;

  @Column('text')
  content!: string;

  @Column()
  isRepresentative!: boolean;

  @OneToMany(() => Like, like => like.post)
  likes!: Like[];

  @OneToMany(() => Comment, comment => comment.post)
  comments!: Comment[];

  @OneToMany(() => PostStyletag, postStyletag => postStyletag.post)
  postStyletags!: PostStyletag[];

  @OneToMany(() => Clothing, clothing => clothing.post)
  clothings!: Clothing[];

  @OneToMany(() => Image, image => image.post)
  images!: Image[];
>>>>>>> d68dec8cb7c57e3b78123b4acd1a29bf1277797a
}
