import 'reflect-metadata';
import express from 'express';
import { myDataBase } from './data-source';
import userRoutes from './domain/user/userRoutes';
import reportRoutes from './domain/report/reportRoutes';
import matchRoutes from './domain/match/matchRoutes';
import notificationRoutes from './domain/notification/notificationRoutes';

const app = express();

app.use(express.json());
app.use('/users', userRoutes);
app.use('/reports', reportRoutes);
app.use('/matches', matchRoutes);
app.use('/notifications', notificationRoutes);

myDataBase
  .initialize()
  .then(() => {
    console.log('Database has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Database initialization:', err);
  });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
