import express from 'express';
import userRouter from './domains/user/userController';
import ootdLikeRouter from './domains/ootdLike/ootdLikeController';
import ootdCommentRouter from './domains/ootdComment/ootdCommentController';
import friendRequestRouter from './domains/friend/friendRequestController';

const app = express();

app.use(express.json());
app.use('/users', userRouter);
app.use('/ootdLike', ootdLikeRouter);
app.use('/ootdComment', ootdCommentRouter);
app.use('friendRequest', friendRequestRouter);

export default app;
