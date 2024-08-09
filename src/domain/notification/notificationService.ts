import { AppDataSource } from '../../data-source';
import { NotificationEntity } from '../../entities/notificationEntity';
import { UserEntity } from '../../entities/userEntity';

export class NotificationService {
    private notificationRepository = AppDataSource.getRepository(NotificationEntity);
    private userRepository = AppDataSource.getRepository(UserEntity);

    async getNotificationsByUserId(userId: number) {
        try {
            const user = await this.userRepository.findOneBy({ id: userId });

            if (!user) {
                throw new Error('사용자를 찾을 수 없습니다.');
            }

            // 해당 사용자의 알림 목록을 조회합니다.
            const notifications = await this.notificationRepository.find({
                where: { user: { id: userId } },
                order: { createdAt: 'DESC' }, //  최신순으로 정렬
            });

            return notifications;
        } catch (error) {
            console.error('알림 목록 조회 오류:', error);
            throw new Error('알림 목록을 조회하는 동안 오류가 발생했습니다.');
        }
    }
}
