<<<<<<< HEAD
import { DataSource } from "typeorm";
=======
import {DataSource} from 'typeorm';
>>>>>>> aeec05f55a7fbe3c0f5019b2dd68ad73b090d6d2
import * as dotenv from 'dotenv';

dotenv.config();

const myDataBase = new DataSource({
  type: 'mysql',
  host: process.env.DEV_DB_HOST ? process.env.DEV_DB_HOST : process.env.DB_HOST,
  port: 3306,
<<<<<<< HEAD
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE, // 스키마 이름
  entities: ["dist/entities/*.js"], // 모델의 경로  <<왜 js로 해야 되지????????
  logging: true, // 정확히 어떤 sql 쿼리가 실행됐는지 로그 출력
  synchronize: false, // 현재 entity 와 실제 데이터베이스 상 모델을 동기화
})
=======
  username: process.env.DEV_DB_USER ? process.env.DEV_DB_USER : process.env.DB_USER,
  password: process.env.DEV_DB_PASSWORD ? process.env.DEV_DB_PASSWORD : process.env.DB_PASSWORD,
  database: process.env.DEV_DB_DATABASE ? process.env.DEV_DB_DATABASE : process.env.DB_DATABASE, // 스키마 이름
  entities: [__dirname + '/entities/*Entity{.ts,.js}'], // 모델의 경로
  logging: true, // 정확히 어떤 sql 쿼리가 실행됐는지 로그 출력
  synchronize: false, // 현재 entity 와 실제 데이터베이스 상 모델을 동기화
});
>>>>>>> aeec05f55a7fbe3c0f5019b2dd68ad73b090d6d2

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
