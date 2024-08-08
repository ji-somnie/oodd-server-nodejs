import express from "express";
import userRouter from "./domains/user/userController";
import postRouter from "./domains/ootd/postController";
// import ootdRouter from "./domains/ootd/ootdController";

const app = express();

app.use(express.json());
app.use("/users", userRouter);
app.use("/posts", postRouter);
// app.use('/ootds', ootdRouter); 

export default app;