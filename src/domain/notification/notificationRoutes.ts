import { Router } from 'express';
import { getNotifications, markAsRead } from './notificationController';

const router = Router();

// 알림 목록을 조회하는 엔드포인트
router.get('/:userId', getNotifications);

// 알림을 읽음 처리하는 엔드포인트
router.put('/:notificationId/read', markAsRead);

export default router;
