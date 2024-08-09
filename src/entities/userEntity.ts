import {Entity, Column, OneToMany} from 'typeorm';
import {Like} from './ootdLikeEntity';
import {Post} from './postEntity';
import {Comment} from './ootdCommentEntity';
import {BaseEntity} from '../base/baseEntity';
import {UserRelationship} from './userRelationshipEntity';

@Entity('Users')
export class User extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  nickname!: string;

  @Column()
  phoneNumber!: string;

  @Column({nullable: true})
  profilePictureUrl?: string;

  @Column({nullable: true})
  bio?: string;

  @Column()
  joinStatus!: 'deactivated' | 'activated';

  @OneToMany(() => Like, like => like.user)
  likes?: Like[];

  @OneToMany(() => Post, post => post.user)
  posts?: Post[];

  @OneToMany(() => Comment, comment => comment.user)
  comments?: Comment[];

  @OneToMany(() => UserRelationship, userRelationship => userRelationship.requester)
  sentFriendRequests?: UserRelationship[];

  @OneToMany(() => UserRelationship, userRelationship => userRelationship.receiver)
  receivedFriendRequests?: UserRelationship[];
}
