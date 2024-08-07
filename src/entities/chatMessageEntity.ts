import {Entity, Column, ManyToOne, JoinColumn} from 'typeorm';
import {BaseEntity} from '../base/baseEntity';
import {User} from './userEntity';
import {ChatRoom} from './chatRoomEntity';

@Entity('ChatMessage')
export class ChatMessage extends BaseEntity {
  @ManyToOne(() => ChatRoom, chatRoom => chatRoom.chatMessages)
  @JoinColumn({name: 'chatRoomId'})
  chatRoom!: ChatRoom;

  @ManyToOne(() => User, user => user.sentChatRooms)
  @JoinColumn({name: 'fromUserId'})
  fromUser!: User;

  @ManyToOne(() => User, user => user.receivedChatRooms)
  @JoinColumn({name: 'toUserId'})
  toUser!: User;

  @Column('text')
  content!: string;

  @Column('tinyint')
  isRead: boolean = false;
}
