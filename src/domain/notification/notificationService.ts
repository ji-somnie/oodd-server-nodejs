import { getRepository } from 'typeorm';
import Notification from '../../entities/notificationEntity'; // 수정된 import
import { UserEntity } from '../../entities/userEntity';

export class NotificationService {
  async getNotificationsByUserId(userId: number): Promise<Notification[]> {
    const notificationRepository = getRepository(Notification);
    return await notificationRepository.find({ where: { user: { id: userId } } });
  }

  async createNotification(userId: number, message: string): Promise<Notification> {
    const userRepository = getRepository(UserEntity);
    const user = await userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new Error('User not found');
    }

    const notificationRepository = getRepository(Notification);
    const notification = new Notification();
    notification.user = user;
    notification.message = message;
    notification.createdAt = new Date();

    return await notificationRepository.save(notification);
  }
}
