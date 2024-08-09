// import 'reflect-metadata';
<<<<<<< HEAD
import app from './app.module';
import * as express from "express"
import { Request, Response } from "express"
import { myDataBase } from './data-source';

const PORT = process.env.PORT || 3000;

myDataBase.initialize().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(error => console.log(error));
=======
import {httpServer} from './app.module';

const PORT = process.env.PORT || 8080;

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
>>>>>>> d68dec8cb7c57e3b78123b4acd1a29bf1277797a
