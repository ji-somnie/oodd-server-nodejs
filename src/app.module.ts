import express from "express";
import userRouter from "./user/userController";
import postRouter from "./ootd/postController";

const app = express();

app.use(express.json());
app.use("/users", userRouter);
app.use("/posts", postRouter);

export default app;
