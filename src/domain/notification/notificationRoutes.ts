import express from 'express';
import { NotificationController } from './notificationController';

const router = express.Router();

router.get('/', NotificationController.getAllNotifications); // 모든 알림 가져오기
router.post('/', NotificationController.createNotification); // 새로운 알림 생성하기

export default router; // default로 내보내기
