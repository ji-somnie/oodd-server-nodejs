import express from 'express';
import { json } from 'body-parser';
import userRoutes from './domain/user/userRoutes'; // 상대 경로로 수정
import reportRoutes from './domain/report/reportRoutes'; // 상대 경로로 수정
import matchRequestRoutes from './domain/matchRequest/matchRequestRoutes'; // 상대 경로로 수정
import notificationRoutes from './domain/notification/notificationRoutes'; // 상대 경로로 수정
import { AppDataSource } from './data-source'; // 상대 경로로 수정

const app = express();

app.use(json());

app.use('/users', userRoutes);
app.use('/reports', reportRoutes);
app.use('/match-requests', matchRequestRoutes);
app.use('/notifications', notificationRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
