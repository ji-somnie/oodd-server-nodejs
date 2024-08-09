import { Request, Response } from 'express';
import { NotificationService } from './notificationService';

const notificationService = new NotificationService();

export const NotificationController = {
  getAllNotifications: async (req: Request, res: Response) => {
    const notifications = await notificationService.getAllNotifications();
    res.json(notifications);
  },

  createNotification: async (req: Request, res: Response) => {
    const { userId, message } = req.body;
    const notification = await notificationService.createNotification(userId, message);
    res.json(notification);
  }
};
