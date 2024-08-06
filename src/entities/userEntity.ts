import {Entity, Column, OneToMany} from 'typeorm';
import {Like} from './ootdLikeEntity';
import {BaseEntity} from '../base/baseEntity';

@Entity('Users')
export class User extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  email!: string;

  @OneToMany(() => Like, like => like.post)
  likes?: Like[];

  //@OneToMany(() )
}
