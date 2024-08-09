import { getRepository } from 'typeorm';
import { NotificationEntity } from './entities/notificationEntity';  // 경로 확인 후 정확한 위치로 수정
import { UserEntity } from '../../entities/userEntity';

// 나머지 코드 동일


export class NotificationService {
  async getNotificationsByUserId(userId: number): Promise<NotificationEntity[]> {
    const notificationRepository = getRepository(NotificationEntity);
    return await notificationRepository.find({ where: { user: { id: userId } } });
  }

  async createNotification(userId: number, message: string): Promise<NotificationEntity> {
    const userRepository = getRepository(UserEntity);
    const user = await userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new Error('User not found');
    }

    const notificationRepository = getRepository(NotificationEntity);
    const notification = new NotificationEntity();
    notification.user = user;
    notification.message = message;
    notification.createdAt = new Date();

    return await notificationRepository.save(notification);
  }
}
