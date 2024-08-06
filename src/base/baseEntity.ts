import {PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Column} from 'typeorm';
import dayjs from 'dayjs';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({default: true})
  status!: 'deactivated' | 'activated';

  @CreateDateColumn({type: 'timestamp'})
  createdAt!: dayjs.Dayjs;

  @UpdateDateColumn({type: 'timestamp'})
  updatedAt!: dayjs.Dayjs;

  @DeleteDateColumn({type: 'timestamp'})
  deletedAt!: dayjs.Dayjs;
}
