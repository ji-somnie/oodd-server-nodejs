//임시 수정
import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import {Like} from './ootdLikeEntity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @OneToMany(() => Like, like => like.post)
  likes: Like[];

  constructor(name: string, email: string, likes: Like[]) {
    this.name = name;
    this.email = email;
    this.likes = likes;
  }
}
