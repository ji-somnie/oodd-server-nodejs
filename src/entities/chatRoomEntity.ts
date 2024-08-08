import {Entity, Column, ManyToOne, JoinColumn, OneToMany} from 'typeorm';
import {BaseEntity} from '../base/baseEntity';
import {User} from './userEntity';
import {ChatMessage} from './chatMessageEntity';

@Entity('ChatRoom')
export class ChatRoom extends BaseEntity {
  @ManyToOne(() => User, user => user.sentChatRooms)
  @JoinColumn({name: 'fromUserId'})
  fromUser!: User;

  @ManyToOne(() => User, user => user.receivedChatRooms)
  @JoinColumn({name: 'toUserId'})
  toUser!: User;

  @OneToMany(() => ChatMessage, chatMessage => chatMessage.chatRoom)
  chatMessages?: ChatMessage[];
}
