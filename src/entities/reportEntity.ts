// src/entities/reportEntity.ts

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UserEntity } from './userEntity';

@Entity()
export class ReportEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    reason!: string;

    @ManyToOne(() => UserEntity, user => user.reports)
    user!: UserEntity;
}
