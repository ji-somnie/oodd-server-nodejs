import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UserEntity } from './userEntity';

@Entity('match_requests')
export class MatchRequestEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => UserEntity, user => user.sentRequests)
  requester!: UserEntity;

  @ManyToOne(() => UserEntity, user => user.receivedRequests)
  requestee!: UserEntity;  // 추가: requestee 속성

  @Column()
  status!: 'PENDING' | 'ACCEPTED' | 'REJECTED';
}
