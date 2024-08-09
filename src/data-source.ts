// src/utils/data-source.ts

import { DataSource } from 'typeorm';
import { UserEntity } from './entities/userEntity';
import { MatchRequestEntity } from './entities/matchRequestEntity';  // MatchRequestEntity로 변경
import { NotificationEntity } from './entities/notificationEntity';


export const myDataBase = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'password',
    database: 'my_database',
    entities: [UserEntity, MatchRequestEntity, NotificationEntity],
    synchronize: false,
});
