// import 'reflect-metadata';
import {httpServer, startServer} from './app.module';

const PORT = process.env.PORT || 8080;

httpServer.listen(PORT, async () => {
  await startServer();
  console.log(`Server is running on port ${PORT}`);
});