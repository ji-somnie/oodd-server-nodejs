//src/base/baseEntity.ts
import {PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Column} from 'typeorm';
import dayjs from 'dayjs';

export class BaseEntity {
  //export abstract class BaseEnity - abstract 사용하면 인스턴스 생성X
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({default: 'activated'})
  status!: 'activated' | 'deactivated';

  @CreateDateColumn({type: 'datetime'})
  createdAt!: Date;

  @UpdateDateColumn({type: 'datetime'})
  updatedAt!: Date;

  @Column({type: 'datetime', nullable: true})
  deletedAt?: Date | null;
}
