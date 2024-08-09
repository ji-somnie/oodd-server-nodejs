import { getRepository } from 'typeorm';
import { ReportEntity } from '../../entities/reportEntity';
import { UserEntity } from '../../entities/userEntity';

export class ReportService {
  async createReport(reporterId: number, postId: number, reason: string): Promise<ReportEntity> {
    const userRepository = getRepository(UserEntity);
    const reporter = await userRepository.findOne({ where: { id: reporterId } });

    if (!reporter) {
      throw new Error('User not found');
    }

    const reportRepository = getRepository(ReportEntity);
    const report = new ReportEntity();
    report.reporter = reporter;
    report.postId = postId;
    report.reason = reason;
    report.createdAt = new Date();

    return await reportRepository.save(report);
  }

  async getAllReports(): Promise<ReportEntity[]> {
    const reportRepository = getRepository(ReportEntity);
    return await reportRepository.find();
  }
}
