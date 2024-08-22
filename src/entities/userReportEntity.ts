import {Entity, Column, ManyToOne, JoinColumn} from 'typeorm';
import {User} from './userEntity';
import {BaseEntity} from '../base/baseEntity';

@Entity('UserReport')
export class UserReport extends BaseEntity {
  @ManyToOne(() => User)
  @JoinColumn({name: 'fromUserId'})
  fromUser!: User;

  @ManyToOne(() => User)
  @JoinColumn({name: 'toUserId'})
  toUser!: User;

  @Column({type: 'varchar', length: 500})
  reason!: string;
}
