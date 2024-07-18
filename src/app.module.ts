import express from "express";
import userRouter from "./user/userController";

const app = express();

app.use(express.json());
app.use("/users", userRouter);

export default app;
