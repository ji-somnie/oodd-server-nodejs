import { Repository } from 'typeorm';
import { NotificationEntity } from '../../entities/notificationEntity';
import { AppDataSource } from '../../data-source';



export class NotificationService {
  private notificationRepository: Repository<NotificationEntity>;

  constructor() {
    this.notificationRepository = AppDataSource.getRepository(NotificationEntity);
  }

  async getAllNotifications() {
    return await this.notificationRepository.find();
  }

  async createNotification(userId: number, message: string) {
    const notification = this.notificationRepository.create({ 
        user: { id: userId }, 
        message 
    });
    return await this.notificationRepository.save(notification);
}

}
