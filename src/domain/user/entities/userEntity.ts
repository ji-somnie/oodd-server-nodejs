import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Post } from './postEntity'; // 파일 경로가 정확한지 확인

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username!: string;

  @Column()
  email!: string;

  @Column()
  nickname!: string;

  @OneToMany(() => Post, (post) => post.user)
  posts!: Post[];
}
