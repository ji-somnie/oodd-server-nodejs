import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../base/baseEntity';
import { Post } from './postEntity';
import { PostClothing } from './postClothingEntity';

@Entity('Clothing')
export class Clothing extends BaseEntity {
  // @ManyToOne(() => Post, post => post.clothings, { cascade: true })
  // post!: Post;

  @OneToMany(() => PostClothing, postClothing => postClothing.clothing)
  postClothings!: PostClothing[];

  @Column()
  brandName!: string;

  @Column()
  modelName!: string;

  @Column()
  modelNumber!: string;

  @Column()
  url!: string;
}
