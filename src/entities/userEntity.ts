import {Entity, Column, OneToMany} from 'typeorm';
import {Like} from './ootdLikeEntity';
import {BaseEntity} from '../base/baseEntity';

@Entity('Users')
export class User extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  nickname!: string;

  @Column()
  phoneNumber!: string;

  @Column()
  profilePictureUrl!: string;

  @Column()
  bio!: string;

  @Column()
  joinStatus!: 'deactivated' | 'activated';

  @OneToMany(() => Like, like => like.post)
  likes?: Like[];

  //@OneToMany(() => Friend, friend => friend.)

  //@OneToMany(() )
}
