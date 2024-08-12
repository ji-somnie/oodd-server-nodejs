// import 'reflect-metadata';
import {httpServer} from './app.module';

const PORT = process.env.PORT || 8080;
import express from "express";
import userRoutes from "./domain/user/userRoutes";
import { myDataBase } from "./utils/data-source";

const app = express();

app.use(express.json());
app.use("/user", userRoutes);

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
myDataBase.initialize().then(() => {
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
});
