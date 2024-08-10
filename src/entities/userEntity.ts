import { Entity, PrimaryGeneratedColumn, OneToMany, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import {BaseEntity} from '../base/baseEntity';
import {Post} from './postEntity';
import {Comment} from './commentEntity';
import {ChatRoom} from './chatRoomEntity';


@Entity('User') // 데이터베이스 테이블과 매핑되는 엔티티
export class User {
  @PrimaryGeneratedColumn()
  id!: number; // id는 int 타입, 자동 증가(primary key)

  @Column({ unique: true, length: 255 })
  kakaoId!: string; // 카카오 고유 ID를 저장하는 필드

  @Column({ unique: true, length: 255 })
  googleId!: string; // 구글 고유 ID를 저장하는 필드

  @Column({ length: 100 })
  name!: string;

  @Column({ length: 100 })
  email!: string;

  @Column({ length: 100 })
  nickname!: string;

  @Column({ length: 15 })
  phoneNumber!: string;

  @Column({ length: 255 })
  profilePictureUrl!: string;

  @Column('text')
  bio!: string;

  @Column({ length: 50 })
  status!: string;

  @Column('datetime')
  joinedAt!: Date; // joinedAt는 datetime 타입
  
  @CreateDateColumn({ type: 'datetime' })
  createdAt!: Date; // createdAt는 datetime 타입
  
  @UpdateDateColumn({ type: 'datetime' })
  updatedAt!: Date; // updatedAt는 datetime 타입

  @DeleteDateColumn({ type: 'datetime' })
  deletedAt!: Date // deletedAt는 datetime 타입

  @OneToMany(() => Post, post => post.user)
  posts!: Post[];

  @OneToMany(() => Comment, comment => comment.user)
  comments!: Comment[];

  @OneToMany(() => ChatRoom, chatRoom => chatRoom.toUser)
  receivedChatRooms?: ChatRoom[];

  @OneToMany(() => ChatRoom, chatRoom => chatRoom.fromUser)
  sentChatRooms?: ChatRoom[];
<<<<<<< HEAD
}
=======
}
>>>>>>> 5c2174347355e87eab018b969e44cd925a77a734
