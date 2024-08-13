import {PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Column} from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({default: 'activated'})
  status!: 'activated' | 'deactivated';

  @CreateDateColumn({type: 'datetime'})
  createdAt!: Date;

  @UpdateDateColumn({type: 'datetime'})
  updatedAt!: Date;

  @DeleteDateColumn({type: 'datetime'})
  @Column({nullable: true})
  deletedAt?: Date;
}
