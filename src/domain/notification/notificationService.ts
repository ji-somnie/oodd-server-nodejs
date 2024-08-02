import { getRepository } from 'typeorm';
import { Notification } from './entities/notificationEntity';

export class NotificationService {
  private notificationRepository = getRepository(Notification);

  async getNotifications(userId: number) {
    return await this.notificationRepository.find({ where: { user: { id: userId } } });
  }

  async markAsRead(notificationId: number) {
    const notification = await this.notificationRepository.findOne({ where: { id: notificationId } });
    if (!notification) {
      return null;
    }

    notification.read = true;
    return await this.notificationRepository.save(notification);
  }
}

