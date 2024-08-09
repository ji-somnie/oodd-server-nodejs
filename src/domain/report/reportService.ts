// src/domain/report/reportService.ts

import { getRepository } from 'typeorm';
import { ReportEntity } from '../../entities/reportEntity';
import { ReportPostRequest } from './dto/request';

export class ReportService {
    async reportPost(data: ReportPostRequest, userId: number): Promise<ReportEntity> {
        const reportRepository = getRepository(ReportEntity);
        const report = reportRepository.create({
            reason: data.reason,
            details: data.details,
            postId: data.postId,
            reportedBy: { id: userId } as any,  // 간단히 사용자 아이디로 매핑
        });
        return await reportRepository.save(report);
    }
}
