// 임시
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import {User} from './userEntity';
import {Like} from './ootdLikeEntity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;
  /*
  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: number;

  @Column()
  content: string;

  @Column({ default: false })
  isRepresentative: boolean;

  @Column({ default: true })
  status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date; */

  @OneToMany(() => Like, like => like.post)
  likes: Like[];

  constructor(likes: Like[]) {
    this.likes = likes;
  }
}
