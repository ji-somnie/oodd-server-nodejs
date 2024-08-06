import {Entity, Column, ManyToOne, JoinColumn} from 'typeorm';
import {User} from './userEntity';
import {BaseEntity} from '../base/baseEntity';

@Entity('FriendRequests')
export class FriendRequest extends BaseEntity {
  @ManyToOne(() => User, user => user.sentFriendRequests)
  @JoinColumn({name: 'requesterId'})
  requester!: User;

  @ManyToOne(() => User, user => user.receivedFriendRequests)
  @JoinColumn({name: 'receiverId'})
  receiver!: User;

  @Column()
  requesterId!: number;

  @Column()
  receiverId!: number;

  @Column({default: 'pending'})
  matchStatus!: string;

  constructor(requesterId: number, receiverId: number, status: string = 'pending') {
    super();
    this.requesterId = requesterId;
    this.receiverId = receiverId;
    this.status = status;
  }
}
