import { DataSource } from 'typeorm';
import { MatchRequestEntity } from './entities/matchRequestEntity';
import { NotificationEntity } from './entities/notificationEntity';
import { ReportEntity } from './entities/reportEntity';
import { UserEntity } from './entities/userEntity';

export const myDataBase = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'my_database',
  entities: [
    MatchRequestEntity,
    NotificationEntity,
    ReportEntity,
    UserEntity
  ],
  synchronize: false,
});
