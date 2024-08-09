import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost', // 기본값 설정
  port: parseInt(process.env.DB_PORT || '3306', 10), // 기본값 설정 및 문자열을 숫자로 변환
  username: process.env.DB_USER || 'root', // 기본값 설정
  password: process.env.DB_PASSWORD || '', // 기본값 설정
  database: process.env.DB_DATABASE || 'test', // 기본값 설정
  entities: [__dirname + '/entity/*.ts'], // 경로를 __dirname으로 설정
  logging: true, // 정확히 어떤 SQL 쿼리가 실행됐는지 로그 출력
  synchronize: false, // 현재 entity와 실제 데이터베이스 상 모델을 동기화
});
