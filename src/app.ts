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
>>>>>>> aeec05f55a7fbe3c0f5019b2dd68ad73b090d6d2
