import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ReportEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  reportDetails!: string;
}
