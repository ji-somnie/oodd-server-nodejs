import { DataSource } from "typeorm";
import { UserEntity } from "../entities/userEntity";
import { ReportEntity } from "../entities/reportEntity";
import { MatchEntity } from "../entities/matchEntity";
import { NotificationEntity } from "../entities/notificationEntity";
import { BlockEntity } from "../entities/blockEntity";
import { ChatEntity } from "../entities/chatEntity";
import * as dotenv from 'dotenv';

dotenv.config();

export const myDataBase = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [UserEntity, ReportEntity, MatchEntity, NotificationEntity, BlockEntity, ChatEntity],
    logging: true,
    synchronize: false,
});
