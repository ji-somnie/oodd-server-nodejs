<<<<<<< HEAD
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from 'typeorm';
import {User} from './userEntity';
import {Like} from './likeEntity';
import {Comment} from './commentEntity';
import {PostStyletag} from './postStyletagEntity';
import {Clothing} from './clothingEntity';
import {Image} from './imageEntity';
import {BaseEntity} from '../base/baseEntity';
import {PostClothing} from './postClothingEntity';
=======
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from './userEntity';
import { Like } from './likeEntity';
import { Comment } from './commentEntity';
import { PostStyletag } from './postStyletagEntity';
import { Clothing } from './clothingEntity';
import { Image } from './imageEntity';
import { BaseEntity } from '../base/baseEntity';
import { PostClothing } from './postClothingEntity';
>>>>>>> 7472200 (24.08.13 merge)

@Entity('Post')
export class Post extends BaseEntity{
  
  @ManyToOne(() => User, user => user.posts)
  user!: User;

  @Column('text')
  content!: string;

  @Column()
  isRepresentative!: boolean;

<<<<<<< HEAD
  @OneToMany(() => Like, like => like.post, {cascade: true})
  likes!: Like[];

  @OneToMany(() => Comment, comment => comment.post, {cascade: true})
  comments!: Comment[];

  @OneToMany(() => PostStyletag, postStyletag => postStyletag.post, {cascade: true})
=======
  @OneToMany(() => Like, like => like.post, { cascade: true })
  likes!: Like[];

  @OneToMany(() => Comment, comment => comment.post, { cascade: true })
  comments!: Comment[];

  @OneToMany(() => PostStyletag, postStyletag => postStyletag.post, { cascade: true })
>>>>>>> 7472200 (24.08.13 merge)
  postStyletags!: PostStyletag[];

  // @OneToMany(() => Clothing, clothing => clothing.post, { cascade: true })
  // clothings!: Clothing[];

<<<<<<< HEAD
  @OneToMany(() => PostClothing, postClothing => postClothing.post, {cascade: true})
  postClothings!: PostClothing[];

  @OneToMany(() => Image, image => image.post, {cascade: true})
  images!: Image[];

  @OneToMany(() => Like, like => like.post)
  likes?: Like[];
}
=======
  @OneToMany(() => PostClothing, postClothing => postClothing.post, { cascade: true })
  postClothings!: PostClothing[];

  @OneToMany(() => Image, image => image.post, { cascade: true })
  images!: Image[];
}
>>>>>>> 7472200 (24.08.13 merge)
