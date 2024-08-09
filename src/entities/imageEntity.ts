import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base/baseEntity';
import { Post } from './postEntity';

@Entity('Image')
export class Image { // status 값 없어서 baseEntity 안 쓰고 정의함
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
