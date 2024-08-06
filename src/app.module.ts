import express from 'express';
import userRouter from './domain/user/userController';
import ootdLikeRouter from './domain/ootdLike/ootdLikeController';
import ootdCommentRouter from './domain/ootdComment/ootdCommentController';
import friendRequestRouter from './domain/friend/friendRequestController';

const app = express();

app.use(express.json());
app.use('/users', userRouter);
app.use('/ootdLike', ootdLikeRouter);
app.use('/ootdComment', ootdCommentRouter);
app.use('friendRequest', friendRequestRouter);

export default app;
