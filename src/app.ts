// import 'reflect-metadata';
import { app } from "C:/Study/oodd-server-nodejs/oodd-server-nodejs/src/app.module";
import * as express from "express"
import { Request, Response } from "express"
import myDataBase from "./data-source";
import {httpServer} from './app.module';

const PORT = process.env.PORT || 3000;

myDataBase.initialize().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(error => console.log(error));




// const PORT = process.env.PORT || 8080;

// httpServer.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
