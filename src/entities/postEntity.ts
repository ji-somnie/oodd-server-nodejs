import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../entities/userEntity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User)
  user!: User;

  @Column()
  photoUrl!: string;

  @Column()
  caption!: string;

  @Column('simple-array')
  hashtags!: string[];

  @Column('json')
  clothingInfo!: {
    brand: string;
    model: string;
    modelNumber: string;
    url: string;
  };

  @Column({ default: 0 })
  likes!: number;

  @Column('json', { default: '[]' })
  comments!: any[];

  constructor(
    user: User,
    photoUrl: string,
    caption: string,
    hashtags: string[],
    clothingInfo: { brand: string; model: string; modelNumber: string; url: string },
    likes: number = 0,
    comments: any[] = []
  ) {
    this.user = user;
    this.photoUrl = photoUrl;
    this.caption = caption;
    this.hashtags = hashtags;
    this.clothingInfo = clothingInfo;
    this.likes = likes;
    this.comments = comments;
  }
}
