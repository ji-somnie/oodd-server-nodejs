// src/entities/notificationEntity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserEntity } from './userEntity';

@Entity('notifications')
export class NotificationEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    message!: string;

    @Column()
    read!: boolean;

    @Column()
    createdAt!: Date;

    @ManyToOne(() => UserEntity, user => user.notifications)
    user!: UserEntity;
}
