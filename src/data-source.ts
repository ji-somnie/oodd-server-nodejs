import { DataSource } from 'typeorm';
import { User } from './user/user.entity';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source initialized');
  })
  .catch((err) => {
    console.error('Error during initialization:', err);
  });
