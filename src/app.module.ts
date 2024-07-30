//src/app.module.ts
import express from 'express';
import userRouter from './domain/user/userController';
import ootdLikeRouter from './domain/ootdLike/ootdLikeController';

const app = express();

app.use(express.json());
app.use('/users', userRouter);
app.use('/ootdLike', ootdLikeRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the API');
}); //기본 라우트 추가

export default app;
