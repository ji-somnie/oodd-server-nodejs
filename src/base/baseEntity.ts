import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor() {
    this.id = 0;  // 기본 값 설정
    this.createdAt = new Date();  // 현재 날짜로 초기화
    this.updatedAt = new Date();  // 현재 날짜로 초기화
  }
}
