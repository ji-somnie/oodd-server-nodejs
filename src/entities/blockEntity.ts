import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './userEntity';

@Entity('Block')
export class Block {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'requesterId' })
  requester!: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'targetId' })
  target!: User;

  @Column({ type: 'varchar', length: 50 })
  status!: string;

  @UpdateDateColumn()
  updatedAt!: Date;
}
