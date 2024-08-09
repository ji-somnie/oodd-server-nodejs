import { Repository } from 'typeorm';
import { ReportEntity } from '../../entities/reportEntity';
import { AppDataSource } from '../../data-source';

export class ReportService {
  private reportRepository: Repository<ReportEntity>;

  constructor() {
    this.reportRepository = AppDataSource.getRepository(ReportEntity);
  }

  async getAllReports() {
    return await this.reportRepository.find();
  }

  async createReport(reportData: Partial<ReportEntity>) {
    const newReport = this.reportRepository.create(reportData);
    return await this.reportRepository.save(newReport);
  }
}
