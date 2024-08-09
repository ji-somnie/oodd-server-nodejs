import { getRepository } from 'typeorm';
import { Notification } from '../entities/notificationEntity';  // 수정된 부분

export class NotificationRepository {
  private repository = getRepository(Notification);

  async findByUserId(userId: number): Promise<Notification[]> {
    return this.repository.find({ where: { user: { id: userId } } });
  }

  async createNotification(userId: number, message: string): Promise<Notification> {
    const notification = this.repository.create({ user: { id: userId }, message });
    return this.repository.save(notification);
  }
}
