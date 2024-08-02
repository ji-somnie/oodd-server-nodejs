import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from '../../user/entities/userEntity';

@Entity()
export class MatchRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.sentRequests)
  requester: User;

  @ManyToOne(() => User, user => user.receivedRequests)
  receiver: User;

  @Column()
  status: string;
}
