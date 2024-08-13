import {Entity, OneToMany, Column} from 'typeorm';
import {BaseEntity} from '../base/baseEntity';
import {Post} from './postEntity';
<<<<<<< HEAD
import {Comment} from './commentEntity';
import {ChatRoom} from './chatRoomEntity';
import {UserRelationship} from './userRelationshipEntity';
import {Like} from './likeEntity';

@Entity('User') // 데이터베이스 테이블과 매핑되는 엔티티
export class User extends BaseEntity {
  @Column({unique: true, length: 255})
  kakaoId!: string; // 카카오 고유 ID를 저장하는 필드

  @Column({unique: true, length: 255})
  googleId!: string; // 구글 고유 ID를 저장하는 필드

  @Column({unique: true, length: 255})
<<<<<<< HEAD
  naverId!: string; // 네이버 고유 ID를 저장하는 필드
=======
  naverId!: string; // 구글 고유 ID를 저장하는 필드
>>>>>>> f200b7d (Merge: with dev)

  @Column({length: 100})
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

<<<<<<< HEAD
  @OneToMany(() => UserRelationship, userRelationship => userRelationship.requester)
  requestedUserRelationships?: UserRelationship[];

  @OneToMany(() => UserRelationship, userRelationship => userRelationship.target)
  targetedUserRelationships?: UserRelationship[];
  @OneToMany(() => Like, like => like.user)
  likes!: Like[];
}
