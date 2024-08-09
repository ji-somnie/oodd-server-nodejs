import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne
  } from 'typeorm';
  import { UserEntity } from './userEntity';
  
  @Entity('match_requests')
  export class MatchRequestEntity {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @ManyToOne(() => UserEntity, (user) => user.sentRequests)
    sender!: UserEntity;
  
    @ManyToOne(() => UserEntity, (user) => user.receivedRequests)
    receiver!: UserEntity;
  
    @Column()
    status!: string;  // 예: 'pending', 'accepted', 'rejected'
  }
  