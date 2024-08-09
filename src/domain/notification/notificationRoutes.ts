import { Router } from 'express';
import { NotificationController } from './notificationController';

const router = Router();
const notificationController = new NotificationController();

// Notification routes
router.get('/:userId', (req, res) => notificationController.getNotifications(req, res));
router.post('/create', (req, res) => notificationController.createNotification(req, res));

export default router;
