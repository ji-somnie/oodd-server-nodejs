// import 'reflect-metadata';
import {httpServer} from './app.module';

const PORT = process.env.PORT || 8080;

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
