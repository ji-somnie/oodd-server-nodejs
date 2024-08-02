import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './userEntity'; // 파일 경로가 정확한지 확인

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  title!: string;

  @Column()
  content!: string;

  @ManyToOne(() => User, (user) => user.posts)
  user!: User; // user 매개변수의 타입 명시
}
