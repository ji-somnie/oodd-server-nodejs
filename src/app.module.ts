import express from "express";
import userRouter from "./domains/user/userController";
import postRouter from "./domains/ootd/postController";

const app = express();

app.use(express.json());
app.use("/users", userRouter);
app.use("/posts", postRouter);

export default app;
