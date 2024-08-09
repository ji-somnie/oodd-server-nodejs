import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { MatchRequestEntity } from './matchRequestEntity';
import Notification from './notificationEntity'; // 수정된 import
import { ReportEntity } from './reportEntity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToMany(() => MatchRequestEntity, matchRequest => matchRequest.requester)
  sentRequests!: MatchRequestEntity[];

  @OneToMany(() => MatchRequestEntity, matchRequest => matchRequest.requestee)
  receivedRequests!: MatchRequestEntity[];

  @OneToMany(() => Notification, notification => notification.user)
  notifications!: Notification[];

  @OneToMany(() => ReportEntity, report => report.reporter)
  reports!: ReportEntity[];
}
