import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { User } from './userEntity';

@Entity('UserRelationship')
export class UserRelationship {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'requesterId' })
  requesterId!: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'targetId' })
  targetId!: User;

  @Column({ type: 'text', nullable: true })
  message!: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  requestStatus!: string;

  @Column({ type: 'tinyint', width: 1, default: 0 })
  isRejected!: boolean;

  @Column({ type: 'tinyint', width: 1, default: 0 })
  isAccepted!: boolean;

  @Column({ type: 'varchar', length: 50, nullable: true })
  status!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column({ type: 'datetime', nullable: true })
  deletedAt!: Date | null;

  @Column({ type: 'datetime', nullable: true })
  requestedAt!: Date | null;

  @Column({ type: 'datetime', nullable: true })
  acceptedAt!: Date | null;
}
