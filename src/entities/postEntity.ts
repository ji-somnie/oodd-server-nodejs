import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserEntity } from './userEntity';

@Entity()
export class PostEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  content!: string;

  @ManyToOne(() => UserEntity, (user) => user.posts)
  user!: UserEntity;
}
