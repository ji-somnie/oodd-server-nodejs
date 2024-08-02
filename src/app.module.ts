import 'reflect-metadata';
import express from 'express';
import { myDataBase } from './data-source';
import userRoutes from './domain/user/userRoutes'; // 올바른 경로로 수정

const app = express();

app.use(express.json());
app.use('/users', userRoutes); // userRoutes를 사용하여 경로 설정

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
