import { Request, Response } from 'express';
import { NotificationService } from './notificationService';

const notificationService = new NotificationService();

export const getNotifications = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId, 10);
  const notifications = await notificationService.getNotifications(userId);

  if (notifications) {
    res.json(notifications);
  } else {
    res.status(404).send({ message: 'Notifications not found' });
  }
};

export const markAsRead = async (req: Request, res: Response) => {
  const notificationId = parseInt(req.params.notificationId, 10);
  const marked = await notificationService.markAsRead(notificationId);

  if (marked) {
    res.status(200).send({ message: 'Notification marked as read' });
  } else {
    res.status(400).send({ message: 'Failed to mark as read' });
  }
};
