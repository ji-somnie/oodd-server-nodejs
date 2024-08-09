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
  