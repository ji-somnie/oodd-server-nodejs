// src/entities/userEntity.ts

import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ReportEntity } from './reportEntity';

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    

    @OneToMany(() => ReportEntity, report => report.user)
    reports!: ReportEntity[]; 
}
