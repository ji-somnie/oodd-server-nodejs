import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { BaseEntity } from '../base/baseEntity';
import { Post } from './postEntity';
import dayjs from 'dayjs';

@Entity('Image')
export class Image {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn({type: 'timestamp'})
  createdAt!: dayjs.Dayjs;

  @UpdateDateColumn({type: 'timestamp'})
  updatedAt!: dayjs.Dayjs;

  @DeleteDateColumn({type: 'timestamp'})
  deletedAt!: dayjs.Dayjs;

  @ManyToOne(() => Post, post => post.images)
  post!: Post;

  @Column()
  url!: string;

  @Column()
  order!: number;
}
