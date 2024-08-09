<<<<<<< HEAD
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany
  } from 'typeorm';
  import { PostEntity } from './postEntity';
  import { MatchRequestEntity } from './matchRequestEntity';
  import { NotificationEntity } from './notificationEntity';
  
  @Entity('users')
  export class UserEntity {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column()
    username!: string;
  
    @Column()
    nickname!: string;
  
    @Column()
    email!: string;
  
    @Column({ nullable: true })
    bio?: string;
  
    @OneToMany(() => PostEntity, (post) => post.user)
    posts!: PostEntity[];
  
    @OneToMany(() => MatchRequestEntity, (request) => request.sender)
    sentRequests!: MatchRequestEntity[];
  
    @OneToMany(() => MatchRequestEntity, (request) => request.receiver)
    receivedRequests!: MatchRequestEntity[];
  
    @OneToMany(() => NotificationEntity, (notification) => notification.user)
    notifications!: NotificationEntity[];
  }
  
=======
import {Entity, Column, OneToMany} from 'typeorm';
import {BaseEntity} from '../base/baseEntity';
import {Post} from './postEntity';
import {Comment} from './commentEntity';
import {ChatRoom} from './chatRoomEntity';

@Entity('User')
export class User extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  nickname!: string;

  @Column()
  phoneNumber!: string;

  @Column()
  profilePictureUrl!: string;

  @Column('text')
  bio!: string;

  @Column('timestamp')
  joinedAt!: Date;

  @OneToMany(() => Post, post => post.user)
  posts!: Post[];

  @OneToMany(() => Comment, comment => comment.user)
  comments!: Comment[];

  @OneToMany(() => ChatRoom, chatRoom => chatRoom.toUser)
  receivedChatRooms?: ChatRoom[];

  @OneToMany(() => ChatRoom, chatRoom => chatRoom.fromUser)
  sentChatRooms?: ChatRoom[];
}
>>>>>>> d68dec8cb7c57e3b78123b4acd1a29bf1277797a
