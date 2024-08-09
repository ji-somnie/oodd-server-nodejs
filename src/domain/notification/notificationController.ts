import { Request, Response } from 'express';
import { NotificationService } from './notificationService';
import BaseResponse from '../../base/baseResponse';
import HttpCode from '../../variables/httpCode';

export class NotificationController {
  private notificationService = new NotificationService();

  async getNotifications(req: Request, res: Response): Promise<Response> {
    const { userId } = req.params;
    try {
      const notifications = await this.notificationService.getNotificationsByUserId(Number(userId));
      return res.json(BaseResponse.success(notifications));
    } catch (error) {
      const err = error as Error;
      return res.json(BaseResponse.error("Internal Server Error", err.message));
    }
  }

  async createNotification(req: Request, res: Response): Promise<Response> {
    const { userId, message } = req.body;
    try {
      const notification = await this.notificationService.createNotification(userId, message);
      return res.json(BaseResponse.success(notification));
    } catch (error) {
      const err = error as Error;
      return res.json(BaseResponse.error("Internal Server Error", err.message));
    }
  }
}
