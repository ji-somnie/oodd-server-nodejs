import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { NotificationEntity } from './notificationEntity';
import { ReportEntity } from './reportEntity';
import { MatchRequestEntity } from './matchRequestEntity'; // MatchRequestEntity import 추가

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    email!: string;

    @Column()
    status!: string;

    @OneToMany(() => NotificationEntity, notification => notification.user)
    notifications!: NotificationEntity[];

    @OneToMany(() => ReportEntity, report => report.reportedBy)
    reports!: ReportEntity[];

    @OneToMany(() => MatchRequestEntity, matchRequest => matchRequest.requester) // sentRequests 속성 추가
    sentRequests!: MatchRequestEntity[];

    @OneToMany(() => MatchRequestEntity, matchRequest => matchRequest.requestee) // receivedRequests 속성 추가
    receivedRequests!: MatchRequestEntity[];

}
