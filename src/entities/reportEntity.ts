import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserEntity } from './userEntity';

@Entity('reports')
export class ReportEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => UserEntity, user => user.reports)
  reporter!: UserEntity;

  @Column()
  postId!: number;

  @Column()
  reason!: string;

  @Column()
  createdAt!: Date;
}
