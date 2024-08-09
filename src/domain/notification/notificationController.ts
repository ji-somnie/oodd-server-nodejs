import { Request, Response } from 'express';
import { NotificationService } from './notificationService';
import { createResponse } from '../../base/baseResponse';
import { HttpCode } from '../../variables/httpCode';

export class NotificationController {
    private notificationService: NotificationService;

    constructor(notificationService: NotificationService) {
        this.notificationService = notificationService;
    }

    async getNotifications(req: Request, res: Response) {
        try {
            const userId = parseInt(req.params.userId, 10);
            const notifications = await this.notificationService.getNotificationsByUserId(userId);
            
            return res.status(HttpCode.OK).json(createResponse(HttpCode.SUCCESS, notifications));
        } catch (error) {
            console.error('알림 목록 조회 오류:', error);
            return res.status(HttpCode.INTERNAL_SERVER_ERROR).json(createResponse(HttpCode.SERVER_ERROR, error.message));
        }
    }
}
