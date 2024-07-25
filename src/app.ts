// import 'reflect-metadata';
import app from './app.module';
import { myDataBase } from './data-source';

const PORT = process.env.PORT || 3000;

myDataBase.initialize().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(error => console.log(error));
