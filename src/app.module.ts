import express from 'express';
import userRoutes from './domain/user/userRoutes';
import reportRoutes from './domain/report/reportRoutes';

const app = express();

app.use(express.json());

app.use('/users', userRoutes);
app.use('/reports', reportRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
