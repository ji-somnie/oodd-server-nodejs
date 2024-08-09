import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserEntity } from './userEntity';

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  message!: string;

  @Column()
  createdAt!: Date;

  @ManyToOne(() => UserEntity, user => user.notifications)
  user!: UserEntity;
}

export default Notification; // Notification 클래스를 내보냅니다.
