<<<<<<< HEAD
// src/utils/data-source.ts

import { DataSource } from 'typeorm';
import { UserEntity } from './entities/userEntity';
import { MatchRequestEntity } from './entities/matchRequestEntity';  // MatchRequestEntity로 변경
import { NotificationEntity } from './entities/notificationEntity';
=======
import {DataSource} from 'typeorm';
import * as dotenv from 'dotenv';
>>>>>>> c05bc42a369b72b6a94b034be6b95365e4508687


<<<<<<< HEAD
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
=======
const myDataBase = new DataSource({
  type: 'mysql',
  host: process.env.DEV_DB_HOST ? process.env.DEV_DB_HOST : process.env.DB_HOST,
  port: 3306,
  username: process.env.DEV_DB_USER ? process.env.DEV_DB_USER : process.env.DB_USER,
  password: process.env.DEV_DB_PASSWORD ? process.env.DEV_DB_PASSWORD : process.env.DB_PASSWORD,
  database: process.env.DEV_DB_DATABASE ? process.env.DEV_DB_DATABASE : process.env.DB_DATABASE, // 스키마 이름
  entities: [__dirname + '/entities/*Entity{.ts,.js}'], // 모델의 경로
  logging: true, // 정확히 어떤 sql 쿼리가 실행됐는지 로그 출력
  synchronize: false, // 현재 entity 와 실제 데이터베이스 상 모델을 동기화
});

export const initializeDatabase = async (): Promise<DataSource | null> => {
  try {
    if (!myDataBase.isInitialized) {
      await myDataBase.initialize();
      console.log('Data Source has been initialized!');
    }
    return myDataBase;
  } catch (err) {
    console.error('Error during Data Source initialization:', err);
    return null;
  }
};
export default myDataBase;
>>>>>>> c05bc42a369b72b6a94b034be6b95365e4508687
