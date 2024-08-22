import myDataBase from '../../data-source';
import {Repository} from 'typeorm';
import {UserRelationship} from '../../entities/userRelationshipEntity';
import {User} from '../../entities/userEntity';
import {UserReport} from '../../entities/userReportEntity';
import dayjs from 'dayjs';

export class UserReportService {
  private userReportRepository: Repository<UserReport>;

  constructor() {
    this.userReportRepository = myDataBase.getRepository(UserReport);
  }

  async getUserReportByFromAndToUser(fromUser: User, toUser: User): Promise<UserReport | null> {
    const userReport = await this.userReportRepository.findOne({
      where: {fromUser, toUser, status: 'activated'},
    });
    return userReport;
  }

  async postUserReport(fromUser: User, toUser: User, reason: string): Promise<UserReport | null> {
    const userReport = this.userReportRepository.create();
    userReport.fromUser = fromUser;
    userReport.toUser = toUser;
    userReport.reason = reason;
    userReport.createdAt = dayjs().toDate();
    userReport.updatedAt = dayjs().toDate();
    userReport.status = 'activated';

    return await this.userReportRepository.save(userReport);
  }
}
