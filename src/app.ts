// import 'reflect-metadata';
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
