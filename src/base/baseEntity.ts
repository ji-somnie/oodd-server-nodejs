import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
    @PrimaryGeneratedColumn()
    id: number = 0; // 기본 값 할당

    @CreateDateColumn()
    createdAt: Date = new Date(); // 기본 값 할당

    @UpdateDateColumn()
    updatedAt: Date = new Date(); // 기본 값 할당
}
