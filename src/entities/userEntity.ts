<<<<<<< HEAD
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

=======
import {Entity, OneToMany, Column} from 'typeorm';
import {BaseEntity} from '../base/baseEntity';
import {Post} from './postEntity';
import {Comment} from './commentEntity';
import {ChatRoom} from './chatRoomEntity';
import {UserRelationship} from './userRelationshipEntity';

@Entity('User') // 데이터베이스 테이블과 매핑되는 엔티티
export class User extends BaseEntity {
  @Column({unique: true, length: 255})
  kakaoId!: string; // 카카오 고유 ID를 저장하는 필드

  @Column({unique: true, length: 255})
  googleId!: string; // 구글 고유 ID를 저장하는 필드

  @Column({ unique: true, length: 255 })
  naverId!: string; // 네이버 고유 ID를 저장하는 필드

  @Column({ length: 100 })
  name!: string;

  @Column({length: 100})
  email!: string;

  @Column({length: 100})
  nickname!: string;

  @Column({length: 15})
  phoneNumber!: string;

  @Column({length: 255})
  profilePictureUrl!: string;

  @Column('text')
  bio!: string;

  @Column('datetime')
  joinedAt!: Date; // joinedAt는 datetime 타입

  @OneToMany(() => Post, post => post.user)
  posts!: Post[];

  @OneToMany(() => Comment, comment => comment.user)
  comments!: Comment[];

  @OneToMany(() => ChatRoom, chatRoom => chatRoom.toUser)
  receivedChatRooms?: ChatRoom[];

  @OneToMany(() => ChatRoom, chatRoom => chatRoom.fromUser)
  sentChatRooms?: ChatRoom[];

  @OneToMany(() => UserRelationship, userRelationship => userRelationship.requester)
  requestedUserRelationships?: UserRelationship[];

  @OneToMany(() => UserRelationship, userRelationship => userRelationship.target)
  targetedUserRelationships?: UserRelationship[];
>>>>>>> c05bc42a369b72b6a94b034be6b95365e4508687
}
