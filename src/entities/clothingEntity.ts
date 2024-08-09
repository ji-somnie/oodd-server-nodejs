import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base/baseEntity';
import { Post } from './postEntity';

@Entity('Clothing')
export class Clothing extends BaseEntity {
  @ManyToOne(() => Post, post => post.clothings)
  post!: Post;

  @Column()
  brandName!: string;

  @Column()
  modelName!: string;

  @Column()
  modelNumber!: string;

  @Column()
  url!: string;
}
