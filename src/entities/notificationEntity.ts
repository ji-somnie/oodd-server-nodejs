import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserEntity } from './userEntity';

@Entity()
export class NotificationEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  message!: string;

  @ManyToOne(() => UserEntity, (user) => user.notifications)
  user!: UserEntity;
}
