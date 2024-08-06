import {Entity, Column, ManyToOne, JoinColumn} from 'typeorm';
import {User} from './userEntity';
import {BaseEntity} from '../base/baseEntity';
import dayjs from 'dayjs';

@Entity('UserRelationship')
export class UserRelationship extends BaseEntity {
  @ManyToOne(() => User, user => user.sentFriendRequests)
  @JoinColumn({name: 'requesterId'})
  requester!: User;

  @ManyToOne(() => User, user => user.receivedFriendRequests)
  @JoinColumn({name: 'receiverId'})
  receiver!: User;

  @Column()
  message!: string;

  //@Column()
  //requestStatus!: 'friend' | 'matching';

  @Column()
  isRejected!: boolean;

  @Column()
  isAccepted!: boolean;

  @Column()
  requestedAt!: dayjs.Dayjs;

  @Column()
  acceptedAt!: dayjs.Dayjs;
}
