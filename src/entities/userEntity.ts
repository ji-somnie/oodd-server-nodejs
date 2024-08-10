import {Entity, Column, OneToMany} from 'typeorm';
import {BaseEntity} from '../base/baseEntity';
import {Post} from './postEntity';
import {Comment} from './commentEntity';
import {ChatRoom} from './chatRoomEntity';

@Entity('User') // 데이터베이스 테이블과 매핑되는 엔티티
export class User {
  @PrimaryGeneratedColumn()
  id!: number; // id는 int 타입, 자동 증가(primary key)
@Entity('User')
export class User extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  nickname!: string;

  @Column({ unique: true, length: 255 })
  kakaoId!: string; // 카카오 고유 ID를 저장하는 필드

  @Column({ unique: true, length: 255 })
  googleId!: string; // 구글 고유 ID를 저장하는 필드

  @Column({ length: 100 })
  name!: string;
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
