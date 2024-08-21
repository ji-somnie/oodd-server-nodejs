import {Entity, ManyToOne, JoinColumn, Column} from 'typeorm';
import {BaseEntity} from '../base/baseEntity';
import {User} from './userEntity';

@Entity('InterestFriend')
export class InterestFriend extends BaseEntity {
  @Column()
  userId!: number;

  @Column()
  friendId!: number;

  @ManyToOne(() => User, user => user.sentInterests)
  @JoinColumn({name: 'userId'})
  sender!: User;

  @ManyToOne(() => User, user => user.receivedInterests)
  @JoinColumn({name: 'friendId'})
  receiver!: User;
}
