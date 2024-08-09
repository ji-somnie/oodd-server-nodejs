import {PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Column} from 'typeorm';
import dayjs from 'dayjs';

export class BaseEntity {
  //export abstract class BaseEnity - abstract 사용하면 인스턴스 생성X
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({default: 'deactivated'})
  status!: 'activated' | 'deactivated';

  @CreateDateColumn({type: 'timestamp'})
  createdAt!: Date;

  @UpdateDateColumn({type: 'timestamp'})
  updatedAt!: Date;

  @DeleteDateColumn({type: 'timestamp'})
  deletedAt!: Date;
}