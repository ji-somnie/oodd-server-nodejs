//src/app.module.ts
import express from 'express';
import userRouter from './domain/user/userController';
import ootdLikeRouter from './domain/ootdLike/ootdLikeController';

const app = express();

app.use(express.json());
app.use('/users', userRouter);
app.use('/ootdLike', ootdLikeRouter);

export default app;
