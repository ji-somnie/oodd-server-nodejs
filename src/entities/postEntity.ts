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
}
