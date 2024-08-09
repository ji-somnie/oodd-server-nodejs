import { Router } from 'express';
import { NotificationController } from './notificationController';
import { NotificationService } from './notificationService';
import { AppDataSource } from '../../data-source';

const router = Router();

const notificationService = new NotificationService();
const notificationController = new NotificationController(notificationService);

// 주석: GET 요청으로 특정 사용자의 알림 목록을 조회하는 엔드포인트 설정
router.get('/:userId/notifications', (req, res) => notificationController.getNotifications(req, res));

export default router;
