import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import {User} from './userEntity';
import {Post} from './postEntity'; //아직

@Entity('Likes')
export class Like {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, user => user.likes)
  @JoinColumn({name: 'userId'})
  user!: User;

  @ManyToOne(() => Post, post => post.likes)
  @JoinColumn({name: 'postId'})
  post!: Post;

  @Column()
  userId: number;

  @Column()
  postId: number;

  @Column({default: true})
  status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  constructor(userId: number, postId: number, status: boolean, createdAt: Date, updatedAt: Date, deletedAt: Date) {
    this.userId = userId;
    this.postId = postId;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }
}
