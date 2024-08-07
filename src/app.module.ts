import express from "express";
import userRouter from "./domains/user/userController";
import authRouter from "./domains/auth/authController";
//import postRouter from "./domains/ootd/postController";

const app = express();

app.use(express.json());
app.use("/users", userRouter);
app.use("/auth", authRouter); //소셜 로그인 처리
//app.use("/posts", postRouter);


export default app;
