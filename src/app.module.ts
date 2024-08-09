import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller'; // AppController import
import { AppService } from './app.service'; // AppService import
import { AppDataSource } from './data-source'; // 데이터베이스 설정 import

@Module({
  imports: [TypeOrmModule.forRoot(AppDataSource.options)], // TypeORM 설정 import
  controllers: [AppController], // 컨트롤러 등록
  providers: [AppService], // 서비스 등록
})
export class AppModule {} // 모듈 정의
