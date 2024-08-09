import { AppDataSource } from '../data-source';
import { ReportEntity } from '../entities/reportEntity'; 

const reportRepository = AppDataSource.getRepository(ReportEntity);

export const createReport = async (reportData: Partial<ReportEntity>): Promise<ReportEntity> => {
  const report = reportRepository.create(reportData);
  return await reportRepository.save(report);
};

export const getReportById = async (id: number): Promise<ReportEntity | null> => {
  return await reportRepository.findOneBy({ id });
};

export const getAllReports = async (): Promise<ReportEntity[]> => {
  return await reportRepository.find();
};

export const updateReport = async (id: number, updateData: Partial<ReportEntity>): Promise<ReportEntity | null> => {
  const report = await reportRepository.findOneBy({ id });
  if (!report) return null;
  Object.assign(report, updateData);
  return await reportRepository.save(report);
};

export const deleteReport = async (id: number): Promise<void> => {
  await reportRepository.delete({ id });
};
