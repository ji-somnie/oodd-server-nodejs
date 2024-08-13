// import 'reflect-metadata';
import {httpServer, startServer} from './app.module';

const PORT = process.env.PORT || 8080;

httpServer.listen(PORT, async () => {
  await startServer();
  console.log(`Server is running on port ${PORT}`);
});
=======
import app from './app.module';
import * as express from 'express';
//import { Request, Response } from "express"
import {myDataBase} from './data-source';

myDataBase
  .initialize()
  .then(() => {
    console.log('DataBase has been initialized!');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error during DataBase initialization:', err);
  });

const PORT = process.env.PORT || 3000;
>>>>>>> 67918b9 (Feat: 좋아요 누르기/취소 기능 구현)
