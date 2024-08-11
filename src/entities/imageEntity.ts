import {Entity, Column, ManyToOne} from 'typeorm';
import {BaseEntity} from '../base/baseEntity';
import {Post} from './postEntity';

@Entity('Image')
export class Image extends BaseEntity {
  @ManyToOne(() => Post, post => post.images)
  post!: Post;

  @Column()
  url!: string;

  @Column()
  order!: number;
}