<<<<<<< HEAD
import express from 'express';
import userRouter from './domains/user/userController';
=======
import express from "express";
import userRouter from "./domains/user/userController";
import postRouter from "./domains/ootd/postController";
>>>>>>> feat/oodd-11

const app = express();

app.use(express.json());
<<<<<<< HEAD
app.use('/users', userRouter);
=======
app.use("/users", userRouter);
app.use("/posts", postRouter);
>>>>>>> feat/oodd-11

export default app;
