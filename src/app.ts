import express from 'express';
import reportRoutes from './domain/report/reportRoutes'; // reportRoutes를 default로 가져옵니다.
import userRoutes from './domain/user/userRoutes'; // userRoutes를 default로 가져옵니다.
import notificationRoutes from './domain/notification/notificationRoutes'; // notificationRoutes를 default로 가져옵니다.

const app = express();

// 미들웨어 설정
app.use(express.json());

// 라우터 설정
app.use('/api/reports', reportRoutes);
app.use('/api/users', userRoutes);
app.use('/api/notifications', notificationRoutes);

// 서버 시작
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
