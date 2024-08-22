import myDataBase from '../../data-source';
import {Repository} from 'typeorm';
import {UserRelationship} from '../../entities/userRelationshipEntity';
import {User} from '../../entities/userEntity';
import {UserReport} from '../../entities/userReportEntity';
import dayjs from 'dayjs';
import {Report} from '../../entities/reportEntity';
import {Post} from '../../entities/postEntity';

export class ReportService {
  private reportRepository: Repository<Report>;

  constructor() {
    this.reportRepository = myDataBase.getRepository(Report);
  }

  async getReportByReporterAndPost(reporter: User, post: Post): Promise<Report | null> {
    const userReport = await this.reportRepository.findOne({
      where: {reporter, post, status: 'activated'},
    });
    return userReport;
  }

  async postReport(reporter: User, post: Post, reason: string): Promise<Report | null> {
    const userReport = this.reportRepository.create();
    userReport.reporter = reporter;
    userReport.post = post;
    userReport.reason = reason;
    userReport.createdAt = dayjs().toDate();
    userReport.updatedAt = dayjs().toDate();
    userReport.status = 'activated';

    return await this.reportRepository.save(userReport);
  }
}
